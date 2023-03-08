import React from 'react';
//import fon from '../../assets/f1.gif'
import './Authorization.css'
import Enemy from '../Enemy/Enemy';
import { v4 as uuid } from 'uuid';
import TextBlock from './TextBlock/TextBlock';
import Form from './Form/Form';
import fon from '../../assets/f1.gif'

interface IAuthorization{
    setLanguage:(l:string)=>void
    Images:{
        die:HTMLImageElement,
        walk:HTMLImageElement,
        stand:HTMLImageElement,
        atack:HTMLImageElement,
        bullet:HTMLImageElement,
    }
}
const Authorization = (props:IAuthorization) => {
    let [language, setLanguage] = React.useState('EN');
    React.useEffect(()=>{

        props.setLanguage(language)
    },[language])
    return (
        <div
            style = {{backgroundImage:`url(${fon})`}}
            className = 'Auth'
        >
            <div className="title">
                Pixel adventure
            </div>
            <TextBlock lan={language} setLanguage={setLanguage}/>
            <Form  lan={language}/>
            <div className="enemyWrap">
                <Enemy 
                    key={uuid()}
                    width={156.77}
                    height={136}
                    left={0}
                    top={0}
                    showHP={false}
                    rightDirection={true}
                    endLeave = {()=>{}}
                    setBullet={(n)=>{}}
                    setBulletChange={(n)=>{}}
                    newLive={1}
                    itsAuthoriz={true}
                    HP={100}

                    walk={props.Images.walk}
                    walkAllEnymySteps={73}
                    walkSteps={13}
                    walkSpeed={100}

                    stand={props.Images.stand}
                    standAllEnymySteps={3}
                    standSteps={5}
                    standSpeed={100}
                    
                    die={props.Images.die}
                    dieAllEnymySteps={1}
                    dieSteps={5}
                    dieSpeed={100}

                    atack={props.Images.atack}
                    atackAllEnymySteps={1}
                    atackSteps={5}
                    atackSpeed={300}/>
                </div>
        </div> 
    );
};

export default Authorization;