Final Project: Food By Culture 
===
Team: Aura Velarde & Erik Sola

Food sourrounds us everywhere. It's a necessity that has become engrained deeply into our lives. From a social experience, to cultural celebrations, food has taken a more significant meaning in our lives than fuel to survive.

In this project, our main goal was to explore the different types of cultures in different cities, compare the top 40 restaurants in the area in a cultural aspect, and explore the locations of said restaurants. We wanted to start hypothesizing
wether there could be bias in the top 40 restaurants because of the predominant culture, and locations.

Feel free to explore and think critically about what you see.

Usage:

Compare Cultures:
Ensure to interact with the graph! By hovering over each type of culture, the bar graph will generate.
This is specifically for Houston & Boston

Compare Cities
Pick two cities, and you will be able to interact with the two graphs like previously after clicking the arrow.

Maps:
Houston & Boston's top 40 restaurants. 

Technology used:
- Yelp API
- Node.js
- Javascript
- Google Fonts
- Leafnode
- Mapbox
- Heroku
- d3

Technical challenges:
- After retrieving the data from the Yelp API, we had to process it and map it to their correct culture. Challenges included that there were sub-categories for each thing. IE: Instead of Italian, some had only categories like "pizza" or "pasta",
so we had to ensure that those categories would be counted... but not double!
- Styling: We decided to do everything from scratch, so there were a lot of adventures involving CSS and Javascript.
- Dropdown: Ensuring that you couldn't select the same city twice.
- Running time: At first, our graphs would take forever to load, using promises we were able to ensure it was fast.
- Bar graphs: We started learning the basics of d3, there's much more to learn, but it was fun!

What would we do if we had more time?
- More research on possible bias of data
- See if it would be possible to increase the popularity of restaurants in less popular areas
- More visualizations of the situation, visualizing the cultures to a map would be one in particular
- Decrease the amount of time for the Map to load. We tried using promises but got a 503.
- Add more interaction to the website

