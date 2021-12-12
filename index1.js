const graph = document.getElementById('chartContinent').getContext('2d');

const world = {
    asia: {},
    america: {},
    africa: {},
    europe: {},
};

const Asiabutton = document.querySelector('.Asiabutton');
const Americabutton = document.querySelector('.Americabutton');
const Europebutton = document.querySelector('.Europebutton');
const Africabutton = document.querySelector('.Africabutton');
const worldbutton = document.querySelector('.worldbutton');
const buttonconti = document.querySelector('.buttonconti');
const contiDiv2 = document.querySelector('.contiDiv2');
const contiDiv1 = document.querySelector('.contiDiv1');

let chartContinent = new Chart(graph, {});

let arrEurope = [];
let arrAfrica = [];
let arrAsia = [];
let arrOceania = [];
let arrAmerica = [];
let restOfTheWorld = [];
let asiaConfirmed = [];
let asiaName = [];

const urlCountries =
    'https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries';
async function getCountry() {
    const newArr = await fetch(urlCountries);
    const res = await newArr.json();
    let allCountriesArr = [];
    for (let item of res.data) {
        allCountriesArr.push({
            name: item.name,
            code: item.code,
            ConfirmedCases: item.latest_data.confirmed,
            NumberofDeaths: item.latest_data.deaths,
            NumberOfRecovered: item.latest_data.recovered,
            NumberOfCriticalCondition: item.latest_data.critical,
        });
    }

    return allCountriesArr;
}
async function newArrOfRegion(allCountriesArr) {
   await allCountriesArr.forEach((state) => {
        switch (state.region) {
            case 'Asia':
                // console.log(state.ConfirmedCases)
                // console.log(state.name)
                arrAsia.push(state);
                asiaConfirmed.push(state.ConfirmedCases);
                asiaName.push(state.name);
                console.log(asiaConfirmed,asiaName);
                // world.asia[countries].push(state.name);
                // world.asia[confirmed].push(state.ConfirmedCases);
                // world.asia[deaths].push(state.NumberofDeaths);
                // world.asia[critical].push(state.NumberOfCriticalCondition);
                // world.asia[recovered].push(state.NumberOfRecovered);
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

const urlContinent =
    'https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1';
async function getConti(allCountriesArr) {
    const fetchContinentFromUrl = await fetch(urlContinent);
    const fetchcontinentFromUrlJson = await fetchContinentFromUrl.json();
    for (let i = 0; i < fetchcontinentFromUrlJson.length; i++) {
        for (let j = 0; j < allCountriesArr.length; j++) {
            if (
                allCountriesArr[j].name === fetchcontinentFromUrlJson[i].name.common
            ) {
                allCountriesArr[j].region = fetchcontinentFromUrlJson[i].region;
            }
        }
    }
    return allCountriesArr;
}


// const changeGraph = (dataGraph) => {
//     drawChart(dataGraph, asiaName);
// };

// async function showStat2(object) {
//   contiDiv1.addEventListener('click', (event) => {
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//     if (event.target.innerText === 'Confirmed') {
//       drawChart(object[confirmed], object[countries]);
//     }
//   });
// }

async function showStat() {
    contiDiv2.addEventListener('click', (event) => {
        if (event.target.getAttribute('data-type') === 'Asia') {
            chartContinent.destroy();
            drawChart(asiaConfirmed, asiaName);
            // console.log("THISSS",arrAsia.confirmed);
        }
    });
}

function drawChart(covidData, continent) {
    chartContinent = new Chart(graph, {
        type: 'bar',
        data: {
            labels: continent,
            datasets: [
                {
                    label: 'covid statisitcs',
                    data: covidData,
                },
            ],
        },
        options: {},
    });
}


async function main() {
    let allCountriesArr = await getCountry();
    allCountriesArr = await getConti(allCountriesArr);
    allCountriesArr = await newArrOfRegion(allCountriesArr);
    await showStat();
    console.log(arrAsia);
    // console.log(stat);
    //   console.log(arrAfrica);
}

main();
