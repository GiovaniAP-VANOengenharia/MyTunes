import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
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
  }, [favoriteIds]);

  const handleChange = async (target) => {
    if (target.checked) {
      setLoading(true);
      setLiked(true);
      setFavoriteIds([...favoriteIds, track.trackId]);
      await addSong(track);
    } else {
      setLoading(true);
      setLiked(false);
      setFavoriteIds(() => favoriteIds.filter((musicId) => musicId !== track.trackId));
      await removeSong(track);
    }
    setLoading(false);
  };

  return (
    <MusicCardContainer key={ track.trackId }>
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
    </MusicCardContainer>
  );
};

const MusicCardContainer = styled.div`
  .card-link {
    text-decoration: none;
  }
  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 350px;
    border-radius: 5px;
    margin: 5px 0;
  }
  .collection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 100%;
  }
  .span {
    margin: 5px;
  }
`;

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
