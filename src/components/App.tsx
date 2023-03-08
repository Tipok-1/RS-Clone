import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import ChangeCharacter from './ChangeCharacter/ChangeCharacter';
import ChangeLevel from './ChangeLevel/ChangeLevel';
import Authorization from './Authorization/Authorization';
import Menu from './Menu/Menu';
import Level1 from './Levels/level1';
import Level2 from './Levels/Level2';
import {ch1, ch2} from './CharacterInfo'
import Loze from './Loze/Loze';
import { ICharacterWhithoutState } from './types';
import Win from './Win/Win';


import Loader from './Loader/Loader';
import { firstLevelImage, secondLevelImage, firstCharacter,secondCharacter, otherImage} from './CasheImages';

const App = (): JSX.Element => {
    if(!localStorage.getItem('Leaders'))
    {
        localStorage.setItem('Leaders', JSON.stringify([]));
    }
    if(!localStorage.getItem('firstLevelScore'))
    {
        localStorage.setItem('firstLevelScore', '0');
    }
    let [Character, setCharacter] = React.useState(1);
    let [Level, setLevel] = React.useState(1);
    
    const emptyPath = "Authorization";
    const CharacterPath = '/Character';
    const ChangeLvl = '/ChangeLevel'
    const Levels= "/Level";
    const MenuPath= "/Menu";
    const LozePath = "/Loze";
    const WinPath = "/Win";
    const starPath = "*";

    interface EnemyImage{
        walk:HTMLImageElement,
        stand:HTMLImageElement,
        die:HTMLImageElement,
        atack:HTMLImageElement,
        bullet:HTMLImageElement,
    }
    let [level1Images, setlevel1Images] = React.useState<EnemyImage>({
        walk:new Image(),
        stand:new Image(),
        die:new Image(),
        atack:new Image(),
        bullet:new Image(),
    }),[level2Images, setlevel2Images] = React.useState<EnemyImage>({
        walk:new Image(),
        stand:new Image(),
        die:new Image(),
        atack:new Image(),
        bullet:new Image(),
    })

    let [character1, setcharacter1] = React.useState<ICharacterWhithoutState>(ch2({
        walk:new Image(),
        jump:new Image(),
        die:new Image(),
        atack:new Image(),
        bullet:new Image(),
    }));
    let [character2, setcharacter2] = React.useState<ICharacterWhithoutState>(ch2({
        walk:new Image(),
        jump:new Image(),
        die:new Image(),
        atack:new Image(),
        bullet:new Image(),
    }));

   
    let [ImageLoad, setImageLoad] = React.useState(false);
    let [all_images, setAllImages] = React.useState(0);

    let [progress, setProgres] = React.useState(0);
    useEffect(()=>{
        firstLevelImage.then(images=>{
            setlevel1Images({
                walk:images[0],
                stand:images[1],
                die:images[2],
                atack:images[3],
                bullet:images[4],
            })
            setProgres(20);
            setAllImages(++all_images);
        }).then(()=>{
            secondLevelImage.then(images=>{
                setlevel2Images({
                    walk:images[0],
                    stand:images[1],
                    die:images[2],
                    atack:images[3],
                    bullet:images[4],
                })
                setProgres(40);
                setAllImages(++all_images);
            })
        }).then(()=>{
            firstCharacter.then(images=>{
                setcharacter1(ch1({
                    walk:images[0],
                    jump:images[1],
                    die:images[2],
                    atack:images[3],
                    bullet:images[4],
                }))
                setProgres(60);
                setAllImages(++all_images);
            })
        }).then(()=>{
            secondCharacter.then(images=>{
                setcharacter2(ch2({
                    walk:images[0],
                    jump:images[1],
                    die:images[2],
                    atack:images[3],
                    bullet:images[4],
                }))
                setProgres(80);
                setAllImages(++all_images);
            })
        }).then(()=>{
            otherImage.then(images=>{
                setProgres(100);
                setAllImages(++all_images);
            })
        })

    },[])

    useEffect(()=>{
        if(all_images == 5){
            setImageLoad(true);
        }
    },[all_images])
    
    
    let [character, setch] = React.useState<ICharacterWhithoutState>(character1)
    let [level, setlevel] = React.useState(<Level1 Images={level2Images} character={character} setLevel={setLevel}/>);
    useEffect(()=>{
        Character == 1 ? setch(character1) : setch(character2);
    },[Character, character1, character2])

    useEffect(()=>{
        Level == 1 ? setlevel(<Level1 Images={level1Images} character={character} setLevel={setLevel}/>) : setlevel(<Level2 Images={level2Images} character={character}/>);
    },[Level, character])

    let [language, setLanguage] = React.useState('EN');

    
    return (
        ImageLoad ? 
        <Routes>  
            <Route path={`${emptyPath}`} element={<Authorization Images={level1Images} setLanguage={setLanguage}/>}/>
            <Route path={`${MenuPath}`} element={<Menu lan={language} setLanguage={setLanguage} setLevel={setLevel}/>}/>
            <Route path={`${Levels}`} element={level}/>
            <Route path={`${CharacterPath}`} element={<ChangeCharacter lan={language} setCharacter={setCharacter}/>}/>
            <Route path={`${ChangeLvl}`} element={<ChangeLevel lan={language} setLevel={setLevel}/>}/>
            <Route path={`${LozePath}`} element={<Loze lan={language}/>}/>
            <Route path={`${WinPath}`} element={<Win lan={language}/>}/>
            <Route path={`${starPath}`} element={<Navigate to="Authorization" />} />
      </Routes>
      : <Loader progress={progress}/>
    );
};
//<Route path={`${LevelPath}`} element={<ChangeLevel lan={language} setLevel={setLevel}/>} />
export default App;