import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"

import "./Experience.css"

function Experience() {
  return (
    <div className="Experience">
      <div className="layout">
        <h1>R3F STARTER</h1>
      </div>
      <div className="canvas">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </div>
  )
}

export default Experience
