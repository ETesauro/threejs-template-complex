import gsap from 'gsap'
import EventEmitter from 'events'
import Experience from './Experience'

export default class Preloader extends EventEmitter {
  constructor() {
    super()

    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.world = this.experience.world

    // Setup
    this.loadingContainer = document.querySelector('.loading-container')
    // this.loadingBar = document.querySelector('.loading-bar')

    // Events
    this.resources.on('progress', v => this.onProgress(v))
    this.world.on('worldready', () => this.worldReady())
  }

  onProgress(_progress) {
    // this.loadingBar.style.transform = `scaleX(${_progress})`
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
    // this.portal = this.experience.world.portal.model
    // this.fireflies = this.experience.world.fireflies
    this.room = this.experience.world.room.group
  }

  intro() {
    // Remove Loading Bar
    // this.loadingBar.classList.add('ended')
    // this.loadingBar.style.transform = ''

    // GSAP Timeline
    this.timeline = new gsap.timeline()
    this.timeline
      // Remove Loading Container
      .to(this.loadingContainer, {
        opacity: 0,
        delay: 1,
        duration: 0.5
      })

      // Scale Room
      .fromTo(
        this.room.scale,
        {
          x: 0.0,
          y: 0.0,
          z: 0.0
        },
        {
          x: 0.7,
          y: 0.7,
          z: 0.7,
          ease: 'back.out(2.2)',
          duration: 0.4
        }
      )

    // // Scale Portal
    // .fromTo(
    //   this.portal.scale,
    //   {
    //     x: 0,
    //     y: 0,
    //     z: 0
    //   },
    //   {
    //     x: 1,
    //     y: 1,
    //     z: 1,
    //     ease: 'back.out(2.2)',
    //     duration: 0.4
    //   }
    // )

    // // Scale Fox
    // .fromTo(
    //   this.fox.scale,
    //   {
    //     x: 0.0,
    //     y: 0.0,
    //     z: 0.0
    //   },
    //   {
    //     x: 0.008,
    //     y: 0.008,
    //     z: 0.008,
    //     ease: 'back.out(2.2)',
    //     duration: 0.4
    //   }
    // )
  }
}
