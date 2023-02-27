import React from 'react';
import './ChangeCharacter.css'
import character_1_ico from '../../assets/Sprites/Character/ico.png'
import character_2_ico from '../../assets/Sprites/Character2/ico.png'
import {getCharacter_1Info, getCharacter_2Info} from '../Dictionary/Dictionary'
import menuImage from '../../assets/menu.jpg'
import {useNavigate } from 'react-router-dom';
import back from '../../assets/back.png'

const ChangeCharacter = (props:{lan:string, setCharacter:(n:number)=>void}) => {
    const router = useNavigate();
    const Levels= "/Level";
    
    let info = getCharacter_1Info(props.lan);
    let info2 = getCharacter_2Info(props.lan);
    return (
        <div>
        <div className='ChangeCharacter'
        style={{backgroundImage:`url(${menuImage})`}}
        >
            <div className="character"  onClick={() => {
                props.setCharacter(1);
                setTimeout(()=>router(`${Levels}`),100);
            }}>
                <div className="character_ico"  style={{backgroundImage:`url(${character_1_ico})`}}></div>
                <div className="info">
                    <h2>{info.title}</h2><br/>
                    {info.damage}<br/>
                    {info.speed}<br/>
                    {info.damageType}<br/>
                    {info.discription}<br/>
                </div>
            </div>
            <div className="character"  onClick={() => {
                props.setCharacter(2);
                setTimeout(()=>router(`${Levels}`),100);
            }}>
                <div className="character_ico"  style={{backgroundImage:`url(${character_2_ico})`}}></div>
                <div className="info">
                    <h2>{info2.title}</h2><br/>
                    {info2.damage}<br/>
                    {info2.speed}<br/>
                    {info2.damageType}<br/>
                    {info2.discription}<br/>
                </div>
            </div>
        </div>
        <div className="gotoMenu" onClick={()=>{history.back();}} style={{backgroundImage: `url(${back})`}}></div>
        </div>
    );
};

export default ChangeCharacter;