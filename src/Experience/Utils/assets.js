class LoaderType {
  static CubeTexture = 'cubeTexture'
  static Texture = 'texture'
  static GLTFModel = 'gltfModel'
}

export default [
  {
    name: 'environmentMapTexture',
    type: LoaderType.CubeTexture,
    path: [
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/pz.jpg',
      'textures/environmentMap/nz.jpg',
    ],
  },
  {
    name: 'dirtColorTexture',
    type: LoaderType.Texture,
    path: 'textures/dirt/color.jpg',
  },
  {
    name: 'dirtNormalTexture',
    type: LoaderType.Texture,
    path: 'textures/dirt/normal.jpg',
  },
  {
    name: 'foxModel',
    type: LoaderType.GLTFModel,
    path: '/models/Fox/glTF/Fox.gltf',
  },
  {
    name: 'hamburgerModel',
    type: LoaderType.GLTFModel,
    path: '/models/Hamburger/glTF/Hamburger.gltf',
  },
  {
    name: 'tableModel',
    type: LoaderType.GLTFModel,
    path: '/models/Table/glTF/Table.gltf',
  },
  {
    name: 'guyModel',
    type: LoaderType.GLTFModel,
    path: '/models/Guy/glTF/Guy.gltf',
  },
]
