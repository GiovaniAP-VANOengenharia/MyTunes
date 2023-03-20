import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import MyContext from '../Context/MyContext';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

const Favorites = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFavoriteIds } = useContext(MyContext);

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
    <div data-testid="page-favorites">
      <Header />
      { loading ? <Loading /> : (favoriteList.map((music, i) => (
        <div key={ i }>
          <Link
            to={ `/album/${music.collectionId}` }
          >
            <img src={ music.artworkUrl100 } alt={ music.collectionName } />
          </Link>
          <MusicCard key={ i } track={ music } />
        </div>
      )))}
    </div>
  );
};

export default Favorites;
