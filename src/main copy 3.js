const init = () => {
  const output = document.querySelector("#output");
  const filterForm = document.querySelector("#create-task-form");
  const addFlagForm = document.querySelector("#add-country-flag");
  const inputBoxSearch = document.querySelector("#new-task-description");
  const sortForm = document.querySelector("#dropdown");
  const arrayCountries = [];

 
  const displayData = (countries) => {
    output.innerHTML = "";
    for (const country of countries) {
      arrayCountries.push(country);
      const countryCard = document.createElement("li");
      countryCard.className = "card";
      const divCard = document.createElement("div");
      divCard.className = "cardContent";
      const countryTitle = document.createElement("h2");
      countryTitle.textContent = country.country;
      const countryImage = document.createElement("img");
      countryImage.className = "country-avatar";
      countryImage.src = country.flagUrl;
      const populationTitle = document.createElement("h4");
      populationTitle.textContent = `population: ${country.population}`;
      const malePopu = document.createElement("h5");
      malePopu.textContent = `Male population: ${country.male_population}`;
      const femaPopu = document.createElement("h5");
      femaPopu.textContent = `Female population: ${country.female_population}`;
      output.appendChild(countryCard);
      countryCard.appendChild(divCard);
      divCard.appendChild(countryTitle);
      divCard.appendChild(countryImage);
      divCard.appendChild(populationTitle);
      divCard.appendChild(malePopu);
      divCard.appendChild(femaPopu);
      //Event listener to show a message
      countryImage.addEventListener("click", (e) => {
        const inputContainer = document.createElement("div");
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
    

  };

  const filteredCountries = (country) => {
    filterForm.addEventListener("click", (e) => {
      //output.innerHTML = "";
      e.preventDefault();
  
      let itemText = inputBoxSearch.value;
      arrayCountries.forEach((o) => {
        if (o.country.toLowerCase() === itemText.toLowerCase()) {
          output.innerHTML = "";
          displayData(o)

        }
      });
    });
}
  fetch("http://localhost:3000/countries")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(displayData)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

document.addEventListener("DOMContentLoaded", init);
