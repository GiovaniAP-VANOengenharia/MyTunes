import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../Context/MyContext';
import Loading from '../Pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

const MusicCard = (props) => {
  const { track } = props;
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const { favoriteIds, setFavoriteIds } = useContext(MyContext);

  useEffect(() => {
    setLoading(() => {
      setLiked(() => favoriteIds.some((musicId) => musicId === track.trackId));
      return false;
    });
  }, []);
  
  const handleChange = async (target) => {
    console.log('checked', liked);
    if (target.checked) {
      setLoading(true);
      setLiked(true);
      setFavoriteIds([...favoriteIds, track.trackId]);
      await addSong(track);
    }
    else {
      setLoading(true);
      setLiked(false);
      setFavoriteIds(() => favoriteIds.filter((musicId) => musicId !== track.trackId));
      await removeSong(track);
    }
    setLoading(false);
  }
    
  return (
    <div key={ track.trackId }>
      {
        loading ? <Loading />
          : (
            <div>
              <span>{ track.trackName }</span>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${track.trackId}` }
                  checked={ liked }
                  onChange={ ({ target }) => handleChange(target) }
                />
              </label>
            </div>
          )
      }
      ;
    </div>
  );
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
