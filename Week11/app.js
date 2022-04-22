const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/NormalMap.png')

// Ring
const geometry = new THREE.RingGeometry( 1.5, 1, 200, 10 );
const material = new THREE.PointsMaterial({
	//  color: 0x00ff00 ,
     size: 0.005
});
const ring = new THREE.Points( geometry, material );
ring.rotation.x = 2;
ring.rotation.y = 3;
ring.rotation.z = 5;
scene.add( ring );


// Sphere
const sphereGeo = new THREE.SphereGeometry( .7, 64, 64 );
const spehereMat = new THREE.MeshStandardMaterial();
spehereMat.metalness = 0.2;
spehereMat.roughness = 0.5;
spehereMat.normalMap = normalTexture;
const sphere = new THREE.Mesh( sphereGeo, spehereMat );
sphere.position.set(0,0,0);
scene.add( sphere );


// To maintain position of objects in case window is resized
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Lights

const pointLight = new THREE.PointLight(0xa4400e, 0.8)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

camera.position.z = 4;


let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;


// mouse move listener
 document.addEventListener('mousemove', (event) => {


    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);

 })

function animate() {
    requestAnimationFrame( animate );

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;   

    
    if (Math.abs(mouseX) < window.innerWidth/3 && Math.abs(mouseY) <= window.innerHeight/3) {

        sphere.rotation.y += 1.5 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 1.5 * (targetY - sphere.rotation.x);
        sphere.rotation.z += 1.5 * (targetY - sphere.rotation.x);

        ring.rotation.y += 1.5 * (targetX - ring.rotation.y);

    }
    else {

        sphere.rotation.y += 0.01;

        ring.rotation.z -= 0.005;
    }

    renderer.render( scene, camera );
};

animate();