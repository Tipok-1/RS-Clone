import React from 'react';
import loze from '../../assets/Loze.jpg'
import './Loze.css'
import {useNavigate } from 'react-router-dom';
import retry from '../../assets/retry.png'
import goMenu from '../../assets/goMenu.png'

const Loze = (props:{lan:string}) => {
    const router = useNavigate();
    const Levels= "/Level";
    const MenuPath= "/Menu";
    return (
        <div className='Loze' style={{backgroundImage:`url(${loze})`}}>
            <div className="LozeTitle">{props.lan == 'RU' ? 'ПОРАЖЕНИЕ' : 'DEFEAT'}</div>
            <div className="btn">
                <div className="retry" onClick={()=>router(Levels)} style={{backgroundImage:`url(${retry})`}}></div>
                <div className="goMenu" onClick={()=>router(MenuPath)} style={{backgroundImage:`url(${goMenu})`}}></div>
            </div>
        </div>
    );
};

export default Loze;