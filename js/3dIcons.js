// Setup Global Variables
let clock2 = new THREE.Clock();
let delta2 = 0;
let objects2 = [];
let scene2 = null;
let renderer2 = null;
let camera2 = null;
let controls2 = null;
let antialiasOn2 = true;
let scenes = [];
let canvas;
canvas = document.getElementById( "three-icons-canvas-container" );

// Once page loads, start setting up scene
document.addEventListener('DOMContentLoaded', init2, false);

function init2() {
  // Setup minimum scene stuff
  minSceneSetup2();
  scene2.element = document.getElementById('portfolio-3d-icon-col');
  addIconsLighting();
  loadModels();
  scenes.push(scene2);
  animate2();
}

function minSceneSetup2() {
  // Create scene and camera
  // Add Three.js to html
  scene2 = new THREE.Scene();
  camera2 = new THREE.PerspectiveCamera( 75, 1, 0.1, 100 );
  camera2.position.z = 10;
  camera2.setFocalLength(50);
  renderer2 = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: antialiasOn2,
    precision: 'lowp',
    powerPreference: 'low-power',
  });
}

function addIconsLighting() {
  const spotLight = new THREE.SpotLight(0xFFAAFF, 3);
  const spotLight2 = new THREE.SpotLight(0x00FFff);
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  spotLight.position.x = 5;
  spotLight.position.z = 9;
  spotLight.position.y = -19;
  spotLight2.position.z = -10;
  spotLight2.position.x = 5;
  spotLight2.position.y = -5;
  scene2.add(spotLight);
  scene2.add(spotLight2);
  scene2.add(ambientLight);
}

function loadModels() {
  // Setup GLTF Loader
  const loader = new THREE.GLTFLoader();

  loader.load( './models/portfolio3dicon.glb', function ( gltf ) {
    scene2.add( gltf.scene );
    scene2.children[scene2.children.length-1].rotation.y = -1.5708;
    scene2.children[scene2.children.length-1].rotation.z = 1.5708/6;
    //scene2.children[scene2.children.length-1].position.x = -7;
  }, undefined, function ( error ) {
    console.error( error );
  });
}

function animate2(dt) {
  if(scene2.children[scene2.children.length - 1]){
    scene2.children[scene2.children.length - 1].position.y = 0.1 *  Math.cos((0.002)*dt);
    scene2.children[scene2.children.length - 1].rotation.y = 0.4 *  Math.cos((0.001)*dt) - 1;
  }
  render();
  requestAnimationFrame(animate2);
};

function updateSize() {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  if ( canvas.width !== width || canvas.height !== height ) {
    renderer2.setSize(width, height, false);
  }
}

function render() {
  updateSize();
  //canvas.style.transform = `translateY(${window.scrollY}px`;
  connectScenesToElements();
}

function connectScenesToElements() {
  renderer2.setScissorTest( true );
  scenes.forEach((sceneThing) => {
    // get the element that is a place holder for where we want to draw the scene
    var element = sceneThing.element; 
    
    // get its position relative to the page's viewport
    var rect = document.getElementById('portfolio-3d-icon-col').getBoundingClientRect();

    // check if it's offscreen. If so skip it
    if ( rect.bottom < 0 || rect.top  > renderer2.domElement.clientHeight || rect.right  < 0 || rect.left > renderer2.domElement.clientWidth ) {
      return;
    }

    // Set the viewport 
    var width = rect.right - rect.left;
    var height = rect.bottom - rect.top;
    var left = rect.left;
    var top = rect.top;
    var bottom = rect.bottom;

    var y = renderer2.domElement.clientHeight - bottom;

    renderer2.setViewport( left, y, width, height );

    renderer2.setScissor( left, y, width, height );

    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();

    renderer2.render( sceneThing , camera2 );
  });
  renderer2.setScissorTest( false );
}
