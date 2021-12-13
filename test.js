

const baseStatsURL = "http://corona-api.com/countries/";
const baseCountriesURL = "https://restcountries.herokuapp.com/api/v1/";
const proxy = "https://intense-mesa-62220.herokuapp.com/";

const countriesCodes = [];
const countriesNames = [];
let arrAsia = [];
let arrAfrica = [];
let arrOceania = [];
let arrAmerica = [];
let restOfTheWorld = [];
let asiaConfirmed = [];
let asiaName = [];
let arrEurope = [];
// const countriesData = [];

const graph = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(graph, {});
const continentsButton = document.querySelector(".continents-names");

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
    for (let i = 0; i < countriesData.length; i++) {
        for (let j = 0; j < countriesData.length; j++) {
            if (dataJ[j].name.common === countriesData[i].name) {
                countriesData[i].region = dataJ[j].region;
            }
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


function createContinentsArrays(countriesData) {
    countriesData.forEach((state) => {
        switch (state.region) {
            case 'Asia':
                arrAsia.push(state);
                asiaConfirmed.push(state.confirmedCases);
                asiaName.push(state.name);
                break;
            case 'Europe':
                arrEurope.push(state);
                break;
            case 'America':
                arrAmerica.push(state);
                break;
            case 'Africa':
                arrAfrica.push(state);
                break;
            case 'Oceania':
                arrOceania.push(state);
                break;
            default:
                restOfTheWorld.push(state);
        }
    });
}


async function showStats() {
    continentsButton.addEventListener('click', (event) => {
        if (event.target.innerText === 'Asia'){
            // chartContinent.destroy();
            drawChart(asiaConfirmed, asiaName);
        }
    });
}

function drawChart(covidData, region) {
    {/* <canvas id="myChart" width="400" height="400"></canvas>; */ }
    myChart = new Chart(graph, {
        type: "bar",
        data: {
            labels: region,
            datasets: [
                {
                    label: "COVID-19",
                    data: covidData,
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

}


async function main() {
    let countriesData = await getCountryData();
    countriesData = await getRegions(countriesData);
    countriesData = createContinentsArrays(countriesData);
    await showStats();
    console.log("ASIA",asiaName);


}

main();

