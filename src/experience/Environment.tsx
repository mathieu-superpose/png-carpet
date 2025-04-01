import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { useEffect } from "react"

function Environment({
  ambientLightIntensity = 0.5,
  directionalLightPosition = new THREE.Vector3(5, 5, 5),
}: {
  ambientLightIntensity?: number
  directionalLightPosition?: THREE.Vector3
}) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 10, 10)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])

  return (
    <>
      <ambientLight intensity={ambientLightIntensity} />
      <directionalLight position={directionalLightPosition} />

      <OrthographicCamera
        makeDefault
        near={0.1}
        far={1000}
        left={-10}
        right={10}
        top={10}
        bottom={-10}
      />
    </>
  )
}

export default Environment
