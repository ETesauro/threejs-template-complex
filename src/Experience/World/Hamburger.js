import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Hamburger {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('hamburger')
      this.debugFolder.close()
    }

    // Setup
    this.resource = this.resources.items.hamburgerModel

    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.position.set(-2, 0.95, 0)
    this.scene.add(this.model)

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.model, 'visible')
    }

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })

    this.model.scale.set(0, 0, 0)
  }
}
