import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { getUserLogged, putAccessToken } from './utils/network-data';
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';
import NoteHeader from './components/NoteHeader';
import ArchivePage from './pages/ArchivePage';
import NewNotePage from './pages/NewNotePage';
import NoteIdPage from './pages/NoteIdPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';


function App(){
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'dark');
  const [locale, setLocale] = React.useState(() => localStorage.getItem('locale') || 'id');
  
  function toggleLocale(){
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  }
  const localeContextValue = React.useMemo(() => {return {locale, toggleLocale};}, [locale]);
  
  function toggleTheme(){
    setTheme((prevState) => {
      const newTheme = prevState === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    })
  }
  const themeContextValue = React.useMemo(() => {return {theme, toggleTheme};}, [theme]);
  
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    async function getData(){
      const {data} = await getUserLogged();
      setAuthedUser(data);
      setTimeout(() => {
        setInitializing(false);
      }, 2000);
    }

    getData();
    return() => {
      setAuthedUser('');
      setInitializing('');
    }
  }, []);

  async function onLoginSuccess({accessToken}){
    putAccessToken(accessToken);
    const {data} = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout(){
    setAuthedUser(null);
    putAccessToken('');
  }

  if(initializing){
    return(
      <div className='app-container'>
        <div className='loading-container'>
            <ThreeDots />
        </div>
      </div>
    );
  }
  
  if(authedUser === null){
    return(
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className='app-container'>
            <NoteHeader logout={onLogout}/>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess}/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return(
  <LocaleContext.Provider value={localeContextValue}>
    <ThemeContext.Provider value={themeContextValue}>
        <div className='app-container'>
          <NoteHeader logout={onLogout} name={authedUser.name}/>
          <main>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/notes/new" element={<NewNotePage/>}/>
              <Route path="/notes/:id" element={<NoteIdPage/>}/>
              <Route path="/archives" element={<ArchivePage/>}/>
              <Route path="/*" element={<NotFoundPage/>}/>
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  )
}


export default App;
