varying vec2 vUv;
uniform float uRadius;
uniform float uImageLength;

void main()
{
  vUv = uv;

  float theta =  position.x / (50.0 * uImageLength);
  // float theta =  1.0;

  float tx = uRadius * sin(theta);
  float ty = position.y;
  float tz = uRadius * cos(theta);
  // vec3 newPosition = vec3(tx, ty, tz);

  vec3 newPosition = position.xyz;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);;
}