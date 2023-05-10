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

  //get all countries
  fetch("https://world-population-dashboard.onrender.com/countries")
    .then((res) => res.json())
    .then((countries) => {
      console.log(countries);

      countries.forEach((country) => {
        arrayCountries.push(country);
      });
      handleData(countries);

      console.table(arrayCountries);
    });

  //declare all variables.
  const output = document.querySelector("#output"); // ul list container, parent of li class="card"
  const filterForm = document.querySelector("#create-task-form");
  const addcountryForm = document.querySelector("#add-country");
  const allBtn = document.querySelector("#allButton");
  const inputBoxSearch = document.querySelector("#new-task-description");
  const sortBy = document.getElementById("sort-by");
  const successMessage = document.querySelector("#alert");
  const arrayCountries = [];

  allBtn.addEventListener("click", () => {
    handleData(arrayCountries);
  });

  // handle and display countries
  function handleData(countries) {
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
      const divList = document.createElement("div"); // div that contains all the information about countries.Parent of h2, img, and h5. class= "cardContent"
      divList.className = "divList";
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
      const resultUl = document.createElement("ul");
      resultUl.className = "ul-final-Message";

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
      divCard.appendChild(divList); //Appending HTML ul to the comments div.
      divList.appendChild(resultUl); //Appending HTML ul to the comments div.

        // append data to the array
        const arrayMessages = [...arrayCountries[key].message];
        console.table(arrayMessages);
        arrayCountries[key].message.push(textarea.value);
        arrayMessages.push(textarea.value);



      



















      deleteBtn.addEventListener("click", deleteCountryCard);

      function deleteCountryCard(e) {
        e.preventDefault();
        e.target.parentNode.parentNode.parentNode.remove();
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
      }

      function deleteComment(e) {
        e.preventDefault();
        console.log(textarea.value);
        e.target.parentNode.remove();
        console.table(arrayCountries[key].message);
        const arrayMessages = [...arrayCountries[key].message];
        console.table(arrayMessages);
        //arrayCountries[key].message.push(textarea.value);
        //arrayMessages.push(textarea.value);
        const arrayMessagesDeleted = arrayMessages.filter(
          (item) => item !== textarea.value
        );
        console.table(arrayMessagesDeleted);
        //console.log(arrayCountries)

        fetch(
          `https://world-population-dashboard.onrender.com/countries/${countries[key].id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ message: arrayMessagesDeleted }),
          }
        )
          .then((res) => res.json())
          .then((updateComments) => console.table(updateComments));
      }
    }
  }
  
  document.querySelector("#commenForm").addEventListener("submit", saveMessages);
  
       function saveMessages(){
        e.preventDefault();
        console.log(e);
       }
        

        //Function to leave comments.
        function displayArrayElements(e) {
          e.preventDefault()
          const resultUl = document.querySelector('.ul-final-Message');
          let resultHtml = '';
        
          arrayMessages.forEach((messa, index) => {
            resultHtml += `
              <li>
                <span>${messa}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
              </li>
            `;
          });
        
          resultUl.innerHTML = resultHtml;
        
          // Add event listener to delete buttons
          const deleteBtns = document.querySelectorAll('.delete-btn');
          deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', deleteArrayElement);
          });
        }
  
  
        function deleteArrayElement(event) {
          const index = event.target.dataset.index;
          arrayMessages.splice(index, 1);
          displayArrayElements();
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
    //console.log(output);

    let itemText = inputBoxSearch.value;
    // filter the array of countries by the selected property.
    dattaArray.forEach((o) => {
      if (o.country.toLowerCase() === itemText.toLowerCase()) {
        // Display the filtered results.
        handleData([o]);
        // Refresh the page after a delay of 3 seconds
      }
      inputBoxSearch.value = "";
    });
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
    }); //console.log(arrayCountries)
    // Display the sorted results.

    handleData(newvar);
  }

  // Add an event listener to the "change" event of the sorting dropdown.
  sortBy.addEventListener("change", (e) => {
    console.log(e.target.value);
    output.childNodes.forEach((li) => {
      //console.log(li);
      li.remove();
    });

    // Get the selected property from the dropdown.
    const selectedProperty = e.target.value;

    // Sort the countries by the selected property and display the sorted results.
    sortCountries(selectedProperty, arrayCountries);
  });
});
