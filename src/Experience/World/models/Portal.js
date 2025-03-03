import * as THREE from 'three'
import Experience from '../../Experience'
import portalFragmentShader from '../../shaders/Portal/fragment.glsl'
import portalVertexShader from '../../shaders/Portal/vertex.glsl'

export class Portal {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('portal')
      this.debugFolder.close()
      this.debugObject = {}
      this.debugObject.portalColorStart = '#000000'
      this.debugObject.portalColorEnd = '#ffffff'
    }

    // Setup
    this.resource = this.resources.items.portalModel
    this.setMaterials()
    this.setModel()
  }

  setMaterials() {
    // Baked Texture
    this.texture = this.resources.items.portalTexture
    this.texture.flipY = false
    this.texture.colorSpace = THREE.SRGBColorSpace
    this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.texture })

    // Pole Light Material
    this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

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
    // All Model
    this.model = this.resource.scene

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.model, 'visible')
    }

    // Find Objects
    this.bakedMesh = this.model.children.find(child => child.name === 'baked')
    this.poleLightA = this.model.children.find(child => child.name === 'poleLightA')
    this.poleLightB = this.model.children.find(child => child.name === 'poleLightB')
    this.portalLight = this.model.children.find(child => child.name === 'portalLight')

    // Add Materials
    this.poleLightA.material = this.poleLightMaterial
    this.poleLightB.material = this.poleLightMaterial
    this.portalLight.material = this.portalMaterial
    this.bakedMesh.material = this.bakedMaterial

    this.scene.add(this.model)
  }

  update() {
    this.portalMaterial.uniforms.uTime.value = this.time.elapsedTime
  }
}
