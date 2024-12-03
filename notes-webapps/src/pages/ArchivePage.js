import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import NoteSearch from '../components/NoteSearch';
import NoteList from '../components/NoteList';
import NoteEmpty from '../components/NoteEmpty';
import HomeAction from '../components/actions/HomeAction';

function ArchivePage(){
    const {locale} = React.useContext(LocaleContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || '';
    });

    React.useEffect(() => {
        getArchivedNotes().then(({data}) => {
            setNotes(data);
        });
    }, []);

    function onKeywordChangeHandler(keyword){
        setKeyword(keyword);
        setSearchParams({keyword});
    }

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLocaleLowerCase());
    });

    return(
        <section className='homepage'>
            <h2>{locale === 'id' ? 'Arsip Catatan' : 'Archive Notes'}</h2>
            <NoteSearch keyword={keyword} keywordChange={onKeywordChangeHandler}/>
            {notes.length > 0 ? <NoteList notes={filteredNotes}/> : <NoteEmpty/>} 
            <HomeAction/>
        </section>
    );
}

export default ArchivePage;