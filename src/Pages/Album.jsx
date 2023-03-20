import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import MyContext from '../Context/MyContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

const Album = () => {
  const [collection, setCollection] = useState('');
  const [collectionImg, setCollectionImg] = useState('');
  const [artistName, setArtistName] = useState('');
  const [musicsList, setMusicsList] = useState([]);
  const { favoriteIds, setFavoriteIds } = useContext(MyContext);
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
    <div data-testid="page-album">
      <Header />
      <img
        src={ collectionImg }
        alt={ collection }
      />
      <span data-testid="album-name">{ collection }</span>
      <span data-testid="artist-name">{ artistName }</span>
      {musicsList.map((music, i) => (
        <MusicCard key={ i } track={ music } />
      ))}
    </div>
  );
};

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default Album;
