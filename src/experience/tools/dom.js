// List of mobile device identifiers
const mobileDeviceRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i

/**
 * Detects the type of device based on the user agent string.
 * @returns {string} 'Mobile' if the device is a mobile device, otherwise 'Desktop'.
 */
export const detectDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return mobileDeviceRegex.test(userAgent) ? 'Mobile' : 'Desktop'
}
