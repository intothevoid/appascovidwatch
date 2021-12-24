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

// numbers table
// let numbersTableEl = document.getElementById("numbersTable");
// let numbersTableBodyEl = document.getElementById("numbersTableBody");
// let dateLabelEl = document.getElementById("dateLabel");
// let numbersLabelEl = document.getElementById("numbersLabel");

// summary table
let summaryTableEl = document.getElementById("summaryTable");
let summaryTableBodyEl = document.getElementById("summaryTableBody");
let categoryLabelEl = document.getElementById("categoryLabel");
let totalLabelEl = document.getElementById("totalLabel");
let newLabelEl = document.getElementById("newLabel");

// other elements
let stateNameEl = document.getElementById("stateName");
let graphEl = document.getElementById("graphtest");

document.addEventListener("DOMContentLoaded", function () {
  // register button clicks
  registerListeners();

  // load SA values by default
  loadSADetails();
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

async function loadSADetails() {
  console.log("SA was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  let numRespObj = await loadNumbers("sa");
  let sumRespObj = await loadSummary("sa");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(numRespObj);
  // populateNumbersTable(numRespObj);
}

async function loadWADetails() {
  console.log("WA was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("wa");
  let sumRespObj = await loadSummary("wa");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
  // populateNumbersTable(respObject);
}

async function loadVICDetails() {
  console.log("VIC was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("vic");
  let sumRespObj = await loadSummary("vic");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
  // populateNumbersTable(respObject);
}

async function loadNSWDetails() {
  console.log("NSW was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("nsw");
  let sumRespObj = await loadSummary("nsw");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
  // populateNumbersTable(respObject);
}

async function loadTASDetails() {
  console.log("TAS was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("tas");
  let sumRespObj = await loadSummary("tas");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
  // populateNumbersTable(respObject);
}

async function loadNTDetails() {
  console.log("NT was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("nt");
  let sumRespObj = await loadSummary("nt");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
  // populateNumbersTable(respObject);
}

async function loadACTDetails() {
  console.log("ACT was clicked!");
  respObject = await loadNumbers("act");
  let sumRespObj = await loadSummary("act");
  populateSummaryTable(sumRespObj);
  populateNumbersBarGraph(respObject);
  // populateNumbersTable(respObject);
}

async function loadNumbers(state) {
  const options = {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  };

  // Start by clearing existing table's body
  // clearNumbersTableBody();
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

async function loadSummary(state) {
  const options = {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  };

  // Start by clearing existing table's body
  clearSummaryTableBody();

  retVal = await fetch(`${summaryBaseURL}/${state}`, options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => console.warn(error));

  return retVal;
}

// function clearNumbersTableBody() {
//   // clear table body
//   numbersTableBodyEl.innerText = "";
//   numbersTableBodyEl.innerHTML = "";
// }

function clearSummaryTableBody() {
  // clear table body
  summaryTableBodyEl.innerText = "";
  summaryTableBodyEl.innerHTML = "";
}

function clearNumbersGraph() {
  // clear table body
  graphEl.innerText = "";
  graphEl.innerHTML = "";
}

// function populateNumbersTable(respObject) {
//   // set the state name from response
//   const stateName = respObject["state"];
//   stateNameEl.innerText = stateName;
//   dateLabelEl.innerText = "Date";
//   numbersLabelEl.innerText = "New Cases";

//   const payload = respObject["payload"];

//   for (key in payload) {
//     const val = payload[key];
//     let row = document.createElement("tr");
//     let dateEl = document.createElement("td");
//     let numberEl = document.createElement("td");
//     dateEl.innerText = key;
//     numberEl.innerText = payload[key];

//     row.append(dateEl);
//     row.append(numberEl);
//     numbersTableBodyEl.appendChild(row);
//   }
// }

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
