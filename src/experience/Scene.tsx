import * as THREE from "three"

import Environment from "./Environment"
import Cube from "./components/Cube"
import Crown from "./components/Crown"

const ambientLightIntensity = 0.5
const directionalLightPosition = new THREE.Vector3(5, 5, 5)

function Scene() {
  return (
    <>
      <Environment
        ambientLightIntensity={ambientLightIntensity}
        directionalLightPosition={directionalLightPosition}
      />
      <Cube />
      <Crown
        ambientLightIntensity={ambientLightIntensity}
        directionalLightPosition={directionalLightPosition}
      />
    </>
  )
}

export default Scene
