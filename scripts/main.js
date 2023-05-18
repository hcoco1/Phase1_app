//Declare  variable list and initialize.
const allBtn = document.querySelector("#allButton");
const output = document.querySelector("#output"); // ul list container, parent of li class="card"
const divoutput = document.querySelector(".country-collection");
const filterForm = document.querySelector("#create-task-form");
const addcountryForm = document.querySelector("#add-country");
const inputBoxSearch = document.querySelector("#new-task-description");
const sortBy = document.getElementById("sort-by");
const successMessage = document.querySelector("#alert");
const themeSelect = document.querySelector("#theme-select");
const deleteBtnMessage = document.querySelectorAll(".deletemessbtn")
let countryList = [];
let arrayMessages = [];
let separateObjects = {};
let localCountryObject = {};
let ulFinalMessage;
let deleteBtn;
let commenForm;
let deleteBtnMessages;
let textarea;

// Eventlistener
document.addEventListener("DOMContentLoaded", init);
filterForm.addEventListener("submit", filterCountry);
addcountryForm.addEventListener("submit", fetchPost);
sortBy.addEventListener("change", sortCountries);
allBtn.addEventListener("click", getAllData);
themeSelect.addEventListener("change", setTheme);


function init() {
  fetchGet();
}

function getAllData() {
  successMessage.textContent = "";
  //output.innerHTML = "";
  fetchGet()

}

function fetchGet() {
  fetch("https://world-population-dashboard.onrender.com/countries/")
    .then((res) => res.json())
    .then((countries) => {
      countries.forEach(obj => {
        separateObjects[obj.country] = { ...obj };
      });
      /*       console.log(separateObjects["Mexico"].population);
            console.log(separateObjects["Sudan"].message);
            console.log(separateObjects["Indonesia"].id); */
      countryList.length = 0;
      //arrayMessages.length = 0;
      countries.forEach((country) => {
        countryList.push(country);
      });
      //console.log(countryList);//all countries
      //console.log(arrayMessages);//all messages
      handleData(countries);
    })
    .catch((error) => console.error("Error fetching countries:", error));
}

function saveMessages(e) {
  e.preventDefault();
  let id = e.target[1].dataset.index;
  let val = e.target[0].value//==> value of the text input
  separateObjects[e.target[1].dataset.country].message.push(val)
  console.log(separateObjects[e.target[1].dataset.country].message);
  if (!e.target[0].value) {
    alert("Please enter a message");
    return;
  }
  e.target[0].value = "";
  console.table(arrayMessages);
  fetch(
    `https://world-population-dashboard.onrender.com/countries/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message: separateObjects[e.target[1].dataset.country].message }),
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
  handleData(separateObjects)
}


function deleteArrayElement(event, index) {
  event.preventDefault()

  const button = event.target;
  const listItem = button.parentNode;
  console.log(button.parentNode.parentNode.parentNode.dataset.country)
  const id = button.parentNode.parentNode.parentNode.dataset.id
  console.log(button.parentNode.parentNode.parentNode.dataset.id)
  const span = listItem.querySelector('span');
  console.log(span)
  // Access the data-index attribute value
  const inde = button.dataset.index;
  console.log(inde)
  console.log(separateObjects[button.parentNode.parentNode.parentNode.dataset.country].message);
  let mess = separateObjects[button.parentNode.parentNode.parentNode.dataset.country].message
  console.log(mess)
  console.log(span.parentNode)
  span.parentNode.remove();
  mess.splice(index, 1);
  console.log(mess)
  fetch(
    `https://world-population-dashboard.onrender.com/countries/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message: mess }),
    }
  )
    .then((res) => res.json())
    .then((updateComments) => console.table(updateComments));

}


function generateList(arg) {
  let messages = "";
  for (let index = 0; index < arg.length; index++) {
    messages += `
      <li>
        <span>${arg[index]}</span>
        <button class="deletemessbtn" data-index="${index}" onclick="deleteArrayElement(event, ${index})">X</button>
      </li>
    `;
  }
  return messages;
}

function handleData(countries) {
  //clear previous results
  output.innerHTML = "";

  //for loop to populate cards container
  for (const key in countries) {


    //Delete button to get rid of country cards (one by one)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete";
    deleteBtn.dataset.index = countries[key].id;
    deleteBtn.addEventListener("click", deleteCountryCard);

    //Main content of the cards
    const countryCard = document.createElement("li");
    countryCard.className = "card";
    const divInfo = document.createElement("div");
    divInfo.className = "cardContent";
    const divComments = document.createElement("div");
    divComments.className = "divComments";
    const countryTitle = document.createElement("h2");
    countryTitle.textContent = countries[key].country;
    const countryImage = document.createElement("img");
    countryImage.className = "country-avatar";
    countryImage.src = countries[key].flagUrl;
    const populationTitle = document.createElement("h5");
    //Main text inside card.
    populationTitle.textContent = `According to 2023 data, the total population of ${countries[key].country
      } is ${countries[key].population.toLocaleString()} inhabitants. ${countries[key].country
      } has an area of ${countries[
        key
      ].area_in_Square_Kilometers.toLocaleString()} square kilometers.
    `;
    //container of messages
    let ulFinalMessage = document.createElement("ul");
    ulFinalMessage.className = "ul-final-Message";
    ulFinalMessage.dataset.country = countries[key].country;
    ulFinalMessage.dataset.id = countries[key].id;
    ulFinalMessage.innerHTML = `
    <ol>
    ${generateList(countries[key].message)}
    </ol>
        `;
    //form to leave messages
    const commenForm = document.createElement("form");
    commenForm.action = "#";
    commenForm.method = "PATCH";
    commenForm.setAttribute("id", "commentForm");

    // Add an event listener to the submit button (must be inside the loop)
    commenForm.addEventListener("submit", saveMessages);

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
    submitBtn.dataset.index = countries[key].id;
    submitBtn.dataset.country = countries[key].country;

    //AppendChild card elemts
    output.appendChild(countryCard);
    countryCard.appendChild(divInfo);
    countryCard.appendChild(divComments);
    divInfo.appendChild(deleteBtn);
    divInfo.appendChild(countryTitle);
    divInfo.appendChild(countryImage);
    divInfo.appendChild(populationTitle);
    divComments.appendChild(commenForm);
    commenForm.appendChild(textarea);
    commenForm.appendChild(submitBtn);
    divComments.appendChild(ulFinalMessage)

  }

}

function fetchPost(e) {
  e.preventDefault();
  fetch("https://world-population-dashboard.onrender.com/countries/", {
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
    .then(res => res.json())
    .then((response) => {
      console.log(response.country)
      // message to the DOM
      successMessage.textContent = `${addcountryForm[1].value} added successfully!Click on GET ALL COUNTRIES!`;
      addcountryForm.reset()
      handleData([response])
    })
    .catch((error) => {
      console.error("Error adding country catch:", error);
    });
  successMessage.textContent = "";
}

function filterCountry(e) {
  e.preventDefault();
  output.innerHTML = "";
  let itemText = inputBoxSearch.value;
  let foundCountry = false; // Variable to track if the country is found
  countryList.forEach((o) => {
    if (o.country.toLowerCase() === itemText.toLowerCase()) {
      // Display the filtered results.
            // message to the DOM
            successMessage.textContent = `${itemText} was found!Click on GET ALL COUNTRIES!`;
      handleData([o]);
      
      foundCountry = true; // Set foundCountry to true if the country is found
      
      
    }
  });

  if (!foundCountry) {
    // Condition is false, country not found
    successMessage.textContent = `${itemText} not found! Click on GET ALL COUNTRIES!`;
  }
  
  inputBoxSearch.value = "";
  
}

function sortCountries(e) {
  console.log(e.target.value);
  output.childNodes.forEach((li) => {
    li.remove();
  });
  const selectedProperty = e.target.value;
  const sortedCountries = countryList.sort((a, b) => {
    if (a[selectedProperty] < b[selectedProperty]) return -1;
    if (a[selectedProperty] > b[selectedProperty]) return 1;
    return 0;
  });

  console.log(countryList);
  handleData(sortedCountries);
  console.log(countryList);//checking for duplicate values. Don't remove
}
function setTheme() {
  const theme = themeSelect.value;
  document.body.className = theme;
}

function deleteCountryCard(e) {
  e.preventDefault()
  let id = e.target.dataset.index
  console.log(e.target.parentNode.parentNode)
  console.log(e.target.dataset.index)
  e.target.parentNode.parentNode.remove(); // added data-index=key */
  fetch(
    `https://world-population-dashboard.onrender.com/countries/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((updateCountries) => console.log(updateCountries));
    
}
