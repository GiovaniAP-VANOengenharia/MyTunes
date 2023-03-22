import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import MyContext from '../Context/MyContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LightMode02 from '../images/LightMode02.png';
import DarkMode02 from '../images/DarkMode02.png';
import GlobalStyle from '../theme/GlobalStyle';
import { lightTheme, darkTheme } from '../theme/darkMode';
import Loading from './Loading';

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageFav, setPageFav] = useState(true);
  const [backGround, setBackGround] = useState('');
  const { theme, setTheme, setFavoriteIds } = useContext(MyContext);

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme');
    setTheme(themeLocal);
    if (themeLocal === 'light') {
      setBackGround(LightMode02);
    } else setBackGround(DarkMode02);
  }, []);

  useEffect(() => {
    setLoading(true);
    setPageFav(true);
    const getFavorited = async () => {
      const favoriteRes = await getFavoriteSongs();
      setLoading(() => {
        setFavoriteList(favoriteRes);
        setFavoriteIds(() => favoriteRes.map((track) => track.trackId));
        return false;
      });
    };
    getFavorited();
  }, []);

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <FavoriteContainer data-testid="page-favorites">
        <Header />
        <img src={ backGround } alt="" className="bg" />
        { loading ? <Loading /> : (favoriteList.map((music, i) => (
          <div className="favorite" key={ i }>
            <Link
              to={ `/album/${music.collectionId}` }
            >
              <img src={ music.artworkUrl100 } alt={ music.collectionName } />
            </Link>
            <MusicCard key={ i } track={ music } pageFav={ pageFav } />
          </div>
        )))}
      </FavoriteContainer>
    </ThemeProvider>
  );
};

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  .bg {
    position: fixed;
    top: 100px;
    opacity: 30%;
    z-index: 0;
  }
  .favorite {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 540px;
    border-radius: 5px;
  }
  .album-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .span {
    margin: 5px;
  }
`;

export default Favorites;
