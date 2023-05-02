document.addEventListener("DOMContentLoaded", () => {

  const themeSelect = document.querySelector('#theme-select');

  function setTheme(theme) {
    document.body.className = theme;
  }
  
  themeSelect.addEventListener('change', () => {
    if (themeSelect.value === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });


  //get all countries
  fetch("http://localhost:3000/countries")
    .then((res) => res.json())
    .then((countries) => handleData(countries));

  //declare all variables.
  const output = document.querySelector("#output");
  const filterForm = document.querySelector("#create-task-form");
  const addFlagForm = document.querySelector("#add-country-flag");
  const inputBoxSearch = document.querySelector("#new-task-description");
  const sortBy = document.getElementById("sort-by");
  const countryList = document.getElementById("country-list");
  const arrayCountries = [];
  
 

  // handle and display countries
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
      let populationTitle = document.createElement("h5");
      populationTitle.textContent = `Population: ${countries[
        key
      ].population.toLocaleString()} habitants`;
      let areaTitle = document.createElement("h5");
      areaTitle.textContent = `Area: ${countries[
        key
      ].area_in_Square_Kilometers.toLocaleString()} square kilometers`;
      let malePopu = document.createElement("h5");
      malePopu.textContent = `Male Population: ${countries[
        key
      ].male_population.toLocaleString()} men `;
      let femaPopu = document.createElement("h5");
      femaPopu.textContent = `Female Population: ${countries[
        key
      ].female_population.toLocaleString()} women`;
      let commenbox = document.createElement("h5");
      document.querySelector("#output").appendChild(countryCard);
      countryCard.appendChild(divCard);
      divCard.appendChild(countryTitle);
      divCard.appendChild(countryImage);
      divCard.appendChild(populationTitle);
      divCard.appendChild(malePopu);
      divCard.appendChild(femaPopu);
      divCard.appendChild(areaTitle);
      divCard.appendChild(commenbox);

      //eventlistener (click on a flag) to show the input to leave a message on the countryCard
      countryImage.addEventListener("click", (e) => {
        let inputContainer = document.createElement("div");
        inputContainer.className = "input-container";
        countryCard.appendChild(inputContainer);
        const submitInput = document.createElement("input");
        const commentForm = document.createElement("form");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Leave a message";
        input.className = "vcard";
        submitInput.type = "submit";
        submitInput.value = "ClickMe";
        submitInput.className = "vcard";
        divCard.appendChild(inputContainer);
        inputContainer.appendChild(commentForm);
        commentForm.appendChild(input);
        commentForm.appendChild(submitInput);
        console.log(commentForm);
        console.log(submitInput);

        //eventlistener (nested?) to leave a message on the countryCard
        //ISSUES: the first message disapear if you leave a second message.
        submitInput.addEventListener("click", (e) => {
          e.preventDefault();
          console.log(input.value);
          commenbox.className = "box";
          commenbox.textContent = input.value;
          commentForm.style.display = "none";
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
  //ISSUES: THIS FUNCTION CREATE A NEW ARRAY EVERY CLICK UNTIL THE BROWSER CRASH (AND SHOW REPEATED COUNTRYCARDS)
  // CODE 80% CHAT GPT, 20% IVAN
  // Sorts an array of country objects by the given property and displays the sorted results.
  function sortCountries(property, dataArray) {
    // Clear the previous results.
    document.querySelector("#output").innerHTML = "";

    // Sort the array of countries by the selected property.
    dataArray.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });

    // Display the sorted results.
    handleData(dataArray);
  }

  // Add an event listener to the "change" event of the sorting dropdown.
  sortBy.addEventListener("change", (event) => {
    // Get the selected property from the dropdown.
    const selectedProperty = event.target.value;

    // Ensure that the selected property is a valid property of a country object.
    const validProperties = Object.keys(arrayCountries[0]);
    if (!validProperties.includes(selectedProperty)) {
      console.error(`Invalid property selected: ${selectedProperty}`);
      return;
    }

    // Sort the countries by the selected property and display the sorted results.
    sortCountries(selectedProperty, arrayCountries);
  });

  //ADD FLAGS
  //ISSUES: I DONT HAVE IDEA  HOW TO ADD A FLAG TO WHATEVER COUNTRY
  //LOOKS LIKE THE COUNTRIES ARRAY IS NOT AVALIABLE IN THIS SCOPE. SHOULD I CREATE A OUTER SCOPE VARIABLE? ASK INSTRUCTORS
  //THE VIDEO ON CANVAS(PATCH IS NOT HELPING ME, IS DIFFERENT CONTEXT.)
  let submitBtn = document.getElementsByName("submit")[0];
  let nameInput = document.getElementsByName("name")[0];
  let imageInput = document.getElementsByName("image")[0];

  submitBtn.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
    fetch(`http://localhost:3000/countries/${arrayCountries[id]}`, {
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
