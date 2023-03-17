import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const Search = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [artistName, setArtistName] = useState('');
  const [resultList, setResultList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const DIGITOS = 2;
    if (inputSearch.length >= DIGITOS) setIsDisabled(false);
    else { setIsDisabled(true); }
  }, [inputSearch]);

  const searchButtonClick = async () => {
    setArtistName(inputSearch);
    setLoading(true);
    const result = await searchAlbumsAPI(inputSearch);
    setLoading(false);
    setResultList(result);
    setSearching(true);
  }

  return (
    <div data-testid="page-search">
      <Header />
      <form>
        <h1>Pesquisa</h1>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ inputSearch }
          onChange={ ({ target }) => setInputSearch(target.value) }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDisabled }
          onClick={ searchButtonClick }
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

export default Search;
