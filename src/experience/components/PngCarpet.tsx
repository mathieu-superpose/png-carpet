import { useMemo, useRef } from "react"
import * as THREE from "three"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import { useIntersectionPosition } from "../../hooks/useIntersectionPosition"

import carpetVertex from "../shaders/carpet/vertex.glsl"
import carpetFragment from "../shaders/carpet/fragment.glsl"

const CarpetMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uDisplacement: new THREE.Vector3(0.0, 0.0, 0.0),
    uMinDistance: 5.0,
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
  const carpetRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const { targetPosition } = useIntersectionPosition(carpetRef, camera)

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

  useFrame(() => {
    if (!targetPosition) {
      return
    }

    material.uniforms.uDisplacement.value.x = targetPosition.x
    material.uniforms.uDisplacement.value.y = targetPosition.y
    material.uniforms.uDisplacement.value.z = targetPosition.z
  })

  return (
    <mesh ref={carpetRef} material={material}>
      <planeGeometry args={[10, 10, 10, 10]} />
    </mesh>
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
