import * as THREE from 'three'
import EventEmitter from './EventEmitter.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import Experience from '../Experience.js'

export default class Resources extends EventEmitter {
  constructor(assets) {
    super()

    this.assets = assets
    this.experience = new Experience()

    // Setup
    this.items = {}
    this.loadingBarElement = document.querySelector('.loading-bar')
    this.loadingOverlay = this.experience.loadingOverlay.overlay

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    // Loading Manager
    this.loadingManager = new THREE.LoadingManager(
      () => this.handleLoadingComplete(),
      (itemUrl, itemsLoaded, itemsTotal) =>
        this.handleLoadingProgress(itemUrl, itemsLoaded, itemsTotal),
      (error) => this.handleLoadingError(error)
    )

    // Other loaders
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.loadingManager
    )
  }

  startLoading() {
    // Load each source
    for (const source of this.assets) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break
        case 'texture':
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break
        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file)
          })
          break
      }
    }
  }

  handleLoadingComplete() {
    // Wait a little
    window.setTimeout(() => {
      // Animate overlay
      gsap.to(this.loadingOverlay.material.uniforms.uAlpha, {
        duration: 3,
        value: 0,
        delay: 1,
      })

      // Update loadingBarElement
      this.loadingBarElement.classList.add('ended')
      this.loadingBarElement.style.transform = ''
    }, 500)

    this.trigger('ready')
  }

  handleLoadingProgress(itemUrl, itemsLoaded, itemsTotal) {
    // Calculate the progress and update the loadingBarElement
    const progressRatio = itemsLoaded / itemsTotal
    this.loadingBarElement.style.transform = `scaleX(${progressRatio})`
  }

  handleLoadingError(error) {
    alert(error)
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file
  }
}
