import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment')
      this.debugFolder.close()
    }

    // Setup
    this.setSunLight()
    this.setEnvironmentMap()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, -1.25)
    this.scene.add(this.sunLight)

    // Debug
    if (this.debug.active) {
      // Helper
      this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 1)
      this.scene.add(this.sunLightHelper)

      // Folder
      this.debugSunLightFolder = this.debugFolder.addFolder('sun light')

      // Helper Visible
      this.debugSunLightFolder
        .add(this.sunLightHelper, 'visible')
        .name('helper visible')

      // Intensity
      this.debugSunLightFolder
        .add(this.sunLight, 'intensity')
        .name('intensity')
        .min(0)
        .max(10)
        .step(0.001)

      // X - position
      this.debugSunLightFolder
        .add(this.sunLight.position, 'x')
        .name('X-position')
        .min(-5)
        .max(5)
        .step(0.001)

      // Y - position
      this.debugSunLightFolder
        .add(this.sunLight.position, 'y')
        .name('Y-position')
        .min(-5)
        .max(5)
        .step(0.001)

      // Z - position
      this.debugSunLightFolder
        .add(this.sunLight.position, 'z')
        .name('Z-position')
        .min(-5)
        .max(5)
        .step(0.001)
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {}
    this.environmentMap.intensity = 1.2
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.environmentMap.texture.encoding = THREE.sRGBEncoding

    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
        }
      })
    }
    this.environmentMap.updateMaterials()

    // Debug
    if (this.debug.active) {
      // Folder
      this.debugEnvironmentMapFolder =
        this.debugFolder.addFolder('environment map')

      // Intensity
      this.debugEnvironmentMapFolder
        .add(this.environmentMap, 'intensity')
        .name('intensity')
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials)
    }
  }
}
