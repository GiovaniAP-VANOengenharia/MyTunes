import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import MyContext from '../Context/MyContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import GlobalStyle from '../theme/GlobalStyle';
import { lightTheme, darkTheme } from '../theme/darkMode';
import Loading from './Loading';

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, setFavoriteIds } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
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
        { loading ? <Loading /> : (favoriteList.map((music, i) => (
          <div className="favorite" key={ i }>
            <Link
              to={ `/album/${music.collectionId}` }
            >
              <img src={ music.artworkUrl100 } alt={ music.collectionName } />
            </Link>
            <MusicCard key={ i } track={ music } />
          </div>
        )))}
      </FavoriteContainer>
    </ThemeProvider>
  );
};

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  .favorite {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
  }
  .album-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
  }
  .span {
    margin: 5px;
  }
`;

export default Favorites;
