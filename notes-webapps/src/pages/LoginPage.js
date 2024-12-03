import React from 'react';
import {Link} from 'react-router-dom';
import { login } from '../utils/network-data';
import InputLogin from '../components/InputLogin';
import LocaleContext from '../contexts/LocaleContext';
import PropTypes from 'prop-types';

function LoginPage({loginSuccess}){
    const {locale} = React.useContext(LocaleContext);
    
    async function onLoginHandler({email, password}){
        const {error, data} = await login({email, password});
        if(!error){
            loginSuccess(data);
        }
    }
    
    return(
        <section className='login-page'>
            <h2>{locale === 'id' ? 'Login untuk menggunakan aplikasi' : 'Login to use App'}</h2>
            <InputLogin login={onLoginHandler}/>
            <p>
                {locale === 'id' ? 'Belum punya akun? ' : 'Doesn\'t have an account? '}
                <Link to ="/register">
                    {locale === 'id' ? 'Daftar disini' : 'Sign up'}
                </Link></p>
        </section>
    );
}


LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
}

export default LoginPage;

