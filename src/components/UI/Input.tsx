import React from 'react';
import './UI.css'

interface IInput{
    placeholder?:string,
    type?:string,
    required:boolean,
    name?:string
}
const Input = (props:IInput) => {
    return (
        <input className='Input' {...props} />
    );
};

export default Input;