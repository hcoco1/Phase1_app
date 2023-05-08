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
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete";
      //Eventlistener delete button
      deleteBtn.addEventListener("click", deleteCountryCard);
    
      const countryCard = document.createElement("li");
      countryCard.className = "card";
      const divCard = document.createElement("div");
      divCard.className = "cardContent";
      const countryTitle = document.createElement("h2");
      countryTitle.textContent = countries[key].country;
      const countryImage = document.createElement("img");
      countryImage.className = "country-avatar";

      const countryPhoto = document.createElement("img");
      countryPhoto.className = "country-avatar";

      countryImage.src = countries[key].flagUrl;
      const populationTitle = document.createElement("h5");
      populationTitle.textContent = `According to 2023 data, the total population of ${
        countries[key].country
      } is ${countries[key].population.toLocaleString()} inhabitants. ${
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
      countryCard.appendChild(deleteBtn);
      divCard.appendChild(countryTitle);
      divCard.appendChild(countryImage);
      divCard.appendChild(populationTitle);
      const ulFinalMessage = document.createElement("ul");
      ulFinalMessage.className = "ul-final-Message";
      const liFinalMessage = document.createElement("li");
      liFinalMessage.className = "li-final-Message";
      liFinalMessage.textContent = ` ${countries[key].message}`; 
      const pFinalMessage = document.createElement("p");
      pFinalMessage.className = "p-final-Message";
      const commenForm = document.createElement("form");
      commenForm.action = "#";
      commenForm.method = "PATCH";
      
      //commenForm.className = "comments-form";
      //console.log(commenForm)
      const textarea = document.createElement("textarea");
      textarea.name = "message"; // set the name attribute
      textarea.rows = 4;
      textarea.placeholder = "Type your message here...";
      textarea.className = "comment-area";
      textarea.rows = 1;
      const br = document.createElement("br");
      const submitBtn = document.createElement("input");
      submitBtn.type = "submit";
      submitBtn.value = "Leave your Message";
      submitBtn.name = "submit";
      submitBtn.id = "submitcomments";
      divCard.appendChild(commenForm);
      divCard.appendChild(pFinalMessage);
      divCard.appendChild(ulFinalMessage);
      ulFinalMessage.appendChild(liFinalMessage);
      commenForm.appendChild(textarea);
      commenForm.appendChild(submitBtn);

      // Add an event listener to leave a message
      commenForm.addEventListener("submit", (e) => {
        // prevent default form submission behavior
        e.preventDefault()
        
        const id = countries[key].id;
        const url = `http://localhost:3000/countries/${id}`;
      
        fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            
            message: textarea.value,
          }),
        })
        .then((res) => res.json())
        .then((newMessage) => {
          e.stopPropagation()
          
          console.log(newMessage);
        }) 
        .catch((error) => {
          console.error("Error:", error);
          
       return false;
        }); 
    
      });  

      function deleteCountryCard(e) {
        e.preventDefault()
        e.target.parentNode.remove();
        fetch(`http://localhost:3000/countries/${countries[key].id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((country) => console.log(country));
      }
    }
  }

  //ADD NEW COUNTRY

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    

/*     console.log(addFlagForm); //is working
    console.log(addFlagForm[0].value); //is working
    console.log(addFlagForm[1].value); //is working
    console.log(addFlagForm[2].value); //is working
    console.log(addFlagForm[3].value); //is working
    console.log(addFlagForm[4].value); //is working */

    //An evenlistener to add a new country
    addFlagForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch("http://localhost:3000/countries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          country: addFlagForm[1].value,
          area_in_Square_Kilometers: addFlagForm[4].value,
          population: addFlagForm[3].value,
          flagUrl: addFlagForm[2].value,
          message: [],
        }),
      });
    });
  });

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

    // Sort the array of countries by the selected property.
    const newvar = dataArray.sort((b, a) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    }); //console.log(arrayCountries)
    // Display the sorted results.

    handleData(newvar);
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
});

/* const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  if (event.defaultPrevented) {
    console.log('The default behavior of the submit event was prevented');
  } else {
    console.log('The default behavior of the submit event was not prevented');
  }
}); */