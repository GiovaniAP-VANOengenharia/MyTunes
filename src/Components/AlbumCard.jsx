import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AlbumCard = (props) => {
  const { artist } = props;

  return (
    <AlbumCardContainer key={ artist.collectionId }>
      <Link
        className="card-link"
        to={ `/album/${artist.collectionId}` }
        data-testid={ `link-to-album-${artist.collectionId}` }
      >
        <div className="card">
          <img
            src={ artist.artworkUrl100 }
            alt={ artist.collectionName }
          />
          <div className="collection">
            <p className="span">{ artist.collectionName }</p>
            <p className="span">{ artist.artistName }</p>
          </div>
        </div>
      </Link>
    </AlbumCardContainer>
  );
};

const AlbumCardContainer = styled.div`
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

AlbumCard.propTypes = {
  artist: PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
