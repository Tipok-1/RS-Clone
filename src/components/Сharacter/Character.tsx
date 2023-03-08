import React, {FC} from 'react';
import './Character.css'
import { ICanvasCharacter, ICharacter} from '../types';
import {useNavigate } from 'react-router-dom';
import Bullet from '../Bullet/Bullet';
import { v4 as uuid } from 'uuid';

const Character:FC<ICharacter> = (props:ICharacter) => {
    const router = useNavigate();
    const LozePath = "/Loze";
    const WinPath = "/Win";
    let itWin = false;

    const [endLive, setEndLive] = React.useState(false);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    let moveRight = false;
    let moveLeft = false;
    let oneKey = false;
    let isJump = false;
    let isDoubleJump = false;
    let isFall = false;
    let isDie = false;
    let isAttack = false;
    let CANVAS:ICanvasCharacter = {
        walk:props.walk,
        canvas:null,
        ctx: null,
        image:null,
        frame:0,
        animationSpeed:props.walkSpeed,
        intervalID:undefined,
        corX:0,
        corY:document.documentElement.clientHeight/2 - props.height + 220,
        allSteps:props.walkSteps,
        direction:'right',
        stepLength:3,
        bullet:[],
        allLives:3,
        HP:props.HP,
        
        init(){
            this.canvas = canvasRef.current;
            this.ctx = this.canvas!.getContext('2d');
            this.canvas!.width = props.width;
            this.canvas!.height = props.height;
            this.canvas!.style.left = 0 + 'px';
            this.corX = this.canvas!.offsetLeft;
            this.canvas!.style.top = `${this.corY}px`;
            this.image = new Image();
            this.image = this.walk;
            this.canvas!.addEventListener("damage",(e:CustomEventInit)=>{
                this.HP -= e.detail.damage;
                let prosent = Math.round(((this.HP * 100)/props.HP));
                
                props.setCharacterHP(prosent);
                if(this.HP <= 0){
                    if(!isDie){
                        this.resetFall()
                        this.allSteps = props.dieSteps;
                        this.image = props.die;
                       // if(!itWin)
                            this.die();
                    }
                }
            })
        },
        fallStep:2,
        resetFall(){
            if(isJump || isDoubleJump)
            {
                if(!isAttack)
                    this!.image = props.walk
                isJump = false;
                isDoubleJump = false;
            }
            isFall = false;
            this.fallStep = 2;
        },
        checkFall(){
            let rect = this.canvas?.getBoundingClientRect();
            let left = 0;
            if(rect!.left > 0)
            {
                left = rect!.left;
            }
            let block = document.elementFromPoint(left +this.canvas!.width/2 - 28, rect!.bottom - 20);
            let block2 = document.elementFromPoint(left + this.canvas!.width/2 + 28, rect!.bottom - 20);

            if((block?.tagName == 'DIV' && block.classList.contains('block')) ||
            (block2?.tagName == 'DIV' && block2.classList.contains('block')))
            {
                this.resetFall()
            }
            else if(rect!.bottom >= this.canvas!.parentElement!.getBoundingClientRect().bottom-22)
            {
                this.resetFall()
                this.allSteps = props.dieSteps;
                this.image= props.die;
               //if(!itWin){
            console.log(this.canvas!.parentElement!.offsetHeight);
               
                    this.die();
               //}
            }
            else {isFall = true}
            props.scrollWindow(this);
            if(isFall)
            {
                this.corY = parseFloat(this.canvas!.style.top) + this.fallStep;
                this.fallStep += 0.01;
                this.canvas!.style.top = this.corY + 'px'
                if(!itWin)
                    setTimeout(()=>this.checkFall(), 2);
            }
        },
        checkLet(){
            let rect = this.canvas?.getBoundingClientRect();
            
            let leftblock = document.elementFromPoint(rect!.left + 50, rect!.bottom- 27);
            let rightblock = document.elementFromPoint(rect!.right -50, rect!.bottom - 27);
            if((leftblock?.tagName == 'CANVAS' && leftblock.classList.contains('enemyCanvas')) ||
            (rightblock?.tagName == 'CANVAS' && rightblock.classList.contains('enemyCanvas')) )
            {
                this.corX = this.corX - (this.direction == 'right'? 30: -30);
                this.corY = this.corY -30;
                this.canvas!.style.left = this.corX + 'px';
                this.canvas!.style.top = this.corY + 'px'
                this.canvas!.dispatchEvent(new  CustomEvent("damage", {detail: {damage:5}}));
                
            }
            if(leftblock?.tagName == 'DIV' && (leftblock.classList.contains('blockParent')||leftblock.classList.contains('block')) && this.direction == 'left'||
            rightblock?.tagName == 'DIV' && (rightblock.classList.contains('blockParent') || rightblock.classList.contains('block')) && this.direction == 'right')
            {
                this.frame = 0;
                this.stepLength = 0
            }
        },
        win(){
            fn();
            if(props.setLevel)
            {
                itWin = true;
                localStorage.setItem('firstLevelScore', `${this.HP * this.allLives}`);
                props.setLevel(2)
            } else {
                if(!itWin) {
                    itWin = true;
                    let place = 0;
                    let allScore= this.HP * this.allLives + Number((localStorage.getItem('firstLevelScore') ?? 0));
                    if(localStorage.getItem('Leaders'))
                    {
                        
                        let leaders = JSON.parse(localStorage.getItem('Leaders') as string)
                        
                        if(leaders.length < 5) {
                            let obj = {score:allScore, name:(localStorage.getItem('name') ?? 'Guest')}
                            leaders.push(obj);
                            leaders.sort((a:{score:number, name:string},b:{score:number, name:string})=> b.score - a.score);
                            place = leaders.indexOf(obj);
                            localStorage.setItem('place',`${place}`);
                        }
                        else {
                            if(allScore > leaders[0].score)
                            {
                                let obj = {score:allScore, name:(localStorage.getItem('name') ?? 'Guest')}
                                leaders.push(obj);
                                leaders.sort((a:{score:number, name:string},b:{score:number, name:string})=> b.score - a.score);
                                leaders.shift();
                                place = leaders.indexOf(obj);
                                localStorage.setItem('place',`${place}`);
                            }
                        }
                        localStorage.setItem('Leaders', JSON.stringify(leaders));
                    }
                    else{
                        localStorage.setItem('Leaders', JSON.stringify([]));
                    }
                    router(WinPath);
                }
            }
        },
        makeStep(){
            if(!isDie){
                //console.log('1');
                
                if(this.corY <= 825 && this.corY >= 808 && this.corX >= 7380 && this.corX <= 7420)
                {
                    this.win();
                }
                if(!itWin){
                    this.checkLet()
                    if(this.corX >= 7650 - props.width + 10 && moveRight
                    || this.corX <= -10 && moveLeft)
                    {
                        this.stepLength = 0;
                    }
                    if(this.direction == 'right' || this.direction == 'left')
                    {

                        if(!isFall)
                            this.checkFall()
                        this.corX += this.stepLength;
                        this.canvas!.style.left = `${this.corX}px`;
                    }
                    if(!isJump && !isFall && !isAttack){
                        
                        this.frame++;
                        if(this.frame == this.allSteps)
                        {
                            this.frame = 0;
                        }
                    }
                    if(moveRight || moveLeft)
                    {
                        setTimeout(()=>this.makeStep(),props.walkSpeed);
                    }
                    else{
                        this.frame = 0;
                    }
                }
            }
            
            
        },
        anim(){
            if(!isJump && !isDoubleJump && !isFall && !isAttack)
                this!.image = props.walk;
            //this.frame = 0;
            this.makeStep();
        },
        move(dir){
            if(!isAttack)
                this.allSteps = props.walkSteps;
            this.direction = dir;
            this.anim();
        },
        moveRight(jump){
            if(this.canvas!.classList.contains('mirrorX'))
                this.canvas!.classList.remove('mirrorX');
            this.stepLength = 3;
            if(!jump) {
                this.move('right');}
        },
        moveLeft(jump){
            if(!this.canvas!.classList.contains('mirrorX'))
                this.canvas!.classList.add('mirrorX');
           this.stepLength = -3;
            if(!jump) {
                this.move('left');}
        },
        startJump:0,
        resetJump(){
            this.startJump = 0;
            this.frame = 0;
            if(!isFall){
                setTimeout(()=>this.checkFall(),20)
            }
        },
        checkUpBlock(){
            let rect = this.canvas?.getBoundingClientRect();
            let leftblock = document.elementFromPoint(rect!.left + 50, rect!.top + 27);
            let rightblock = document.elementFromPoint(rect!.right -50, rect!.top + 27);
            if((leftblock?.tagName == 'CANVAS' && leftblock.classList.contains('enemyCanvas')) ||
            (rightblock?.tagName == 'CANVAS' && rightblock.classList.contains('enemyCanvas')) )
            {
                return true;
            }
            if(leftblock?.tagName == 'DIV' && (leftblock.classList.contains('blockParent')||leftblock.classList.contains('block')) && this.direction == 'left'||
            rightblock?.tagName == 'DIV' && (rightblock.classList.contains('blockParent') || rightblock.classList.contains('block')) && this.direction == 'right')
            {
                return true;
            }
            return false;
        },
        jump(str, count){
            if(!isDie && !itWin){
                count--;
                if(!this.startJump)
                    this.startJump = parseFloat(this.canvas!.style.top);

                if(!this.checkUpBlock())
                {
                    this.corY = this.startJump - 11;
                    this.startJump -= 11;
                    this.canvas!.style.top = this.corY + 'px';

                    props.scrollWindow(this);
                    this.allSteps = props.jumpSteps;
                    if(!isAttack){
                        if(count % 4 == 0)
                            this.frame++;
                    }
                    if(count == 0)
                    {
                        this.resetJump()
                    }
                    else{
                        if((str == 'one' && isJump) || (str=='double' && isDoubleJump))
                        {
                            setTimeout(()=>this.jump(str , count), props.jumpSpeed);
                        } else {this.resetJump();}
                    }
                }
                else {
                    this.resetJump()
                }
            }
        }, 
        die(){
            if(!isDie && !itWin)
                isDie = true;
            this.frame++;
            if(this.frame >= this.allSteps)
            {
                this.allLives--;
                console.log(this.allLives);
                
                if(this.allLives == 0) {
                    itLoze();
                }
                else {
                    this.newLife();
                }
            }
            else{
                setTimeout(()=>this.die(), props.dieSpeed);
            }
        },
        newLife(){
            this.frame = 0;
            this.canvas!.style.left = '0px';
            if(this.canvas!.classList.contains('mirrorX'))
                this.canvas!.classList.remove('mirrorX');
                this.direction = 'right';
            this.corX = this.canvas!.offsetLeft;
            this.corY = document.documentElement.clientHeight/2 - props.height + 220
            this.canvas!.style.top = `${this.corY}px`;
            this!.image = props.walk
            props.scrollWindow(this)
            moveRight = false;
            moveLeft = false;
            oneKey = false;
            isJump = false;
            isDoubleJump = false;
            isFall = false;
            isDie = false;
            isAttack = false;
            itWin = false;
            this.bullet=[];
            props.setBullet(this.bullet);
            props.setBulletChange(this.bullet.length);
            props.setCharacterHP(100);
            this.HP = props.HP;
            props.setNewLive(this.allLives);
        },
        attack(){
            if(!isDie)
            {
                this.allSteps = props.attackSteps;
                this.frame = 0;
                let key = uuid();
                let x = this.direction == 'right' ? this.corX + props.width/2 + 20: this.corX + props.width/2 - 20;
                this.bullet.push(<Bullet
                    damage={props.myBullet.damage}
                    whoseBullet={'character'}
                    key={key}
                    height={props.myBullet.height}
                    width={props.myBullet.width}
                    image={props.myBullet.image}
                    stepCount={props.myBullet.stepCount}
                    speed={3}
                    corX={x}
                    corY={this.corY + props.height/2 + (props.myBullet.offset ?? 0)}
                    direction={this.direction}
                ></Bullet>)
               setTimeout(()=>{
                    this.bullet.shift();
                    props.setBullet(this.bullet);
                    props.setBulletChange(this.bullet.length);
                }, 8000);
               props.setBullet(this.bullet);
               props.setBulletChange(this.bullet.length);
                let a = ()=>{
                    
                    this.frame++;
                    if(this.frame >= this.allSteps)
                    {
                        isAttack = false;
                        this.frame = 0; 
                    }
                    else{
                        setTimeout(()=>a(), props.attackSpeed);
                    }
                }
                a();
            }
        },
        run(){
            if(!endLive){
                window.requestAnimationFrame(() =>{
                    this.render();
                    this.run();
                })
            }
        },
        render(){
            this.ctx?.clearRect(0,0, this.canvas!.width, this.canvas!.height);
            if(this.image)
                    this.ctx!.drawImage(this.image, this.frame * props.width, 0, props.width, props.height, 0, 0, props.width, props.height);
        },
        start(){
            this.init();
            this.run();
        }
    }
    function itLoze(){
        fn();
        router(LozePath);
    }
    let fn = function(){
        document.removeEventListener("keydown", KeyDown);
        document.removeEventListener("keyup", KeyUp);
        removeEventListener("popstate",fn);
    }
    function KeyDown(e:KeyboardEvent){
        e.preventDefault();
        if(!isDie){
            if(e.code == 'Space' && !isAttack)
            {
                CANVAS.image = props.attack;
                isAttack = true;
                CANVAS.attack();
            }
            if(e.code == "ArrowRight" && !oneKey) {
                moveRight = true;
                oneKey = true;
                CANVAS.moveRight(false);
            }
            if(e.code == "ArrowLeft" && !oneKey) {
                moveLeft = true;
                oneKey = true;
                CANVAS.moveLeft(false);
            }
            if(e.code == "ArrowUp") {
                if(!isJump && !isDoubleJump && !isFall){
                    CANVAS.image = props.jump;
                    isJump = true;   
                    CANVAS.frame = 0;
                    CANVAS.jump('one', props.jumpSteps * 4);
                }else if((!isDoubleJump && isJump) || (!isDoubleJump && isFall)){
                    CANVAS.image = props.jump;
                    isDoubleJump = true;
                    isJump = false;
                    CANVAS.frame = 0;
                    CANVAS.jump('double',(props.jumpSteps-1) * 4);
                }
            }
        }
    }
    
    function KeyUp(e:KeyboardEvent){
        if(e.code == "ArrowRight" || e.code == "ArrowLeft"){
            oneKey = false;
            moveRight = false;
            moveLeft = false;
        }
    }
    React.useEffect(() => {
        CANVAS.start();
        addEventListener("popstate",fn);
        document.addEventListener("keydown", KeyDown);
        document.addEventListener("keyup", KeyUp);
    },[])

    return (
        !endLive ?
        <canvas 
            className='characterCanvas'
            ref={canvasRef}
            >
        </canvas>
        : null  );

};

export default React.memo(Character);
