import * as THREE from 'three'
import Experience from '../Experience'
import firefliesVertexShader from '../shaders/Fireflies/vertex.glsl'
import firefliesFragmentShader from '../shaders/Fireflies/fragment.glsl'

export default class Fireflies {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.sizes = this.experience.sizes
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('fireflies')
      this.debugFolder.close()
      this.debugObject = {}
      this.debugObject.firefliesColor = '#6197d1'
    }

    // Events
    this.sizes.on('resize', () => this.resize())

    // Setup
    this.setGeometry()
    this.setMaterial()
    this.setModel()
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry()
    const firefliesCount = 40
    const positionArray = new Float32Array(firefliesCount * 3)
    const scaleArray = new Float32Array(firefliesCount)

    for (let i = 0; i < firefliesCount; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
      positionArray[i * 3 + 1] = 0.5 + Math.random() * 1.2
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

      scaleArray[i] = Math.random()
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x6197d1) },
        uSize: { value: 370 },
        uTime: { value: 0 },
        uFrequency: { value: 1 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: firefliesVertexShader,
      fragmentShader: firefliesFragmentShader,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.material.uniforms.uSize, 'value').min(0).max(500).step(1).name('firefliesSize')
      this.debugFolder.add(this.material.uniforms.uFrequency, 'value').min(0).max(2).step(0.01).name('firefliesFrequency')
      this.debugFolder.addColor(this.debugObject, 'firefliesColor').onChange(() => this.material.uniforms.uColor.value.set(this.debugObject.firefliesColor))
    }
  }

  setModel() {
    this.instance = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.instance)
  }

  resize() {
    this.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsedTime
  }
}
