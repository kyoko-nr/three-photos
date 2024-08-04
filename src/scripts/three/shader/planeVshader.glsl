varying vec2 vUv;
uniform float uCurlR;

void main()
{
  vUv = uv;

  float theta = position.x / uCurlR;
  float tx = uCurlR * sin(theta);
  float ty = position.y;
  float tz = uCurlR * (1.0 - cos(theta));
  vec3 newPosition = vec3(tx, ty, tz);

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);;
}