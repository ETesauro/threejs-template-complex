import EventEmitter from 'events'
import Experience from '../Experience'

export class Mouse extends EventEmitter {
  constructor() {
    super()

    // Resources
    this.experience = new Experience()
    this.sizes = this.experience.sizes

    // Setup
    this.cursor = {
      x: 0,
      y: 0
    }

    // Listeners
    this.setListeners()
  }

  setListeners() {
    // Mousemove
    window.addEventListener('mousemove', event => {
      this.cursor.x = event.clientX / this.sizes.width - 0.5
      this.cursor.y = event.clientY / this.sizes.height - 0.5
    })
  }
}
