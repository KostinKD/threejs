import Experience from "../Experience.js";
import * as THREE from 'three'
import scene from "three/addons/offscreen/scene.js";


export default class Environment{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setSunLight()
        // this.setAmbientLight()
        // this.setPointLight()
    }


    setPointLight(){
        this.pointLight = new THREE.PointLight('#ffffff', 1)
        this.pointLight.position.set(0, 1,0)
        // this.pointLight.castShadow = true
        // this.pointLight.receiveShadow = true

        this.scene.add(this.pointLight)
    }
    // AMBIENT LIGHT
    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight('#ffffff',0.4)
        // this.ambientLight.castShadow = true
        // this.ambientLight.receiveShadow = true

        this.scene.add(this.ambientLight)
    }

    // SUN LIGHT
    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.mapSize.set(2048,2048)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-1.5,7,3)
        this.scene.add(this.sunLight)

        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        // this.scene.add(helper)

        this.ambientLight = new THREE.AmbientLight('#ffffff',1)
        this.scene.add(this.ambientLight)
    }
    resize(){

    }
    update(){

    }

}