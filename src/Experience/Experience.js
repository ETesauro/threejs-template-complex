import * as THREE from 'three'
import { assets, Camera, Debug, Mouse, Resources, Sizes, Time } from './utils'
import Preloader from './Preloader'
import Renderer from './Renderer'
import World from './world/World'

let instance = null

export default class Experience {
  constructor(canvas) {
    // Singleton
    if (instance) return instance
    instance = this

    // Global access
    window.experience = this

    // Options
    this.canvas = canvas

    // Utils
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.mouse = new Mouse()

    // Resources and World
    this.scene = new THREE.Scene()
    this.resources = new Resources(assets)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    this.preloader = new Preloader()

    // Events
    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    // Traverse the whole scene
    this.scene.traverse(child => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key]

          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()
    if (this.debug.active) this.debug.ui.destroy()
  }
}
