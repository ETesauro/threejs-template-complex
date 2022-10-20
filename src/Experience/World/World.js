import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import Floor from './Floor.js'
import EventEmitter from 'events'
import Hamburger from './Hamburger.js'
import Table from './Table.js'
import Guy from './Guy.js'

export default class World extends EventEmitter {
  constructor() {
    super()

    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Events
    this.resources.on('ready', () => {
      // Add here some objects (before new Environment())
      // ...
      this.fox = new Fox()
      this.floor = new Floor()
      this.hamburger = new Hamburger()
      this.table = new Table()
      this.guy = new Guy()

      this.environment = new Environment()

      this.emit('worldready')
    })
  }

  update() {
    if (this.fox) this.fox.update()
    if (this.guy) this.guy.update()
  }
}
