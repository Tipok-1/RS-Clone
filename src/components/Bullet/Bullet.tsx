import React, { useEffect } from 'react';
import { IBullet } from '../types';

interface bulletObj{
    canvas:null | HTMLCanvasElement,
    ctx: null | CanvasRenderingContext2D,
    image:null | HTMLImageElement,
    frame:number,
    stepBeforeChangeFrame:number,
    corX:number,
    end:boolean,
    gameField:HTMLDivElement| null | undefined,
    init:() => void,
    run:() => void,
    render:() => void,
    start:()=>void,
    path:()=>void,
}
const Bullet = (props:IBullet) => {
    const bulletRef = React.useRef<HTMLCanvasElement>(null);
    const [endLive, setEndLive] = React.useState(false);

    let damage = new  CustomEvent("damage", {
        detail: {damage:props.damage}
      });
    let bulletObj:bulletObj ={
        canvas:null,
        ctx: null,
        image:null,
        frame:0,
        corX:0,
        end:false,
        gameField:null,
        stepBeforeChangeFrame:10,
        init(){
            this.canvas = bulletRef.current;
            this.ctx = this.canvas!.getContext('2d');
            this.canvas!.width = props.width;
            this.canvas!.height = props.height;
            this.corX = props.corX;
            this.canvas!.style.left = this.corX +'px';
            this.canvas!.style.top = props.corY +'px';
            this.image = new Image();
            this.image.src = props.image;
            this.gameField = this.canvas?.parentElement as HTMLDivElement;
            if(props.direction == 'left')
                this.canvas?.classList.add('mirrorX');
            this.path();
       },
        path(){
            this.stepBeforeChangeFrame--;
            if(this.stepBeforeChangeFrame <= 0)
            {
                this.stepBeforeChangeFrame = 10;
                this.frame++;
            }
            if(this.frame >= props.stepCount)
            {
                this.frame = 0;
            }
            if(props.direction == 'right')
                this.corX += 2;
            if(props.direction == 'left')
                this.corX -= 2;
            this.canvas!.style.left = this.corX +'px';
            let rect = this.canvas?.getBoundingClientRect();
            let point = {x:rect!.right -40, y:rect!.bottom};
            let element = document.elementFromPoint(Math.round(point.x), Math.round(point.y));
            //console.log(element);
            if(props.whoseBullet == 'character') {
                if(element?.tagName == 'CANVAS' && element.classList.contains('enemyCanvas'))
                {
                    this.end = true;
                    setEndLive(true)
                    element.dispatchEvent(damage);
                }
            }
            else if(props.whoseBullet == 'enemy')
            {
                if(element?.tagName == 'CANVAS' && element.classList.contains('characterCanvas'))
                {
                    this.end = true;
                    setEndLive(true)
                    element.dispatchEvent(damage);
                }
            }
            
            if((this.corX >= (document.documentElement.clientWidth * 4) && props.direction =='right') 
            || (this.corX <= 0 && props.direction =='left') ||
            (element?.tagName == 'DIV' && (element.classList.contains('blockParent'))
             || (element?.tagName == 'DIV' && element.classList.contains('block')))
            )
            {
                this.end = true;
                setEndLive(true)
            } 
            if(!this.end)
            {
                setTimeout(()=>this.path(),props.speed);
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
    useEffect(()=>{
        bulletObj.start()
    },[])
    return (
        !endLive ?
        <canvas 
            style={{
                position:'absolute',
            }}
            ref={bulletRef}
         >
        </canvas> 
        : null
    );
};

export default Bullet;