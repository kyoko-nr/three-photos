varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
  gl_FragColor = vec4(vUv.x, vUv.y,0.5, 1.0);
}