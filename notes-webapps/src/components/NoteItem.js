import React from 'react';
import {showFormattedDate} from '../utils/index';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function NoteItem({note}){
    return(
        <article className='note-item'>
            <h3 className='note-item__title'>
                <Link to={`/notes/${note.id}`} title={note.title}>{note.title}</Link></h3>
            <p className='note-item__createdAt'>{showFormattedDate(note.createdAt)}</p>
            <p className='note-item__body'>{note.body}</p>
        </article>
    );
}

NoteItem.propTypes = {
    note: PropTypes.oneOfType([PropTypes.object]).isRequired
}

export default NoteItem;
