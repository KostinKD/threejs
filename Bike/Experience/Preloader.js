import {EventEmitter} from "events";
import Experience from "./Experience.js";
import GSAP from 'gsap'

export default class Preloader extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.world = this.experience.world
        this.device = this.sizes.device


        this.sizes.on('switchdevice', (device)=>{
            this.device = device
        })

        this.world.on('worldready', ()=>{
            this.setAssets()
            this.playIntro()
        })
    }

    setAssets(){
        this.room = this.experience.world.room.actualRoom
        this.roomChildren = this.experience.world.room.roomChildren

    }

    firstIntro(){

        return new Promise((resolve)=>{
            this.timeline = new GSAP.timeline()

            if (this.device === 'desktop') {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'back.out(2.5)',
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: 'power1.out',
                    duration: 0.7,
                    onComplete: resolve,
                })
            } else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'back.out(2.5)',
                    duration: 0.7,
                    onComplete: resolve,
                })
            }
        })

    }

    secondIntro(){
        return new Promise((resolve)=>{
            this.secondTimeline = new GSAP.timeline()

            if (this.device === 'desktop') {
                this.secondTimeline.to(this.room.position, {
                    z: 0,
                    x: 0,
                    y: 0,
                    // ease: 'back.out(2.5)',
                    // ease: 'power1.out',
                    // duration: 0.7,
                    // onComplete: resolve,
                }, 'same').to(this.roomChildren.cube.rotation, {
                    y: 2* Math.PI + Math.PI / 4
                }, 'same').to(this.roomChildren.cube.scale, {
                    x: 10,
                    y: 10,
                    z: 10
                }, 'same').to(this.camera.OrthographicCamera.position, {
                    y: 3.5,
                }, 'same').to(this.roomChildren.cube.position, {
                    x: 0.638711,
                    y: 8.5618,
                    z: 1.3243

                    // x: 0,
                    // y: 0,
                    // z: 1
                }, 'same').set(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1
                }).to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0
                }).to(this.roomChildren.aquarium.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.clock.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.shelves.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.floor_items.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.desks.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.table_stuff.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.computer.scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.chair.scale,{
                    y: 1,
                    x: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }).to(this.roomChildren.chair.rotation,{
                    y: 4 * Math.PI + Math.PI / 4,
                    ease: 'power1.out',
                    duration: 1,
                    onComplete: resolve,
                })
            }
            // else {
            //     this.secondTimeline.to(this.room.position, {
            //         z: 0,
            //         x: 0,
            //         y: 0,
            //         ease: 'back.out(2.5)',
            //         duration: 0.7,
            //         onComplete: resolve,
            //     })
            // }
        })

    }



    onScroll(e){
        if (e.deltaY > 0){
            this.removeEventListeners()
            this.playSecondIntro()

        }
    }
    onTouch(e){
        console.log(e)
        this.initialY = e.touches[0].clientY
    }
    onTouchMove(e){
        let currentY = e.touches[0].clientY
        let difference = this.initialY - currentY
        if (difference > 0 ){
            console.log('swipeed up')
            this.removeEventListeners()
            this.playSecondIntro()
        }
        this.initialY = null
    }

    removeEventListeners(){
        window.removeEventListener('wheel', this.scrollOnceEvent)
        window.removeEventListener('touchstart', this.touchStart)
        window.removeEventListener('touchmove', this.touchMove)
    }
    async playIntro(){
        await this.firstIntro()
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener('wheel', this.scrollOnceEvent)
        window.addEventListener('touchstart', this.touchStart)
        window.addEventListener('touchmove', this.touchMove)
    }
    async playSecondIntro(){
        await this.secondIntro()
    }

}