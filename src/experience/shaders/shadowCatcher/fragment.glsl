uniform sampler2D uAlphaMask;
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;

void main() {
    float alpha = texture2D(uAlphaMask, vUv).r;
    alpha = (1.0 - alpha) * uOpacity;

    gl_FragColor = vec4(uColor, alpha);

    #include <colorspace_fragment>
}
