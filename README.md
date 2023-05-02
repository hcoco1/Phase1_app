# I am actively working on this unfinished App. 

## Phase 1 Project: World Population Dashboard

Project Pitch

**World Population Dashboard (WPD)** is an HTML/CSS/JS app that accesses data from a db.json file using a JSON server. WPD returns a collection of 297 countries. Each object has six attributes (country, area_in_Square_Kilometers, population, male_population, female_population, and flagUrl). The App fetches all the data as soon the browser load. Also, The user can search for a specific country using a html form. Additionally, users can sort the collection by their properties.

Moreover, the user can check the information for a specific country and add a new or different flag. Finally, users can leave personalized messages by clicking on a flag. 
 
---

![how this app works](https://github.com/hcoco1/Phase1_app/blob/main/phase_1_app.gif?raw=true) 
 
---
Project Structure

**World Population Dashboard** runs on a single page and contains single HTML, CSS, and JS files.

World Population Dashboard uses an HTML/CSS/JS app that accesses data from a db.json file using a JSON server. WPD returns a collection of 297 countries. Each object has six attributes (country, area_in_Square_Kilometers, population, male_population, female_population, and flagUrl). The App fetches all the data as soon the browser load. Also, The user can search for a specific country using a html form. Additionally, users can sort the collection by their properties.

**World Population Dashboard**  use:

1. Event listener with a DOMContentLoaded event.

2. Event listener with a submit event toggling dark/light mode. 

3. Event listener with a click event to show an input.

4. Event listener (nested) with a submit event to leave a message on the country card

5. Event listener with a change event to sort an array of objects.

6. Event listener with a submit event to add flags making a patch request.

**World Population Dashboard**  use:

1. Two if statements.

2. One for-in loop. 

3. One .push() method.

4. One .forEach method.

5. One .sort() method.

6. One GET method.

7. One PATCH method.

Challenges

 1. Write a clean code.

 2. Add a flag to the country cards using the PATCH method.

 3. Deployment (not mandatory).

