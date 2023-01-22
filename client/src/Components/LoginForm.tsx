import React, { useState } from 'react';

const LoginForm = (props: any) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e: any) => {
        e.preventDefault();

        const isOk = login !== '' && password !== '';

        if (isOk) {
            props.register({
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify({login: login, password: password})
        });
        } 
        else {
            alert('Please type in login and password');
        }
    }

    const onLoginUpdate = (e: any) => {
        setLogin(e.target.value);
    }
    const onPasswordUpdate = (e: any) => {
        setPassword(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}>
            <label htmlFor="login">login:</label>
            <br />
            <input 
                id="login" 
                name="login" 
                value={login}
                onChange={onLoginUpdate} />
            <br/>
            <label htmlFor="password">password:</label>
            <br />
            <input 
                id="password" 
                name="password" 
                type='password'
                value={password}
                onChange={onPasswordUpdate} />
            <br/>
            <button>Зарегистрироваться</button>
        </form>
    )
}

export default LoginForm;