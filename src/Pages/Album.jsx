import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collection: '',
      collectionImg: '',
      musicsList: [],
      favoriteList: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const favoriteRes = await getFavoriteSongs();
    const trackIds = favoriteRes.map((track) => track.trackId);
    const image = result[0].artworkUrl100;
    const musics = result.filter((track) => result.indexOf(track) && track);
    this.setState({
      artistName: result[0].artistName,
      collection: result[0].collectionName,
      collectionImg: image,
      musicsList: musics,
      favoriteList: trackIds,
    });
  }

  render() {
    const { artistName, collection, collectionImg,
      musicsList, favoriteList } = this.state;
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
          <MusicCard
            key={ i }
            track={ music }
            liked={ favoriteList.some((id) => Number(id) === music.trackId) }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default Album;
