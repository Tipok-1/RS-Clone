import React from 'react';
import './UI.css'

interface IButton{
    children:React.ReactNode,
    onClick?:()=>void,
}
const Button = (props:IButton) => {
    return (
        <button className='Button' {...props}>
            {props.children}
        </button>
    );
};

export default Button;