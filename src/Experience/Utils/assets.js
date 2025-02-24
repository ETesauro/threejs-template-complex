class LoaderType {
  static CubeTexture = 'cubeTexture'
  static Texture = 'texture'
  static GLTFModel = 'gltfModel'
}

export const assets = [
  {
    name: 'environmentMapTexture',
    type: LoaderType.CubeTexture,
    path: [
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/pz.jpg',
      'textures/environmentMap/nz.jpg'
    ]
  },
  {
    name: 'portalTexture',
    type: LoaderType.Texture,
    path: 'textures/portal/baked.jpg'
  },
  {
    name: 'dirtColorTexture',
    type: LoaderType.Texture,
    path: 'textures/dirt/color.jpg'
  },
  {
    name: 'dirtNormalTexture',
    type: LoaderType.Texture,
    path: 'textures/dirt/normal.jpg'
  },
  {
    name: 'foxModel',
    type: LoaderType.GLTFModel,
    path: '/models/Fox/glTF/Fox.gltf'
  },
  {
    name: 'portalModel',
    type: LoaderType.GLTFModel,
    path: '/models/Portal/glb/Portal.glb'
  }
]
