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
let antialiasOn = false;

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
let onMobile = window.mobileCheck();

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
    antialias: antialiasOn,
    precision: 'lowp',
    powerPreference: 'low-power',
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('threejs').appendChild( renderer.domElement );
}

function loadScene1() {
  var z = onMobile ? 10 : 9;
  var y = onMobile ? -7 : -1;
  minSceneSetup(); 
  addLighting();
  scene.add(torusKnot(2.5, 0.5, 5, 6));
  camera.position.z = z;
  camera.position.y = y;
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.target = new THREE.Vector3(objects[0].position.x, objects[0].position.y-0.5, objects[0].position.z)
  if(onMobile){
   controls.enabled = false; 
   renderer.domElement.setAttribute("style","touch-action: auto");
  }
}

function loadScene2() {
  var grid = 50;
  var y = onMobile ? 15 : 9;
  var z = onMobile ? -40 : -20;
  minSceneSetup(); 
  addCubeGrid(grid);
  addLighting();
  camera.position.y = y;
  camera.position.z = z;
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.target = new THREE.Vector3(controls.target.x, controls.target.y-5, controls.target.z)
  if(onMobile){
   controls.enabled = false; 
   renderer.domElement.setAttribute("style","touch-action: auto");
  }
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
  const geometry = new THREE.TorusKnotGeometry( size, thickness, 300, 20, twists1, twists2);
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
