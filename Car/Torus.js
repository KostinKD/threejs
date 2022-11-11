import '/style.css'

import * as THREE from 'three'
// import GLTFLoader from "three-gltf-loader";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

//SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddd)

let hlight = new THREE.AmbientLight(0x404040,100)
scene.add(hlight)

let directionalLight = new THREE.DirectionalLight(0xfffff,100)
directionalLight.position.set(0,1,0)
directionalLight.castShadow =true
scene.add(directionalLight)

let light = new THREE.PointLight(0xc4c4c4,10)
light.position.set(0,300,500)
scene.add(light)

//CAMERA



const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000)

camera.rotation.y = 90/180*Math.PI
camera.position.x = 800
camera.position.y = 100
camera.position.z = 100

//RENDER
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias:true
});

let controls = new OrbitControls(camera,renderer.domElement)
controls.update()




//LOADER
let loader = new GLTFLoader()
loader.load('scene.gltf', function (glft){
    let car = glft.scene.children[0];
    car.scale.set(0.5,0.5,0.5)
    scene.add(glft.scene);
    renderer.render(scene,camera);
    animate();
})
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}




renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

renderer.render(scene,camera)