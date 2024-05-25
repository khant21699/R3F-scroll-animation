/* eslint-disable react/no-unknown-property */
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export function Office(props) {
  const { nodes, materials } = useGLTF("/models/WawaOffice.glb");
  const ref = useRef();
  const tl = useRef();
  const floor1ref = useRef();
  const floor2ref = useRef();
  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(
      ref.current.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );

    // floor1
    tl.current.from(
      floor1ref.current.position,
      {
        duration: 1,
        x: -2,
      },
      0.6
    );
    tl.current.from(
      floor1ref.current.rotation,
      {
        duration: 1,
        y: -Math.PI / 2,
      },
      0.6
    );
    // Floor2
    tl.current.from(
      floor2ref.current.position,
      {
        duration: 1,
        y: 2,
      },
      0.6
    );
    tl.current.from(
      floor2ref.current.rotation,
      {
        duration: 1,
        y: Math.PI / 2,
      },
      0.6
    );
    tl.current.from(
      floor2ref.current.position,
      {
        duration: 1,
        z: -2,
      },
      1.5
    );
  }, []);
  return (
    <group {...props} dispose={null} ref={ref}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["01_office"].geometry}
          material={materials["01"]}
        />
      </group>
      <group ref={floor1ref} position={[0, 2.114, -2.23]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["02_library"].geometry}
          material={materials["02"]}
        />
      </group>
      <group position={[-1.97, 4.227, -2.199]}>
        <mesh
          ref={floor2ref}
          castShadow
          receiveShadow
          geometry={nodes["03_attic"].geometry}
          material={materials["03"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/WawaOffice.glb");
