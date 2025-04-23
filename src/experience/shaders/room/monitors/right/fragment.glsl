uniform sampler2D uTexture;
uniform float uAspect;
uniform float uOffsetY;  // 0-1

varying vec2 vUv;

void main() {
    // 1. scaliamo la finestra verticale
    float scaledV = vUv.y * uAspect + uOffsetY;

    // 2. campiona la texture mantenendo la larghezza inalterata
    vec4 color = texture2D(uTexture, vec2(vUv.x, scaledV));

    gl_FragColor = color;
}