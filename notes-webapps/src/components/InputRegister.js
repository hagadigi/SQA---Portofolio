import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function InputRegister({register}){
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');

    function onSubmitHandler(){
        if(password !== confirmPassword){
            alert('Password did not match!');
        }
        register({name, email, password});
    }

    return(
        <div className='input-register'>
            <label htmlFor='name'>Name</label>
            <input type='text' value={name} onChange={onNameChange}/>
            <label htmlFor='email'>Email</label>
            <input type='email' value={email} onChange={onEmailChange}/>
            <label htmlFor='password'>Password</label>
            <input type='password' value={password} onChange={onPasswordChange}/>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input type='password' value={confirmPassword} onChange={onConfirmPasswordChange}/>
            <button type='button' onClick={onSubmitHandler}>Register</button>
        </div>
    );
}

InputRegister.propTypes = {
    register: PropTypes.func.isRequired
}

export default InputRegister;