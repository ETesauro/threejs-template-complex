# Three.js Template

## Template structure

- src/

  - **script.js**: Entry point
  - **Experience.js**/
  - **Shaders**/
    - **LoadingOverlay**/: loading overlay shader files
  - **Utils**/
    - **Debug.js**: Lil-gui class
    - **EventEmitter.js**: Class to implement event in Javascript
    - **LoadersType.js**: Enum of file types to load
    - **Resources.js**: Class to setup laoding overlay screen and load every resources from 'assets.js' file
    - **Sizes.js**: Class responsible for page size and resize event
    - **Time.js**: Class responsible for time event ('tick' event)
  - **World**/
    - **Environment.js**: Everything related with environment (Lights, EnvironmentMaps,etc...)
    - **LoadingOverlay.js**: Loading Overlay screen (black screen)
    - **World.js**: Class where to add every objects
  - **assets.js**: Object where to specify all the resources to be loaded
  - **Camera.js**: Class responsible for Camera details
  - **Experience.js**: Main class to start the entire Experience (**_singleton_**)
  - **Renderer.js**: Class responsible for Renderer details

- static/
  - **models**/: Folder where to place every 3D Models
  - **textures**/: Folder where to place every textures

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev
```

### Deploy on Vercel

```
# Deploy on Vercel
npm run deploy
```

## Demo
