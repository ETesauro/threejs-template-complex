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

    // Setup
    this.loadingContainer = document.querySelector('.loading-container')
    this.loadingProgress = document.querySelector('#loading-progress')

    this.contentContainer = document.querySelector('#content-container')

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
      this.intro()
    }, 1000)
  }

  intro() {
    // Retrieve assets for animations
    this.room = this.experience.world.room.group

    // Show UI
    this.contentContainer.classList.remove('hidden')

    // GSAP Timeline
    const timeline = new gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: 'back.out(2.2)'
      }
    })

    timeline
      // Remove Loading Container
      .to(this.loadingContainer, {
        opacity: 0
      })

    // Scale Room
    timeline.fromTo(
      this.room.scale,
      {
        x: 0.0,
        y: 0.0,
        z: 0.0
      },
      {
        x: this.sizes.isMobile ? 0.55 : 0.7,
        y: this.sizes.isMobile ? 0.55 : 0.7,
        z: this.sizes.isMobile ? 0.55 : 0.7,
        duration: 0.7
      }
    )
  }
}
