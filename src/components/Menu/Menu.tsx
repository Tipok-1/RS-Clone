import React from 'react';
import menuImage from '../../assets/menu.jpg'
import './Menu.css'
import Button from '../UI/Button';
import {useNavigate } from 'react-router-dom';
import goMenu from '../../assets/goMenu.png'

interface IMenu{
    lan:string,
    setLanguage:(l:string)=>void,
    setLevel:(n:number)=>void
}
const Menu = (props:IMenu) => {
    const router = useNavigate();
    const CharacterURL = '/Character'; 
    const ChangeLvl = '/ChangeLevel'
    let [settings, setSettings] = React.useState(false);
    let [leaderBoard, setLeaderBoard] = React.useState(false);
    function Settings(){
        setSettings(!settings);
    }
    function FullScreen(){
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
    function Lider(){
        setLeaderBoard(!leaderBoard);
    }
    function getTable(){
        let arr = JSON.parse(String(localStorage.getItem('Leaders')));
        if(arr.length == 0)
        {
            return props.lan  == 'RU' ? 'Лидеров пока что нет' : 'No leaders yet'
        }
        else{
            let result = ``;
            arr.forEach((el:{name:string,score:number}, index:number)=>{
                result += index + 1 + ')' + ` ${el.name}` + ` - ${el.score} ${props.lan  == 'RU' ? 'очка' : 'score'}.`;
            })
            return result;
        }
    }
    return (
        <div 
            className='Menu'
            style={{backgroundImage:`url(${menuImage})`}}
        >
            { ! settings ?
                !leaderBoard ?
                <div className="allButtons">
                        <div className="title">Pixel adventure</div>
                        <Button onClick={()=>{
                            props.setLevel(1);
                            router(CharacterURL)
                        }}>{props.lan == 'RU' ? 'Играть' : 'Play'}</Button>
                        <Button onClick={()=>router(ChangeLvl)}>{props.lan  == 'RU' ? 'Уровни' : 'Levels'}</Button>
                        <Button onClick={()=>Lider()}>{props.lan  == 'RU' ? 'Доска лидеров' : 'Liders board'}</Button>
                        <Button onClick={()=>Settings()}>{props.lan  == 'RU' ? 'Настройки' : 'Settings'}</Button>
                </div>
                :
                <div className="LeaderBoard">
                    <div className="titleLeaderBoard">{props.lan == 'RU' ? 'Таблица Лидеров' : 'Leaderboard'}</div>
                    <div className="allLiders">{getTable().split('.').map(el=> <pre>{el
                    }</pre>)}</div>
                    <div onClick={()=>Lider()} className="back" style={{backgroundImage:`url(${goMenu})`}}></div>
                </div>
            :
            <div className="Setting">
                <div className="titleSetting">{props.lan == 'RU' ? 'Настройки' : 'Settings'}</div>
                <Button onClick={()=>FullScreen()}>{props.lan == 'RU' ? 'Полный экран' : 'Full Screen'}</Button>
                <Button onClick={()=>props.setLanguage(props.lan == 'EN'? 'RU' : 'EN')}>{props.lan == 'EN'?'НА РУС': 'TO ENG'}</Button>
                <div onClick={()=>Settings()} className="back" style={{backgroundImage:`url(${goMenu})`}}></div>
            </div>
            }
        </div>
    );
};

export default Menu;