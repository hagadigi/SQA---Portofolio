import React from 'react';
import {BsX} from 'react-icons/bs'
import {AiOutlineSave} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SaveAction({onSaveHandler}){

    const navigate = useNavigate();

    return(
        <div className='add-new-page__action'>
            <button className='action'
            title='Batal'
            onClick={() => navigate('/')}><BsX/></button>
            <button className='action'
            title='Simpan'
            onClick={() => onSaveHandler()}><AiOutlineSave/></button>
        </div>
    )
}

SaveAction.propTypes = {
    onSaveHandler: PropTypes.func.isRequired,
}