import * as THR from './Three JS/build/three.module.js';
import {GLTFLoader} from './Three JS/examples/jsm/loaders/GLTFLoader.js';

// Initialize scene, renderer, and camera
var container = document.getElementById('canvasJS');

const width = container.clientWidth;
const height = container.clientHeight;

const sc = new THR.Scene();

const renderer = new THR.WebGLRenderer({antialias: true});
renderer.setSize(width-16, height-16);
renderer.setClearColor("#00432a");
container.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

const camera = new THR.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.set(0, 20, 45);
camera.lookAt(0, -30, 10);

//Light
function ptlight(){
    let light = new THR.PointLight(0xffffff, 5);
    light.position.set(0, 10, 60);

    light.castShadow = true;
    sc.add(light);
}
ptlight();

// Background meja
const texture = new THR.TextureLoader();

const tabletext = texture.load('./assets/table.jpg');
let tablegeo = new THR.PlaneGeometry(200, 100);
let tablemat = new THR.MeshPhongMaterial({
    map : tabletext,
    side: THR.DoubleSide
})

let plane = createobj(tablegeo, tablemat);
plane.position.set(0, 0, 0);
plane.rotation.x = -Math.PI/2;
plane.receiveShadow = true;

// Pusat berputar
const group = new THR.Group();
group.position.set(0, 0, 0);

sc.add(group);

// Model
const loader = new GLTFLoader();

// Vanilla Eclair
let eclair;
loader.load('./assets/bread/eclair/scene.gltf', (gltf) => {
    eclair = gltf.scene;
    eclair.scale.multiplyScalar(0.15); 
    eclair.position.set(0, 10, 30);
    eclair.castShadow = true;

    group.add(eclair);
});

// Cream filled Eclair
let cream;
loader.load('./assets/bread/cream_filled_eclaire/scene.gltf', (gltf) => {
    cream = gltf.scene;
    cream.scale.multiplyScalar(0.15); 
    cream.position.set(30, 10, 0);
    cream.castShadow = true;

    group.add(cream);
});

// Cheese Eclair
let cheese;
loader.load('./assets/bread/eclair/scene.gltf', (gltf) => {
    cheese = gltf.scene;
    cheese.scale.multiplyScalar(0.15); 
    cheese.position.set(0, 10, -30);
    cheese.castShadow = true;

    group.add(cheese);
});

// Croissant
let croissant;
loader.load('./assets/bread/almond_croissant/scene.gltf', (gltf) => {
    croissant = gltf.scene;
    croissant.scale.multiplyScalar(0.15); 
    croissant.position.set(-30, 10, 0);
    croissant.castShadow = true;

    group.add(croissant);
});

function createobj(geo, mats){
    const mesh = new THR.Mesh(geo, mats);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    sc.add(mesh);
    return mesh;
}

function animate(){

    // Rotate model
    if(eclair){
        eclair.rotation.y += -Math.PI/180;
    }

    if(cream){
        cream.rotation.y += -Math.PI/180;
    }

    if(cheese){
        cheese.rotation.y += -Math.PI/180;
    }

    if(croissant){
        croissant.rotation.y += -Math.PI/180;
    }

    // change which one is whown when buttons are clicked
    if(direction == 0){
        if(group.rotation.y < (-Math.PI/2) * rotpos){
            group.rotation.y += Math.PI/90;
        }
    }else{
        if(group.rotation.y > (-Math.PI/2) * rotpos){
            group.rotation.y += -Math.PI/90;
        }
    }

    // Make Three JS on loop
    requestAnimationFrame(animate);
    renderer.render(sc, camera);

}

animate();