import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import MyContext from '../Context/MyContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const { setFavoriteIds } = useContext(MyContext);

  useEffect(() => {
    const getFavorited = async () => {
      const favoriteRes = await getFavoriteSongs();
      setFavoriteList(favoriteRes);
      setFavoriteIds(() => favoriteRes.map((track) => track.trackId));
    };
    getFavorited();
  }, []);
  
  return (
    <div data-testid="page-favorites">
      <Header />
      {favoriteList.map((music, i) => (
        <div key={ i }>
          <Link
            to={ `/album/${music.collectionId}` }
          >
            <img src={ music.artworkUrl100 } alt={ music.collectionName } />
          </Link>
          <MusicCard key={ i } track={ music } />
        </div>
      ))}
    </div>
  );
}

export default Favorites;
