uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ../includes/rotate2D

void main() {
    vec3 newPosition = position;

    // Twist
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r; // Pick color from center of perlin texture (0.5) from bottom to up (uv.y)
    newPosition.xz = rotate2D(newPosition.xz, twistPerlin * 10.0);

    // Wind
    vec2 windOffset = vec2(texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5, texture(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5);
    float windStrength = 4.0;
    windOffset *= pow(uv.y, 3.0) * windStrength;

    newPosition.xz += windOffset;

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}