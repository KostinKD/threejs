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
                    ease: 'power1.out',
                    // duration: 0.7,
                    // onComplete: resolve,
                }, 'same').to(this.roomChildren.cube.rotation, {
                    y: 2* Math.PI + Math.PI / 4
                }, 'same').to(this.roomChildren.cube.scale, {
                    x: 10,
                    y: 10,
                    z: 10
                }, 'same').to(this.camera.OrthographicCamera.position, {
                    y: 6.5,
                }, 'same').to(this.roomChildren.cube.position, {
                    x: 0.638711,
                    y: 8.5618,
                    z: 1.3243
                }, 'same').set(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1
                }).to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0
                })
            } else {
                this.secondTimeline.to(this.room.position, {
                    z: 0,
                    x: 0,
                    y: 0,
                    ease: 'back.out(2.5)',
                    duration: 0.7,
                    onComplete: resolve,

                })
            }
        })

    }



    onScroll(e){
        if (e.deltaY > 0){
            window.removeEventListener('wheel', this.scrollOnceEvent)
            this.playSecondIntro()

        }
    }

    async playIntro(){
        await this.firstIntro()
        console.log('continuing')
        this.scrollOnceEvent = this.onScroll.bind(this)
        window.addEventListener('wheel', this.scrollOnceEvent)
    }
    async playSecondIntro(){
        await this.secondIntro()
    }

}