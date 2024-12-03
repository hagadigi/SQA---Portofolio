import React from 'react';
import {BsPlus} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

export default function HomeAction(){

    const navigate = useNavigate();

    return (
        <div className='homepage__action'>
            <button 
            className='action'
            type='button'
            title='tambah'
            onClick={() => navigate('/notes/new')}><BsPlus/></button>
        </div>
    )
}

