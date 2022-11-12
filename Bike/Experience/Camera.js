import Experience from "./Experience.js";
import * as THREE from 'three'
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import scene from "three/addons/offscreen/scene.js";


export default class Camera{
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas


        this.perspectiveCamera();
        this.createOrthographicCamera()
        this.setOrbitControls()
    }

    perspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35,this.sizes.aspect,0.1,100)
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.z = 5
    }

    createOrthographicCamera(){
        this.frustrum = 5;
        this.OrthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -100,
            100
        )
        this.scene.add(this.OrthographicCamera)

        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size,divisions)
        this.scene.add(gridHelper)

        const axesHelper = new THREE.AxesHelper(10)
        this.scene.add(axesHelper)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true
        this.controls.enableZoom = true
    }

    resize(){
        //Updating perspective camera and resize
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()


        //Updating Orthogptaghic camera and resize
        this.OrthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2,
        this.OrthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2,
        this.OrthographicCamera.top = this.sizes.frustrum/2,
        this.OrthographicCamera.bottom = -this.sizes.frustrum/2
        this.OrthographicCamera.updateProjectionMatrix()
    }

    update(){
        this.controls.update()

    }

}