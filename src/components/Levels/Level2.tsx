import React from 'react';
import './level1.css'
import GameField from '../GameField/GameField';
import { v4 as uuid } from 'uuid';
import {IBlockWhithoutImage, IEnemyWhithoutFunc} from '../types'

import { ICharacterWhithoutState } from '../types';
import background from '../../assets/level2.jpg'
import center_up from  '../../assets/blocks2/center_up.png'
import center from  '../../assets/blocks2/center.png'
import left from  '../../assets/blocks2/left.png'
import left_up from  '../../assets/blocks2/left_up.png'
import right from  '../../assets/blocks2/right.png'
import right_up from  '../../assets/blocks2/right_up.png'
import down from  '../../assets/blocks2/down.png'

interface ILevel2{
    character:ICharacterWhithoutState,
    Images:{
        walk:HTMLImageElement,
        stand:HTMLImageElement,
        die:HTMLImageElement,
        atack:HTMLImageElement,
        bullet:HTMLImageElement,
    }
}
const Level2 = (props:ILevel2) => {
    let allHeight = 2800;
    let allWidth = 7650;
    let [blocks, setBlocks] = React.useState<IBlockWhithoutImage[]>([]);
    React.useEffect(()=>{
        setBlocks([{id:uuid(),height:300, width:400, top:document.documentElement.clientHeight/2 + 210,},
        {id:uuid(),height:100, width:100,top:document.documentElement.clientHeight/2 +123,left:200},
        {id:uuid(),height:100,width:400,top:document.documentElement.clientHeight/2 + 450,left:700},
        {id:uuid(),height:400,width:100,top:document.documentElement.clientHeight/2 + 150,left:1100},
        {id:uuid(),height:100,width:200,top:document.documentElement.clientHeight/2 + 350,left:900},
        {id:uuid(),height:100,width:300,top:document.documentElement.clientHeight/2 + 350,left:1800},
        {id:uuid(),height:500,width:500,top:document.documentElement.clientHeight/2 + 750,left:2700},
        {id:uuid(),height:200,width:300,top:document.documentElement.clientHeight/2 + 1050,left:2400},

        {id:uuid(),height:100,width:100,top:document.documentElement.clientHeight/2 + 450,left:3800},
        {id:uuid(),height:200,width:300,top:document.documentElement.clientHeight/2 + 250,left:4600},

        {id:uuid(),height:200,width:400,top:document.documentElement.clientHeight/2 + 850,left:5200},
        {id:uuid(),height:100,width:100,top:document.documentElement.clientHeight/2 ,left:5400},
        
        {id:uuid(),height:100,width:100,top:document.documentElement.clientHeight/2 ,left:5900},
        {id:uuid(),height:100,width:400,top:document.documentElement.clientHeight/2 + 700 ,left:6300},

        {id:uuid(),height:300,width:400,top:document.documentElement.clientHeight/2 +800,left:300},

        {id:uuid(),height:600,width:400,top:allHeight - 600,left:100},
        {id:uuid(),height:500,width:600,top:allHeight - 500,left:800},
        {id:uuid(),height:200,width:500,top:allHeight - 700,left:1800},
        {id:uuid(),height:200,width:200,top:allHeight - 840,left:1950},
        {id:uuid(),height:400,width:200,top:allHeight - 400,left:2750},
        {id:uuid(),height:500,width:600,top:allHeight - 500,left:2950},

        {id:uuid(),height:400,width:400,top:allHeight - 1100,left:3750},
        {id:uuid(),height:100,width:100,top:allHeight - 1300,left:4650},
        {id:uuid(),height:100,width:300,top:allHeight - 1300,left:5850},
        
        {id:uuid(),height:100,width:600,top:allHeight - 614,left:4250},
        {id:uuid(),height:100,width:500,top:allHeight - 700,left:4350},

        {id:uuid(),height:400,width:300,top:allHeight - 350,left:5250},
        {id:uuid(),height:100,width:100,top:allHeight - 850,left:3550},

        {id:uuid(),height:200,width:200,top:allHeight - 150,left:5550},
        {id:uuid(),height:500,width:100,top:allHeight - 550,left:6050},
        {id:uuid(),height:100,width:200,top:allHeight - 900,left:6400},
        
        {id:uuid(),height:500,width:100,top:allHeight - 500,left:6650},
        {id:uuid(),height:700,width:400,top:allHeight - 700,left:6800},
        {id:uuid(),height:600,width:200,top:allHeight - 600,left:7250},

        {id:uuid(),height:500,width:600,top:960,left:7150},]);
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
            HP:250,
    
            myBullet:{
                height:90,
                width:100,
                image:props.Images.bullet,
                stepCount:7,
                damage:20,
                offset:0,
            }
        }
        return obj;
        
    }
    let enemy:IEnemyWhithoutFunc[]= [
        addEnemy({
            left:970,
            top:document.documentElement.clientHeight/2 + 350 - 150,
            rightDirection:false,
            walkAllEnymySteps:5,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        addEnemy({
            left:1970,
            top:document.documentElement.clientHeight/2 + 350 - 150,
            rightDirection:false,
            walkAllEnymySteps:11,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        addEnemy({
            left:2650,
            top:document.documentElement.clientHeight/2 + 750 - 150,
            rightDirection:true,
            walkAllEnymySteps:21,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        addEnemy({
            left:4780,
            top:document.documentElement.clientHeight/2 + 250 - 150,
            rightDirection:false,
            walkAllEnymySteps:11,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        addEnemy({
            left:4310,
            top:1950,
            rightDirection:true,
            walkAllEnymySteps:20,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        addEnemy({
            left:6270,
            top:document.documentElement.clientHeight/2 + 700 - 150,
            rightDirection:true,
            walkAllEnymySteps:16,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        addEnemy({
            left:70,
            top:2050,
            rightDirection:true,
            walkAllEnymySteps:16,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        addEnemy({
            left:6370,
            top:1750,
            rightDirection:true,
            walkAllEnymySteps:5,
            walkSteps:11,
            walkSpeed:100,
            standAllEnymySteps:5,
            standSteps:3,
            standSpeed:200,
            dieAllEnymySteps:1,
            dieSteps:5,
            dieSpeed:200,
            atackAllEnymySteps:1,
            atackSteps:7,
            atackSpeed:300,
        }),
        
    ]
    return (
        <GameField
            blocks={blocks}
            enemy={enemy}
            character={props.character}
            background={background}
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

export default Level2;