import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer {
  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('background')
      this.debugFolder.close()
    }

    this.setInstance()
  }

  setInstance() {
    // Debug
    if (this.debug.active) {
      this.debugObject = {
        clearColor: '#F5EFE6'
      }

      this.debugFolder.addColor(this.debugObject, 'clearColor').onChange(() => {
        this.instance.setClearColor(this.debugObject.clearColor)
      })
    }

    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    // this.instance.physicallyCorrectLights = true
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.toneMapping = THREE.NoToneMapping
    // this.instance.toneMappingExposure = 1
    // this.instance.shadowMap.enabled = true
    // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setClearColor('#F5EFE6')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}
