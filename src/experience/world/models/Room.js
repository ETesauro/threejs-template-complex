import * as THREE from 'three'
import Experience from '../../Experience'

import { getScreenBounds } from '../../tools'

import leftMonitorVertexShader from '../../shaders/room/monitors/left/vertex.glsl'
import leftMonitorFragmentShader from '../../shaders/room/monitors/left/fragment.glsl'
import rightMonitorVertexShader from '../../shaders/room/monitors/right/vertex.glsl'
import rightMonitorFragmentShader from '../../shaders/room/monitors/right/fragment.glsl'

import shadowCatcherFragmentShader from '../../shaders/shadowCatcher/fragment.glsl'
import shadowCatcherVertexShader from '../../shaders/shadowCatcher/vertex.glsl'

import smokeVertexShader from '../../shaders/smoke/vertex.glsl'
import smokeFragmentShader from '../../shaders/smoke/fragment.glsl'

import gsap from 'gsap'

export class Room {
  #experience
  #scene
  #resources
  #camera
  #sizes
  #time
  #debug
  #debugFolder

  #roomResource
  #roomTexture
  #codeTexture
  #discordTexture
  #roomBakedMaterial
  #leftMonitorMaterial
  #rightMonitorMaterial
  #smokeMaterial
  #smokeGeometry
  #smokeMesh

  #shadowCatcherResource
  #shadowCatcherTexture

  constructor() {
    this.#experience = new Experience()
    this.#scene = this.#experience.scene
    this.#resources = this.#experience.resources
    this.#camera = this.#experience.camera
    this.#sizes = this.#experience.sizes
    this.#time = this.#experience.time
    this.#debug = this.#experience.debug

    this.desiredRoomScale = this.#sizes.isMobile ? 0.55 : 0.7

    // Debug
    if (this.#debug.active) {
      this.#debugFolder = this.#debug.ui.addFolder('room')
      this.#debugFolder.close()
    }

    // Setup
    this.#roomResource = this.#resources.items.roomModel
    this.#shadowCatcherResource = this.#resources.items.shadowCatcherModel

    this.setMaterials()
    this.setModels()
    this.setPositions()
  }

  // -> START MATERIALS
  setMaterials() {
    // Room Baked Texture
    this.#roomTexture = this.#resources.items.roomTexture
    this.#roomTexture.flipY = false
    this.#roomTexture.colorSpace = THREE.SRGBColorSpace
    this.#roomBakedMaterial = new THREE.MeshBasicMaterial({ map: this.#roomTexture })

    // Shadow Catcher Texture
    this.#shadowCatcherTexture = this.#resources.items.shadowCatcherTexture
    this.#shadowCatcherTexture.flipY = false
    this.#shadowCatcherTexture.colorSpace = THREE.SRGBColorSpace
    this.shadowCatcherMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uColor: { value: new THREE.Color('#dbc3a0') },
        uOpacity: { value: 1 },
        uAlphaMask: { value: this.#shadowCatcherTexture }
      },
      vertexShader: shadowCatcherVertexShader,
      fragmentShader: shadowCatcherFragmentShader
    })

    // Left Monitor Material
    this.#discordTexture = this.#resources.items.leftMonitorTexture
    this.#discordTexture.flipY = false
    this.#leftMonitorMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: this.#discordTexture }
      },
      vertexShader: leftMonitorVertexShader,
      fragmentShader: leftMonitorFragmentShader
    })

    // Right Monitor Material
    this.#codeTexture = this.#resources.items.rightMonitorTexture
    this.#codeTexture.flipY = false
    this.#rightMonitorMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: this.#codeTexture },
        uAspect: { value: this.#codeTexture.image.width / this.#codeTexture.image.height - 0.15 },
        uOffsetY: { value: 0.0 } // [0-1]
      },
      transparent: true,
      vertexShader: rightMonitorVertexShader,
      fragmentShader: rightMonitorFragmentShader
    })
    this.startCodeMonitorAnimation()

    // Smoke Material
    const alphaMap = this.#resources.items.smokeAlphaMap
    alphaMap.wrapS = THREE.RepeatWrapping
    alphaMap.wrapT = THREE.RepeatWrapping
    this.#smokeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPerlinTexture: new THREE.Uniform(alphaMap)
      },
      vertexShader: smokeVertexShader,
      fragmentShader: smokeFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    })
  }

  startCodeMonitorAnimation() {
    const u = this.#rightMonitorMaterial.uniforms.uOffsetY
    function startMonitorLoop() {
      gsap
        .timeline({ defaults: { ease: 'power1.inOut' }, onComplete: startMonitorLoop })

        // Pausa all'inizio
        .to({}, { duration: 3 })

        // 0 → 0.3 in 0.5 s
        .fromTo(u, { value: 0.0 }, { value: 0.3, duration: 0.5 })

        // pausa random 3-4 s
        .to({}, { duration: gsap.utils.random(3, 4) }) // tween “vuoto” usato solo come delay

        // 0.3 → 0.4 in 0.5 s
        .to(u, { value: 0.5, duration: 1 })

        // pausa fissa 4 s
        .to({}, { duration: gsap.utils.random(1.5, 3) })

        // 0.4 → 0.7 in 0.5 s
        .to(u, { value: 0.7, duration: 0.8 })

        // pausa random 3-4 s
        .to({}, { duration: gsap.utils.random(3, 4) }) // tween “vuoto” usato solo come delay

        // 0.7 → 0.0 in 2 s
        .to(u, { value: 0.0, duration: 2 })
    }
    startMonitorLoop()
  }
  // -> END MATERIALS

  // -> START MODELS
  setModels() {
    this.group = new THREE.Group() // Contiene roomGroup e shadowCatcher

    // Set Models
    this.setRoom()
    this.setShadowCatcher()
    this.setSmoke()

    this.#scene.add(this.group)
  }

  setRoom() {
    // All Model
    const roomModel = this.#roomResource.scene
    roomModel.name = 'room'

    // Debug
    if (this.#debug.active) {
      this.#debugFolder.add(roomModel, 'visible')
    }

    // Room Objects
    this.desk = roomModel.children.find(child => child.name === 'desk')
    this.leftMonitor = roomModel.children.find(child => child.name === 'left_monitor')
    this.rightMonitor = roomModel.children.find(child => child.name === 'right_monitor')
    this.books = roomModel.children.find(child => child.name === 'books')
    this.guitar = roomModel.children.find(child => child.name === 'guitar')
    this.lavagna = roomModel.children.find(child => child.name === 'blackboard')
    this.quadro = roomModel.children.find(child => child.name === 'framework')

    // Materials
    this.desk.material = this.#roomBakedMaterial
    this.leftMonitor.material = this.#leftMonitorMaterial
    this.rightMonitor.material = this.#rightMonitorMaterial

    this.guitar.material = this.#roomBakedMaterial
    this.books.material = this.#roomBakedMaterial
    this.lavagna.material = this.#roomBakedMaterial
    this.quadro.material = this.#roomBakedMaterial

    this.group.add(roomModel) // * Add Room Model to Group
  }

  setShadowCatcher() {
    // Shadow Catcher
    const shadowCatcherModel = this.#shadowCatcherResource.scene
    shadowCatcherModel.name = 'shadow-catcher'

    this.shadowCatcher = shadowCatcherModel.children.find(child => child.name === 'shadow_catcher')
    this.shadowCatcher.material = this.shadowCatcherMaterial

    this.group.add(shadowCatcherModel) // * Add Shadow Catcher Model to Group
  }

  setSmoke() {
    this.#smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64)
    this.#smokeGeometry.translate(0, 0.5, 0)
    this.#smokeGeometry.scale(0.25, 1, 0.25)

    this.#smokeMesh = new THREE.Mesh(this.#smokeGeometry, this.#smokeMaterial)
    this.#smokeMesh.position.set(2.55, 1.7, -1.2)
    this.group.add(this.#smokeMesh)
  } // -> END MODELS

  // -> START POSITIONS
  setPositions() {
    if (this.#sizes.isMobile) this.setMobilePosition()
    else this.setDesktopPosition()
  }

  setDesktopPosition() {
    this.group.position.set(0.71, -1.17, 1.41)
    this.group.rotation.set(0, 5.45, 0)
  }

  setMobilePosition() {
    const bounds = getScreenBounds(this.#camera, this.#sizes)

    this.group.position.set(-0.32, bounds.bottom + this.group.scale.y / 2, 0)
    this.group.rotation.set(0, -6.81, 0)
  }
  // -> END POSITIONS

  // - Utils
  update() {
    this.#smokeMaterial.uniforms.uTime.value = this.#time.elapsedTime * 1.5
  }

  switchViewport(device) {
    if (device === 'desktop') this.setDesktopPosition()
    else this.setMobilePosition()
  }
}
