import * as THREE from 'three'
import EventEmitter from 'events'

export class Time extends EventEmitter {
  constructor() {
    super()

    this.clock = new THREE.Clock()
    this.previousTime = 0
    this.delta = 0
    this.elapsedTime = 0

    window.requestAnimationFrame(() => this.tick())
  }

  tick() {
    this.elapsedTime = this.clock.getElapsedTime()
    this.delta = this.elapsedTime - this.previousTime
    this.previousTime = this.elapsedTime

    this.emit('tick')

    window.requestAnimationFrame(() => this.tick())
  }

  // constructor() {
  //   super()

  //   // Setup
  //   this.start = Date.now()
  //   this.current = this.start
  //   this.elapsedTime = 0
  //   this.delta = 16 // Non metto 0 perchè potrebbe buggarsi il primo frame. Perchè 16? Perchè la maggior parte degli schermi girano a 60fps e a questo framerate il delta è circa 16

  //   window.requestAnimationFrame(() => this.tick())
  // }

  // tick() {
  //   const currentTime = Date.now()
  //   this.delta = currentTime - this.current
  //   this.current = currentTime
  //   this.elapsedTime = (this.current - this.start) / 1000

  //   this.emit('tick')

  //   window.requestAnimationFrame(() => {
  //     this.tick()
  //   })
  // }
}
