import EventEmitter from 'events'

export class Sizes extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.aspectRatio = this.width / this.height
    this.isMobile = this.aspectRatio < 1.2

    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      const newAspectRatio = this.width / this.height
      if ((this.isMobile && newAspectRatio >= 1.2) || (!this.isMobile && newAspectRatio < 1.2)) {
        this.isMobile = newAspectRatio < 1.2
        this.emit('switchViewport', this.isMobile ? 'mobile' : 'desktop')
      }
      this.aspectRatio = newAspectRatio

      this.emit('resize')
    })
  }
}
