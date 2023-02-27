import React, {FC} from 'react';
import "./Enemy.css"
import { IEnymy, IBullet } from '../types';
import enemy_bullet from '../../assets/Sprites/Golem sprite/bullet/bullet.png'
import { v4 as uuid } from 'uuid';
import Bullet from '../Bullet/Bullet';
import { Context } from '../Context';



interface IEnymyCanvas{
    canvas:null | HTMLCanvasElement,
    ctx: null | CanvasRenderingContext2D,
    image:null | HTMLImageElement,
    frame:number,
    walk:string,
    stand:string,
    die:string,
    atack:string,
    corX:number,
    allEnymySteps:number,
    allSteps:number,
    action:string,
    stepLength:number,
    rightDirection: boolean,
    animationSpeed:number,
    intervalID:NodeJS.Timer | undefined,
    init:() => void,
    render:() => void,
    anim:() => void,
    run:() => void,
    start:() => void,
    makeStep:() => void,
    died:() => void,
    reset:(act:string) => void,
    atacks:() => void,
    HP:number,
    checkDamage:()=>void,
    blockHP:HTMLDivElement | null,
    checkCharacter:()=>void,
    lastAction:string,
    lastStep:number,
    bullet:JSX.Element[],
    throwStone:()=>void,
    
}
const Enemy:FC<IEnymy> = ({width, height, ...props}) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const currentHP= React.useRef<HTMLDivElement>(null)
    let [endLive, setEndLive] = React.useState(false);
    let isDie = false;
    let isAttack = false;

    let CANVAS:IEnymyCanvas= {
        walk:props.walk,
        stand:props.stand,
        die:props.die,
        atack:props.atack,

        canvas:null,
        ctx: null,
        image:null,
        frame:0,
        allSteps:props.walkSteps,
        
        corX:0,
        allEnymySteps:0,
        action:'walk',
        stepLength:20,
        rightDirection:props.rightDirection,
        
        animationSpeed:props.walkSpeed,
        intervalID:undefined,
        HP:100,
        blockHP:null,
        bullet:[],
        init(){
            this.canvas = canvasRef.current;
            this.blockHP = currentHP.current;
            this.ctx = this.canvas!.getContext('2d');
            this.canvas!.width = width;
            this.canvas!.height = height;
            this.canvas!.parentElement!.style.left = props.left + 'px';
            this.canvas!.parentElement!.style.top = props.top + 'px';

            if(!this.rightDirection){
                if(this.canvas)
                    this.canvas.classList.add('mirrorX');
                    this.stepLength = -20;
            }
            this.corX = this.canvas!.parentElement!.offsetLeft;
            this.image = new Image();
            this.image.src = this.walk;
            this.canvas!.addEventListener("damage",(e:CustomEventInit)=>{
                this.HP -= e.detail.damage;
                this.checkDamage();
            })
            
        },
        reset(act:string){
            if(this.image)
            {
                this.image!.src = this[act as keyof typeof CANVAS] as string;
                this.frame = 0;
                this.allSteps = props[act + 'Steps' as keyof typeof props] as number;
                this.allEnymySteps = 0;
                this.action = act;
                this.animationSpeed = props[act + 'Speed' as keyof typeof props] as number;
                if(this.intervalID){
                    clearInterval(this.intervalID);
                    this.intervalID = undefined
                }
                if(!endLive)
                    this.anim();
            }
        },
        checkDamage(){
            this.blockHP!.style.width = this.HP + '%';
            if(this.HP <= 0){
                if(this.action  != 'die')
                    this.died();
            }
        },
        makeStep(){
            if((!window.location.href.includes('Authorization')) && (!window.location.href.includes('Level')))
            {
                this.died();
            }
            
            this.checkCharacter();
            let oneStep = () =>{
                if(this.allEnymySteps != props.walkAllEnymySteps && this.action == 'walk') {

                    this.corX += this.stepLength 
                    
                    this.canvas!.parentElement!.style.left = `${this.corX}px`;
                    this.allEnymySteps++;
                } 
                if(this.allEnymySteps == props.walkAllEnymySteps && this.action == 'walk'){
                    this.reset('stand')}
                if(this.allEnymySteps != props.standAllEnymySteps && this.action == 'stand') {
                    this.allEnymySteps++;
                } 
                if(this.allEnymySteps == props.standAllEnymySteps && this.action == 'stand'){
                    if(this.rightDirection) {
                        this.rightDirection = !this.rightDirection
                        if(this.canvas)
                            this.canvas.classList.add('mirrorX');
                        this.stepLength = -20;
                    }
                    else{ 
                        this.rightDirection = !this.rightDirection
                        if(this.canvas) {
                            if(this.canvas.classList.contains('mirrorX'))
                                this.canvas.classList.remove('mirrorX');
                        }
                        this.stepLength = 20;
                    }
                    this.reset('walk')
                }
                
            }
            this.frame++;
            if(this.frame == this.allSteps)
            {
                oneStep();
                this.frame = 0;
            }
            if(this.frame == Math.floor(this.allSteps / 2))
            {
                if(this.action == 'atack')
                {
                    this.throwStone();
                }
                else{
                    oneStep();
                }
            }
        
        },
        anim(){
            this.intervalID = setInterval(() => {this.makeStep()}, this.animationSpeed)
        },
        render(){
            this.ctx?.clearRect(0,0, this.canvas!.width, this.canvas!.height);
            if(this.image)
                    this.ctx!.drawImage(this.image, this.frame * width, 0, width, height, 0, 0, width, height);
        },
        run(){
            window.requestAnimationFrame(() =>{
                if(!isDie){
                    this.render();
                    this.run();  
                }
                
            })
            
        },
        start(){
            this.init();
            this.anim();
            this.run();
        },
        lastAction:'nn',
        lastStep:-1,
        checkCharacter(){
            let rect = this.canvas?.getBoundingClientRect();
            let point = {x:this.rightDirection ? rect!.right : rect!.left, y:rect!.top + width/2};
            let block = document.elementFromPoint(point.x, point.y);
            let block2 = document.elementFromPoint(point.x + (this.rightDirection?100:-100), point.y);
            let block3 = document.elementFromPoint(point.x +(this.rightDirection?200:-200), point.y);
            let block4 = document.elementFromPoint(point.x +(this.rightDirection?300:-300), point.y);
            if((block?.tagName == 'CANVAS' &&  block.classList.contains('characterCanvas')) ||
            (block2?.tagName == 'CANVAS' &&  block2.classList.contains('characterCanvas')) ||
            (block3?.tagName == 'CANVAS' &&  block3.classList.contains('characterCanvas')) ||
            (block4?.tagName == 'CANVAS' &&  block4.classList.contains('characterCanvas')))
            {
                
                if(!isAttack){
                    isAttack = true;
                    if(this.lastAction == 'nn')
                        this.lastAction = this.action;
                    if(this.lastStep == -1)
                        this.lastStep = this.allEnymySteps;
                    this.atacks();
                }
            } else{
                if(isAttack)
                {
                    isAttack = false;
                    this.reset(this.lastAction);
                    this.lastAction = 'nn';
                    this.allEnymySteps = this.lastStep;
                    this.lastStep=-1;
                }
               // console.log(this.action);
            }
        },
        throwStone(){
            let key = uuid();
            let x = this.rightDirection ? this.corX + width/2 + 50: this.corX + width/2 -50;
            this.bullet.push(<Bullet
                damage={props.myBullet?.damage ?? 10}
                whoseBullet={'enemy'}
                key={key}
                height={props.myBullet?.height ?? 10}
                width={props.myBullet?.width ?? 10}
                image={props.myBullet?.image ?? ''}
                stepCount={props.myBullet?.stepCount ?? 7}
                speed={4}
                corX={x}
                corY={props.top + (props.myBullet?.offset ?? 0)}
                direction={this.rightDirection ? 'right' : 'left'}
            ></Bullet>)
            props.setBullet(this.bullet);
            props.setBulletChange(this.bullet.length);;
            
            setTimeout(()=>{ 
                if(props.newLive != 0){
                    this.bullet.shift();
                    props.setBullet(this.bullet);
                    props.setBulletChange(this.bullet.length);
                }
                else{
                    this.bullet = [];
                    props.setBullet(this.bullet);
                    props.setBulletChange(this.bullet.length);
                }
            }, 5000);
        },
        atacks(){
            this.reset('atack');
        },
        died(){
            this.reset('die');
            let time = props.dieSpeed * props.dieSteps * props.dieAllEnymySteps - 100;
            setTimeout(() =>{
                if(this.intervalID){
                    clearInterval(this.intervalID);
                    this.intervalID = undefined
                }
                isDie = true;
                props.endLeave();
                setEndLive(true);
            }, time)
        }
    }
    React.useEffect(() => {
        CANVAS.start();
    },[])
    return (
        
        <div className='enemy' style ={{
            position:'absolute',
            width: width + 'px',
            height: height + 'px'
        }}>
            {props.showHP ?
                <div className='enymyHP' >
                <div 
                    className='currentHP'
                    ref={currentHP}
                ></div>
                </div>
                :null
            }
            <canvas 
                className='enemyCanvas'
                ref={canvasRef}
            > </canvas>
        </div>
    );
};

export default Enemy;