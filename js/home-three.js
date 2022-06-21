const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('threejs').appendChild( renderer.domElement );

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -40, 60, -10 );
spotLight.castShadow = true;
scene.add( spotLight );

var spotLight2 = new THREE.SpotLight( 0x0a38bf );
spotLight2.position.set( 0, -40, -10 );
spotLight2.castShadow = true;
scene.add( spotLight2 );

var ambientLight = new THREE.AmbientLight( 0x16d9f3);
ambientLight.position.set( -40, 60, -10 );
scene.add(ambientLight);

const geometry = new THREE.TorusKnotGeometry( 2.5, 0.5, 400, 200, 5, 6);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x16d9f3
});
material.reflectivity = 1;
material.transmission = 0;
material.roughness = 0;
material.metalness = 0;
material.color = new THREE.Color(0xffffff);


const tKnot = new THREE.Mesh( geometry, material );

scene.add(tKnot);

camera.position.z = 9;
camera.position.y = -1;

function animate() {
  requestAnimationFrame( animate );

  tKnot.rotation.x += 0.01;
  tKnot.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();
