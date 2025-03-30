uniform vec3 uColor;
uniform float uAmbient;
uniform vec3 uLightPosition;

varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 normalizedLight = normalize(uLightPosition);

    vec3 lightDirection = gl_FragCoord.xyz - normalizedLight;
    float intensity = max(dot(normal, lightDirection) * 0.001, uAmbient);

    vec3 lighting = vec3(0.4, 0.4, 0.4) * intensity;

    vec3 color = mix(uColor, lighting, 0.5);

    gl_FragColor = vec4(color, 1.0);
}
