import Experience from '../Experience.js'
import EventEmitter from 'events'

import { Fox, Fireflies, Portal, Room } from './models/index.js'
import { Environment } from './lights/index.js'

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
      // this.fox = new Fox()
      // this.portal = new Portal()
      this.room = new Room()
      // this.fireflies = new Fireflies()

      // this.environment = new Environment()

      this.emit('worldready')
    })
  }

  update() {
    if (this.fox) this.fox.update()
    if (this.fireflies) this.fireflies.update()
    if (this.portal) this.portal.update()
  }
}
