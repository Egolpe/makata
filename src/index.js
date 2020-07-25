// Codrops article: https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/
// Originally by Kyle Wetton @KyleWetton
// Brought to React by https://github.com/RubLo
// https://spectrum.chat/react-three-fiber/general/skinned-mesh~de461f24-df23-43d0-8e08-dca7fe3b93f7

import ReactDOM from "react-dom"
import React, { Suspense, useState, useRef, Fragment } from "react"
import { Canvas } from "react-three-fiber"
import Poop from "./Poop"
import { getMousePos } from "./utils"
import "./styles.css"

function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
      <meshLambertMaterial attach="material" color="#9b9b9b" transparent opacity={0.2} />
    </mesh>
  )
}

function App() {
  const d = 8.25
  const mouse = useRef({ x: 0, y: 0 })

  const [style, setStyle] = useState("ocultar")
  let count = 0


  const handleClick = () => {
    count++;
    console.log(count)
    if (count === 1) {
      setStyle("popup")
      count = -1;
    }else {
      setStyle("ocultar");
    }
  }

  return (
    <Fragment>
      <Canvas onMouseMove={e => (mouse.current = getMousePos(e))} shadowMap pixelRatio={window.devicePixelRatio} camera={{ position: [0, -3, 18] }}>
        <fog attach="fog" args={["#fff", 40, 70]} />
        <hemisphereLight skyColor={""} groundColor={"#ffffff"} intensity={0.68} position={[0, 50, 0]} />
        <directionalLight
        position={[-8, 12, 8]}
        shadow-camera-left={d * -1}
        shadow-camera-bottom={d * -1}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-near={0.1}
        shadow-camera-far={1500}
        castShadow
        />
        <mesh position={[0, -3, -10]}>
        <circleBufferGeometry attach="geometry" args={[8, 64]} />
        <meshBasicMaterial attach="material" color="#93eeaf" />
        </mesh>
        <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -11, 0]} />
        <Suspense fallback={null}>
          <Poop mouse={mouse} position={[0, -11, 0]} scale={[7, 7, 7]} onClick={handleClick} />

        </Suspense>
      
      </Canvas>
      
      <a className={style} vanishOut href="https://www.mangooutlet.com/es/mujer/vestidos/vestido-estampado_43060746.html?c=02&n=1" target="blank">COMPRAR</a>

      
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
