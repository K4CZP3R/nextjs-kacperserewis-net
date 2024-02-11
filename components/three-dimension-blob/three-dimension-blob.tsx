"use client";

import styles from "./three-dimension-blob.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import { useRef } from "react";
import { Perlin } from "./helpers/perlin";
import React from "react";

type BlobProps = {
  blobColor?: number;
  blobColorEmission?: number;
  blobSpeed?: number;
  blobSpikeness?: number;
};

function Blob(props: BlobProps) {
  const ref = useRef<any>();
  const perlinGenerator = new Perlin(0);

  useFrame((state, delta) => {
    const blob = ref.current as unknown as {
      geometry: { attributes: { position: any } };
    };

    const position = blob.geometry.attributes.position;

    const vertex = new Vector3();
    const time = performance.now() * (props.blobSpeed || 0.001);
    const k = props.blobSpikeness || 1;

    for (let vertexIndex = 0; vertexIndex < position.count; vertexIndex++) {
      vertex.fromBufferAttribute(position, vertexIndex);

      const perlin = perlinGenerator.perlin3(
        vertex.x * k + time,
        vertex.y * k,
        vertex.z * k,
      );

      vertex.normalize().multiplyScalar(1 + 0.3 * perlin);

      position.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
    }
    blob.geometry.attributes.position.needsUpdate = true;
    // @ts-ignore
    blob.geometry.computeBoundingSphere();
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 128, 128]}></sphereGeometry>
      <meshPhongMaterial
        emissive={props.blobColor || 0xff0000}
        emissiveIntensity={props.blobColorEmission || 0.75}
        shininess={0}
      ></meshPhongMaterial>
    </mesh>
  );
}

export type ThreeDimensionBlobProps = JSX.IntrinsicElements["div"] & {
  blobProps?: BlobProps;
  lightColor: number;
  lightColorEmission: number;
};

export default class ThreeDimensionBlob extends React.Component<ThreeDimensionBlobProps> {
  private camera = new PerspectiveCamera(30, 1, 0.1, 1000);
  constructor(props: ThreeDimensionBlobProps) {
    super(props);
    this.camera.position.set(0, 0, 5);
  }

  render(): React.ReactNode {
    return (
      <div className={styles.scene}>
        <Canvas camera={this.camera} shadows={true} className={styles.canvas}>
          <directionalLight
            position={new Vector3(0, 0, 100)}
            color={this.props.lightColor}
            intensity={this.props.lightColorEmission}
          ></directionalLight>
          <Blob {...this.props.blobProps}></Blob>
        </Canvas>
      </div>
    );
  }
}
