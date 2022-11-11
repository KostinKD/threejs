import Experience from "./Experience.js";
import * as THREE from 'three'


export default class Camera{
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas


        this.perspectiveCamera();
        this.createOrthographicCamera()
    }

    perspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35,this.sizes.aspect,0.1,100)
        this.scene.add(this.perspectiveCamera)
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
        this.perspectiveCamera.position.z = 5
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

    }

}