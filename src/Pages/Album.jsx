import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import MyContext from '../Context/MyContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import { lightTheme, darkTheme } from '../theme/darkMode';
import GlobalStyle from '../theme/GlobalStyle';

const Album = () => {
  const [collection, setCollection] = useState('');
  const [collectionImg, setCollectionImg] = useState('');
  const [artistName, setArtistName] = useState('');
  const [musicsList, setMusicsList] = useState([]);
  const { favoriteIds, setFavoriteIds, theme } = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    const getTrack = async (musicId) => {
      const result = await getMusics(musicId);
      setCollectionImg(result[0].artworkUrl100);
      setArtistName(result[0].artistName);
      setCollection(result[0].collectionName);
      const favoriteRes = await getFavoriteSongs();
      setFavoriteIds(() => favoriteRes.map((track) => track.trackId));
      setMusicsList(() => result.filter((track) => result.indexOf(track) && track));
    };
    getTrack(id);
  }, [favoriteIds]);

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <AlbumContainer data-testid="page-album">
        <Header />
        <div className="album-card">
          <img
            src={ collectionImg }
            alt={ collection }
          />
          <div className="album-data">
            <span className="span" data-testid="album-name">{ collection }</span>
            <span className="span" data-testid="artist-name">{ artistName }</span>
          </div>
        </div>
        <div className="music-card">
          {musicsList.map((music, i) => (
            <MusicCard key={ i } track={ music } />
          ))}
        </div>
      </AlbumContainer>
    </ThemeProvider>
  );
};

const AlbumContainer = styled.div`
  width: 100%;
  .album-card {
    display: flex;
    justify-content: center;
    align-items: center;
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
  .music-cart {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
`;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default Album;
