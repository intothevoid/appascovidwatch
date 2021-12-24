// base url
let baseURL = `https://appascovidwatch.herokuapp.com/numbers`;

// For local testing
// let baseURL = `http://127.0.0.1:8000/numbers`;

// elements
let saEl = document.getElementById("saBtn");
let waEl = document.getElementById("waBtn");
let vicEl = document.getElementById("vicBtn");
let nswEl = document.getElementById("nswBtn");
let tasEl = document.getElementById("tasBtn");
let ntEl = document.getElementById("ntBtn");
let actEl = document.getElementById("actBtn");

let numbersTableEl = document.getElementById("numbersTable");
let numbersTableBodyEl = document.getElementById("numbersTableBody");
let dateLabelEl = document.getElementById("dateLabel");
let numbersLabelEl = document.getElementById("numbersLabel");
let stateNameEl = document.getElementById("stateName");
let graphEl = document.getElementById("graphtest");

document.addEventListener("DOMContentLoaded", function () {
  // register button clicks
  registerListeners();

  // load SA values by default
  loadSANumbers();
});

function registerListeners() {
  saEl.addEventListener("click", loadSANumbers);
  waEl.addEventListener("click", loadWANumbers);
  vicEl.addEventListener("click", loadVICNumbers);
  nswEl.addEventListener("click", loadNSWNumbers);
  tasEl.addEventListener("click", loadTASNumbers);
  ntEl.addEventListener("click", loadNTNumbers);
  actEl.addEventListener("click", loadACTNumbers);
}

async function loadSANumbers() {
  console.log("SA was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("sa");
  populateNumbersBarGraph(respObject);
  populateNumbersTable(respObject);
}

async function loadWANumbers() {
  console.log("WA was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("wa");
  populateNumbersBarGraph(respObject);
  populateNumbersTable(respObject);
}

async function loadVICNumbers() {
  console.log("VIC was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("vic");
  populateNumbersBarGraph(respObject);
  populateNumbersTable(respObject);
}

async function loadNSWNumbers() {
  console.log("NSW was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("nsw");
  populateNumbersBarGraph(respObject);
  populateNumbersTable(respObject);
}

async function loadTASNumbers() {
  console.log("TAS was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("tas");
  populateNumbersBarGraph(respObject);
  populateNumbersTable(respObject);
}

async function loadNTNumbers() {
  console.log("NT was clicked!");
  stateNameEl.innerText = "Appa thinking...";
  respObject = await loadNumbers("nt");
  populateNumbersBarGraph(respObject);
  populateNumbersTable(respObject);
}

async function loadACTNumbers() {
  console.log("ACT was clicked!");
  respObject = await loadNumbers("act");
  populateNumbersBarGraph(respObject);
  populateNumbersTable(respObject);
}

async function loadNumbers(state) {
  const options = {
    method: "GET",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  };

  // Start by clearing existing table's body
  clearTableBody();

  retVal = await fetch(`${baseURL}/${state}`, options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => console.warn(error));

  return retVal;
}

function clearTableBody() {
  // clear table body
  numbersTableBodyEl.innerText = "";
  numbersTableBodyEl.innerHTML = "";
}

function populateNumbersTable(respObject) {
  // set the state name from response
  const stateName = respObject["state"];
  stateNameEl.innerText = stateName;
  dateLabelEl.innerText = "Date";
  numbersLabelEl.innerText = "New Cases";

  const payload = respObject["payload"];

  for (key in payload) {
    const val = payload[key];
    let row = document.createElement("tr");
    let dateEl = document.createElement("td");
    let numberEl = document.createElement("td");
    dateEl.innerText = key;
    numberEl.innerText = payload[key];

    row.append(dateEl);
    row.append(numberEl);
    numbersTableBodyEl.appendChild(row);
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
