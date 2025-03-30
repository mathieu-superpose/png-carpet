import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import carpetVertex from "../shaders/carpet/vertex.glsl"
import carpetFragment from "../shaders/carpet/fragment.glsl"

const CarpetMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uDisplacement: new THREE.Vector3(0.0, 0.0, 0.0),
  },
  carpetVertex,
  carpetFragment
)

extend({ CarpetMaterial })

function Carpet({
  texturePath = "textures/smiley.png",
}: {
  texturePath?: string
}) {
  const hitRef = useRef<THREE.Mesh>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const material = new CarpetMaterial()
    const texture = new THREE.TextureLoader().load(texturePath)
    material.uniforms.uTexture = new THREE.Uniform(texture)

    // transparency
    material.transparent = true
    material.depthWrite = false
    material.depthTest = false
    material.blending = THREE.AdditiveBlending
    material.side = THREE.DoubleSide

    return material
  }, [texturePath])

  const { camera } = useThree()
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const intersectPosition = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    function onPointerMove(event: { clientX: number; clientY: number }) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(pointer, camera)

      if (!hitRef.current) {
        console.warn("Target mesh not found")
        return
      }

      const intersects = raycaster.intersectObject(hitRef.current)

      if (intersects.length > 0) {
        // console.log("intersects", intersects)
        intersectPosition.copy(intersects[0].point)
      }
    }

    window.addEventListener("pointermove", onPointerMove)
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [])

  useFrame(() => {
    material.uniforms.uDisplacement.value.x = intersectPosition.x
    material.uniforms.uDisplacement.value.y = intersectPosition.y
    material.uniforms.uDisplacement.value.z = intersectPosition.z

    if (!sphereRef?.current) {
      return
    }

    sphereRef.current.position.x = intersectPosition.x
    sphereRef.current.position.y = intersectPosition.y
    sphereRef.current.position.z = intersectPosition.z
  })

  return (
    <>
      <mesh ref={hitRef} position={[0, 0, 0.01]}  name="hit">
        <planeGeometry args={[500, 500, 10, 10]} />
        <meshBasicMaterial
          color={0x00ff00}
          transparent
          opacity={0.0}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={meshRef} material={material}>
        <planeGeometry args={[10, 10, 10, 10]} />
      </mesh>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  )
}

import carpetShadowVertex from "../shaders/carpet-shadow/vertex.glsl"
import carpetShadowFragment from "../shaders/carpet-shadow/fragment.glsl"

const CarpetShadowMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
  },
  carpetShadowVertex,
  carpetShadowFragment
)
extend({ CarpetShadowMaterial })

function CarpetShadow({
  texturePath = "textures/smiley.png",
}: {
  texturePath?: string
}) {
  const material = useMemo(() => {
    const material = new CarpetShadowMaterial()
    const texture = new THREE.TextureLoader().load(texturePath)

    material.uniforms.uTexture = new THREE.Uniform(texture)

    // transparency
    material.transparent = true
    material.depthWrite = false
    material.depthTest = false
    material.blending = THREE.AdditiveBlending
    material.side = THREE.DoubleSide

    return material
  }, [texturePath])

  return (
    <mesh material={material} position={[0, 0, -0.01]}>
      <planeGeometry args={[10, 10]} />
    </mesh>
  )
}

function PngCarpet({
  texturePath = "textures/smiley.png",
}: {
  texturePath?: string
}) {
  return (
    <group>
      <CarpetShadow texturePath={texturePath} />
      <Carpet texturePath={texturePath} />
    </group>
  )
}
export default PngCarpet
