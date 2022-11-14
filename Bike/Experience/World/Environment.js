import Experience from "../Experience.js";
import * as THREE from 'three'
import scene from "three/addons/offscreen/scene.js";
import GSAP from "gsap";
import GUI from "lil-gui";



export default class Environment{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.gui = new GUI({container: document.querySelector('.hero-main')})
        this.obj = {
            colorObj: { r:0 , g:0 , b:0},
            intensity: 3,
        }

        this.setGUI()
        this.setSunLight()
        // this.setAmbientLight()
        // this.setPointLight()
    }


    setGUI(){
        this.gui.addColor(this.obj, 'colorObj').onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj)
            this.ambientLight.color.copy(this.obj.colorObj)
            console.log(this.obj.colorObj)
        })
        this.gui.add(this.obj, 'intensity', 0,10).onChange(()=> {
            this.sunLight.intensity = this.obj.intensity
            this.ambientLight.intensity = this.obj.intensity
        })
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


    switchTheme(theme){
        if (theme === 'dark'){
            GSAP.to(this.sunLight.color,{
                r: 0 / 255,
                g: 0 / 255,
                b: 0 / 255
            })
            GSAP.to(this.ambientLight.color,{
                r: 0 / 255,
                g: 0 / 255,
                b: 0 / 255
            })
        } else {
            GSAP.to(this.sunLight.color,{
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255
            })
            GSAP.to(this.ambientLight.color,{
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255
            })
        }
    }
    resize(){

    }
    update(){

    }

}