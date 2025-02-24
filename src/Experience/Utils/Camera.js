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

    // Setup
    this.setInstance()
    // this.setOrbitControls()
  }

  setInstance() {
    // Camera Group (For Parallax)
    this.cameraGroup = new THREE.Group()
    this.scene.add(this.cameraGroup)

    // Perspective Camera
    this.instance = new THREE.PerspectiveCamera(40, this.sizes.width / this.sizes.height, 0.1, 80)
    this.instance.position.set(3, 3, 5)
    this.instance.lookAt(new THREE.Vector3(0, 0, 0))
    // this.scene.add(this.instance)

    // Add Camera to Group
    this.cameraGroup.add(this.instance)
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
    this.cameraGroup.position.x += (parallaxX * 0.5 - this.cameraGroup.position.x) * 1 * this.time.delta
    this.cameraGroup.position.y += (parallaxY * 0.5 - this.cameraGroup.position.y) * 1 * this.time.delta
  }
}
