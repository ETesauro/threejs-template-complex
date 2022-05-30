import Experience from '../Experience.js'
import * as THREE from 'three'
import EventEmitter from '../Utils/EventEmitter.js'
import gsap, { Power4 } from 'gsap'
import shaderFragment from '../shaders/AreaBorder/fragment.glsl'
import shaderVertex from '../shaders/AreaBorder/vertex.glsl'

export default class StartingScreen extends EventEmitter {
  constructor() {
    super()

    // Options
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.renderer = this.experience.renderer
    this.resources = this.experience.resources
    this.time = this.experience.time

    // Setup
    this.position = new THREE.Vector2(0, 0)

    this.instance = new THREE.Object3D()
    this.instance.position.x = this.position.x
    this.instance.position.y = this.position.y
    this.instance.rotation.x = -Math.PI / 2
    this.instance.matrixAutoUpdate = true
    this.instance.updateMatrix()

    // Borders
    this.setLabel()
    this.setFloorBorder()

    // Add it to the scene
    this.scene.add(this.instance)

    // Events
    this.resources.on('progress', (_progress) => this.loading(_progress))
    this.resources.on('ready', () => this.ready())
  }

  setLabel() {
    // Loading label
    this.loadingLabel = {}
    this.loadingLabel.geometry = new THREE.PlaneBufferGeometry(2.5, 2.5 / 4)
    this.loadingLabel.image = new Image()
    this.loadingLabel.image.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABABAMAAAAHc7SNAAAAMFBMVEUAAAD///9ra2ucnJzR0dH09PQmJiaNjY24uLjp6end3d1CQkLFxcVYWFiqqqp9fX3nQ5qrAAAEVUlEQVRo3u3YT08TQRQA8JEtW6CATGnDdvljaTwYE2IBI/HGRrwSetGTsZh4MPFQYiQe229gE++WePFY9Oqh1cRzieEDYIgXLxjPJu5M33vbZQszW+fgoS+B7ewO836znRl2lg1jGMP4P2Okw0yFvaKsklr3I99Tvl3iPPelGbQhKqxB4eN6N/7gVcsvbEAz1F4RLn67zzl/v6/oLvejGBQ9LsNphio4UFjmEAsVJuOK/zkDtc6w+gyTcZ3LyP6IAzjBDA+pj6LkEgAjW4kANsMAC6vmOvqAMU5RgVOTskQACicCmCcA9AXjkT5gj1MswqlxWcoTgKJ6HuAQAD5guNoAu8QpMnBul1ONMGD2PCBbRgDAKYq6AEtmXvtdj3S6GhRyW1t1DvkAgM0ggG7mu1t3xWFHFzAqv3wYCi0mY1UCGgiQPU+1oWIY8LoXcAA3qeYfr+kClvHW14PJ5OfCAgHYNAoDAORBQIrDvHjqH5c0ANTbORzBacbAQgUC2IAKAzI9gCSHlWEMLmgBPJxMvyARpIICALDm4nkAbwIA71EZx5UOgO48JnLoOhQIAN9sOgKoBoAE5r0aB8ARcNhtFzrg0VQmwCp8CAMeAADGc44S5GMBsF1aCEU2LcAcAPDCvwFytBDehCaUgJxRAKeF8BNUUQJ43iiAUlqwFKoBrTCAHjiagwEgU0YM5IYWYD4KoIgPwIXQwUbVgCXzgLpIBJNeDciWTQNskVsq1ADX/6kYBdCTjse5owbMiX+IpgGWOCPSuWpA2vN/TAMm5QTYg5IC4FdbMA0YF5Nb5s2rAaLyhzBgektGZWDArrgqi0U1QHxf38OABDwUDgTAjGfyPlTVgJT/67FBACbqyGYaaoBctQwD2vI4DecVAPkgZRhQlxPQks2rAePGAbZsRlaa1QBYEQBUHRCAmaXD0QDYxgFWdye05R9cDQCrmQYkeBA6gGXTgNEeQF4DMG4S4MLjOUZRA5A0CcjADgmjqgGwSwSg9wK1GIBS74KTgTxv/EHoiaVQsTOS5RoCJuiZyosB8EIrHpyowFiYofO0i4wCjhCQwL0hq2sCaFNM22S4JXloLk0AuLDTBzCBAAt3xykeA7CHe/mDbgdTvQ9GswSAwdbqA0giYASHjQUJnhQKhQ6z/d8rDA4hAG2Dsk042ejubHMM2nV6AMf93pCkaRjhh0WsWuz+6aasl2FwiAImReEts1/CSaFfwFouAJxC4RW+I4oCThBQE1X2WbKkBFDkqYDtJ0SHaYKq3pJJwCECjjiFPoC1w+2P0gumurgeBjT6AhIIGKOelGIAngWlFnRnMZjMIYBb7gtIIsAuYU+8GICpEhYyZVgIZ2g9rYYAX1lfAKvjnxzjnWrHALDn9K1h2k2aoI1ewGd2AWAVAVMHcKdW4wDYje739pNufJXhkJohgLu9zy4CHCKAJYUge4ddCojGyPrp9kaHmYjUi9N7+2wYwxjGZfEXMKxGE0GkkfIAAAAASUVORK5CYII='
    this.loadingLabel.texture = new THREE.Texture(this.loadingLabel.image)
    this.loadingLabel.texture.magFilter = THREE.NearestFilter
    this.loadingLabel.texture.minFilter = THREE.LinearFilter
    this.loadingLabel.texture.needsUpdate = true
    this.loadingLabel.material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      color: 0xffffff,
      alphaMap: this.loadingLabel.texture,
    })
    this.loadingLabel.mesh = new THREE.Mesh(
      this.loadingLabel.geometry,
      this.loadingLabel.material
    )
    this.loadingLabel.mesh.matrixAutoUpdate = false
    this.instance.add(this.loadingLabel.mesh)

    // Start label
    this.startLabel = {}
    this.startLabel.geometry = new THREE.PlaneBufferGeometry(2.5, 2.5 / 4)
    this.startLabel.image = new Image()
    this.startLabel.image.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABABAMAAAAHc7SNAAAAMFBMVEUAAAD///+cnJxra2vR0dHd3d0mJib09PRYWFjp6em4uLhCQkKqqqqNjY19fX3FxcV3XeRgAAADsklEQVRo3u3YsU9TQRwH8KNgLSDQg9ZCAak1IdE4PKPu1NTEsSzOMDl3I3GpcXAxBhLjXFxNjJgQJ2ON0Rnj4uAAEyv8B/L7tV++5/VN+CM69Ldwfa+534d7d793VzeIQQzi/49c4v5lPF/1vvhFm++rjIpcyErrmrSCuz+cxng1iL/If8drPJD2Lc/Iy4VhaZWlFd4tLPfuMc6e/5LvRilJA2SkVSQA8c0OsI0uNtIAU9rsB8y1rAAZjyimAUa1mQDAeGwF+MA+9lIA69qs9AMKVoDP8vhf35A+NiMAc7YJKFSrX7tcI8BW9+k/O/kz6zSunjSnncMHiQYBcmdXrh3xCVbc2WO8N/YZZI0AxxwMArKivmwAwFKSPmV0UwBbCpj5E+C+yzUbQAaJVwUSA9SFjwFgHQ0jAMrBWgzAPCtHgFFbQAlpEwKC2zWUQgJGbAH+naSdu/fTxQAthPL5/ADD6OCpQwCAsb6LsbEGcBluOAYBmG2fkMIawHVWXEsDIGUGpZCAIRsAS93DPgDbhUmUQgKe2NUB90hfhK0YwEJYHkYpJGDbqBKiB86CGLAlzd6/S8CEvh8sACiBvrSXCshKblWEgNy2vkAMAHwGfjECcJHOu5qUQgDm6vXulshZAXJNL9GJAeg+LxeKPQBj1gzgdlnuCWAhbOi7LwaU9u0A2VWPpUgAC+GR5k0iwBtnB3Bj3qMaRYB17X0IOQhYcjYA7guxxyIAGfd1HNqchPfly7aACQUshAA2W1r5G1yG415YpgB3qIIkAHBH2D075QnQ10fHDsCl+CoGSKpiN8kMAVqIN00BsitnVgKyPIBMB4ADKU92AA5BKQIgszjKBGBLagpwB5xZBGS6pbcuizQAXMA6NAK86OCQ3okAI55BQPe7VoDxXzU/iwPASgS4GAASAiYxWgYAzvAa1loA2AkAFQIU2zEELCJtDDgIAG0CFLvp7LblC2kAtF6eTEJJ2CBAr88bAXKY4WkASbzXmwt5AvTvohHA4WSUBmj2Jt+IThQChrAOLQC13vPFMAOAQwuyTAeAKVQto3OBDOdESh2YxNZPbpYBQNbEAoBfod7e1i1BiwB0voSZWgwAOWgtAGPhD18E8ASIiRIAXNPwXJBtcqMbAFAIr5weIJMAcIx1aAAIqk0lAuycompyFwBMHAsAZlj/lgw0rsy2AkhbsgK4Q+70CUBjxeFXsUb0G1HJDJC9rketZRcCWCJwHM8DgJm7b7ch+XizXm25QQxiEOcXvwGCWOhbCZC0qAAAAABJRU5ErkJggg=='
    this.startLabel.texture = new THREE.Texture(this.startLabel.image)
    this.startLabel.texture.magFilter = THREE.NearestFilter
    this.startLabel.texture.minFilter = THREE.LinearFilter
    this.startLabel.texture.needsUpdate = true
    this.startLabel.material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      color: 0xffffff,
      alphaMap: this.startLabel.texture,
    })
    this.startLabel.material.opacity = 0
    this.startLabel.mesh = new THREE.Mesh(
      this.startLabel.geometry,
      this.startLabel.material
    )
    this.startLabel.mesh.matrixAutoUpdate = false
    this.instance.add(this.startLabel.mesh)
  }

  setFloorBorder() {
    this.floorBorder = {}
    this.floorBorder.geometry = this.setGeometry(4, 4, 0.25)
    this.floorBorder.material = this.setMaterial()
    this.floorBorder.material.uniforms.uColor.value = new THREE.Color(0xffffff)
    this.floorBorder.material.uniforms.uAlpha.value = 1
    this.floorBorder.material.uniforms.uLoadProgress.value = 1
    this.floorBorder.material.uniforms.uProgress.value = 1
    this.floorBorder.mesh = new THREE.Mesh(
      this.floorBorder.geometry,
      this.floorBorder.material
    )
    this.floorBorder.mesh.matrixAutoUpdate = false

    this.instance.add(this.floorBorder.mesh)
  }

  setGeometry(_width, _height, _thickness) {
    // buffers
    const length = 8

    const vertices = new Float32Array(length * 3)
    const indices = new Uint32Array(length * 6)

    const outerWidth = _width
    const outerHeight = _height

    const innerWidth = outerWidth - _thickness
    const innerHeight = outerHeight - _thickness

    // Vertices
    vertices[0 * 3 + 0] = innerWidth * 0.5
    vertices[0 * 3 + 1] = innerHeight * 0.5
    vertices[0 * 3 + 2] = 0

    vertices[1 * 3 + 0] = innerWidth * 0.5
    vertices[1 * 3 + 1] = -innerHeight * 0.5
    vertices[1 * 3 + 2] = 0

    vertices[2 * 3 + 0] = -innerWidth * 0.5
    vertices[2 * 3 + 1] = -innerHeight * 0.5
    vertices[2 * 3 + 2] = 0

    vertices[3 * 3 + 0] = -innerWidth * 0.5
    vertices[3 * 3 + 1] = innerHeight * 0.5
    vertices[3 * 3 + 2] = 0

    vertices[4 * 3 + 0] = outerWidth * 0.5
    vertices[4 * 3 + 1] = outerHeight * 0.5
    vertices[4 * 3 + 2] = 0

    vertices[5 * 3 + 0] = outerWidth * 0.5
    vertices[5 * 3 + 1] = -outerHeight * 0.5
    vertices[5 * 3 + 2] = 0

    vertices[6 * 3 + 0] = -outerWidth * 0.5
    vertices[6 * 3 + 1] = -outerHeight * 0.5
    vertices[6 * 3 + 2] = 0

    vertices[7 * 3 + 0] = -outerWidth * 0.5
    vertices[7 * 3 + 1] = outerHeight * 0.5
    vertices[7 * 3 + 2] = 0

    // Index
    indices[0 * 3 + 0] = 4
    indices[0 * 3 + 1] = 0
    indices[0 * 3 + 2] = 1

    indices[1 * 3 + 0] = 1
    indices[1 * 3 + 1] = 5
    indices[1 * 3 + 2] = 4

    indices[2 * 3 + 0] = 5
    indices[2 * 3 + 1] = 1
    indices[2 * 3 + 2] = 2

    indices[3 * 3 + 0] = 2
    indices[3 * 3 + 1] = 6
    indices[3 * 3 + 2] = 5

    indices[4 * 3 + 0] = 6
    indices[4 * 3 + 1] = 2
    indices[4 * 3 + 2] = 3

    indices[5 * 3 + 0] = 3
    indices[5 * 3 + 1] = 7
    indices[5 * 3 + 2] = 6

    indices[6 * 3 + 0] = 7
    indices[6 * 3 + 1] = 3
    indices[6 * 3 + 2] = 0

    indices[7 * 3 + 0] = 0
    indices[7 * 3 + 1] = 4
    indices[7 * 3 + 2] = 7

    const geometry = new THREE.BufferGeometry()

    // Set indices
    geometry.setIndex(new THREE.BufferAttribute(indices, 1, false))

    // Set attributes
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )

    return geometry
  }

  setMaterial() {
    const uniforms = {
      uColor: { value: null },
      uAlpha: { value: null },
      uLoadProgress: { value: null },
      uProgress: { value: null },
    }

    const material = new THREE.ShaderMaterial({
      wireframe: false,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      uniforms,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment,
    })

    return material
  }

  // Events
  loading(_progress) {
    this.floorBorder.material.uniforms.uProgress.value = _progress
  }

  ready() {
    // Wait a little
    window.setTimeout(() => {
      // Change Label
      gsap.to(this.loadingLabel.material, {
        duration: 0.1,
        opacity: 0,
      })
      gsap.to(this.startLabel.material, {
        duration: 0.1,
        delay: 0.1,
        opacity: 1,
      })

      // Remove the square
      gsap.to(this.floorBorder.material.uniforms.uAlpha, {
        value: 0,
        duration: 1,
        ease: Power4.easeInOut,
      })
      gsap.to(this.instance.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: Power4.easeInOut,
      })

      // Start the experience
      window.setTimeout(() => this.trigger('start'), 800)
    }, 500)
  }
}
