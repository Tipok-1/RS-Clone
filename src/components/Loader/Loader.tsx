import React from 'react';
import './Loader.css'
interface ILoader{
    progress:number
}

const Loader = (props:ILoader) => {
    return (
        <div className='Loader'>
            <h3 className='LoaderTitle'>Загрузка данных</h3>
            <div className="progress">
                <div className="currentProgress"
                style ={{
                    width:`${props.progress}%`
                }}>

                </div>
            </div>
        </div>
    );
};

export default Loader;