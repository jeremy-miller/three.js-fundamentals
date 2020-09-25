// Three.js - Fundamentals
// from https://threejsfundamentals.org/threejs/threejs-fundamentals.html

import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  // create camera
  const fov = 75; // field of view; vertical dimension
  const aspect = 2; // the canvas default (300px x 150px)
  const near = 0.1; // starts this distance in front of camera (e.g. at 1.9)
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2; // move camera back from origin since cube is created at origin

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4); // (x, y, z) - so left, above, and behind camera
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xd1c75e, 2)
  ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio; // get pixel ratio of device (useful for HD-DPI devices)
    const width = canvas.clientWidth * pixelRatio || 0; // scale our canvas accodringly
    const height = canvas.clientHeight * pixelRatio || 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001; // convert milliseconds to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight; // make sure we don't distort the cubes
      camera.updateProjectionMatrix(); // update the camera so changes take effect
    }

    cubes.forEach((cube, index) => {
      const speed = 1 + index * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera); // render the updated scene
    requestAnimationFrame(render); // request another animation scene (to update the rotation again)
  }
  requestAnimationFrame(render); // make first call to start the animation loop
}

main();
