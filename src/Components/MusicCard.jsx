import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import MyContext from '../Context/MyContext';
import Loading from '../Pages/Loading';
import like from '../images/like.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

const MusicCard = (props) => {
  const { track } = props;
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [ckt, setCkt] = useState('unliked');
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
      setCkt('liked');
      setFavoriteIds([...favoriteIds, track.trackId]);
      await addSong(track);
    } else {
      setLoading(true);
      setLiked(false);
      setCkt('unliked');
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
            <div className="music_card">
              <div className="music-data">
                <span className="music-name">{ track.trackName }</span>
                <audio
                  className="track"
                  data-testid="audio-component"
                  src={ track.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                </audio>
              </div>
              <label htmlFor={ `like-${track.trackId}` } className="label">
                <span>
                  Favorita
                </span>
                <input
                  type="checkbox"
                  id={ `like-${track.trackId}` }
                  className="like-input"
                  data-testid={ `checkbox-music-${track.trackId}` }
                  checked={ liked }
                  onChange={ ({ target }) => handleChange(target) }
                />
                <img className={ ckt } src={ like } alt="" />
              </label>
            </div>
          )
      }
      ;
    </MusicCardContainer>
  );
};

const MusicCardContainer = styled.div`
  display: flex;
  width: 420px;
  .music_card {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    margin: 10px;
  }
  .track {
    width: 300px;
  }
  .music-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    width: 100%;
  }
  .music-name {
    margin: 10px;
  }
  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
  }
  .liked {
    position: relative;
    right: 10px;
    width: 25px;
    height: 25px;
    opacity: 100%;
  }
  .unliked {
    position: relative;
    right: 10px;
    width: 25px;
    height: 25px;
    opacity: 30%;
  }
  .like-input {
    opacity: 0;
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
