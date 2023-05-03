document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.querySelector("#theme-select");

  function setTheme(theme) {
    document.body.className = theme;
  }

  themeSelect.addEventListener("change", () => {
    if (themeSelect.value === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });

  //get all countries
  fetch("http://localhost:3000/countries")
    .then((res) => res.json())
    .then((countries) => {
      countries.forEach((country) => {
        arrayCountries.push(country);
      });
      handleData(countries);
      //console.log(arrayCountries)
    });

  //declare all variables.
  const output = document.querySelector("#output");
  const flagURL = document.querySelector(".input-text");
  const filterForm = document.querySelector("#create-task-form");
  const addFlagForm = document.querySelector("form");
  const inputBoxSearch = document.querySelector("#new-task-description");
  const sortBy = document.getElementById("sort-by");
  const arrayCountries = [];

  // handle and display countries
  function handleData(countries) {
    output.innerHTML = "";
    for (const key in countries) {
      const countryCard = document.createElement("li");
      countryCard.className = "card";
      const divCard = document.createElement("div");
      divCard.className = "cardContent";
      const countryTitle = document.createElement("h2");
      countryTitle.textContent = countries[key].country;
      const countryImage = document.createElement("img");
      countryImage.className = "country-avatar";
      //console.log(countries[key].flagUrl)
      countryImage.src = countries[key].flagUrl;
      const populationTitle = document.createElement("h5");
      populationTitle.textContent = `According to 2023 data, the total population of ${
        countries[key].country
      } is ${countries[
        key
      ].population.toLocaleString()} inhabitants, with ${countries[
        key
      ].male_population.toLocaleString()} men and ${countries[
        key
      ].female_population.toLocaleString()} women. ${
        countries[key].country
      } has an area of ${countries[
        key
      ].area_in_Square_Kilometers.toLocaleString()} square kilometers.
      `;

      const ulComment = document.createElement("ul");
      ulComment.className = "comments";
      const liComment = document.createElement("li");
      liComment.className = "comments";
      const titleComment = document.createElement("h4");
      titleComment.className = "title-comments";
      document.querySelector("#output").appendChild(countryCard);
      countryCard.appendChild(divCard);
      divCard.appendChild(countryTitle);
      divCard.appendChild(countryImage);
      divCard.appendChild(populationTitle);
      const ulFinalMessage = document.createElement("ul");
      ulFinalMessage.className = "ul-final-Message";
      const liFinalMessage = document.createElement("li");
      liFinalMessage.className = "li-final-Message";
      const pFinalMessage = document.createElement("p");
      pFinalMessage.className = "p-final-Message";
      const commenForm = document.createElement("form");
      commenForm.className = "comments-form";
      const textarea = document.createElement("textarea");
      textarea.name = "message"; // set the name attribute
      textarea.rows = 4;
      textarea.placeholder = "Type your message here...";
      textarea.className = "comment-area";
      textarea.rows = 1;
      const br = document.createElement("br");
      const submitBtn = document.createElement("input");
      submitBtn.type = "submit";
      submitBtn.value = "Submit";
      submitBtn.name = "submitInfo";
      submitBtn.id = "submitcomments";
      divCard.appendChild(commenForm);
      divCard.appendChild(pFinalMessage);
      divCard.appendChild(ulFinalMessage);
      ulFinalMessage.appendChild(liFinalMessage);
      commenForm.appendChild(textarea);
      commenForm.appendChild(submitBtn);
      // Add an event listener
      commenForm.addEventListener("submit", (e) => {
        e.preventDefault();
        arrayCommnets = []; //array to store the messages
        console.log(e);
        const message = textarea.value;
        console.log(message);
        pFinalMessage.textContent = `User Messages:`;
        liFinalMessage.style.listStyle = "disc";
        liFinalMessage.innerText = `${textarea.value}`;
        arrayCommnets.push(textarea.value);
        console.log(arrayCommnets);
        arrayCommnets.forEach((comment) => {
          console.log(arrayCountries.id)


        })
      });
    }
  }

  //FILTER COUNTRIES
  // Filter an array of country objects by the given property and displays the sorted results.
  function filterCountry(property, dattaArray) {
    // Clear the previous results.
    output.innerHTML = "";
    //console.log(output);
    let itemText = inputBoxSearch.value;
    // filter the array of countries by the selected property.
    dattaArray.forEach((o) => {
      if (o.country.toLowerCase() === itemText.toLowerCase()) {
        // Display the filtered results.
        handleData([o]);
      }
    });
  }

  // Add an event listener to the "submit" event of the sorting dropdown.
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the selected property from the dropdown.
    const selectedProperty = event.target.value;

    // Sort the countries by the selected property and display the sorted results.
    filterCountry(selectedProperty, arrayCountries);
  });

  //SORT COUNTRIES
  //ISSUES: THIS FUNCTION CREATE A NEW ARRAY EVERY CLICK UNTIL THE BROWSER CRASH (AND SHOW REPEATED COUNTRYCARDS)

  // Sorts an array of country objects by the given property and displays the sorted results.
  function sortCountries(property, dataArray) {
    // Clear the previous results.

    console.log(dataArray);
    // Sort the array of countries by the selected property.
    const newvar = dataArray.sort((b, a) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    }); //console.log(arrayCountries)
    // Display the sorted results.

    console.log(dataArray);
    handleData(newvar);
    console.log(dataArray);
  }

  // Add an event listener to the "change" event of the sorting dropdown.
  sortBy.addEventListener("change", (event) => {
    output.childNodes.forEach((li) => {
      //console.log(li);
      li.remove();
    });

    // Get the selected property from the dropdown.
    const selectedProperty = event.target.value;

    // Sort the countries by the selected property and display the sorted results.
    sortCountries(selectedProperty, arrayCountries);
  });

  //ADD FLAGS

  function addFlags() {
    console.log(arrayCountries.id); //UNDEFINED WHY??
  }

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(addFlagForm); //is working
    console.log(addFlagForm[0].value); //is working
    console.log(addFlagForm[1].value); //is working
    console.log(addFlagForm[2].value); //is working
    addFlags();
  });
});
