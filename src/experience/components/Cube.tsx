import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

const ROTATION_SPEED = 0.5

function Cube() {
  const boxRef = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += ROTATION_SPEED * dt
      boxRef.current.rotation.y += ROTATION_SPEED * dt
      boxRef.current.rotation.x %= 2 * Math.PI
      boxRef.current.rotation.y %= 2 * Math.PI
    }
  })

  return (
    <group ref={boxRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  )
}

export default Cube
