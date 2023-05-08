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
      console.log(typeof countries);
      countries.forEach((country) => {
        arrayCountries.push(country);
      });
      handleData(countries);
      //console.table(arrayCountries);
    });

  //declare all variables.
  const output = document.querySelector("#output"); // ul list container, parent of li class="card"
  const filterForm = document.querySelector("#create-task-form");
  const addcountryForm = document.querySelector("#add-country");
  const inputBoxSearch = document.querySelector("#new-task-description");
  const sortBy = document.getElementById("sort-by");
  const arrayCountries = [];

  // handle and display countries
  function handleData(countries) {
    output.innerHTML = "";
    for (const key in countries) {
      //Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete";
      //Eventlistener delete button

      //Country Cards structure
      const countryCard = document.createElement("li"); //li element that belong to (ul) output. Parent of div class="cardContain".
      countryCard.className = "card";
      const divCard = document.createElement("div"); // div that contains all the information about countries.Parent of h2, img, and h5. class= "cardContent"
      divCard.className = "cardContent";
      const commDiv = document.createElement("div"); //div that contains all elements about comments
      commDiv.className = "comment-div";
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
      //create list to show messages
      //const ulFinalMessage = document.createElement("ul");

      //const liFinalMessage = document.createElement("li");
      //liFinalMessage.className = "li-final-Message";
      //const commentDeleteBtn = document.createElement("button");
      //commentDeleteBtn.textContent = "X";
      //commentDeleteBtn.className = "commentBtn";

      //form for leave messages
      const commenForm = document.createElement("form");
      commenForm.action = "#";
      commenForm.method = "PATCH";

      //text box input
      const textarea = document.createElement("textarea");
      textarea.name = "message";
      textarea.placeholder = "Type your message here...";
      textarea.className = "comment-area";
      textarea.rows = 1;

      //submit button
      const submitBtn = document.createElement("input");
      submitBtn.type = "submit";
      submitBtn.value = "Leave your Message";
      submitBtn.name = "submit";
      submitBtn.id = "submitcomments";

      //AppendChild card elemts
      document.querySelector("#output").appendChild(countryCard);
      countryCard.appendChild(divCard); //div for info
      countryCard.appendChild(commDiv); //div for comments
      countryCard.appendChild(deleteBtn);
      divCard.appendChild(countryTitle);
      divCard.appendChild(countryImage);
      divCard.appendChild(populationTitle);

      commDiv.appendChild(commenForm); //appending the comment form to the comment div

      commenForm.appendChild(textarea);
      commenForm.appendChild(submitBtn);

      //commDiv.appendChild(ulFinalMessage);
      //ulFinalMessage.appendChild(liFinalMessage);
      //liFinalMessage.appendChild(commentDeleteBtn);

      // Add an event listener to leave a message---------------------------------------------
      commenForm.addEventListener("submit", leaveMessages);

      //Function to leave comments.
      function leaveMessages(e) {
        // prevent default form submission behavior
        e.preventDefault();
        console.log(e);
        const ulFinalMessage = document.createElement("ul");
        ulFinalMessage.className = "ul-final-Message";
        const liFinalMessage = document.createElement("li");
        const messages = countries
          .map((country) => country.message[0])
          .filter((message) => message !== undefined && message !== null);

        console.log(typeof messages);

        messages.forEach((message) => {
          const liFinalMessage = document.createElement("li");
          liFinalMessage.innerHTML = message;
        });
        console.table(messages);
        ulFinalMessage.appendChild(liFinalMessage);
        commDiv.appendChild(ulFinalMessage);

        if (!textarea.value) {
          alert("Please enter a message");
          return;
        }
        //-----------------------------------------------------------------------
        fetch(`https://world-population-dashboard.onrender.com/countries/${countries[key].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ message: [textarea.value] }),
        })
          .then((res) => res.json())
          .then((updatedPatch) => console.table(updatedPatch))
          .catch((error) => {
            console.error(error);
            alert(
              "An error occurred while submitting your message. Please try again later."
            );
          });
      } //-------------------------------------------------------------------------------------------

      deleteBtn.addEventListener("click", deleteCountryCard);
      function deleteCountryCard(e) {
        e.preventDefault();
        e.target.parentNode.remove();
        fetch(`https://world-population-dashboard.onrender.com/countries/${countries[key].id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((updateCountries) => console.table(updateCountries));
      }

      /*       commentDeleteBtn.addEventListener("click", deleteComment);
      function deleteComment(e) {
        e.preventDefault();
         // I don't know how to do it!!!
        commentDeleteBtn.textContent = "";


        fetch(`http://localhost:3000/countries/${countries[key].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ message: [] }),
        })
          .then((res) => res.json())
          .then((updateCountries) => console.table(updateCountries));
      } */
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
    });
    setTimeout(function () {
      location.reload();
    }, 4000);
  });

  //FILTER COUNTRIES
  // Filter an array of country objects by the given property and displays the sorted results.
  function filterCountry(property, dattaArray) {
    output.innerHTML = "";
    //console.log(output);
    let itemText = inputBoxSearch.value;
    // filter the array of countries by the selected property.
    dattaArray.forEach((o) => {
      if (o.country.toLowerCase() === itemText.toLowerCase()) {
        // Display the filtered results.
        handleData([o]);
        // Refresh the page after a delay of 3 seconds
        setTimeout(function () {
          location.reload();
        }, 7000);
      }
    });
  }

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
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
    const selectedProperty = event.target.value;

    // Sort the countries by the selected property and display the sorted results.
    sortCountries(selectedProperty, arrayCountries);
  });
});
