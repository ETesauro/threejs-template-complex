import * as THREE from 'three'
import gsap from 'gsap'
import EventEmitter from 'events'
import Experience from './Experience'
import overlayVertexShader from './shaders/Preloader/vertex.glsl'
import overlayFragmentShader from './shaders/Preloader/fragment.glsl'

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
    this.setOverlay()

    // Events
    this.resources.on('progress', (v) => this.loading(v))
    this.world.on('worldready', () => this.worldReady())
  }

  setOverlay() {
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
  }

  loading(_progress) {
    this.loadingBar.style.transform = `scaleX(${_progress})`
  }

  worldReady() {
    // Wait a little
    window.setTimeout(() => {
      this.setAssets()
      this.intro()
    }, 500)
  }

  setAssets() {
    // this.fox = this.experience.world.fox.model
    // this.hamburger = this.experience.world.hamburger.model
    // this.table = this.experience.world.table.model
    // this.guy = this.experience.world.guy.model
    this.portal = this.experience.world.portal.model
    this.fireflies = this.experience.world.fireflies
  }

  intro() {
    // Remove Loading Bar
    this.loadingBar.classList.add('ended')
    this.loadingBar.style.transform = ''

    // GSAP Timeline
    this.timeline = new gsap.timeline()
    this.timeline
      // Remove overlay
      .to(this.overlay.material.uniforms.uAlpha, {
        value: 0,
        delay: 1,
        duration: 0.5,
      })
      // // Scale Guy
      // .to(this.guy.scale, {
      //   x: 1.5,
      //   y: 1.5,
      //   z: 1.5,
      //   ease: 'back.out(2.2)',
      //   duration: 0.4,
      // })
      // // Scale Fox
      // .to(this.fox.scale, {
      //   x: 0.02,
      //   y: 0.02,
      //   z: 0.02,
      //   ease: 'back.out(2.2)',
      //   duration: 0.4,
      // })
      // // Scale Table
      // .to(this.table.scale, {
      //   x: 0.3,
      //   y: 0.3,
      //   z: 0.3,
      //   ease: 'back.out(2.2)',
      //   duration: 0.4,
      // })
      // // Scale Hamburger
      // .to(
      //   this.hamburger.scale,
      //   {
      //     x: 0.03,
      //     y: 0.03,
      //     z: 0.03,
      //     ease: 'back.out(2.2)',
      //     duration: 0.4,
      //   },
      //   'hamburger'
      // )
      // // Rotate Hamburger
      // .to(
      //   this.hamburger.rotation,
      //   {
      //     y: 4 * Math.PI + Math.PI / 4,
      //     ease: 'power2.out',
      //     duration: 1.5,
      //   },
      //   'hamburger'
      // )
      // Scale Portal
      .to(
        this.portal.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2.2)',
          duration: 0.4,
        },
        'portal'
      )
  }
}
