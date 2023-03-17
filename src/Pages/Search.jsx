import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      isDesable: true,
      searching: false,
      loading: false,
      resultList: [],
      artistName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const DIGITOS = 2;
    this.setState({ [name]: value, isDesable: value.length < DIGITOS });
  }

  searchButtonClick = async () => {
    const { inputSearch } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(inputSearch);
    this.setState({
      inputSearch: '',
      artistName: inputSearch,
      searching: true,
      loading: false,
      resultList: [...result],
    });
  }

  render() {
    const { isDesable, inputSearch, searching,
      artistName, loading, resultList } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <h1>Pesquisa</h1>
          <input
            type="text"
            name="inputSearch"
            data-testid="search-artist-input"
            value={ inputSearch }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDesable }
            onClick={ this.searchButtonClick }
          >
            Buscar
          </button>
          {
            loading && <Loading />
          }
          {
            searching && (
              resultList.length !== 0 ? (
                <div>
                  <span>
                    { `Resultado de álbuns de: ${artistName}` }
                  </span>
                  {resultList.map((artist) => (
                    <div key={ artist.collectionId }>
                      <Link
                        to={ `/album/${artist.collectionId}` }
                        data-testid={ `link-to-album-${artist.collectionId}` }
                      >
                        <img
                          src={ artist.artworkUrl100 }
                          alt={ artist.collectionName }
                        />
                      </Link>
                      <span>{ artist.collectionName }</span>
                      <span>{ artist.artistName }</span>
                    </div>
                  ))}
                </div>
              ) : 'Nenhum álbum foi encontrado'
            )
          }
        </form>
      </div>
    );
  }
}

export default Search;
