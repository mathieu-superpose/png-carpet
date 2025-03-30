import * as THREE from "three"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

function Environment({
  ambientLightIntensity = 0.5,
  directionalLightPosition = new THREE.Vector3(5, 5, 5),
}: {
  ambientLightIntensity?: number
  directionalLightPosition?: THREE.Vector3
}) {
  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />
      <directionalLight position={directionalLightPosition} />

      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
    </>
  )
}

export default Environment
