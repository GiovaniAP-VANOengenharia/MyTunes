import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LightMode02 from '../images/LightMode02.png';
import DarkMode02 from '../images/DarkMode02.png';
import Loading from './Loading';
import AlbumCard from '../Components/AlbumCard';
import { lightTheme, darkTheme } from '../theme/darkMode';
import GlobalStyle from '../theme/GlobalStyle';

const Search = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [artistName, setArtistName] = useState('');
  const [resultList, setResultList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [className, setClass] = useState('search-form div');
  const [backGround, setBackGround] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme');
    setTheme(themeLocal);
    if (themeLocal === 'light') {
      setBackGround(LightMode02);
    } else setBackGround(DarkMode02);
  }, []);

  useEffect(() => {
    const DIGITOS = 2;
    if (inputSearch.length >= DIGITOS) setIsDisabled(false);
    else { setIsDisabled(true); }
  }, [inputSearch]);

  const searchButtonClick = async () => {
    setArtistName(inputSearch);
    setLoading(true);
    setClass('search-form');
    const result = await searchAlbumsAPI(inputSearch);
    setLoading(false);
    setResultList(result);
    setSearching(true);
  };

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <SearchContainer className="search-div" data-testid="page-search">
        <Header />
        <img src={ backGround } alt="" className="bg" />
        <form className={ className }>
          <div className="search">
            <h1>Pesquisa</h1>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ inputSearch }
              onChange={ ({ target }) => setInputSearch(target.value) }
            />
            <button
              type="button"
              id="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ searchButtonClick }
            >
              Buscar
            </button>
            <span>
              { searching && (`Resultado de álbuns de: ${artistName}`) }
            </span>
          </div>
          {
            loading && <Loading />
          }
          {
            searching && (
              resultList.length !== 0 ? (
                <div className="albums">
                  {resultList.map((artist) => (
                    <AlbumCard key={ artist.collectionId } artist={ artist } />
                  ))}
                </div>
              ) : 'Nenhum álbum foi encontrado'
            )
          }
        </form>
      </SearchContainer>
    </ThemeProvider>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .search-form {
    z-index: 100;
  }
  .bg {
    position: fixed;
    top: 100px;
    opacity: 30%;
    z-index: 0;
  }
  h1 {
    margin-bottom: 10px;
    padding: 0;
  }
  input {
    display: flex;
    justify-content: center;
    height: 25px;
    width: 500px;
  }
  #button {
    margin: 10px;
    height: 25px;
    width: 400px;
    color: white;
    &:disabled {
      background-color: #036b5352;
    }
    background-color: #036B52;
    border-radius: 3px;
    border: 1px solid #036B52;
  }
  .search-form {
    width: 100%;
  }
  .search {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 10px;
  }
  .div {
    height: 600px;
  }
  .albums {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
`;

export default Search;
