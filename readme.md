# Three.js Template

## Template structure

- src/

  - **script.js**: Entry point
  - **Experience.js**/
  - **Shaders**/
    - **LoadingScreen**/: loading screen shader files
  - **Utils**/
    - **Debug.js**: Lil-gui class
    - **EventEmitter.js**: Class to implement event in Javascript
    - **Resources.js**: Class to load every resources from 'assets.js' file
    - **Sizes.js**: Class responsible for page size and resize event
    - **Time.js**: Class responsible for time event ('tick' event)
  - **World**/
    - **Environment.js**: Everything related with environment (Lights, EnvironmentMaps,etc...)
    - **LoadingScreen.js**: Loading Screen screen (black screen)
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

https://user-images.githubusercontent.com/21143922/170840475-e0af43e0-6239-44b4-aca4-a2e1d0d95ebd.mov
