varying vec2 vUv;
uniform vec3 uDisplacement;
uniform float uMinDistance;

float easeInOutCubic(float x) {
    return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
}

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
    vUv = uv;
    vec3 new_position = position;

    vec4 localPosition = vec4(position, 1.);
    vec4 worldPosition = modelMatrix * localPosition;

    float dist = (length(uDisplacement - worldPosition.rgb));
    float min_distance = uMinDistance;

    if(dist < min_distance) {
        float distance_mapped = map(dist, 0., min_distance, 0.5, 0.);
        float val = easeInOutCubic(distance_mapped) * 1.;
        new_position.z -= val * 2.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
}