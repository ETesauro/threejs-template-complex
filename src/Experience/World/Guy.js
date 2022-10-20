import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Guy {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('guy')
      this.debugFolder.close()
    }

    // Setup
    this.resource = this.resources.items.guyModel

    this.setModel()
    this.setAnimation()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.position.set(2, 0, 0)
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

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {}

    this.animation.actions.tPose = this.animation.mixer.clipAction(
      this.resource.animations[0]
    )
    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[1]
    )
    this.animation.actions.current = this.animation.actions.idle
    this.animation.actions.current.play()

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 0.5)

      this.animation.actions.current = newAction
    }

    // Debug
    if (this.debug.active) {
      const debugObject = {
        playTPose: () => {
          this.animation.play('tPose')
        },
        playIdle: () => {
          this.animation.play('idle')
        },
        stop: () => {
          this.animation.actions.current.stop()
        },
      }
      this.debugFolder.add(debugObject, 'playTPose')
      this.debugFolder.add(debugObject, 'playIdle')
      this.debugFolder.add(debugObject, 'stop')
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001)
  }
}
