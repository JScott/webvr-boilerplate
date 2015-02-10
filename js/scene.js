//Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene
var scene = new THREE.Scene();

// Create a three.js camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);

// Apply VR stereo rendering to renderer
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// Create a VR manager helper to enter and exit VR mode.
var vrmgr = new WebVRManager(effect);

// Create 3d objects
var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshLambertMaterial({color: 'blue', ambient: 'blue'});
var cube = new THREE.Mesh(geometry, material);

// Position cube mesh
cube.position.z = -20;

// Add cube mesh to your three.js scene
scene.add(cube);

// Not using normal material anymore so we need some lights
var light = new THREE.AmbientLight(0x404040);
scene.add( light );
var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
light.position.set( 1, 1, 1 );
scene.add( light );

// Request animation frame loop function
function animate() {
  // Apply rotation to cube mesh
  cube.rotation.y += 0.01;

  // Update VR headset position and apply to camera.
  controls.update();

  // Render the scene through the VREffect, but only if it's in VR mode.
  if (vrmgr.isVRMode()) {
    effect.render(scene, camera);
  } else {
    renderer.render(scene, camera);
  }
  requestAnimationFrame( animate );
}

// Kick off animation loop
animate();

function changeCubeColor() {
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  cube.material.color.setRGB(r,g,b);
  cube.material.ambient.setRGB(r,g,b);
}
window.addEventListener('touchstart', changeCubeColor, false);

// Listen for keyboard event and zero positional sensor on appropriate keypress.
function onKey(event) {
  if (event.keyCode == 90) { // z
    controls.zeroSensor();
  }
  if (event.keyCode == 67) { // c
    changeCubeColor();
  }
};
window.addEventListener('keydown', onKey, true);

// Handle window resizes
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);