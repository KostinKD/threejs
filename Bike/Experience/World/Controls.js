import Experience from "../Experience.js";
import * as THREE from 'three'
import scene from "three/addons/offscreen/scene.js";
import GSAP from 'gsap'


export default class Controls{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.camera = this.experience.camera

        this.lerp = {
            current: 1,
            target: 0,
            ease: 0.1,
        }

        this.dummyCurve = new THREE.Vector3(0,0,0)
        this.progress = 0

        this.position = new THREE.Vector3(0,0,0)

        this.setPath()
        this.onWheel();
    }

    setPath(){
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-10,0,10),
            new THREE.Vector3(-5,5,5),
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(5,-5,5),
            new THREE.Vector3(10,0,10)
        ], true);

        this.curve.getPointAt(this.progress,this.dummyCurve)
        this.camera.OrthographicCamera.position.copy(this.dummyCurve)

        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        const material = new THREE.LineBasicMaterial({color: 0xff000})

        const curveObject = new  THREE.Line(geometry,material)

        this.scene.add(curveObject)

    }

    onWheel(){
        window.addEventListener('wheel', (e)=>{
            console.log(e)
            if (e.deltaY > 0){
                this.lerp.target += 0.1
                this.back = true
            }else {
                this.lerp.target -= 0.1;
                this.back = false
            }
        })
    }
    resize(){

    }
    update(){

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        if (this.back){
            this.lerp.target -= 0.001
        } else {
            this.lerp.target += 0.001
        }

        this.lerp.target = GSAP.utils.clamp(0,1, this.lerp.target)
        this.lerp.current = GSAP.utils.clamp(0,1, this.lerp.current)
        this.curve.getPointAt(this.lerp.current,this.position)
        // this.progress -= 0.01
        // this.progress -= this.w

        this.camera.OrthographicCamera.position.copy(this.position)

    }

}