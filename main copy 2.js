document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/countries")
    .then((res) => res.json())
    .then((countries) => handleData(countries));

  const output = document.querySelector("#output");
  
  const filterForm = document.querySelector("#create-task-form");
  const addFlagForm = document.querySelector("#add-country-flag");
 

  let inputBoxSearch = document.querySelector("#new-task-description");
  
  let sortForm = document.querySelector("#dropdown");

  let arrayCountries = [];

  function handleData(countries) {
    output.innerHTML = "";
    // for...in loop
    for (const key in countries) {
      arrayCountries.push(countries[key]);
      let countryCard = document.createElement("li");
      countryCard.className = "card";
      let divCard = document.createElement("div");
      divCard.className = "cardContent";
      let countryTitle = document.createElement("h2");
      countryTitle.textContent = countries[key].country;
      let countryImage = document.createElement("img");
      countryImage.className = "country-avatar";
      countryImage.src = countries[key].flagUrl;
      let populationTitle = document.createElement("h4");
      populationTitle.textContent = `Population: ${countries[key].Population}`;
      let malePopu = document.createElement("h5");
      malePopu.textContent = `Male Population: ${countries[key].male_population}`;
      let femaPopu = document.createElement("h5");
      femaPopu.textContent = `Female Population: ${countries[key].female_population}`;
      document.querySelector("#output").appendChild(countryCard);
      countryCard.appendChild(divCard);
      divCard.appendChild(countryTitle);
      divCard.appendChild(countryImage);
      divCard.appendChild(populationTitle);
      divCard.appendChild(malePopu);
      divCard.appendChild(femaPopu);

      countryImage.addEventListener("click", (e) => {
     
        let inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        countryCard.appendChild(inputContainer);

        const submitInput = document.createElement("input");

        const label = document.createElement("label");
        const input = document.createElement("input");

        input.type = "text";
        input.placeholder = "Leave a message";
        submitInput.type = "submit";
        submitInput.value = "ClickMe";

        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        inputContainer.appendChild(submitInput);

        submitInput.addEventListener("submit", (e) => {
          e.preventDefault();

          const comment = document.createElement("h6");
          comment.innerText = e.input.value;
          inputContainer.appendChild(comment);
        });
      });

      //console.log(countries[key].country);
    }
  }

  //FILTER A COUNTRY
  filterForm.addEventListener("click", (e) => {
    output.innerHTML = "";
    e.preventDefault();

    let itemText = inputBoxSearch.value;
    arrayCountries.forEach((o) => {
      if (o.country.toLowerCase() === itemText.toLowerCase()) {
        output.innerHTML = "";

        let fcountryCard = document.createElement("li");
        fcountryCard.className = "card";
        let fdivCard = document.createElement("div");
        fdivCard.className = "cardContent";
        let fcountryTitle = document.createElement("h2");
        fcountryTitle.textContent = o.country;
        let fcountryImage = document.createElement("img");
        fcountryImage.className = "country-avatar";
        fcountryImage.src = o.flagUrl;
        let fpopulationTitle = document.createElement("h4");
        fpopulationTitle.textContent = `Population: ${o.Population}`;
        let fmalePopu = document.createElement("h5");
        fmalePopu.textContent = `Male Population: ${o.male_population}`;
        let ffemaPopu = document.createElement("h5");
        ffemaPopu.textContent = `Female Population: ${o.female_population}`;
        document.querySelector("#output").appendChild(fcountryCard);
        fcountryCard.appendChild(fdivCard);
        fdivCard.appendChild(fcountryTitle);
        fdivCard.appendChild(fcountryImage);
        fdivCard.appendChild(fpopulationTitle);
        fdivCard.appendChild(fmalePopu);
        fdivCard.appendChild(ffemaPopu);
      }
    });
  });

  //SORT COUNTRIES
  sortForm.addEventListener("change", (e) => {
    e.preventDefault();
    arrayCountries.forEach((o) => {
      if (e.target.value === "asc") {
        arrayCountries.sort((a, b) => a.country.localeCompare(b.country));
      } else if (e.target.value === "desc") {
        arrayCountries.sort((a, b) => b.country.localeCompare(a.country));
      }
    });

    handleData(arrayCountries);
    console.log(arrayCountries);
  });

  //ADD FLAGS

  let submitBtn = document.getElementsByName("submit")[0];

  let nameInput = document.getElementsByName("name")[0];

  let imageInput = document.getElementsByName("image")[0];

  
  submitBtn.addEventListener("submit", (e) => {
    console.log(e)
    e.preventDefault()
    fetch(`http://localhost:3000/countries/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        flagUrl: imageInput.value,
      }),
    });




   

  });
});
