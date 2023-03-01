import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import ChangeCharacter from './ChangeCharacter/ChangeCharacter';
import ChangeLevel from './ChangeLevel/ChangeLevel';
import Authorization from './Authorization/Authorization';
import Menu from './Menu/Menu';
import Level1 from './Levels/level1';
import Level2 from './Levels/Level2';
import {character1, character2} from './CharacterInfo'
import Loze from './Loze/Loze';
import { ICharacterWhithoutState } from './types';
import Win from './Win/Win';

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

    
    let [character, setch] = React.useState<ICharacterWhithoutState>(character1)
    let [level, setlevel] = React.useState(<Level1 character={character} setLevel={setLevel}/>);
    useEffect(()=>{
        Character == 1 ? setch(character1) : setch(character2);
    },[Character])

    useEffect(()=>{
        Level == 1 ? setlevel(<Level1 character={character} setLevel={setLevel}/>) : setlevel(<Level2 character={character}/>);
    },[Level, character])

    let [language, setLanguage] = React.useState('EN');

    return (
        <Routes>  
            <Route path={`${emptyPath}`} element={<Authorization setLanguage={setLanguage}/>}/>
            <Route path={`${MenuPath}`} element={<Menu lan={language} setLanguage={setLanguage} setLevel={setLevel}/>}/>
            <Route path={`${Levels}`} element={level}/>
            <Route path={`${CharacterPath}`} element={<ChangeCharacter lan={language} setCharacter={setCharacter}/>}/>
            <Route path={`${ChangeLvl}`} element={<ChangeLevel lan={language} setLevel={setLevel}/>}/>
            <Route path={`${LozePath}`} element={<Loze lan={language}/>}/>
            <Route path={`${WinPath}`} element={<Win lan={language}/>}/>
            <Route path={`${starPath}`} element={<Navigate to="Authorization" />} />
      </Routes>
    );
};
//<Route path={`${LevelPath}`} element={<ChangeLevel lan={language} setLevel={setLevel}/>} />
export default App;