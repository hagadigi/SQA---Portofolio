import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/network-data';
import NoteSearch from '../components/NoteSearch';
import NoteList from '../components/NoteList';
import NoteEmpty from '../components/NoteEmpty';
import HomeAction from '../components/actions/HomeAction';
import LocaleContext from '../contexts/LocaleContext';

function HomePage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || '';
    });
    const {locale} = React.useContext(LocaleContext);

    React.useEffect(() => {
        getActiveNotes().then(({data}) => {
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
            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
            <NoteSearch keyword={keyword} keywordChange={onKeywordChangeHandler}/>
            {notes.length > 0 ? <NoteList notes={filteredNotes}/> : <NoteEmpty/>} 
            <HomeAction/>
        </section>
    );
}

export default HomePage;