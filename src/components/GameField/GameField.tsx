import React, { ReactFragment, useEffect } from 'react';
import './GameField.css'

import Character from '../Сharacter/Character';
import healthImage from '../../assets/serdce.png'
import CharacterHP from '../CharacterHP/CharacterHP';

import Block from '../Block/Block'
import {IBlockWhithoutImage, ICanvasCharacter, IEnemyWhithoutFunc, ICharacterWhithoutState} from '../types'
import { v4 as uuid } from 'uuid';
import Door from '../Door/Door';
import wallImage from '../../assets/brick.png'
import doorImage from '../../assets/close_door.png'
import openDoorImage from '../../assets/open_door.png'

import character_1_ico from '../../assets/Sprites/Character/ico.png'
import Enemy from '../Enemy/Enemy';
import {useNavigate } from 'react-router-dom';
import back from '../../assets/back.png'

interface IGameField{
    blocks:IBlockWhithoutImage[],
    enemy:IEnemyWhithoutFunc[],
    character:ICharacterWhithoutState,
    background:string,
    block_image:{
        center_up:string,
        center:string,
        left:string,
        left_up:string,
        right:string,
        right_up:string,
        down:string
    }
    setLevel?:(n:number)=>void
}

const GameField = (props:IGameField):JSX.Element => {
    
    const GameFieldRef = React.useRef<HTMLDivElement>(null);
    function scrollWindow(obj:ICanvasCharacter){
        window.scrollTo(obj.corX - document.documentElement.clientHeight / 2 - 200,obj.corY- 300)
    }
    useEffect(()=>{
        window.scrollBy(0, 280);
    },[]);

    let [characterHP,setCharacterHP] = React.useState(100);

    let [bullet,setBullet] = React.useState<JSX.Element[]>([]);
    let [bulletCange, setBulletChange] = React.useState(0)
    let [newLive, setNewLive] = React.useState(3);
    let allBullet = React.useMemo(()=>{
        return bullet;
    },[bulletCange])


    interface golem{
        GolemLive:boolean,
        startAtaka:boolean
    }
    interface golemStates{
        Golem:golem,
        setGolem:(g:golem) =>void
    }

    interface allEnemyBulletArrays{
        bulletEnemy:JSX.Element[],
        setBulletEnemy:(arr:JSX.Element[])=>void
    }
    interface allbulletCangeEnemy{
        bulletCangeEnemy:number,
        setBulletChangeEnemy:(n:number)=>void
    }

    let allEnemyBulletArrays:allEnemyBulletArrays[] = [];
    let allEnemyBulletChange:allbulletCangeEnemy[] =[]; 
    let allAllBulletEnemy = [];
    let allGolemLivesAttacks:golemStates[] = [];
    for(let i = 0; i< props.enemy.length; i++){
        let [bulletEnemy,setBulletEnemy] = React.useState<JSX.Element[]>([]);
        allEnemyBulletArrays.push({bulletEnemy,setBulletEnemy})

        let [bulletCangeEnemy, setBulletChangeEnemy] = React.useState(0)
        allEnemyBulletChange.push({bulletCangeEnemy,setBulletChangeEnemy});

        let allBulletEnemy = React.useMemo(()=>{
            return allEnemyBulletArrays[i].bulletEnemy;
        },[allEnemyBulletChange[i].bulletCangeEnemy])
        allAllBulletEnemy.push(allBulletEnemy);

        let [Golem, setGolem] = React.useState<golem>({
            GolemLive:true,
            startAtaka:false
        })
        allGolemLivesAttacks.push({Golem,setGolem});
    }

    useEffect(()=>{
        for(let i = 0; i< props.enemy.length; i++)
        {
            allEnemyBulletArrays[i].setBulletEnemy([]);
            allEnemyBulletChange[i].setBulletChangeEnemy(-1);
            allGolemLivesAttacks[i].setGolem({
                GolemLive:true,
                startAtaka:false
            })
        }
    },[newLive])
    return (
        <div
            ref={GameFieldRef}
            id = 'GameField'
            style ={{backgroundImage: `url(${props.background})`}}
        >
    
            <Door
                wallImage={wallImage}
                doorImage={openDoorImage}
                doorHeight={200}
                doorWidth={200}
                wallLeft={7400}
                wallTop={63}
            ></Door>
            <CharacterHP
                ico={props.character.ico ?? character_1_ico}
                healthImage={healthImage}
                name={localStorage.getItem('name') ?? 'Guest'}
                HPcount={newLive}
                currentHP={characterHP}
            />
            <Character
                width={props.character.width}
                height={props.character.height}
                scrollWindow={scrollWindow}
                bullet={bullet}
                setBullet={setBullet}
                setBulletChange={setBulletChange}
                setNewLive={setNewLive}
                HP={props.character.HP}
                characterHP={characterHP}
                setCharacterHP={setCharacterHP}
                setLevel={props.setLevel}

                walkSteps={props.character.walkSteps}
                walk={props.character.walk}
                walkSpeed={props.character.walkSpeed}

                jumpSteps={props.character.jumpSteps}
                jump={props.character.jump}
                jumpSpeed={props.character.jumpSpeed}

                dieSteps={props.character.dieSteps}
                die={props.character.die}
                dieSpeed={props.character.dieSpeed}

                attackSteps={props.character.attackSteps}
                attack={props.character.attack}
                attackSpeed={props.character.attackSpeed}

                myBullet={props.character.myBullet}
            />
             {
                props.blocks.map(b=>{
                    return(
                    <Block
                        key={b.id}
                        height={b.height}
                        width={b.width}
                        top={b?.top}
                        left={b?.left}
                        block_image={props.block_image}
                    ></Block>)
                })
            }
            {
                props.enemy.map((enm, index)=>{
                    return(
                        allGolemLivesAttacks[index].Golem.GolemLive ?
                        <Enemy 
                            key={enm.key}
                            width={enm.width}
                            height={enm.height}
                            left={enm.left}
                            top={enm.top}
                            showHP={true}
                            rightDirection={enm.rightDirection}
                            endLeave = {() => allGolemLivesAttacks[index].setGolem({
                                ...allGolemLivesAttacks[index].Golem,
                                GolemLive: false
                            })}
                            setBullet={allEnemyBulletArrays[index].setBulletEnemy}
                            setBulletChange={allEnemyBulletChange[index].setBulletChangeEnemy}
                            newLive={newLive}
                            itsAuthoriz={false}

                            walk={enm.walk}
                            walkAllEnymySteps={enm.walkAllEnymySteps}
                            walkSteps={enm.walkSteps}
                            walkSpeed={enm.walkSpeed}

                            stand={enm.stand}
                            standAllEnymySteps={enm.standAllEnymySteps}
                            standSteps={enm.standSteps}
                            standSpeed={enm.standSpeed}
                            
                            die={enm.die}
                            dieAllEnymySteps={enm.dieAllEnymySteps}
                            dieSteps={enm.dieSteps}
                            dieSpeed={enm.dieSpeed}

                            atack={enm.atack}
                            atackAllEnymySteps={enm.atackAllEnymySteps}
                            atackSteps={enm.atackSteps}
                            atackSpeed={enm.atackSpeed}
                            HP={enm.HP}

                            myBullet={enm.myBullet}
                        />
                        :null
                    )
                })
            }
            {allBullet.map(bl=>bl)}
            {
                allAllBulletEnemy.map(alEnemyBullet=>alEnemyBullet.map(bl=>bl))
            }

            <div className="gotoMenu" onClick={()=>{history.back();}} style={{backgroundImage: `url(${back})`}}></div>
        </div>
    );
};

export default React.memo(GameField);

//door 160/180