import * as THREE from 'three'
import Experience from '../Experience.js'
import overlayVertexShader from '../Shaders/loadingOverlay/vertex.glsl'
import overlayFragmentShader from '../Shaders/loadingOverlay/fragment.glsl'

export default class LoadingOverlay {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

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
}
