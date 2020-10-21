# Pokechrome ![](public/pokeball64.png)

### Pokedex Chrome Extension

This is Chrome Extension React App using Typescript, Webpack, SASS, and the PokeAPI. It can be built and installed in your browser.<br/>

### Encounter Pokemon in Tall Grass (the internet)

As you navigate to different pages in the tab, the Pokedex will identify a Pokemon from the original generation associated with the current tab you are viewing, as it would during a random Pokemon encounter in tall grass. It will then display the information and update the extension icon, and has the ability to search as well.

![Pokechrome](public/screeny.png)

### Run It

#### `npm i`

#### `npm run build`

Builds the app as a usable Chrome Extension to the **build** folder.<br/>
Navigate to **chrome://extensions** in Chrome, then click **Load unpacked** and select the base **build** folder.<br/>
After loading the extension, it can be debugged in the same way as the web app.

### Discolsure

It does use a background script, but never makes a call outside of the extension context.
