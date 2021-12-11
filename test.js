async function getCovidData() {
    const data = await fetch("https://corona-api.com/countries");
    const dataObj = await data.json();
    console.log(dataObj);
}

async function getContinentData() {
    const data = await fetch('https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1');
    const dataObj = await data.json();
    console.log(dataObj);
}

getCovidData();
getContinentData();