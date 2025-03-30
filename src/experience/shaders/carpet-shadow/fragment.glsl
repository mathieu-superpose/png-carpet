uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
    vec3 shadowColor = vec3(0.3);

    float opacity = texture2D(uTexture, vUv).a;

    if(opacity < 0.5) {
        discard;
    }

    gl_FragColor = vec4(shadowColor, 0.5);
}