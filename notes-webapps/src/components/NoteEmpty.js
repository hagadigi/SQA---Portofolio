import React from 'react'
import LocaleContext from '../contexts/LocaleContext';

function NoteEmpty(){
    const {locale} = React.useContext(LocaleContext);

    return(
        <section className='notes-list-empty'>
            <p>{locale === 'id' ? 'Tidak ada catatan.' : 'Notes is empty.'}</p>
        </section>
    );
}

export default NoteEmpty;