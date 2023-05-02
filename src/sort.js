document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/countries")
    .then((res) => res.json())
    .then((countries) => handleData(countries));

  const output = document.querySelector("#output");
  const filterForm = document.querySelector("#create-task-form");
  const addFlagForm = document.querySelector("#add-country-flag");
  const inputBoxSearch = document.querySelector("#new-task-description");
  const sortByName = document.querySelector("#byname");
  const sortByPopu = document.querySelector("#bypopu");
  const arrayCountries = [];

  function handleData(countries) {
    output.innerHTML = "";
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
      populationTitle.textContent = `population: ${countries[key].population}`;
      let malePopu = document.createElement("h5");
      malePopu.textContent = `Male population: ${countries[key].male_population}`;
      let femaPopu = document.createElement("h5");
      femaPopu.textContent = `Female population: ${countries[key].female_population}`;
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
        handleData([o]);
      }
    });
  });

  //SORT COUNTRIES
  sortByName.addEventListener("click", (e) => {
    e.preventDefault();
    output.innerHTML = "";
    arrayCountries.sort(function (x, y) {
      let a = x.country.toUpperCase(),
        b = y.country.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    });
    handleData(arrayCountries);
    console.table(arrayCountries);
  });

  sortByPopu.addEventListener("click", (e) => {
    e.preventDefault();
    output.innerHTML = "";
    arrayCountries.sort(function (x, y) {
      return x.population - y.population;
    });
    handleData(arrayCountries);
    console.table(arrayCountries);
  });

  //ADD FLAGS
  let submitBtn = document.getElementsByName("submit")[0];
  let nameInput = document.getElementsByName("name")[0];
  let imageInput = document.getElementsByName("image")[0];

  submitBtn.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
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
