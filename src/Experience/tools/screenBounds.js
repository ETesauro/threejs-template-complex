export function getScreenBounds(camera, sizes) {
  const frustumHeight = camera.instance.position.z * Math.tan((camera.instance.fov * Math.PI) / 360) * 2
  const frustumWidth = frustumHeight * sizes.aspectRatio

  return {
    top: frustumHeight / 2,
    bottom: -frustumHeight / 2,
    right: frustumWidth / 2,
    left: -frustumWidth / 2
  }
}
