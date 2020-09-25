// Three.js - Fundamentals
// from https://threejsfundamentals.org/threejs/threejs-fundamentals.html

import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  // create camera
  const fov = 40; // field of view; vertical dimension
  const aspect = 2; // the canvas default (300px x 150px)
  const near = 0.1; // starts this distance in front of camera (e.g. at 1.9)
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 120; // move camera back from origin since objects are created at origin

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x404040);

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4); // (x, y, z) - so left, above, and behind camera
    scene.add(light);
  }

  const objects = [];
  const spread = 15;

  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide // draw both sides of the triangles that make up shapes (since some of them are 1-dimensional)
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  function addLineGeometry(x, y, geometry) {
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const mesh = new THREE.LineSegments(geometry, material);
    addObject(x, y, mesh);
  }

  {
    const width = 8;
    const height = 8;
    const depth = 8;
    addSolidGeometry(-2, 2, new THREE.BoxBufferGeometry(width, height, depth));
  }
  {
    const radius = 7;
    const segments = 24;
    addSolidGeometry(-1, 2, new THREE.CircleBufferGeometry(radius, segments));
  }
  {
    const radius = 6;
    const height = 8;
    const segments = 16;
    addSolidGeometry(
      0,
      2,
      new THREE.ConeBufferGeometry(radius, height, segments)
    );
  }
  {
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 8;
    const radialSegments = 12;
    addSolidGeometry(
      1,
      2,
      new THREE.CylinderBufferGeometry(
        radiusTop,
        radiusBottom,
        height,
        radialSegments
      )
    );
  }
  {
    const radius = 7;
    addSolidGeometry(2, 2, new THREE.DodecahedronBufferGeometry(radius));
  }
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2
    };

    addSolidGeometry(
      -2,
      1,
      new THREE.ExtrudeBufferGeometry(shape, extrudeSettings)
    );
  }
  {
    const radius = 7;
    addSolidGeometry(-1, 1, new THREE.IcosahedronBufferGeometry(radius));
  }
  {
    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8));
    }
    addSolidGeometry(0, 1, new THREE.LatheBufferGeometry(points));
  }
  {
    const radius = 7;
    addSolidGeometry(1, 1, new THREE.OctahedronBufferGeometry(radius));
  }
  {
    // from: https://github.com/mrdoob/three.js/blob/b8d8a8625465bd634aa68e5846354d69f34d2ff5/examples/js/ParametricGeometries.js
    function klein(v, u, target) {
      u *= Math.PI;
      v *= 2 * Math.PI;
      u = u * 2;

      let x;
      let z;

      if (u < Math.PI) {
        x =
          3 * Math.cos(u) * (1 + Math.sin(u)) +
          2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
        z =
          -8 * Math.sin(u) -
          2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
      } else {
        x =
          3 * Math.cos(u) * (1 + Math.sin(u)) +
          2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
        z = -8 * Math.sin(u);
      }

      const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

      target.set(x, y, z).multiplyScalar(0.75);
    }

    const slices = 25;
    const stacks = 25;
    addSolidGeometry(
      2,
      1,
      new THREE.ParametricBufferGeometry(klein, slices, stacks)
    );
  }
  {
    const width = 9;
    const height = 9;
    const widthSegments = 2;
    const heightSegments = 2;
    addSolidGeometry(
      -2,
      0,
      new THREE.PlaneBufferGeometry(
        width,
        height,
        widthSegments,
        heightSegments
      )
    );
  }
  {
    const verticesOfCube = [
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      1,
      1,
      1,
      -1,
      1,
      1
    ];
    const indicesOfFaces = [
      2,
      1,
      0,
      0,
      3,
      2,
      0,
      4,
      7,
      7,
      3,
      0,
      0,
      1,
      5,
      5,
      4,
      0,
      1,
      2,
      6,
      6,
      5,
      1,
      2,
      3,
      7,
      7,
      6,
      2,
      4,
      5,
      6,
      6,
      7,
      4
    ];
    const radius = 7;
    const detail = 2;
    addSolidGeometry(
      -1,
      0,
      new THREE.PolyhedronBufferGeometry(
        verticesOfCube,
        indicesOfFaces,
        radius,
        detail
      )
    );
  }
  {
    const innerRadius = 2;
    const outerRadius = 7;
    const segments = 18;
    addSolidGeometry(
      0,
      0,
      new THREE.RingBufferGeometry(innerRadius, outerRadius, segments)
    );
  }
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    addSolidGeometry(1, 0, new THREE.ShapeBufferGeometry(shape));
  }
  {
    const radius = 7;
    const widthSegments = 12;
    const heightSegments = 8;
    addSolidGeometry(
      2,
      0,
      new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments)
    );
  }
  {
    const radius = 7;
    addSolidGeometry(-2, -1, new THREE.TetrahedronBufferGeometry(radius));
  }
  {
    const loader = new THREE.FontLoader();
    // promisify font loading
    function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }

    async function doit() {
      const font = await loadFont(
        "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json"
      );
      const geometry = new THREE.TextBufferGeometry("three.js", {
        font: font,
        size: 3.0,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: 0.3,
        bevelSegments: 5
      });
      const mesh = new THREE.Mesh(geometry, createMaterial());
      geometry.computeBoundingBox();
      geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1); // ensure text is rotated around its center

      const parent = new THREE.Object3D(); // create a new object
      parent.add(mesh); // add our text to the generic object so it still retains the center offset

      addObject(-1, -1, parent);
    }
    doit();
  }
  {
    const radius = 5;
    const tubeRadius = 2;
    const radialSegments = 8;
    const tubularSegments = 24;
    addSolidGeometry(
      0,
      -1,
      new THREE.TorusBufferGeometry(
        radius,
        tubeRadius,
        radialSegments,
        tubularSegments
      )
    );
  }
  {
    const radius = 3.5;
    const tube = 1.5;
    const radialSegments = 8;
    const tubularSegments = 64;
    const p = 2;
    const q = 3;
    addSolidGeometry(
      1,
      -1,
      new THREE.TorusKnotBufferGeometry(
        radius,
        tube,
        tubularSegments,
        radialSegments,
        p,
        q
      )
    );
  }
  {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }
      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(4);
    const tubularSegments = 20;
    const radius = 1;
    const radialSegments = 8;
    const closed = false;
    addSolidGeometry(
      2,
      -1,
      new THREE.TubeBufferGeometry(
        path,
        tubularSegments,
        radius,
        radialSegments,
        closed
      )
    );
  }
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    const thresholdAngle = 15;
    addLineGeometry(
      -1,
      -2,
      new THREE.EdgesGeometry(
        new THREE.BoxBufferGeometry(width, height, depth),
        thresholdAngle
      )
    );
  }
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    addLineGeometry(
      1,
      -2,
      new THREE.WireframeGeometry(
        new THREE.BoxBufferGeometry(width, height, depth)
      )
    );
  }
  {
    const radius = 7;
    const widthSegments = 12;
    const heightSegments = 8;
    const geometry = new THREE.SphereBufferGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    const material = new THREE.PointsMaterial({
      color: "red",
      size: 0.2 // in world units
    });
    const points = new THREE.Points(geometry, material);
    const x = 0;
    const y = -2;
    addObject(x, y, points);
  }

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

    objects.forEach((obj, index) => {
      const speed = 0.1 + index * 0.05;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    renderer.render(scene, camera); // render the updated scene
    requestAnimationFrame(render); // request another animation scene (to update the rotation again)
  }
  requestAnimationFrame(render); // make first call to start the animation loop
}

main();
