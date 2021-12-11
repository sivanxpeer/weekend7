

const baseStatsURL = "http://corona-api.com/countries/";
const baseCountriesURL = "https://restcountries.herokuapp.com/api/v1/";
const proxy = "https://intense-mesa-62220.herokuapp.com/";

const countriesCodes = [];
const countriesNames = [];
// const countriesData = [];

async function getCountryData() {
    let countriesData = [];
    let response = await fetch('https://corona-api.com/countries');
    // let response = await fetch(`${proxy}${baseStatsURL}`);
    let responseJ = await response.json();
    // console.log(responseJ);
    for (let rowItem of responseJ.data) {
        // console.log(rowItem);
        countriesData.push({
            "name": rowItem.name,
            "code": rowItem.code,
            "confirmed cases": rowItem.latest_data.confirmed,
            "number of deaths": rowItem.latest_data.deaths,
            "number of recovered": rowItem.latest_data.deaths,
            "number of critical conditions": rowItem.latest_data.critical,
        })
    }
    return countriesData;
}

async function getRegions(countriesData) {
    const data = await fetch(`${proxy}${baseCountriesURL}`);
    const dataJ = await data.json();
    // console.log(dataJ)
    for(let i=0;i<countriesData.length;i++){
        if(dataJ[i].name.common===countriesData[i].name){
            countriesData[i].region = dataJ[i].region;
        }
    }
    return countriesData;
}

// async function getContriesCode() {
//     let data = await fetch(`${proxy}${baseCountriesURL}`);
//     let dataJ = await data.json();
//     console.log(dataJ);
//     for (let rowItem of dataJ) {
//         countriesCodes.push(rowItem.cca2);
//     }
// }


async function main() {
    // console.log(worldArrayOfObjects);
    let countriesData = await getCountryData();
    // console.log(countriesData);
    countriesData = await getRegions(countriesData);
    console.log(countriesData);
    // getRegions();

}

main();







{/* <canvas id="myChart" width="400" height="400"></canvas>; */ }
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "COVID-19",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});