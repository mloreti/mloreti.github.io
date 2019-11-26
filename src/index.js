import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Canvas, useThree, extend, useFrame } from "react-three-fiber";
import * as THREE from "three";
import * as meshline from "threejs-meshline";

import "./styles.css";

extend(meshline);

function Line({ vertices, color }) {
  const [ratio] = useState(() => 0.55 + 0.5 * Math.random());
  const [width] = useState(() => Math.max(0.01, 0.05 * Math.random()));
  const material = useRef();
  const speed = Math.max(0.0001, 0.0005 * Math.random());

  useFrame(() => (material.current.uniforms.dashOffset.value += speed));

  return (
    <mesh>
      <meshLine
        attach="geometry"
        vertices={vertices.map(v => new THREE.Vector3(...v))}
      />
      <meshLineMaterial
        ref={material}
        attach="material"
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={ratio * 0.1}
        dashRatio={ratio}
      />
    </mesh>
  );
}

function Lines() {
  const {
    viewport: { height, width }
  } = useThree();

  const colors = [
    "#A2CCB6",
    "#FCEEB5",
    "#EE786E",
    "#e0feff",
    "lightpink",
    "lightblue"
  ];

  const numberOfLines = 40;
  const gutter = width / numberOfLines;
  let position = -width / 2 + gutter / 2;

  const vertices = new Array(numberOfLines).fill([]).map(_ => {
    const startY = Math.random();
    const points = [
      [position, -height, startY],
      [position, height, startY]
    ];

    position += gutter;

    return points;
  });

  return vertices.map(vertice => (
    <Line
      vertices={vertice}
      color={colors[parseInt(colors.length * Math.random())]}
    />
  ));
}

function Info() {
  return (
    <div className="info">
      <h1>Mickey Loreti</h1>
      <ul>
        <li>
          <a href="https://github.com/mloreti">Github</a>
        </li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <>
      <Canvas>
        <Lines />
      </Canvas>
      <Info />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
