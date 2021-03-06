import * as THREE from 'three'
import Experience from '../Experience.js'
import overlayVertexShader from '../shaders/LoadingScreen/vertex.glsl'
import overlayFragmentShader from '../shaders/LoadingScreen/fragment.glsl'
import gsap from 'gsap'
import EventEmitter from '../Utils/EventEmitter.js'

export default class LoadingScreen extends EventEmitter {
  constructor() {
    super()

    this.experience = new Experience()
    this.resources = this.experience.resources
    this.scene = this.experience.scene

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
    this.instance = new THREE.Mesh(overlayGeometry, overlayMaterial)
    this.scene.add(this.instance)

    // Events
    this.resources.on('progress', (_progress) => this.loading(_progress))
    this.resources.on('ready', () => this.ready())
  }

  loading(_progress) {
    this.loadingBar.style.transform = `scaleX(${_progress})`
  }

  ready() {
    // Wait a little
    window.setTimeout(() => {
      // Remove the overlay
      gsap.to(this.instance.material.uniforms.uAlpha, {
        duration: 1,
        value: 0,
        delay: 1,
      })

      // Update Loading Bar
      this.loadingBar.classList.add('ended')
      this.loadingBar.style.transform = ''

      this.trigger('start')
    }, 500)
  }
}
