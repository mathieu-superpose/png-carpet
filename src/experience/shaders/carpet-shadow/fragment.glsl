uniform sampler2D uTexture;
uniform vec3 uShadowPosition;

varying vec2 vUv;
varying vec4 vWorldPosition;

float easeInOutCubic(float x) {
    return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
}

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
    vec3 shadowColor = vec3(0.01);

    float textured = texture2D(uTexture, vUv).a;

    float dist = (length(uShadowPosition - vWorldPosition.rgb));
    float min_distance = 3.5;
    float opacity = 0.0;
    float displacement = 0.0;

    if(dist < min_distance) {
        float distance_mapped = map(dist, 0., min_distance, 0.5, 0.);
        float val = easeInOutCubic(distance_mapped) * 2.5;
        opacity = max(0.3, 1.0 - val * 0.8);
        displacement = map(dist, 0., min_distance, 0.0, 0.5);

        if (displacement > 0.2) {
            discard;
        }
    } 

    if(textured < 0.5) {
        discard;
    }

    gl_FragColor = vec4(shadowColor, opacity);
}