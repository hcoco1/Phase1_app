document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/countries")
    .then((res) => res.json())
    .then((countries) => handleData(countries));

  let output = document.querySelector("#output");
  const form = document.querySelector("form");
  let inputBoxSearch = document.querySelector("input");
  let dropDown = document.querySelector("#country-dropdown");
  
  let arrayCountries = [];

  function handleData(countries) {
    output.innerHTML = "";
    // for...in loop
    for (const key in countries) {
      arrayCountries.push(countries[key]);
      let countryCard = document.createElement("li");
      countryCard.className = "card";
      countryCard.innerHTML = `
            <div class="cardContent">
            <h2>${countries[key].country}</h2>
            <img class="country-avatar" src="${countries[key].flagUrl}">
            <h4>population: ${countries[key].population}.</h4>
            <h5>Male population: ${countries[key].male_population}.</h5>
            <h5>Female population: ${countries[key].female_population}.</h5>
            </div>`;
            
      document.querySelector("#output").appendChild(countryCard);
      //console.log(countries[key].country);
    }
  }

  //FILTER A COUNTRY
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let itemText = inputBoxSearch.value;
    arrayCountries.forEach((o) => {
      if (o.country === itemText) {
        //console.log(o);
      }
    });
    
  });

  //SORT COUNTRIES
  dropDown.addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.value === "asc") {
      arrayCountries.sort((a, b) => a.country.localeCompare(b.country));
    } else if (e.target.value === "desc") {
      arrayCountries.sort((a, b) => b.country.localeCompare(a.country));
    }
    console.log(arrayCountries);
   
    

  });

