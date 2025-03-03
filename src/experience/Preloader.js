import gsap from 'gsap'
import EventEmitter from 'events'
import Experience from './Experience'

export default class Preloader extends EventEmitter {
  constructor() {
    super()

    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.world = this.experience.world

    // Loading
    this.loadingContainer = document.querySelector('.loading-container')
    this.loadingProgress = document.querySelector('#loading-progress')

    // UI Container and Sections
    this.contentContainer = document.querySelector('#content-container')
    this.aboutSection = document.querySelector('#about-section')

    // Events
    this.resources.on('progress', v => this.onProgress(v))
    this.world.on('worldready', () => this.worldReady())
  }

  onProgress(_progress) {
    this.loadingProgress.innerHTML = `${Math.round(_progress * 100)}%`
  }

  worldReady() {
    // Wait a little
    window.setTimeout(() => {
      this.playIntro()
    }, 1000)
  }

  playIntro() {
    // Show UI
    this.contentContainer.classList.remove('hidden')

    // Retrieve assets for animations
    this.room = this.experience.world.room
    const desiredRoomScale = this.sizes.isMobile ? 0.55 : 0.7

    // GSAP Timeline
    const timeline = new gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: 'elastic(1, 1)'
      }
    })

    // Remove Loading Container
    timeline.to(this.loadingContainer, { opacity: 0 })

    // Animate Room
    timeline
      // Scale desk group
      .fromTo(this.room.group.scale, { x: 0.0, y: 0.0, z: 0.0 }, { x: desiredRoomScale, y: desiredRoomScale, z: desiredRoomScale, duration: 1 })
      // Fade in UI
      .fromTo(this.aboutSection, { y: -200, opacity: 0 }, { y: 0, opacity: 1, ease: 'power4.out', duration: 1 }, '<0.5') // Fai partire questa animazione 0.5 secondi dopo l'inizio della precedente animazione
      // Fade in shadow catcher
      .fromTo(this.room.shadowCatcherMaterial.uniforms.uOpacity, { value: 0 }, { value: 1, duration: 1, ease: 'power1.out' }, '<0') // Sincronizzata con la precedente (parte 0 secondi dopo la precedente)
  }
}
