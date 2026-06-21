const THREE_VERSION = "0.160.0";
const OCCT_VERSION = "0.0.23";
const OCCT_CDN = `https://cdn.jsdelivr.net/npm/occt-import-js@${OCCT_VERSION}/dist/`;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function buildMesh(THREE, geometryMesh) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(geometryMesh.attributes.position.array, 3));
  if (geometryMesh.attributes.normal) {
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(geometryMesh.attributes.normal.array, 3));
  }
  if (geometryMesh.index) {
    geometry.setIndex(new THREE.BufferAttribute(Uint32Array.from(geometryMesh.index.array), 1));
  }
  if (!geometryMesh.attributes.normal) {
    geometry.computeVertexNormals();
  }
  const color = geometryMesh.color
    ? new THREE.Color(geometryMesh.color[0], geometryMesh.color[1], geometryMesh.color[2])
    : 0xb0b6c1;
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.15, roughness: 0.6 });
  return new THREE.Mesh(geometry, material);
}

async function initViewer(container) {
  const stepSrc = container.dataset.stepSrc;
  if (!stepSrc) return;

  container.classList.add("step-viewer-loading");
  const status = document.createElement("p");
  status.className = "step-viewer-status";
  status.textContent = "Loading 3D model...";
  container.appendChild(status);

  try {
    const [THREE, controlsModule] = await Promise.all([
      import("three"),
      import("three/addons/controls/OrbitControls.js"),
    ]);
    const { OrbitControls } = controlsModule;

    if (!window.occtimportjs) {
      await loadScript(`${OCCT_CDN}occt-import-js.js`);
    }
    const occt = await window.occtimportjs({
      locateFile: (path) => OCCT_CDN + path,
    });

    const response = await fetch(stepSrc);
    const buffer = await response.arrayBuffer();
    const result = occt.ReadStepFile(new Uint8Array(buffer), null);
    if (!result.success || !result.meshes.length) {
      throw new Error("Failed to parse STEP file");
    }

    status.remove();
    container.classList.remove("step-viewer-loading");

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(1, 2, 3);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-2, -1, -2);
    scene.add(fillLight);

    const group = new THREE.Group();
    for (const geometryMesh of result.meshes) {
      group.add(buildMesh(THREE, geometryMesh));
    }
    scene.add(group);

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    group.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    camera.position.set(maxDim * 1.2, maxDim * 0.9, maxDim * 1.5);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.update();

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", resize);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  } catch (err) {
    console.error(err);
    status.textContent = "Couldn't load this 3D model.";
  }
}

document.querySelectorAll(".step-viewer").forEach(initViewer);
