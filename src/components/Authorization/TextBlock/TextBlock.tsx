import React from 'react';
import './TextBlock.css'
import arrow from '../../../assets/arrows.png'
import space from '../../../assets/space.png'

interface ITextBlock{
    lan:string,
    setLanguage:(l:string)=>void
}
const TextBlock = (props:ITextBlock) => {
    let [how_to_play, sethow_to_play] = React.useState(false);
    let lan = props.lan == 'EN'?'НА РУС': 'TO ENG';
    let about = props.lan == 'EN'?'ABOUT': 'О ПРОЕКТЕ';
    let HOW_TO_PLAY = props.lan == 'EN'?'HOW TO PLAY': 'КАК ИГРАТЬ';
    let [text, setText] = React.useState('');

    let startText = props.lan == 'RU' ? `Когда-то недавно, в одном маленьком пиксельном королевстве случилась беда. 
    Пришествие злобных чудищ во главе с таинственным злодеем нарушило привычную спокойную жизнь, и теперь ваша задача спасти этот мир, 
    пока еще не слишком поздно! Регистрируйся и поехали!`
    : `Once upon a time a small pixel kingdom happened to face a big misfortune. It was attacked by a huge pack of monsters 
    led by a mysterious villain. And now it's your task to free the kindgom, defeat all enemies and save the day! Register and let's go!`;

    function howPlay(){
        sethow_to_play(true);
        setText(props.lan == 'RU' ? 'Управление стрелками - перемещение,'
        : 'Arrow controls - move, spacebar - attack,');
    }
    function About(){
        sethow_to_play(false);
        setText(props.lan == 'RU' ? 
            'Проект Pixel Tale - классический аркадный 2D платформер, созданный полностью на react + typescript без использования сторонних библиотек'
            : 'The Pixel Tale project is a classic arcade 2D platform game created entirely in react + typescript without the use of third-party libraries');  
    }
    function ChangeLanguage(){
        sethow_to_play(false);
        let change = props.lan =='EN' ? 'RU' : 'EN';
        props.setLanguage(change);
    }

    React.useEffect(()=>{
        setText(startText);
    },[props.lan])
    return (
        <div className="info">
                <hr />
                <div className="buttons">
                    <div className = 'btn' onClick = {()=>howPlay()}>{HOW_TO_PLAY}</div>
                    <div className = 'btn' onClick = {()=>About()}>{about}</div>
                    <div className = 'btn' onClick={()=>ChangeLanguage()}>{lan}</div>
                </div>
                <hr />
                <div className="text">
                {how_to_play ? <div className = 'arrows' style={{
                    backgroundImage:`url(${arrow})`,
                }}></div> : null}
                    {text}
                {how_to_play ? <div className = 'space' style={{
                    backgroundImage:`url(${space})`,
                }}></div> : null}
                    {props.lan =='EN' ? ' spacebar - attack' : ' пробел атака'}
                </div>
            </div>
    );
};

export default TextBlock;