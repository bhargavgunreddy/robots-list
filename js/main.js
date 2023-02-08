//
// Function to make fetch call to get list of robots
// unable to import this from api.js running into errors so adding it here
var getRobots = async function () {
  return fetch('https://60c8ed887dafc90017ffbd56.mockapi.io/robots')
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
};

// Fetch data

var robotsListFromAPI = await getRobots();
// keep track of search value
var searchId = '';

// Add data to the table
// Loop through data and add rows to the table

var buildTable = function (robotsList) {
  var tableElement = document.getElementById('data');
  var robotsCount = document.getElementById('robots-count');
  robotsCount.innerText = robotsList.length;
  var tableRows = '';
  if (robotsList === null || robotsList.length === 0) {
    tableRows = '<tr colspan="3"> No Rows to display</tr>';
  } else {
    robotsList.forEach((robot) => {
      tableRows += '<tr>';
      tableRows +=
        '<td class="table-columns" name=" id">' + robot.robotId + '</td>';
      tableRows +=
        '<td class="table-columns" name="batteryLevel">' +
        robot.batteryLevel +
        '</td>';
      tableRows += '<td class="table-columns" name="x">' + robot.x + '</td>';
      tableRows += '<td class="table-columns" name="y">' + robot.y + '</td>';
    });
  }
  tableElement.innerHTML = tableRows;
};

// Populate the grid with filtered results
var filterTable = function (robotsListFromAPI) {
  // buildTable
  buildTable(robotsListFromAPI);
};

// When search button is clicked
var searchFunction = function (event) {
  event.preventDefault();
  // Get search id
  // If search field is empty
  var filteredList = robotsListFromAPI;
  if (searchId !== '' && !isNaN(searchId)) {
    filteredList = robotsListFromAPI.filter(function (robot) {
      return robot.robotId === searchId;
    });
  }
  // reset the rows in the table
  filterTable(filteredList);
};

// To store search value
var updateSearchValue = function (event) {
  searchId = event.target.value;
};

// To sort the table in ascending order
var sortTable = function (event) {
  let columnHeaderValue = event.target.getAttribute('name');
  robotsListFromAPI.sort((a, b) => a[columnHeaderValue] - b[columnHeaderValue]);
  filterTable(robotsListFromAPI);
};

// Attach event listeners
document
  .getElementById('search-field')
  .addEventListener('input', updateSearchValue);

document.getElementById('search').addEventListener('click', searchFunction);

var headers = document.getElementsByClassName('table-header');
for (let header of headers) {
  header.addEventListener('click', sortTable);
}

// Render the table with data
filterTable(robotsListFromAPI);
