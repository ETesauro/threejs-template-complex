import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from '../Experience'

export class Camera {
  constructor() {
    // Resources
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.mouse = this.experience.mouse
    this.time = this.experience.time

    this.scrollY = window.scrollY

    // Setup
    this.setInstance()
    this.setScrollListeners()
    // this.setOrbitControls()
  }

  setInstance() {
    // Camera Group (For Parallax)
    this.cameraGroup = new THREE.Group()
    this.scene.add(this.cameraGroup)

    // Perspective Camera
    this.cameraInitialPosition = new THREE.Vector3(0, 2.1, 7)
    this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 50)
    this.instance.position.set(this.cameraInitialPosition.x, this.cameraInitialPosition.y, this.cameraInitialPosition.z)
    this.instance.lookAt(new THREE.Vector3(0, 0, 0))
    this.instance.updateProjectionMatrix()

    // Add Camera to Group
    // this.scene.add(this.instance)
    this.cameraGroup.add(this.instance)
  }

  setScrollListeners() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY
    })
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.maxPolarAngle = Math.PI / 2.5
    this.controls.minPolarAngle = Math.PI / 3
    this.controls.minDistance = 4
    this.controls.maxDistance = 8
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    if (this.controls) this.controls.update()

    // Parallax movement
    const parallaxX = this.mouse.cursor.x
    const parallaxY = -this.mouse.cursor.y
    const deltaX = (parallaxX * 0.5 - this.cameraGroup.position.x) * 1 * this.time.delta
    const deltaY = (parallaxY * 0.5 - this.cameraGroup.position.y) * 1 * this.time.delta

    // Update Camera Position
    this.instance.position.y = this.cameraInitialPosition.y + (-this.scrollY / this.sizes.height) * 4

    // Limit the parallax movement to a maximum of 0.5 units
    this.cameraGroup.position.x += Math.max(Math.min(deltaX, 0.5), -0.5)
    this.cameraGroup.position.y += Math.max(Math.min(deltaY, 0.5), -0.5)
  }
}
