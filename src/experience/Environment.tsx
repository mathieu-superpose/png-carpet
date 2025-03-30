import * as THREE from "three"
import { OrbitControls, OrthographicCamera } from "@react-three/drei"

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

      <OrthographicCamera
        makeDefault
        position={[0, 10, 10]}
        near={0.1}
        far={1000}
        left={-10}
        right={10}
        top={10}
        bottom={-10}
      />
      <OrbitControls />
    </>
  )
}

export default Environment
