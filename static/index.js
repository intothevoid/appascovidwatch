// base url
// let numbersBaseURL = `https://appascovidwatch.herokuapp.com/numbers`;
// let summaryBaseURL = `https://appascovidwatch.herokuapp.com/summary`;

// For local testing
let numbersBaseURL = `http://127.0.0.1:8000/numbers`;
let summaryBaseURL = `http://127.0.0.1:8000/summary`;

// elements
let saEl = document.getElementById("saBtn");
let waEl = document.getElementById("waBtn");
let vicEl = document.getElementById("vicBtn");
let nswEl = document.getElementById("nswBtn");
let tasEl = document.getElementById("tasBtn");
let ntEl = document.getElementById("ntBtn");
let actEl = document.getElementById("actBtn");

// worldwide summary table
let worldSummaryTableEl = document.getElementById("worldSummaryTable");
let worldSummaryTableBodyEl = document.getElementById("worldSummaryTableBody");
let worldCountryLabelEl = document.getElementById("worldCountryLabel");
let worldTotalLabelEl = document.getElementById("worldTotalLabel");
let worldNewLabelEl = document.getElementById("worldNewLabel");
let worldDeathsTotalLabelEl = document.getElementById("worldDeathsTotalLabel");
let worldDeathsNewLabelEl = document.getElementById("worldDeathsNewLabel");

// aus summary table
let ausSummaryTableEl = document.getElementById("ausSummaryTable");
let ausSummaryTableBodyEl = document.getElementById("ausSummaryTableBody");
let ausStateLabelEl = document.getElementById("ausStateLabel");
let ausTotalLabelEl = document.getElementById("ausTotalLabel");
let ausNewLabelEl = document.getElementById("ausNewLabel");

// summary table
let summaryTableEl = document.getElementById("summaryTable");
let summaryTableBodyEl = document.getElementById("summaryTableBody");
let categoryLabelEl = document.getElementById("categoryLabel");
let totalLabelEl = document.getElementById("totalLabel");
let newLabelEl = document.getElementById("newLabel");

// other elements
let stateNameEl = document.getElementById("stateName");
let australiaNameEl = document.getElementById("australiaName");
let worldNameEl = document.getElementById("worldName");
let graphEl = document.getElementById("graphtest");

document.addEventListener("DOMContentLoaded", function () {
  // register button clicks
  registerListeners();

  // load world values by default
  loadWorldDetails();

  // load australia values by default
  loadAustraliaDetails();
});

function registerListeners() {
  saEl.addEventListener("click", loadSADetails);
  waEl.addEventListener("click", loadWADetails);
  vicEl.addEventListener("click", loadVICDetails);
  nswEl.addEventListener("click", loadNSWDetails);
  tasEl.addEventListener("click", loadTASDetails);
  ntEl.addEventListener("click", loadNTDetails);
  actEl.addEventListener("click", loadACTDetails);
}

async function loadWorldDetails() {
  console.log("Loading World details...");
  worldNameEl.innerText = "Appa thinking...";
  let sumRespObj = await loadWorldSummary();
  populateWorldSummaryTable(sumRespObj);
}

async function loadAustraliaDetails() {
  console.log("Loading Australia details...");
  australiaNameEl.innerText = "Appa thinking...";
  let sumRespObj = await loadSummary("all");
  populateAusSummaryTable(sumRespObj);
}

async function loadSADetails() {
  console.log("SA was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  let numRespObj = await loadNumbers("sa");
  let sumRespObj = await loadSummary("sa");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(numRespObj);
}

async function loadWADetails() {
  console.log("WA was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("wa");
  let sumRespObj = await loadSummary("wa");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
}

async function loadVICDetails() {
  console.log("VIC was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("vic");
  let sumRespObj = await loadSummary("vic");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
}

async function loadNSWDetails() {
  console.log("NSW was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("nsw");
  let sumRespObj = await loadSummary("nsw");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
}

async function loadTASDetails() {
  console.log("TAS was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("tas");
  let sumRespObj = await loadSummary("tas");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
}

async function loadNTDetails() {
  console.log("NT was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("nt");
  let sumRespObj = await loadSummary("nt");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
}

async function loadACTDetails() {
  console.log("ACT was clicked!");
  respObject = await loadNumbers("act");
  let sumRespObj = await loadSummary("act");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
}

async function loadNumbers(state) {
  const options = {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  };

  // Start by clearing existing table's body
  clearNumbersGraph();

  retVal = await fetch(`${numbersBaseURL}/${state}`, options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => console.warn(error));

  return retVal;
}

async function loadWorldSummary() {
  const options = {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  };

  // Start by clearing existing table's body
  clearWorldSummaryTableBody();

  retVal = await fetch(`${summaryBaseURL}/world`, options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => console.warn(error));

  return retVal;
}

async function loadSummary(state) {
  const options = {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  };

  if (state === "all") {
    clearAusSummaryTableBody();
  } else {
    // Start by clearing existing table's body
    clearSummaryTableBody();
  }

  retVal = await fetch(`${summaryBaseURL}/${state}`, options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => console.warn(error));

  return retVal;
}

function clearWorldSummaryTableBody() {
  // clear table body
  worldSummaryTableBodyEl.innerText = "";
  worldSummaryTableBodyEl.innerHTML = "";
}

function clearSummaryTableBody() {
  // clear table body
  summaryTableBodyEl.innerText = "";
  summaryTableBodyEl.innerHTML = "";
}

function clearAusSummaryTableBody() {
  // clear table body
  ausSummaryTableBodyEl.innerText = "";
  ausSummaryTableBodyEl.innerHTML = "";
}

function clearNumbersGraph() {
  // clear table body
  graphEl.innerText = "";
  graphEl.innerHTML = "";
}

function populateSummaryTable(respObject) {
  // set the state name from response
  const stateName = respObject["state"];
  stateNameEl.innerText = stateName;
  categoryLabelEl.innerText = "Category";
  totalLabelEl.innerText = "Total";
  newLabelEl.innerText = "New";

  const payload = respObject["payload"];

  for (key in payload) {
    const val = payload[key];
    let row = document.createElement("tr");
    let categoryEl = document.createElement("td");
    let totalEl = document.createElement("td");
    let newEl = document.createElement("td");

    // Set category table item
    categoryEl.innerText = key;

    numbers = payload[key];
    for (numkey in numbers) {
      totalEl.innerText = numkey;
      newEl.innerText = numbers[numkey];
    }

    row.append(categoryEl);
    row.append(totalEl);
    row.append(newEl);

    summaryTableBodyEl.appendChild(row);
  }
}

function populateAusSummaryTable(respObject) {
  // set the state name from response
  const ausName = respObject["state"];
  australiaNameEl.innerText = ausName;
  ausStateLabelEl.innerText = "State";
  ausTotalLabelEl.innerText = "Total";
  ausNewLabelEl.innerText = "New";

  const payload = respObject["payload"];

  for (key in payload) {
    const val = payload[key];
    let row = document.createElement("tr");
    let stateEl = document.createElement("td");
    let totalEl = document.createElement("td");
    let newEl = document.createElement("td");

    // Set category table item
    stateEl.innerText = key;

    numbers = payload[key];
    for (numkey in numbers) {
      totalEl.innerText = numkey;
      newEl.innerText = numbers[numkey];
    }

    row.append(stateEl);
    row.append(totalEl);
    row.append(newEl);

    ausSummaryTableBodyEl.appendChild(row);
  }
}

function populateWorldSummaryTable(respObject) {
  // set the state name from response
  worldNameEl.innerText = "Worldwide";
  worldCountryLabelEl.innerText = "Country";
  worldTotalLabelEl.innerText = "Cases";
  worldNewLabelEl.innerText = "New";
  worldDeathsTotalLabelEl.innerText = "Deaths";
  worldDeathsNewLabelEl.innerText = "New";

  // const payload = respObject.values("payload");
  const summary = respObject["payload"]["summary"];
  const deaths = respObject["payload"]["deaths"];

  for (key in summary) {
    const val = summary[key];
    let row = document.createElement("tr");
    let countryEl = document.createElement("td");
    let totalEl = document.createElement("td");
    let newEl = document.createElement("td");

    // Set category table item
    countryEl.innerText = key;

    numbers = summary[key];
    for (numkey in numbers) {
      totalEl.innerText = numkey;
      newEl.innerText = numbers[numkey];
    }

    // Populate cases
    row.append(countryEl);
    row.append(totalEl);
    row.append(newEl);

    // for (key in deaths) {
    //   const val = summary[key];
    //   let deathsTotalEl = document.createElement("td");
    //   let deathsNewEl = document.createElement("td");

    //   numbers = deaths[key];
    //   for (numkey in numbers) {
    //     deathsTotalEl.innerText = numkey;
    //     deathsNewEl.innerText = numbers[numkey];
    //   }
    // }

    worldSummaryTableBodyEl.appendChild(row);
  }
}

function populateNumbersBarGraph(respData) {
  const payload = respData["payload"];
  let x = [];
  let y = [];

  for (key in payload) {
    x.push(key);
    y.push(payload[key]);
  }

  // Later dates to the right
  x.reverse();
  y.reverse();

  let data = [
    {
      x: x,
      y: y,
      type: "scatter",
    },
  ];

  let layout = {
    xaxis: {
      title: "Date",
    },
    yaxis: {
      title: "No. of Cases",
    },
    margin: { t: 50 },
  };

  Plotly.newPlot(graphEl, data, layout);
}
