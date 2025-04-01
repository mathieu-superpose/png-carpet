varying vec2 vUv;
varying vec4 vWorldPosition;

void main() {
    vUv = uv;

    vec4 localPosition = vec4(position, 1.);
    vec4 worldPosition = modelMatrix * localPosition;
    vWorldPosition = worldPosition;

    gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(position, 1.0);
}