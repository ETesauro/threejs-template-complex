import * as THREE from 'three'
import gsap from 'gsap'
import EventEmitter from 'events'
import Experience from './Experience'
import overlayVertexShader from './shaders/LoadingScreen/vertex.glsl'
import overlayFragmentShader from './shaders/LoadingScreen/fragment.glsl'

export default class Preloader extends EventEmitter {
  constructor() {
    super()

    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.world = this.experience.world

    // Setup
    this.loadingBar = document.querySelector('.loading-bar')

    // Overlay
    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    const overlayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1 },
      },
      vertexShader: overlayVertexShader,
      fragmentShader: overlayFragmentShader,
    })
    this.overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
    this.scene.add(this.overlay)

    // Events
    this.resources.on('progress', (v) => this.loading(v))
    this.world.on('worldready', () => this.worldReady())
  }

  loading(_progress) {
    this.loadingBar.style.transform = `scaleX(${_progress})`
  }

  worldReady() {
    // Wait a little
    window.setTimeout(() => {
      // Remove the overlay
      gsap.to(this.overlay.material.uniforms.uAlpha, {
        duration: 1,
        value: 0,
        delay: 1,
      })

      // Update Loading Bar
      this.loadingBar.classList.add('ended')
      this.loadingBar.style.transform = ''

      this.emit('start')
    }, 500)
  }
}
