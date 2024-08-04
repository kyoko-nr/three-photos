varying vec2 vUv;
uniform float uRadius;

void main()
{
  vUv = uv;

  float theta = position.x / uRadius;

  float tx = uRadius * sin(theta);
  float ty = position.y;
  float tz = uRadius * cos(theta);
  vec3 newPosition = vec3(tx, ty, tz);

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);;
}