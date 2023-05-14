document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.querySelector("#theme-select");

  themeSelect.addEventListener("change", () => {
    if (themeSelect.value === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });

  function setTheme(theme) {
    document.body.className = theme;
  }

  //declare all variables.
  const arrayCountries = [];
  const allBtn = document.querySelector("#allButton");
  const output = document.querySelector("#output"); // ul list container, parent of li class="card"
  const filterForm = document.querySelector("#create-task-form");
  const addcountryForm = document.querySelector("#add-country");
  const inputBoxSearch = document.querySelector("#new-task-description");
  const sortBy = document.getElementById("sort-by");
  const successMessage = document.querySelector("#alert");

  allBtn.addEventListener("click", () => {
    handleData(arrayCountries);
  });

  //get all countries
  fetch("https://world-population-dashboard.onrender.com/countries")
    .then((res) => res.json())
    .then((countries) => {
      countries.forEach((country) => {
        arrayCountries.push(country);
      });
      handleData(countries);
      
    });

  // handle and display countries
  function handleData(countries) {
    //--------------------------------------------------------------------------------------------------------------------
    output.innerHTML = "";
    for (const key in countries) {
      //Delete button to get rid of country cards (one by one)
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete";

      //Country Cards structure
      const countryCard = document.createElement("li"); //li element that belong to (ul) output. Parent of div class="cardContain".
      countryCard.className = "card";
      const divCard = document.createElement("div"); // div that contains all the information about countries.Parent of h2, img, and h5. class= "cardContent"
      divCard.className = "cardContent";
      const countryTitle = document.createElement("h2"); //child of divCard (class= "cardContent")
      countryTitle.textContent = countries[key].country;
      const countryImage = document.createElement("img"); //child of divCard (class= "cardContent")
      countryImage.className = "country-avatar";
      countryImage.src = countries[key].flagUrl;
      const populationTitle = document.createElement("h5"); //child of divCard. Main text container

      //Main text inside card.
      populationTitle.textContent = `According to 2023 data, the total population of ${
        countries[key].country
      } is ${countries[key].population.toLocaleString()} inhabitants. ${
        countries[key].country
      } has an area of ${countries[
        key
      ].area_in_Square_Kilometers.toLocaleString()} square kilometers.
      `;

      //CREATE UL ELEMTENT
      let ulFinalMessage = document.createElement("ul");
      ulFinalMessage.className = "ul-final-Message";

      //form to leave messages
      const commenForm = document.createElement("form");
      commenForm.action = "#";
      commenForm.method = "PATCH";

      //text box input
      const textarea = document.createElement("textarea");
      textarea.name = "message";
      textarea.placeholder = "Type your message here...";
      textarea.className = "comment-area";
      textarea.rows = 1;
      textarea.required = true;

      //submit button for leave comments
      const submitBtn = document.createElement("input");
      submitBtn.type = "submit";
      submitBtn.value = "Submit";
      submitBtn.name = "submit";
      submitBtn.id = "submitcomments";

      //AppendChild card elemts
      output.appendChild(countryCard);
      countryCard.appendChild(divCard); //div for info
      divCard.appendChild(deleteBtn);
      divCard.appendChild(countryTitle);
      divCard.appendChild(countryImage);
      divCard.appendChild(populationTitle);
      divCard.appendChild(commenForm); //appending the comment form to the comment div
      commenForm.appendChild(textarea); //appending the textbox to the form
      commenForm.appendChild(submitBtn); //appending the submit button to the form
      divCard.appendChild(ulFinalMessage); //Appending HTML ul to the comments div.
      //displayMessages();

      // Add an event listener to leave a message
      commenForm.addEventListener("submit", saveMessages);

      //function displayMessages() {}
      //Function to leave comments.
      function saveMessages(e) {
        //------------------------------------------------------------------------------------------------
        e.preventDefault();
        console.log(e.target[0]);

        // append data to the array
        const arrayMessages = [...arrayCountries[key].message];
        console.table(arrayMessages);
        arrayCountries[key].message.push(textarea.value);
        console.table(arrayMessages);
        arrayMessages.push(textarea.value);
        console.table(arrayMessages);
        ulFinalMessage.textContent = ""; //don't delete
        console.table(arrayMessages);

        //For loop to create a dinamic list
       
        let resultHtml = "";
        arrayMessages.forEach((messa, index) => {
          resultHtml += `
            <li class="liFinalMessage">
              <span>${messa}</span>
              <button class="delete-btn" data-index="${index}">X</button>
            </li>
          `;
        });
        console.table(resultHtml);
        divCard.appendChild(ulFinalMessage)
        ulFinalMessage.innerHTML = resultHtml;
        console.log(resultHtml)

        // Add event listener to delete buttons
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach((deleteBtn) => {
          deleteBtn.addEventListener("click", deleteArrayElement);
        });

        if (!textarea.value) {
          alert("Please enter a message");
          return;
        }
        textarea.value = "";
        console.table(arrayMessages);

        fetch(
          `https://world-population-dashboard.onrender.com/countries/${countries[key].id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ message: arrayMessages }),
          }
        )
          .then((res) => res.json())
          .then((updatedPatch) => {
            console.table(updatedPatch);
          })
          .catch((error) => {
            console.error(error);
            alert(
              "An error occurred while submitting your message. Please try again later."
            );
          });
        //----------------------------------------------------------------------------------------------------------------------------------
        function deleteArrayElement(e) {
          e.preventDefault();
          //console.log(e);
          e.target.parentNode.remove();
          const index = e.target.dataset.index;
          console.log(index);

          arrayMessages.splice(index, 1);

          fetch(
            `https://world-population-dashboard.onrender.com/countries/${countries[key].id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ message: arrayMessages }),
            }
          )
            .then((res) => res.json())
            .then((updateComments) => console.table(updateComments));
        }
      } //----------------------------------------------------------------------------------------------------------

      deleteBtn.addEventListener("click", deleteCountryCard);

      function deleteCountryCard(e) {
        e.preventDefault();
        e.target.parentNode.parentNode.remove();
        fetch(
          `https://world-population-dashboard.onrender.com/countries/${countries[key].id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((updateCountries) => console.table(updateCountries));
      } //---------------------------------------------------------------------------------------
    }
  }

  //ADD NEW COUNTRY

  //An evenlistener to add a new country
  addcountryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("https://world-population-dashboard.onrender.com/countries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        id: "",
        country: addcountryForm[1].value,
        area_in_Square_Kilometers: addcountryForm[4].value,
        population: addcountryForm[3].value,
        flagUrl: addcountryForm[2].value,
        message: [],
      }),
    })
      .then((response) => {
        if (response.ok) {
          successMessage.textContent = `${addcountryForm[1].value} added successfully!`;
          // Clear the form
          addcountryForm.reset();

          setTimeout(function () {
            window.location.reload();
          }, 5000);
        } else {
          console.log("Error adding country");
        }
      })
      .catch((error) => {
        console.error("Error adding country:", error);
      });
  });

  //FILTER COUNTRIES
  // Filter an array of country objects by the given property and displays the sorted results.
  function filterCountry(property, dattaArray) {
    let itemText = inputBoxSearch.value;
    let foundCountry = false; // Variable to track if the country is found
    // filter the array of countries by the selected property.
    dattaArray.forEach((o) => {
      if (o.country.toLowerCase() === itemText.toLowerCase()) {
        // Display the filtered results.
        handleData([o]);
        foundCountry = true; // Set foundCountry to true if the country is found
      }
      inputBoxSearch.value = "";
    });
    if (!foundCountry) {
      // Condition is false, country not found
      output.innerHTML = `${itemText} not found.`;
    }
  }

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    output.innerHTML = "";

    const selectedProperty = event.target.value;
    filterCountry(selectedProperty, arrayCountries);
  });

  //SORT COUNTRIES
  // Sorts an array of country objects by the given property and displays the sorted results.
  function sortCountries(property, dataArray) {
    // Sort the array of countries by the selected property.
    const newvar = dataArray.sort((b, a) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
    // Display the sorted results.

    handleData(newvar);
  }

  // Add an event listener to the "change" event of the sorting dropdown.
  sortBy.addEventListener("change", (e) => {
    console.log(e.target.value);
    output.childNodes.forEach((li) => {
      li.remove();
    });

    // Get the selected property from the dropdown.
    const selectedProperty = e.target.value;

    // Sort the countries by the selected property and display the sorted results.
    sortCountries(selectedProperty, arrayCountries);
  });
});