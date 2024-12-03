import React from 'react';
import LocaleContext from '../contexts/LocaleContext';

function NotFoundMessage(){
    const {locale} = React.useContext(LocaleContext);

    return (
        <>
            <h1>404</h1>
            <h2>{locale === 'id' ? 'Halaman tidak ditemukan.' : 'Page not found.'}</h2>
        </>
    )
}

export default NotFoundMessage;