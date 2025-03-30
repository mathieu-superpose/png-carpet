uniform float uTime;

varying vec3 vNormal;

void main() {
    vNormal = normalize(normalMatrix * normal);

    vec3 ringPosition = position;
    ringPosition.y += sin(position.x * 10.0 + uTime * 4.0) * 0.1;
    ringPosition.y += sin(position.z * 10.0 + uTime * 3.0) * 0.1;
    ringPosition.z += sin(position.y * 10.0 + uTime * 2.0) * 0.1;

    gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(ringPosition, 1.0);
}