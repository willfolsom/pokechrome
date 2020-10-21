# Pokechrome ![](public/pokeball64.png)

### Pokedex Chrome Extension

This is Chrome Extension React App using Typescript, Webpack, SASS, and the PokeAPI. It can be built and installed in your browser.<br/>

![Pokechrome](public/screeny.png)

---

### Encounter Pokemon in Tall Grass (aka The Internet)

As you navigate to different tabs, the Pokedex will identify a Pokemon from the original generation associated with the current tab you are viewing, as it would during a random Pokemon encounter in tall grass. It will then update the extension icon, and will display the Pokedex information, as well as a search bar for other Pokemon.<br/>

![Demo](public/demo.gif)

(These gif slowed down the process, I promise the process is faster / responsive.)

![Rapid Demo](public/rapid-demo.gif)

---

### Run It

#### `npm i`

#### `npm run build`

Builds the app as a usable Chrome Extension to the **build** folder.<br/>
Navigate to **chrome://extensions** in Chrome, then click **Load unpacked** and select the base **build** folder.<br/>
After loading the extension, it can be debugged in the same way as the web app.<br/>

There is also a packed version available for install in the works.

---

### Background.js Disclosure

This does use a background script to listen to the active Chrome tab, but only fires a message that the React App will pickup.
