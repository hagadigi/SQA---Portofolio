import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function InputLogin({login}){
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    function onSubmitHandler(){
        login({email, password});
    }

    return(
        <div className='input-login'>
            <label htmlFor='email'>Email</label>
            <input type='email' value={email} onChange={onEmailChange}/>
            <label htmlFor='password'>Password</label>
            <input type='password' value={password} onChange={onPasswordChange}/>
            <button type='button' onClick={onSubmitHandler}>Login</button>
        </div>
    );
}

InputLogin.propTypes = {
    login: PropTypes.func.isRequired
}

export default InputLogin;