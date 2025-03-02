class LoaderType {
  static cube = 'cube'
  static texture = 'texture'
  static gltf = 'gltf'
  static draco = 'draco'
}

export const assets = [
  // Room
  { name: 'roomTexture', type: LoaderType.texture, path: 'textures/room/room_baked.jpg' },
  { name: 'roomModel', type: LoaderType.gltf, path: '/models/Room/room.glb' },

  // Shadow Catcher
  { name: 'shadowCatcherTexture', type: LoaderType.texture, path: 'textures/room/shadow.jpg' },
  { name: 'shadowCatcherModel', type: LoaderType.gltf, path: '/models/Room/shadow_catcher.glb' },

  // // Portal
  // { name: 'portalTexture', type: LoaderType.texture, path: 'textures/portal/baked.jpg' },
  // { name: 'portalModel', type: LoaderType.gltf, path: '/models/Portal/glb/Portal.glb' },

  // // Fox
  // { name: 'foxModel', type: LoaderType.gltf, path: '/models/Fox/glTF/Fox.gltf' },

  // // Dirt
  // { name: 'dirtColorTexture', type: LoaderType.texture, path: 'textures/dirt/color.jpg' },
  // { name: 'dirtNormalTexture', type: LoaderType.texture, path: 'textures/dirt/normal.jpg' },

  // Environment Map
  {
    name: 'environmentMapTexture',
    type: LoaderType.cube,
    path: [
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/pz.jpg',
      'textures/environmentMap/nz.jpg'
    ]
  }
]
