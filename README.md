# Ivan Arias. Full-Stack Engineering Student.

## Phase 1 Project: World Population Dashboard

### Link: https://hcoco1.github.io/Phase1_app/

#### Project Pitch

**World Population Dashboard (WPD)** is an HTML/CSS/JS app that accesses data from a web service (https://world-population-dashboard.onrender.com/countries). WPD returns a collection of countries. Each object has four attributes (country, area_in_Square_Kilometers, population, flagUrl, and message). The App fetches all the data as soon the browser load. Also, users can search for a specific country using an HTML form and sort the collection by their properties.
Moreover, users can add a new country. Finally, users can leave personalized messages on the text box input. 

## Instructions:

All the data is fetched as soon the app load. The user can scroll down and check the collection of countries. Also, users have access to the app data through five inputs menu:

1.  Search Menu: By typing the country name, users can check if a specific country is in the     database.By clicking the GET ALL COUNTRIES can return to the main screen.

2.  Sort Menu: by clicking on the dropdown Menu, users can sort the database by their properties(country name, country population, and country area).

 3.  Add New Country Menu: user who wants to add a country has to fill out four text inputs with the information related to their properties: country name, URL from a flag image of the country, country population, and country area (in km2). By clicking the GET ALL COUNTRIES can return to the main screen.

4.   Card Country Menu and buttons: users who want to leave a message on the country card must fill out the text box input and click the submit button. The message will appear immediately and could be deleted if the user prefers. By clicking the red button, the user can delete the country card. 

5.   Theme Menu: by clicking the dropdown menu user can choose between light and dark themes.
---

![how this app works](https://github.com/hcoco1/Phase1_app/blob/main/phase_1_app.gif?raw=true) 
 
---
Project Structure

**World Population Dashboard** runs on a single page and contains single HTML, CSS, and JS files.



**World Population Dashboard** App uses:

1. An event listener with a DOMContentLoaded event.

2. An event listener with a submit event toggling dark/light mode.

3. An event listener with a click event to get all countries.

4. An event listener with a submit event to leave messages.

5. An event listener with a click event to remove messages.

6. An event listener with a click event to delete a country.

7. An event listener with a submit event to add new countries.

8. An event listener with a submit event to filter a specific country.

9. An event listener with a change event to sort an array of objects.



**World Population Dashboard** App  has:

1. Six if statements.

2. Two for-loop statements. 

3. Three .push() method.

4. Three .forEach methods.

5. One .sort() method.

6. One GET method.

7. One PATCH method.
   
8. One POST method.

9. One DELETE methods.

**Challenges**

 1. Write a clean code

 2. Deployment, Database: (https://world-population-dashboard.onrender.com), App : (https://hcoco1.github.io/Phase1_app/)
 
 3. Responsive design (Adding a mobile-style CSS file)
   



