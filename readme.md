# Three.js Journey

## Template structure

- src/

  - **script.js**: Entry point
  - **Experience.js**/: Main class to start the entire Experience (**_singleton_**)
  - **Shaders**/
    - **LoadingOverlay**/: loading overlay shader files
  - **Utils**/
    - **Debug.js**:
    - **EventEmitter.js**:
    - **LoadersType.js**:
    - **Resources.js**:
    - **Sizes.js**:
    - **Time.js**:
  - **World**/
    - **Environment.js**:
    - **LoadingOverlay.js**:
    - **World.js**:
  - **assets.js**:
  - **Camera.js**:
  - **Experience.js**:
  - **Renderer.js**:

- static/
  - **models**/:
  - **textures**/:

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
