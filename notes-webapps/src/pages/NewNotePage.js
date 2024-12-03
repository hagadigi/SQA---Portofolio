import React from 'react';
import { addNote } from '../utils/network-data';
import InputNote from '../components/InputNote';
import { useNavigate } from 'react-router-dom';

function NewNotePage(){
    const navigate = useNavigate();
    
    async function onAddNoteHandler(note){
        await addNote(note);
        navigate('/')
    }
    
    return(
        <>
            <InputNote addNote={onAddNoteHandler}/>
        </>
    );
}

export default NewNotePage;