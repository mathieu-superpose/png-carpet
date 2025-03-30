import { useMemo } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import carpetVertex from "../shaders/carpet/vertex.glsl"
import carpetFragment from "../shaders/carpet/fragment.glsl"

const CarpetMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
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
  const material = useMemo(() => {
    const material = new CarpetMaterial()
    const texture = new THREE.TextureLoader().load(texturePath)

    material.uniforms.uTexture = new THREE.Uniform(texture)

    return material
  }, [texturePath])

  return (
    <mesh material={material}>
      <planeGeometry args={[10, 10]} />
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

    return material
  }, [texturePath])

  return (
    <mesh material={material} position={[0, -0.2, 0]}>
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
      <Carpet texturePath={texturePath} />
      <CarpetShadow texturePath={texturePath} />
    </group>
  )
}
export default PngCarpet
