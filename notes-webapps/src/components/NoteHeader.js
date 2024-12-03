import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import { getAccessToken } from '../utils/network-data';
import {MdOutlineGTranslate} from 'react-icons/md';
import {IoSunnyOutline, IoExitOutline, IoMoonOutline} from 'react-icons/io5';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';
import PropTypes from 'prop-types';

function NoteHeader({logout, name}){
    const {pathName} = useLocation();
    const accessToken = getAccessToken();
    const {locale, toggleLocale} = React.useContext(LocaleContext);
    const {theme, toggleTheme} = React.useContext(ThemeContext);

    return(
        <header>
            <h1>
                <Link to='/'>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
            </h1>
            {accessToken ? (
                <nav className='navigation'>
                    <ul>
                        <li>
                            {pathName !== '/archives' 
                            ? <Link to='/archives' title='Archives'>{locale === 'id' ? 'Arsip' : 'Archive'}</Link>
                            : <Link to='/' title='Home'></Link>}
                        </li>
                    </ul>
                </nav>
            ) : null}
            <button className='toggle-locale' type='button' onClick={toggleLocale}><MdOutlineGTranslate/></button>
            <button className='toggle-theme' type='button' onClick={toggleTheme}>
                {theme === 'dark' ? <IoSunnyOutline/> : <IoMoonOutline/>}
            </button>
            {accessToken ? (
                <button className='button-logout' type='button' onClick={logout}><IoExitOutline/>{name}</button>
            ) : null}
        </header>
    );
}

NoteHeader.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string
}

export default NoteHeader;
