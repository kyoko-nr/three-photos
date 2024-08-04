varying vec2 vUv;
uniform float uRadius;

void main()
{
  vUv = uv;

  float theta = position.x / (uRadius * 0.75);

  float tx = uRadius * sin(theta) + position.x;
  float ty = position.y;
  float tz = uRadius * cos(theta);
  vec3 newPosition = vec3(tx, ty, tz) + position.z;

  // vec3 newPosition = position.xyz;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);;
}