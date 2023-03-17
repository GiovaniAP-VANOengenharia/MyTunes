import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

const ProfileEdit = () => {
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const getUserData = async() => {
      const dataUser = await getUser();
      setName(dataUser.name);
      setEmail(dataUser.email);
      setDescription(dataUser.description);
      setImage(dataUser.image);
      setLoading(false);
    }
    getUserData();
  }, []);

  useEffect(() => {
    const arrayInputs = [name, email, description, image];
    setIsDisabled(arrayInputs.some((input) => input.length === 0));
  }, [name, email, description, image]);

  const onInputImage = async (file) => {
    setImage(file[0].name);
    let fileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (file) => {
        if (file && !isCancel) setImage(file);
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }

  const handleClickSave = async () => {
    const profileEdit = {
      name,
      email,
      description,
      image,
    };
    await updateUser(profileEdit);
    history.push('/profile');
  }

  return (
    <div data-testid="page-profile-edit">
      <Header />
      <ProfileEditContainer data-testid="page-profile-edit">
        Profile
        <br />
        {loading ? <Loading />
          : (
            <form>
              <input
                type="text"
                value={ name }
                className="form-control input"
                data-testid="edit-input-name"
                onChange={ ({ target }) => setName(target.value) }
              />
              <input
                type="email"
                value={ email }
                className="form-control input"
                data-testid="edit-input-email"
                onChange={ ({ target }) => setEmail(target.value) }
              />
              <input
                type="text"
                value={ description }
                className="form-control input"
                data-testid="edit-input-description"
                onChange={ ({ target }) => setDescription(target.value) }
              />
              <label className="imageInput" htmlFor="imageInput" tabIndex="0">
                <input
                  id="imageInput"
                  type="file"
                  accept="image/png"
                  className="imageInput"
                  data-testid="edit-input-image"
                  onChange={ ({ target }) => onInputImage(target.files) }
                />
                <span className="image input"> Choose an image</span>
                <img src={ image } alt={ image } />
              </label>
              <button
                type="button"
                className="btn btn-success submit mt-2"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ handleClickSave }
              >
                Editar perfil
              </button>
            </form>
          )}
      </ProfileEditContainer>
    </div>
  );
}

const ProfileEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;


ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
