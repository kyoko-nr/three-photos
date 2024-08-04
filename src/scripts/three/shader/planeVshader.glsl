varying vec2 vUv;
uniform float uRadius;
uniform float uTheta;

void main()
{
  vUv = uv;

  // float theta = position.x / uRadius + uTheta;
  float theta = position.x / uRadius;

  // float tx = uRadius * sin(theta);
  // float tx = sin(uTheta) * uRadius;
  float tx = position.x;

  float ty = position.y;

  // float tz = uRadius * (1.0 - cos(theta));
  // float tz = cos(uTheta) * uRadius;
  float tz = position.z;
  vec3 newPosition = vec3(tx, ty, tz);

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);;
}