import * as THREE from "three"

import Environment from "./Environment"
import PngCarpet from "./components/PngCarpet"

const ambientLightIntensity = 0.5
const directionalLightPosition = new THREE.Vector3(5, 5, 5)

function Scene() {
  return (
    <>
      <Environment
        ambientLightIntensity={ambientLightIntensity}
        directionalLightPosition={directionalLightPosition}
      />
      <PngCarpet />
    </>
  )
}

export default Scene
