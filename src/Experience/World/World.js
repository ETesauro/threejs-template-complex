import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import Floor from './Floor.js'
import Buggy from './Buggy.js'
import LoadingScreen from './LoadingScreen.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Loading
    this.loadingScreen = new LoadingScreen()

    // Setup
    this.resources.on('ready', () => {
      // Add here some objects (before new Environment())
      // ...
      this.fox = new Fox()
      this.floor = new Floor()
      this.buggy = new Buggy()

      this.environment = new Environment()
    })
  }

  update() {
    if (this.fox) this.fox.update()
  }
}
