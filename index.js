
const graph = document.getElementById('chart-continent').getContext('2d');

const continentsDiv1 = document.querySelector('.continents-1');
const continentsDiv2 = document.querySelector('.continents-2');
const asiaButton = document.querySelector('.asiaButton');
const europeButton = document.querySelector('.europeButton');
const oceaniaButton = document.querySelector('.oceaniaButton');
const americaButton = document.querySelector('.americaButton');
const africaButton = document.querySelector('.africaButton');
const countriesForEachRegion = document.querySelector('.countries-for-each-region');
const confirmedButton = document.querySelector('.confirmed');
const deathButton = document.querySelector('.deaths');
const recoveredButton = document.querySelector('.recovered');
const criticalButton = document.querySelector('.critical');
let chartContinent = new Chart(graph, {});

let arrEurope = [];
let europeConfirmed = [];
let europeName = [];
let europeDeaths = [];
let europeRecoverd = [];
let europeCriticalCondition = [];

let arrAfrica = [];
let africaConfirmed = [];
let africaName = [];
let africaDeaths = [];
let africaRecoverd = [];
let africaCriticalCondition = [];

let arrAmerica = [];
let americaConfirmed = [];
let americaName = [];
let americaDeaths = [];
let americaRecoverd = [];
let americaCriticalCondition = [];

let arrAsia = [];
let asia = [];
let asiaName = [];
let asiaConfirmed = [];
let asiaRecoverd = [];
let asiaDeaths = [];
let asiaCriticalCondition = [];

let arrOceania = [];
let oceaniaConfirmed = [];
let oceaniaName = [];
let oceaniaDeaths = [];
let oceaniaRecoverd = [];
let oceaniaCriticalCondition = [];

let restOfTheWorld = [];

async function getCountry() {
  const newArr = await fetch('https://intense-mesa-62220.herokuapp.com/https://corona-api.com/countries');
  const res = await newArr.json();
  let allCountriesArr = [];
  for (let item of res.data) {
    allCountriesArr.push({
      name: item.name,
      code: item.code,
      ConfirmedCases: item.latest_data.confirmed,
      numberofDeaths: item.latest_data.deaths,
      numberOfRecovered: item.latest_data.recovered,
      numberOfCriticalCondition: item.latest_data.critical,
    });
  }
  return allCountriesArr;
}

async function getConti(allCountriesArr) {
  const fetchContinentFromUrl = await fetch('https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1');
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

//todo - change global arrays to an object
// const world = {
//   asia: {},
//   america: {},
//   africa: {},
//   europe: {},
// };

function newArrOfRegion(allCountriesArr) {
  allCountriesArr.forEach((state) => {
    switch (state.region) {
      case 'Asia':
        arrAsia.push(state);
        asiaConfirmed.push(state.ConfirmedCases);
        asiaName.push(state.name);
        asiaDeaths.push(state.numberofDeaths);
        asiaRecoverd.push(state.numberOfRecovered);
        asiaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Europe':
        arrEurope.push(state);
        europeConfirmed.push(state.ConfirmedCases);
        europeName.push(state.name);
        europeDeaths.push(state.numberofDeaths);
        europeRecoverd.push(state.numberOfRecovered);
        europeCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Americas':
        arrAmerica.push(state);
        americaConfirmed.push(state.ConfirmedCases);
        americaName.push(state.name);
        americaDeaths.push(state.numberofDeaths);
        americaRecoverd.push(state.numberOfRecovered);
        americaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Africa':
        arrAfrica.push(state);
        africaConfirmed.push(state.ConfirmedCases);
        africaName.push(state.name);
        africaDeaths.push(state.numberofDeaths);
        africaRecoverd.push(state.numberOfRecovered);
        africaCriticalCondition.push(state.numberOfCriticalCondition);
        break;
      case 'Oceania':
        arrOceania.push(state);
        oceaniaConfirmed.push(state.ConfirmedCases);
        oceaniaName.push(state.name);
        oceaniaDeaths.push(state.numberofDeaths);
        oceaniaCriticalCondition.push(state.numberOfCriticalCondition);
        oceaniaRecoverd.push(state.numberOfRecovered);
        break;
      default:
        restOfTheWorld.push(allCountriesArr.name);
    }
  });
}

function changeButtonColorWhenClicked(buttonName,color){
  buttonName.style.backgroundColor=color;
}

async function showStat(allCountriesArr) {

  continentsDiv2.addEventListener("click", (e) => {
    document.querySelector(".none").style.display="none";
    if (e.target.className.includes("asia")) {
      createButtonsForEachCountry(asiaName);
      chartContinent.destroy();
      drawChart(asiaConfirmed, asiaName);
      showStatsByCaseAsia();
    }
    else if (e.target.className.includes("america")) {
      createButtonsForEachCountry(americaName);
      chartContinent.destroy();
      drawChart(americaConfirmed, americaName);
      showStatsByCaseAmerica();
    }
    else if (e.target.className.includes("europe")) {
      createButtonsForEachCountry(europeName);
      chartContinent.destroy();
      drawChart(europeConfirmed, europeName);
      showStatsByCaseEurope();
    }
    else if (e.target.className.includes("africa")) {
      createButtonsForEachCountry(africaName);
      chartContinent.destroy();
      drawChart(africaConfirmed, africaName);
      showStatsByCaseAfrica()
    }
    else if (e.target.className.includes("world")) {
      createButtonsForEachCountry(allCountriesArr.name);
    }
    else {
      chartContinent.destroy();
      createButtonsForEachCountry(oceaniaName);
      drawChart(oceaniaConfirmed, oceaniaName);
      showStatsByCaseOceania();
    }
  })
}

//asia
async function showStatsByCaseAsia() {
  continentsDiv1.addEventListener("click", (e2) => {
    if (e2.target.className.includes("confirmed")) {
      chartContinent.destroy();
      drawChart(asiaConfirmed, asiaName);
    }
    else if (e2.target.className.includes("deaths")) {
      chartContinent.destroy();
      drawChart(asiaDeaths, asiaName);
    }
    else if (e2.target.className.includes("recovered")) {
      chartContinent.destroy();
      drawChart(asiaRecoverd, asiaName);
    }
    else {
      chartContinent.destroy();
      drawChart(asiaCriticalCondition, asiaName);
    }
  })
}

//america
async function showStatsByCaseAmerica() {
  continentsDiv1.addEventListener("click", (e2) => {
    if (e2.target.className.includes("confirmed")) {
      chartContinent.destroy();
      drawChart(americaConfirmed, americaName);
    }
    else if (e2.target.className.includes("deaths")) {
      chartContinent.destroy();
      drawChart(americaDeaths, americaName);
    }
    else if (e2.target.className.includes("recovered")) {
      chartContinent.destroy();
      drawChart(americaRecoverd, americaName);
    }
    else {
      chartContinent.destroy();
      drawChart(americaCriticalCondition, americaName);
    }
  })
}

//europe
async function showStatsByCaseEurope() {
  continentsDiv1.addEventListener("click", (e2) => {
    // console.log(e2.target.className);
    if (e2.target.className.includes("confirmed")) {
      chartContinent.destroy();
      drawChart(europeConfirmed, europeName);
    }
    else if (e2.target.className.includes("deaths")) {
      chartContinent.destroy();
      drawChart(europeDeaths, europeName);
    }
    else if (e2.target.className.includes("recovered")) {
      chartContinent.destroy();
      drawChart(europeRecoverd, europeName);
    }
    else {
      chartContinent.destroy();
      drawChart(europeCriticalCondition, europeName);
    }
  })
}

//africa
async function showStatsByCaseAfrica() {
  continentsDiv1.addEventListener("click", (e2) => {
    // console.log(e2.target.className);
    if (e2.target.className.includes("confirmed")) {
      chartContinent.destroy();
      drawChart(africaConfirmed, africaName);
    }
    else if (e2.target.className.includes("deaths")) {
      chartContinent.destroy();
      drawChart(africaDeaths, africaName);
    }
    else if (e2.target.className.includes("recovered")) {
      chartContinent.destroy();
      drawChart(africaRecoverd, africaName);
    }
    else {
      chartContinent.destroy();
      drawChart(africaCriticalCondition, africaName);
    }
  })
}

//oceania
async function showStatsByCaseOceania() {
  continentsDiv1.addEventListener("click", (e2) => {
    // console.log(e2.target.className);
    if (e2.target.className.includes("confirmed")) {
      chartContinent.destroy();
      drawChart(oceaniaConfirmed, oceaniaName);
    }
    else if (e2.target.className.includes("deaths")) {
      chartContinent.destroy();
      drawChart(oceaniaDeaths, oceaniaName);
    }
    else if (e2.target.className.includes("recovered")) {
      chartContinent.destroy();
      drawChart(oceaniaRecoverd, oceaniaName);
    }
    else {
      chartContinent.destroy();
      drawChart(oceaniaCriticalCondition, oceaniaName);
    }
  })
}

async function showStatOnLoad() {
    chartContinent.destroy();
      drawChart(asiaConfirmed, asiaName);
}

function createButtonsForEachCountry(region) {
  countriesForEachRegion.innerText = "";
  for (let country of region) {
    let btn = document.createElement("button");
    btn.innerText = country;
    document.querySelector(".countries-for-each-region").appendChild(btn);
  }
}

function drawChart(covidData, continent) {
  chartContinent = new Chart(graph, {
    type: 'line',
    data: {
      labels: continent,
      datasets: [
        {
          label: 'COVID-19 Statistics',
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: covidData,
        },
      ],
    },
    options: {},
  });
}

async function main() {
  showStatOnLoad();
  let allCountriesArr = await getCountry();
  allCountriesArr = await getConti(allCountriesArr);
  allCountriesArr = newArrOfRegion(allCountriesArr);
  await showStat();
}
main();