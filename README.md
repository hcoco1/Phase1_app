# This App is unfinished but actively being worked on.


## `Phase 1 Project: World Population Dashboard`


---
## Project Pitch

**World Population Dashboard (WPD)** is a HTML/CSS/JS app that accesses data from a db.json file using a     json-server. WPD returns a collection of 297 countries worldwide, and each object has six attributes (country, area_in_Square_Kilometers, population, male_population, female_population, and flagUrl). The app fetch all the data as soon the browser load. Also,  The user can search for a specific country using a html form. Additionally, the collection of countries can be sorted by their properties, like by country name, for instance. Moreover, the user can check the information for a specific country and add a new or different flag. Finally, user can leave personalized messages by clicking on a flag. All interactions are handled asynchronously and use JSON as the communication format.
 
---

![how this app works](https://github.com/hcoco1/Phase1_app/blob/main/phase_1_app.gif?raw=true) 
 
---
### Project Structure

* **WPD** runs on a single page and contain a single HTML, CSS, and JS files.

* **WPD** uses four distinct event listeners:

      1. Event listener with a DOMContentLoaded event.
      
      2. Event listener with a submit event toggling dark/light mode.  
      
      3. Event listener with a click event to show an input.
      
      4. Event listener (nested) with a submit event to leave a message on the country card
      
      5. Event listener with a change event to sort an array of objects.
      
      6. Event listener with a submit event to add flags making a patch request.
      
      
* **WPD** use:

      1. Two if statements.
      
      2. One for in loop.  
      
      3. One .push() method.
      
      4. One .forEach method.
      
      5. One .sort() method.
      
      6. One GET method.
      
      7. One PATCH method.
      
      
##  Challenges

        1. Write a clean code
        
        2. Add a flag to the country cards using the PATCH method.
        
        3. Deployment (not mandatory)

