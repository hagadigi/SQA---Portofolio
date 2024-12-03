import React from 'react';
import InputRegister from '../components/InputRegister';
import { register } from '../utils/network-data';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage(){
    const navigate = useNavigate();

    async function onRegisterHandler(user, e){
        const {error} = await register(user);
        if(!error){
            navigate("/");
        } else if(e){
            e.preventDefault();
        }
    }

    return(
        <section className='register-page'>
            <h2>Isi form untuk daftar akun</h2>
            <InputRegister register={onRegisterHandler}/>
            <p>Sudah punya akun? <Link to="/">Login disini</Link></p>
        </section>
    );
}

export default RegisterPage;