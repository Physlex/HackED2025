import { useEffect, useRef } from "react";
import * as THREE from "three";

export type TiltCanvasParams = {
  pitch: number;
  yaw: number;
  roll: number;
};

export default function TiltCanvas({ pitch, yaw, roll }: TiltCanvasParams) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // Create the camera

    const FOV = 75;
    const ASPECT = window.innerWidth / window.innerHeight;
    const NEAR_PLANE = 0.1;
    const FAR_PLANE = 1000;

    const camera = new THREE.PerspectiveCamera(
      FOV,
      ASPECT,
      NEAR_PLANE,
      FAR_PLANE,
    );
    camera.position.z = 3;

    // Create the renderer, and attatch it to the canvas

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a Cube (for scale)

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color: "red"});
    const cube = new THREE.Mesh(geometry, material);

    // Create the scene object and append the cube

    const scene = new THREE.Scene();
    scene.add(cube);

    // Update cube rotation whenever pitch, yaw, or roll changes

    console.log("cube being updated");

    function animate() {
      console.warn(pitch, yaw, roll)
      cube.rotation.set(pitch, yaw, roll);
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    const canvasRefCurrent = canvasRef.current;
    return () => {
      if (canvasRefCurrent) {
        canvasRefCurrent.removeChild(renderer.domElement);
      }
      renderer.setAnimationLoop(null);
    };
  }, [pitch, yaw, roll]);

  return <div ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />;
}
