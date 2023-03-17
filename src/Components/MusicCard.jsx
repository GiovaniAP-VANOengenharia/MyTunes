import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../Pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      liked: false,
    };
  }

  componentDidMount() {
    const { liked } = this.props;
    this.setState({ liked });
  }

  handleChange = async (target, track) => {
    const { reloadList } = this.props;
    this.setState({ liked: target.checked, loading: true }, async () => {
      if (target.checked) await addSong(track);
      else await removeSong(track);
      if (reloadList) {
        const favorites = await getFavoriteSongs();
        reloadList(favorites);
        this.setState({ liked: target.checked });
      }
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, liked } = this.state;
    const { track } = this.props;
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
                    onChange={ ({ target }) => this.handleChange(target, track) }
                  />
                </label>
              </div>
            )
        }
        ;
      </div>
    );
  }
}

MusicCard.propTypes = {
  liked: PropTypes.bool.isRequired,
  track: PropTypes.shape({
    trackId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  reloadList: PropTypes.func,
};

export default MusicCard;
