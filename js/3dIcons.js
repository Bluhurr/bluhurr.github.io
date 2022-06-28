// Setup Global Variables
let clock2 = new THREE.Clock();
let delta2 = 0;
let objects2 = [];
let scene2 = null;
let renderer2 = null;
let camera2 = null;
let controls2 = null;
let antialiasOn2 = true;
let cube = null;

let onMobile2 = window.mobileCheck();

// Once page loads, start setting up scene
document.addEventListener('DOMContentLoaded', init2, false);

// Add event listener to handle window resizing
window.addEventListener( 'resize', onWindowResize2, false );

function init2() {
  // Choose which scene to load based on random number 
  minSceneSetup2();
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  cube = new THREE.Mesh( geometry, material );
  cube.position.x = 3;
  camera2.position.z = 15;
  const spotLight = new THREE.SpotLight(0xFFAAFF, 1);
  const spotLight2 = new THREE.SpotLight(0x00FF00, 2);
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
  spotLight.position.x = -5;
  spotLight.position.z = 9;
  spotLight.position.y = 5;
  spotLight2.position.z = -10;
  spotLight2.position.x = 5;
  scene2.add(spotLight);
  scene2.add(spotLight2);
  scene2.add(ambientLight);

  loadModels();
  requestAnimationFrame( animate2 );
}

function minSceneSetup2() {
  // Create scene and camera
  // Add Three.js to html
  scene2 = new THREE.Scene();
  camera2 = new THREE.PerspectiveCamera(70, 2, 1, 1000);
  console.log(camera2.setFocalLength(50));
  renderer2 = new THREE.WebGLRenderer({
    alpha: true,
    antialias: antialiasOn2,
    precision: 'lowp',
    powerPreference: 'low-power',
  });
  document.getElementById('three-icons-section').appendChild( renderer2.domElement );
}

function loadModels() {
  // Setup GLTF Loader
  const loader = new THREE.GLTFLoader();

  loader.load( './models/portfolio3dicon.glb', function ( gltf ) {
    scene2.add( gltf.scene );
    scene2.children[scene2.children.length-1].rotation.y = -1.5708;
    scene2.children[scene2.children.length-1].rotation.z = 1.5708/6;
    scene2.children[scene2.children.length-1].position.x = -7;
  }, undefined, function ( error ) {
    console.error( error );
  });
}

function onWindowResize2(){
  resizeCanvasToDisplaySize();
}

function animate2(dt) {
  resizeCanvasToDisplaySize();
  delta2 = clock2.getDelta();

  cube.rotation.z += 0.01;
  if(scene2.children[scene2.children.length - 1]){
    scene2.children[scene2.children.length - 1].position.y = 0.1 *  Math.cos((0.002)*dt);
    scene2.children[scene2.children.length - 1].rotation.y = 0.4 *  Math.cos((0.001)*dt) - 1;
    //scene2.children[scene2.children.length - 1].rotation.y += 0.01;
  }

  renderer2.render( scene2, camera2 );
  resizeCanvasToDisplaySize();
  requestAnimationFrame( animate2 );
};

function resizeCanvasToDisplaySize() {
  const canvas = renderer2.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer2.setSize(width, height, false);
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
  }
}
