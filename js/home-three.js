// Setup Global Variables
// Tbh probably not the best way of doing this but works
// until I discover a safer way
let clock = new THREE.Clock();
let delta = 0;
let objects = [];
let scene = null;
let renderer = null;
let camera = null;
let controls = null;

// Choose random integer
let sceneNum = generateRandomInteger(2);
//sceneNum = 2;


// Once page loads, start setting up scene
window.onload = init;

// Add event listener to handle window resizing
window.addEventListener( 'resize', onWindowResize, false );

function init() {
  // Choose which scene to load based on random number 
  switch(sceneNum){
    case 1:
      loadScene1();
      animate();
      break;
    case 2:
      loadScene2();
      animate();
      break;
  }
}

function minSceneSetup() {
  // Create scene and camera
  // Add Three.js to html
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('threejs').appendChild( renderer.domElement );
}

function loadScene1() {
  minSceneSetup(); 
  addLighting();
  scene.add(torusKnot(2.5, 0.5, 5, 6));
  camera.position.z = 9;
  camera.position.y = -1;
  controls = new THREE.OrbitControls(camera, renderer.domElement)
}

function loadScene2() {
  var grid = 50;
  var height = 13;
  var distance = 2.5;
  minSceneSetup(); 
  addCubeGrid(grid);
  addLighting();
  camera.position.y = 9;
  camera.position.z = -20;
  controls = new THREE.OrbitControls(camera, renderer.domElement)
}

function addCubeGrid(gridSize) {
  var boxSize = 0.5;
  const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x16d9f3 });
  material.reflectivity = 1;
  material.transmission = 0;
  material.roughness = 0.3;
  material.color = new THREE.Color(0xffffff);
  
  for(var i=0; i < gridSize; i++){
    for(var j=0; j < gridSize; j++){
      const cube = new THREE.Mesh( geometry, material );
      cube.position.x = (i*boxSize)-(gridSize/4);
      cube.position.z = (j*boxSize)-(gridSize/4);
      objects.push(cube);
      scene.add(cube);
    }
  }
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

function animate(dt) {
  requestAnimationFrame( animate );
  delta = clock.getDelta();

  if(sceneNum == 1){
    objects[0].rotation.x += 0.5 * delta;
    objects[0].rotation.y += 0.5 * delta;
  }else if(sceneNum == 2){
    for(var i=0; i < objects.length; i++){
      objects[i].position.y = 0.7 *  Math.cos((0.002)*(dt - 248*i));
    }
  }
  controls.autoRotate = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.update();

  renderer.render( scene, camera );
};

function addObjects() {
  scene.add(torusKnot(2.5, 0.5, 5, 6));
}

// Add lighting to scene
function addLighting() {
  var spotLight = new THREE.SpotLight( 0xffffAA );
  spotLight.position.set( -40, 60, -20 );
  spotLight.castShadow = true;
  spotLight.intensity = 0.3
  scene.add( spotLight );

  var spotLight2 = new THREE.SpotLight( 0xffff00 );
  spotLight2.position.set( 0, -40, -10 );
  spotLight2.castShadow = true;
  spotLight2.intensity = 0.8;
  scene.add( spotLight2 );

  var ambientLight = new THREE.AmbientLight( 0x00CCff);
  ambientLight.position.set( -40, 60, -10 );
  ambientLight.intensity = 0.8;
  scene.add(ambientLight);
}

function torusKnot(size, thickness, twists1, twists2) {
  // Create and add torus knot
  const geometry = new THREE.TorusKnotGeometry( size, thickness, 400, 200, twists1, twists2);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x16d9f3 });
  material.reflectivity = 1;
  material.transmission = 0;
  material.roughness = 0;
  material.metalness = 0;
  material.color = new THREE.Color(0xffffff);
  const tKnot = new THREE.Mesh( geometry, material );
  objects.push(tKnot);

  return tKnot;
}
