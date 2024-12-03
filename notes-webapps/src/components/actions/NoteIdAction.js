import React from 'react';
import PropTypes from 'prop-types'
import {RiArrowLeftLine, RiInboxArchiveLine, RiInboxUnarchiveLine, RiDeleteBin6Line} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const NoteIdAction = ({id, archived, onArchiveHandler, onDeleteHandler}) => {
    
    const navigate = useNavigate();
    
    return(
        <div className='detail-page__action'>
            <button className='action' title='Kembali'
            onClick={()=> navigate('/')}><RiArrowLeftLine/></button>

            <button className='action' title={archived ? 'Show' : 'Archive'}
            onClick={() => onArchiveHandler(id)}>
                {archived ? <RiInboxUnarchiveLine/> : <RiInboxArchiveLine/>}
            </button>

            <button className='action' title='Delete'
            onClick={() => onDeleteHandler(id)}><RiDeleteBin6Line/></button>
        </div>
    );
}

NoteIdAction.propTypes = {
    id: PropTypes.string.isRequired,
    archived : PropTypes.bool.isRequired,
    onArchiveHandler : PropTypes.func.isRequired,
    onDeleteHandler : PropTypes.func.isRequired,
}

export default NoteIdAction;