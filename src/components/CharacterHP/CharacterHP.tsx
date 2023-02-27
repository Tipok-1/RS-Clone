import React from 'react';
import './CharacterHP.css'
import { v4 as uuid } from 'uuid';

interface ICharacterHP{
    ico:string,
    healthImage:string,
    name:string,
    HPcount:number,
    currentHP:number,
}
const CharacterHP = (props:ICharacterHP) => {
    let allHP=[];
    console.log(`HP${props.ico}`);
    
    for(let i = 0; i < props.HPcount; i++)
    {
        allHP.push(<div key={ uuid()} className="onelive" style={{backgroundImage:`url(${props.healthImage})`}}></div>);
    }
    return (
        <div className='Lives'>
            <div className='characterHP'>
            <div className='ico'
            style={{
                backgroundImage:`url(${props.ico})`
            }}></div>
            <div className='HPandNAME'>
                    <div className="name">{props.name}</div>
                    <div className="HP">
                        <div className="currentHP" style={{width:`${props.currentHP}%`}}></div>
                    </div>
                </div>
            </div>
            <div className='allLives'>
                {
                    allHP.map(hp=>hp)
                }
            </div>
        </div>
    
    );
};

export default CharacterHP;