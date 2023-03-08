import React from 'react';
import './level1.css'
import GameField from '../GameField/GameField';
import { v4 as uuid } from 'uuid';
import {IBlockWhithoutImage, IEnemyWhithoutFunc} from '../types'


import background from '../../assets/level1.png'
import center_up from  '../../assets/blocks/center_up.png'
import center from  '../../assets/blocks/center.png'
import left from  '../../assets/blocks/left.png'
import left_up from  '../../assets/blocks/left_up.png'
import right from  '../../assets/blocks/right.png'
import right_up from  '../../assets/blocks/right_up.png'
import down from  '../../assets/blocks/down.png'

import { ICharacterWhithoutState } from '../types';

interface ILevel1{
    character:ICharacterWhithoutState,
    setLevel:(n:number)=>void
    Images:{
        walk:HTMLImageElement,
        stand:HTMLImageElement,
        die:HTMLImageElement,
        atack:HTMLImageElement,
        bullet:HTMLImageElement,
    }
}
const Level1 = (props:ILevel1): JSX.Element => {
    
    /*async function loadImage(){
        let img:string[] = [walk, stand, atack, die,background,bull, center_up,center,left,left_up, right, right_up,down];
        let image:HTMLImageElement[] = img.map(i=>{
            let im = new Image()
            im.src = i;
            return im;
        })
        Promise.all(image.filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
            console.log('images finished loading');
        });
    }
    loadImage();*/
    let allHeight = 2800;
    let allWidth = 7650;
    let [blocks, setBlocks] = React.useState<IBlockWhithoutImage[]>([]);
    React.useEffect(()=>{
        
        setBlocks([{id:uuid(),height:300, width:400, top:document.documentElement.clientHeight/2 + 210,},
        {id:uuid(),height:100, width:100,top:document.documentElement.clientHeight/2 +123,left:200},
        {id:uuid(),height:300,width:400,top:document.documentElement.clientHeight/2 + 50,left:700},
        {id:uuid(),height:300,width:400,top:document.documentElement.clientHeight/2 +800,left:300},
        {id:uuid(),height:200,width:200,top:document.documentElement.clientHeight/2 +1000,left:1300},
        {id:uuid(),height:100,width:200,top:document.documentElement.clientHeight/2 +300,left:1700},
        {id:uuid(),height:100,width:100,top:document.documentElement.clientHeight/2 +900,left:2400},
        {id:uuid(),height:200,width:400,top:document.documentElement.clientHeight/2 +800,left:2500},
        {id:uuid(),height:100,width:100,top:document.documentElement.clientHeight/2 +400,left:3500},
        {id:uuid(),height:100,width:100,top:document.documentElement.clientHeight/2 +250,left:4500},
        {id:uuid(),height:100,width:400,top:document.documentElement.clientHeight/2 +1050,left:4100},
        {id:uuid(),height:600,width:400,top:allHeight - 600,left:100},
        {id:uuid(),height:500,width:600,top:allHeight - 500,left:800},
        {id:uuid(),height:200,width:500,top:allHeight - 700,left:1800},
        {id:uuid(),height:200,width:200,top:allHeight - 840,left:2000},
        {id:uuid(),height:400,width:200,top:allHeight - 400,left:2550},
        {id:uuid(),height:500,width:600,top:allHeight - 500,left:2750},
        {id:uuid(),height:100,width:100,top:allHeight - 770,left:3600},
        {id:uuid(),height:100,width:100,top:allHeight - 750,left:4000},
        {id:uuid(),height:100,width:500,top:allHeight - 500,left:4350},
        {id:uuid(),height:100,width:500,top:allHeight - 500,left:4350},
        {id:uuid(),height:400,width:300,top:allHeight - 350,left:5250},
        {id:uuid(),height:200,width:200,top:allHeight - 150,left:5550},
        {id:uuid(),height:500,width:100,top:allHeight - 550,left:6050},
        {id:uuid(),height:100,width:200,top:allHeight - 900,left:6400},
        {id:uuid(),height:500,width:100,top:allHeight - 500,left:6650},
        {id:uuid(),height:700,width:400,top:allHeight - 700,left:6800},
        {id:uuid(),height:600,width:200,top:allHeight - 600,left:7250},
        {id:uuid(),height:100,width:200,top:allHeight - 1000,left:6050},
        {id:uuid(),height:500,width:500,top:allHeight - 1700,left:5250},
        {id:uuid(),height:100,width:100,top:allHeight - 1300,left:5750},
        
        {id:uuid(),height:100,width:100,top:allHeight - 2000,left:6350},


        {id:uuid(),height:500,width:600,top: 960,left:7150},]);
    },[])
    interface changeParam{
        left:number,
        top:number,
        rightDirection:boolean,
        walkAllEnymySteps:number,
        walkSteps:number,
        walkSpeed:number,
        standAllEnymySteps:number,
        standSteps:number,
        standSpeed:number,
        dieAllEnymySteps:number,
        dieSteps:number,
        dieSpeed:number,
        atackAllEnymySteps:number,
        atackSteps:number,
        atackSpeed:number,
    }
    function addEnemy(o:changeParam){
        let obj:IEnemyWhithoutFunc ={
            key:uuid(),
            width:156.77,
            height:159.09,
            left:o.left,
            top:o.top,
            rightDirection:o.rightDirection,
    
            walk:props.Images.walk,
            walkAllEnymySteps:o.walkAllEnymySteps,
            walkSteps:o.walkSteps,
            walkSpeed:o.walkSpeed,
    
            stand:props.Images.stand,
            standAllEnymySteps:o.standAllEnymySteps,
            standSteps:o.standSteps,
            standSpeed:o.standSpeed,
    
            die:props.Images.die,
            dieAllEnymySteps:o.dieAllEnymySteps,
            dieSteps:o.dieSteps,
            dieSpeed:o.dieSpeed,
    
            atack:props.Images.atack,
            atackAllEnymySteps:o.atackAllEnymySteps,
            atackSteps:o.atackSteps,
            atackSpeed:o.atackSpeed,
            HP:100,
    
            myBullet:{
                height:10,
                width:75,
                image:props.Images.bullet,
                stepCount:5,
                damage:10,
                offset:80,
            }
        }
        return obj;
        
    }
    let enemy:IEnemyWhithoutFunc[]= [
        addEnemy({
            left:1000,
            top:document.documentElement.clientHeight/2 + 50 - 135,
            rightDirection:false,
            walkAllEnymySteps:15,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
        addEnemy({
            left:1300,
            top:2165,
            rightDirection:false,
            walkAllEnymySteps:27,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
        addEnemy({
            left:270,
            top:document.documentElement.clientHeight/2 +800 - 135,
            rightDirection:true,
            walkAllEnymySteps:15,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
        addEnemy({
            left:2440,
            top:document.documentElement.clientHeight/2 +800 - 135,
            rightDirection:true,
            walkAllEnymySteps:17,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
        addEnemy({
            left:3440,
            top:document.documentElement.clientHeight/2 +400 - 135,
            rightDirection:true,
            walkAllEnymySteps:3,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
        addEnemy({
            left:4290,
            top:2165,
            rightDirection:true,
            walkAllEnymySteps:23,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
        addEnemy({
            left:5650,
            top:965,
            rightDirection:false,
            walkAllEnymySteps:23,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
        addEnemy({
            left:6760,
            top:1965,
            rightDirection:true,
            walkAllEnymySteps:17,
            walkSteps:13,
            walkSpeed:50,
            standAllEnymySteps:5,
            standSteps:5,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:5,
            atackSpeed:300,
        }),
    ]

    return (
        <GameField
            blocks={blocks}
            enemy={enemy}
            character={props.character}
            background={background}
            setLevel={props.setLevel}
            block_image={{
                center_up,
                center,
                left,
                left_up,
                right,
                right_up,
                down
            }}
        />
    );
};

export default React.memo(Level1);