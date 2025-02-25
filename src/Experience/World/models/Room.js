import * as THREE from 'three'
import Experience from '../../Experience'
import portalFragmentShader from '../../shaders/Portal/fragment.glsl'
import portalVertexShader from '../../shaders/Portal/vertex.glsl'
import shadowCatcherFragmentShader from '../../shaders/shadowCatcher/fragment.glsl'
import shadowCatcherVertexShader from '../../shaders/shadowCatcher/vertex.glsl'

export class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
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
    this.setModel()
  }

  setMaterials() {
    // Baked Texture
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

    // Pole Light Material
    this.monitorMaterial = new THREE.MeshBasicMaterial({ color: 0x3e3e42 })

    // Portal Material
    this.portalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColorStart: { value: new THREE.Color(0x000000) },
        uColorEnd: { value: new THREE.Color(0xffffff) },
        uTime: { value: 0 }
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
      side: THREE.DoubleSide
    })

    // Debug
    if (this.debug.active) {
      this.debugFolder.addColor(this.debugObject, 'portalColorStart').onChange(() => this.portalMaterial.uniforms.uColorStart.value.set(this.debugObject.portalColorStart))

      this.debugFolder.addColor(this.debugObject, 'portalColorEnd').onChange(() => this.portalMaterial.uniforms.uColorEnd.value.set(this.debugObject.portalColorEnd))
    }
  }

  setModel() {
    this.group = new THREE.Group()

    // All Model
    this.roomModel = this.roomResource.scene

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.roomModel, 'visible')
    }

    // Objects
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

    this.group.add(this.roomModel)

    // Shadow Catcher
    this.shadowCatcherModel = this.shadowCatcherResource.scene
    this.shadowCatcher = this.shadowCatcherModel.children.find(child => child.name === 'shadow_catcher')
    this.shadowCatcher.material = this.shadowCatcherMaterial
    this.group.add(this.shadowCatcherModel)

    this.group.position.set(0.71, -1.17, 1.41)
    this.group.rotation.set(0, 5.45, 0)
    this.scene.add(this.group)
  }

  update() {
    this.portalMaterial.uniforms.uTime.value = this.time.elapsedTime
  }
}
