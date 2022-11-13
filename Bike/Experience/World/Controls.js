import Experience from "../Experience.js";
import * as THREE from 'three'
import scene from "three/addons/offscreen/scene.js";
import GSAP from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default class Controls{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.room = this.experience.world.room.actualRoom
        GSAP.registerPlugin(ScrollTrigger);

        this.setPath()

    }

    setPath(){
        console.log(this.room)
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.room.position,{
            x: ()=> {
                return this.sizes.width * 0.0017
            },
            scrollTrigger:{
                trigger: '.first-move',
                markers: true,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.6,
                invalidateOnRefresh: true
            }
        })
    }


    resize(){

    }
    update(){

    }

}