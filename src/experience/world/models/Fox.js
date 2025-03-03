import * as THREE from 'three'
import Experience from '../../Experience.js'

export class Fox {
  constructor() {
    // Resources
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Setup
    this.resource = this.resources.items.foxModel

    // Model and Animations
    this.setModel()
    this.setAnimation()

    // Debug
    this.setDebug()
  }

  setDebug() {
    if (!this.debug.active) return

    // Folder
    this.debugFolder = this.debug.ui.addFolder('fox')
    this.debugFolder.close()

    // Model visible
    this.debugFolder.add(this.model, 'visible')

    // Animations
    const debugObject = {
      playIdle: () => {
        this.animation.play('idle')
      },
      playWalking: () => {
        this.animation.play('walking')
      },
      playRunning: () => {
        this.animation.play('running')
      },
      stop: () => {
        this.animation.actions.current.stop()
      }
    }
    this.debugFolder.add(debugObject, 'playIdle')
    this.debugFolder.add(debugObject, 'playWalking')
    this.debugFolder.add(debugObject, 'playRunning')
    this.debugFolder.add(debugObject, 'stop')
  }

  setModel() {
    this.model = this.resource.scene
    // this.model.scale.set(0.008, 0.008, 0.008)
    this.scene.add(this.model)

    this.model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {}

    this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
    this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
    this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
    this.animation.actions.current = this.animation.actions.idle

    this.animation.actions.current.play()

    this.animation.play = name => {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 0.5)

      this.animation.actions.current = newAction
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 1)
  }
}
