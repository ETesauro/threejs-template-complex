import * as THREE from 'three'
import Experience from '../../Experience'

import { getScreenBounds } from '../../tools'

import shadowCatcherFragmentShader from '../../shaders/shadowCatcher/fragment.glsl'
import shadowCatcherVertexShader from '../../shaders/shadowCatcher/vertex.glsl'

export class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.sizes = this.experience.sizes
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('room')
      this.debugFolder.close()
      this.debugObject = {}
      this.debugObject.portalColorStart = '#000000'
      this.debugObject.portalColorEnd = '#ffffff'
    }

    // Setup
    this.roomResource = this.resources.items.roomModel
    this.shadowCatcherResource = this.resources.items.shadowCatcherModel

    this.setMaterials()
    this.setModels()
    this.setPositions()
  }

  // -> START MATERIALS
  setMaterials() {
    // Room Baked Texture
    this.roomTexture = this.resources.items.roomTexture
    this.roomTexture.flipY = false
    this.roomTexture.colorSpace = THREE.SRGBColorSpace
    this.roomBakedMaterial = new THREE.MeshBasicMaterial({ map: this.roomTexture })

    // Shadow Catcher Texture
    this.shadowCatcherTexture = this.resources.items.shadowCatcherTexture
    this.shadowCatcherTexture.flipY = false
    this.shadowCatcherTexture.colorSpace = THREE.SRGBColorSpace
    this.shadowCatcherMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uColor: { value: new THREE.Color('#dbc3a0') },
        uOpacity: { value: 1 },
        uAlphaMask: { value: this.shadowCatcherTexture }
      },
      vertexShader: shadowCatcherVertexShader,
      fragmentShader: shadowCatcherFragmentShader
    })

    // Monitor Material
    this.monitorMaterial = new THREE.MeshBasicMaterial({ color: 0x3e3e42 })
  }
  // -> END MATERIALS

  // -> START MODELS
  setModels() {
    this.group = new THREE.Group()

    // Set Models
    this.setRoom()
    this.setShadowCatcher()

    this.scene.add(this.group)
  }

  setRoom() {
    // All Model
    this.roomModel = this.roomResource.scene

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.roomModel, 'visible')
    }

    // Room Objects
    this.desk = this.roomModel.children.find(child => child.name === 'desk')
    this.books = this.roomModel.children.find(child => child.name === 'books')
    this.guitar = this.roomModel.children.find(child => child.name === 'guitar')
    this.lavagna = this.roomModel.children.find(child => child.name === 'lavagna')
    this.quadro = this.roomModel.children.find(child => child.name === 'quadro')
    this.leftMonitor = this.roomModel.children.find(child => child.name === 'left_monitor')
    this.rightMonitor = this.roomModel.children.find(child => child.name === 'right_monitor')

    // Materials
    this.desk.material = this.roomBakedMaterial
    this.guitar.material = this.roomBakedMaterial
    this.books.material = this.roomBakedMaterial
    this.lavagna.material = this.roomBakedMaterial
    this.quadro.material = this.roomBakedMaterial
    this.leftMonitor.material = this.monitorMaterial
    this.rightMonitor.material = this.monitorMaterial

    this.group.add(this.roomModel) // * Add Room Model to Group
  }

  setShadowCatcher() {
    // Shadow Catcher
    this.shadowCatcherModel = this.shadowCatcherResource.scene
    this.shadowCatcher = this.shadowCatcherModel.children.find(child => child.name === 'shadow_catcher')
    this.shadowCatcher.material = this.shadowCatcherMaterial

    this.group.add(this.shadowCatcherModel) // * Add Shadow Catcher Model to Group
  }
  // -> END MODELS

  // -> START POSITIONS
  setPositions() {
    if (this.sizes.isMobile) this.setMobilePosition()
    else this.setDesktopPosition()
  }

  setDesktopPosition() {
    this.group.position.set(0.71, -1.17, 1.41)
    this.group.rotation.set(0, 5.45, 0)
  }

  setMobilePosition() {
    const bounds = getScreenBounds(this.camera, this.sizes)

    this.group.position.set(-0.32, bounds.bottom + this.group.scale.y / 2, 0)
    this.group.rotation.set(0, -6.81, 0)
  }
  // -> END POSITIONS

  // - Utils
  update() {}

  switchViewport(device) {
    if (device === 'desktop') this.setDesktopPosition()
    else this.setMobilePosition()
  }
}
