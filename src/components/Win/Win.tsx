import React, { useEffect } from 'react';
import win from '../../assets/win.jpg'
import './Win.css'
import {useNavigate } from 'react-router-dom';
import goMenu from '../../assets/goMenu.png'

const Win = (props:{lan:string}) => {
    const router = useNavigate();
    const MenuPath= "/Menu";

    let [place, setPlace] = React.useState<string>('');
    function getPlace(){
        let pl = localStorage.getItem('place');
        localStorage.setItem('place', '-1');
        setPlace(String((Number(pl) + 1)));
        
    }
    useEffect(()=>{
        getPlace();
    },[])
    return (
        <div className='Win' style ={{backgroundImage:`url(${win})`}}>
            <div className="winTitle">{props.lan == 'RU' ? 'ПОБЕДА' : 'WINNER'}</div>
            <div className="PlaceTitle">{
                (place != '0') ?
                    props.lan == 'RU' ?'Отличная игра - ваша позиция в списке лидеров ' :'Excellent game - your position in the leaderboard ' + place
                    : ''  
            }</div>
            <div className="goMenuWin" onClick={()=>router(MenuPath)} style={{backgroundImage:`url(${goMenu})`}}></div>
        </div>
    );
};

export default Win;