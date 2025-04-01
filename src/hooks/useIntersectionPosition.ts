import { RefObject, useEffect, useState } from "react"
import * as THREE from "three"

export function useIntersectionPosition(
  targetRef: RefObject<THREE.Mesh<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.Material | THREE.Material[],
    THREE.Object3DEventMap
  > | null>,
  camera: THREE.Camera
) {
  const outside = new THREE.Vector3(-100, -100, -100)
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(
    outside
  )

  const raycaster = new THREE.Raycaster()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )

      raycaster.setFromCamera(mouse, camera)

      if (targetRef.current) {
        const intersects = raycaster.intersectObject(targetRef.current)

        if (intersects.length > 0) {
          setTargetPosition(intersects[0].point)
        } else {
          setTargetPosition(targetPosition ? targetPosition.clone().lerp(outside, 0.01) : null)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [targetRef, camera, raycaster])

  return { targetPosition }
}
