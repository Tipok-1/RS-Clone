import React from 'react';
import './ChangeLevel.css'
import menuImage from '../../assets/menu.jpg'
import GolemImage from '../../assets/golem_bigImage.png'
import {useNavigate } from 'react-router-dom';
import back from '../../assets/back.png'

interface IChangeLevel{
    lan:string,
    setLevel:(n:number)=>void,
}
const ChangeLevel = (props:IChangeLevel) => {
    const router = useNavigate();
    const CharacterPath = '/Character';
    let level1 = (props.lan == 'RU') ? 'Уровень 1: Замок в лесу' : 'Level 1: Castle in the forest';
    let level2 = (props.lan == 'RU') ? 'Уровень 2: Забытая пещера' : 'Level 2: Forgotten Cave';
    return (
        <div>
        <div className='ChangeLevel'
        style={{backgroundImage:`url(${menuImage})`}}>
            <div className="LevelsAndImage">
                <div className="golemImage"
                style={{backgroundImage:`url(${GolemImage})`}}></div>
                <div className="Levels">
                    <h2 className="level" onClick={() =>{
                        props.setLevel(1); 
                        setTimeout(()=>router(CharacterPath));
                    }}>{level1}</h2>
                    <h2 className="level" onClick={() =>{
                        props.setLevel(2);
                        setTimeout(()=>router(CharacterPath));
                        }}>{level2}</h2>
                </div>
            </div>
        </div>
        <div className="gotoMenu" onClick={()=>{history.back();}} style={{backgroundImage: `url(${back})`}}></div>
        </div>
    );
};

export default ChangeLevel;