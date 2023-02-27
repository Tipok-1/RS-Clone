import React from 'react';
import './Form.css'
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import {useNavigate } from 'react-router-dom';

interface IForm{
    lan:string,
}

const Form = (props:IForm) => {
    let [Registered, setRegistered] = React.useState(false);
    const router = useNavigate();
    const MenuURL = '/Menu'; 
    React.useEffect(()=>{
        if(localStorage.getItem('name') && localStorage.getItem('password'))
        {
            setRegistered(true);
        }
        
    },[]);
    function Registr(e:React.FormEvent<HTMLFormElement>){
        let form: HTMLFormElement = e.target as HTMLFormElement;
        let name = (form.elements['name' as keyof typeof form.elements] as HTMLInputElement).value;
        let password = (form.elements['password' as keyof typeof form.elements] as HTMLInputElement).value;
        localStorage.setItem('name', name);
        localStorage.setItem('password', password);
        setRegistered(true);
    }
    return (
        (!Registered ?
        <form onSubmit={e=>{
            e.preventDefault();
            Registr(e);
        }} className="form">
            <Input placeholder={props.lan == 'RU'?'Имя': 'Name'} name = 'name' required/>
            <Input placeholder={props.lan == 'RU'?'Пароль': 'Password'} type='password' name = 'password' required/>
            <Button>{props.lan == 'RU'?'Регистрация': 'Sign Up'}</Button>
        </form> 
        : <Button onClick={()=>{
            setTimeout(()=>router(`${MenuURL}`),0);
        }}>{props.lan == 'RU'?'Вперёд': 'Lets go'}</Button>)

        
    );
};

export default Form;