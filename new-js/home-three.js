let scene;
let renderer;
let camera;
let controls;
let scrollY = window.scrollY;
let targetObject;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.onload = init;

window.addEventListener('resize', onContainerResize, false);

const bottomPageSection = document.getElementById('three-icons-section');

function elementInViewport(el) {
  var rect = el.getBoundingClientRect();

  // object comes into viewport
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;

  /*
  if(elementInViewport(bottomPageSection)) {
    document.getElementById('threejs').removeChild(document.getElementById('threejs').firstChild);
    document.getElementById('threejs-2').appendChild(renderer.domElement);
  }
  */
});

function init () {
  loadScene();
  animate();
}

function loadScene() {
  minSceneSetup();
  addLighting();

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x16d9f3 });
  material.reflectivity = 1;
  material.transmission = 0;
  material.roughness = 0.5;
  material.metalness = 0.5;
  const cube = new THREE.Mesh(geo, material);
  cube.rotation.y = 1.5708 / 2;
  cube.position.y = 0.25;
  cube.position.z = 0.5;
  cube.castShadow = true;
  scene.add(cube);

  const geo2 = new THREE.PlaneGeometry(1000, 1000);
  const material2 = new THREE.MeshPhysicalMaterial( { color: 0x1b91e7 });
  const material3 = new THREE.ShadowMaterial();
  material3.opacity = 0.4;
  material2.metalness = 0.6;
  const plane = new THREE.Mesh(geo2, material2);
  plane.rotation.set(-1.5708, 0, 0);
  plane.position.y = -0.75;
  plane.position.x = 1.75;
  plane.receiveShadow = true;
  scene.add(plane);
}

function onContainerResize() {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  const container = document.getElementById('threejs-container');
  var box = container.getBoundingClientRect();
  renderer.setSize(container.clientWidth, container.clientHeight);

  camera.aspect = container.clientWidth/container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

  if(sizes.width <= 915 && sizes.width <= sizes.height){
    // Point camera directly at box
    targetObject.position.set(0, 4, 0);
    camera.position.set(0, 0, 9);
  }else {
    targetObject.position.set(box.width / box.height - 0.5, 2, 0);
  }  
  /*
  if(sizes.width < 915 && (sizes.width <= sizes.height)) {
    console.log('Portrait');
    camera.aspect = box.height / box.width;
    camera.updateProjectionMatrix();

    renderer.setSize(box.width, box.);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  */ 
}

function minSceneSetup() {
  const container = document.getElementById('threejs-container');
  const box = container.getBoundingClientRect();
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x147AC5, -5, 25 );
  camera = new THREE.PerspectiveCamera( 25, box.width / box.height, 0.1, 1000);
  camera.position.set(1.95, 2, 7);

  targetObject = new THREE.Object3D();
  if(sizes.width <= 915 && sizes.width <= sizes.height){
    // Point camera directly at box
    targetObject.position.set(0, 4, 0);
    camera.position.set(0, 0, 9);
  }else {
    //targetObject.position.set(box.width / 1200, 2, 0);
    targetObject.position.set(box.width / box.height - 0.5, 2, 0);
  }  
  scene.add(targetObject);

  //camera.lookAt(targetObject.position.x, targetObject.position.y, targetObject.position.z);

  const canvas = document.getElementById('threejs');
  renderer = new THREE.WebGLRenderer({alpha: false, antialias: true, canvas: canvas,});
  renderer.setClearColor( 0x147AC5, 1 );
  renderer.shadowMap.enabled = true;
  renderer.setSize( box.width, box.height );
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // document.getElementById('threejs').appendChild( renderer.domElement );
}

function addLighting() {
  const spotLight = new THREE.SpotLight( 0x00aaff );
  spotLight.position.set( 2, 6, 3 );
  spotLight.penumbra = 1;
  spotLight.castShadow = true;
  spotLight.shadow.radius = 10;
  spotLight.intensity = 2.5;
  scene.add(spotLight);

  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;

  const ambientLight = new THREE.AmbientLight( 0x00aaaa );
  ambientLight.intensity = 1.5;
  scene.add(ambientLight);
}

function onWindowResize() {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

    /*
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if(sizes.width < 915 && (sizes.width > sizes.height)) {
    camera.aspect = sizes.height / sizes.width;
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.height, sizes.width)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  */
}

function animate(dt) {
  if(elementInViewport(document.getElementById('threejs'))){
    scene.children[3].rotation.y += 0.01;
    var offset = 1.25;
    var scale = 3;
    camera.position.y = -scrollY / window.innerHeight * scale + offset;
    var y = scrollY / window.innerHeight + 0.2;

    const container = document.getElementById('threejs-container');
    const box = container.getBoundingClientRect();

    if(box.width <= 915 && box.width <= box.height) {
      y += 0.5;
    }

    var newPos = new THREE.Vector3(targetObject.position.x, y, 0);
    targetObject.position.lerp(newPos, 0.3);
    camera.lookAt(targetObject.position.x, targetObject.position.y, targetObject.position.z);

    renderer.render(scene, camera);
  }
  const af = requestAnimationFrame(animate);
}
  

