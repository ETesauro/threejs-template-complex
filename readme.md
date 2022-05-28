# Three.js Journey

## Template structure

- src/

  - **script.js**: entry point
  - Experience/
    - Shaders/
    - Utils/
    - World/

- static/
  - _**sendrandomhumidity.yaml**_: takes care of sending a random value to the queue **iot/sensors/humidity**
  - _**consumehumidity.yaml**_: takes care of processing received values and to warn the user or log data
- **doc/**: everything related to documentation
- **.env**: file containing settings for javascript scripts

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
