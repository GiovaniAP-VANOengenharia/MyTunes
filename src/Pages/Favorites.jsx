import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteList: [],
      liked: true,
    };
  }

  async componentDidMount() {
    const favoriteRes = await getFavoriteSongs();
    this.setState({ favoriteList: favoriteRes });
  }

  reloadList = (array) => {
    this.setState({
      favoriteList: array,
    });
  }

  render() {
    const { favoriteList, liked } = this.state;
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
            <MusicCard
              key={ i }
              track={ music }
              liked={ liked }
              reloadList={ this.reloadList }
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
