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
        this.room.children.forEach((child)=>{
            if (child.type === 'RectAreaLight'){
                this.rectLight = child
            }
        })
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger()

    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //DESKTOP
            '(min-width: 969px)':  ()=> {
                console.log('Desk now')


                // ------------- FIRST SECTION
                this.firstMoveTimeLine = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start:'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.firstMoveTimeLine.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0015
                    }
                })

                // ------------- SECOND SECTION
                this.secondMoveTimeLine = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        // markers: true,
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                .to(this.room.position, {
                    x: ()=>{
                        return 1;
                    },
                    z: ()=>{
                        return this.sizes.height * 0.0032
                    }
                }, 'same')
                .to(this.room.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5
                }, 'same')
                .to(this.rectLight, {
                    width: 0.5 * 5,
                    height: 0.8 * 5
                }, 'same')
                // ------------- THIRD SECTION
                this.thirdMoveTimeLine = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start:'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                .to(this.camera.OrthographicCamera.position, {
                    y: -2,
                    x:-4.7,
                })

            },
            // MOBILE
            '(max-width: 968px)':  ()=> {
                console.log('Mobile now')
                // ------------- FIRST SECTION
                this.firstMoveTimeLine = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start:'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })

                // ------------- SECOND SECTION
                this.secondMoveTimeLine = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        // markers: true,
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
// ------------- THIRD SECTION
                this.thirdMoveTimeLine = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start:'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
            },

            all: function (){}
        })

        // console.log(this.room)
        // this.timeline = new GSAP.timeline();
        // this.timeline.to(this.room.position,{
        //     x: ()=> {
        //         return this.sizes.width * 0.0015
        //     },
        //     scrollTrigger:{
        //         trigger: '.first-move',
        //         markers: true,
        //         start: 'top top',
        //         end: 'bottom bottom',
        //         scrub: 0.6,
        //         invalidateOnRefresh: true
        //     }
        // })
    }


    resize(){

    }
    update(){

    }

}