// DARK MODE
const setTheme = (theme) => (document.documentElement.className = theme);
document
  .getElementById("theme-select")
  .addEventListener("change", function () {
    setTheme(this.value);
  });

//DECLARE VARIABLES
let submitBtn = document.getElementById("create-task-form")[1]
//console.log(submitBtn)
let output = document.querySelector("#output");
let url = "http://localhost:3000/countries";
let fetchBtn = document.querySelector("#btn");

console.log(url)


//EVENT LISTENERS

  fetchBtn.addEventListener("click", getData);
  //submitBtn.addEventListener("", filterData);


 
const arrayCountries = [];
// FETCH ALL COUNTRIES
function getData() {
  //console.log("clicked");
  output.innerHTML = ""; //clearing container
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
        data.forEach(function (val) {
          
          arrayCountries.push(val)
          //console.log(arrayCountries)
        let countryCard = document.createElement("li");
        countryCard.className = "card";
        countryCard.innerHTML = `
                          <div class="cardContent">
                          <h2>${val["country"]}</h2>
                          <img class="country-avatar" src="${val["flagUrl"]}">
                          <h4>population: ${val["population"]}.</h4>
                          <h5>Male population: ${val["male_population"]}.</h5>
                          <h5>Female population: ${val["female_population"]}.</h5>
                          </div>
                          `;
        document.querySelector("#output").appendChild(countryCard);
      });
    });
   
};


// FILTER COUNTRIES BY NAME (get only one result)

let dropDown = document.querySelector("#country-dropdown")

