// Unable to import this in main file
var getRobots = async function () {
  return fetch('https://60c8ed887dafc90017ffbd56.mockapi.io/robots')
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      return data;
    });
};
1;

export default getRobots;
