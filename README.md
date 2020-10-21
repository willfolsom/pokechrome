# Pokechrome ![](public/pokeball64.png)

### Pokedex Chrome Extension

This is Chrome Extension React App using Typescript, Webpack, SASS, and the PokeAPI. It can be built into a Chrome Extension and installed in your browser.<br/>

As you navigate to different pages, the Pokedex will identify any Pokemon associated with the current tab you are viewing, as it would during a random Pokemon encounter in tall grass. It will then display the information and update the extension icon, and has the ability to search as well.

![Pokechrome](public/screeny.png)

### Run It

#### `npm i`

#### `npm run build`

Builds the app as a usable Chrome Extension to the **build** folder.<br/>
Navigate to **chrome://extensions** in Chrome, then click **Load unpacked** and select the base **build** folder.<br/>
After loading the extension, it can be debugged in the same way as the web app.
