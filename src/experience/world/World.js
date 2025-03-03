import Experience from '../Experience.js'
import EventEmitter from 'events'

import { Room } from './models/index.js'

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
      this.room = new Room()

      // this.environment = new Environment()

      this.emit('worldready')
    })
  }

  update() {
    // if (this.fox) this.fox.update()
  }

  switchViewport(device) {
    if (this.room) this.room.switchViewport(device)
  }
}
