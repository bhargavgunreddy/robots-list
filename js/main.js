//
// Place any custom JS here
//
var getRobots = async function () {
  return fetch('https://60c8ed887dafc90017ffbd56.mockapi.io/robots')
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      return data;
    });
};

// Fetch data

var robotsListFromAPI = await getRobots();
var searchId = '';

// Add data to the table

console.log(robotsListFromAPI);

var buildTable = function (robotsList) {
  var tableElement = document.getElementById('data');
  var tableRows = '';
  if (robotsList === null || robotsList.length === 0) {
    tableRows = '<tr colspan="3"> No Rows to display</tr>';
  } else {
    robotsList.forEach((robot) => {
      // console.log(robot);
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
var filterTable = function (robotsListFromAPI) {
  // buildTable
  buildTable(robotsListFromAPI);
};

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

var updateSearchValue = function (event) {
  searchId = event.target.value;
};

var sortTable = function (event) {
  console.log(event);
  let columnHeaderValue = event.target.getAttribute('name');
  robotsListFromAPI.sort((a, b) => a[columnHeaderValue] - b[columnHeaderValue]);
  filterTable(robotsListFromAPI);
};

document
  .getElementById('search-field')
  .addEventListener('input', updateSearchValue);

document.getElementById('search').addEventListener('click', searchFunction);

var headers = document.getElementsByClassName('table-header');
for (let header of headers) {
  header.addEventListener('click', sortTable);
}

filterTable(robotsListFromAPI);
// alert(robotsList);
