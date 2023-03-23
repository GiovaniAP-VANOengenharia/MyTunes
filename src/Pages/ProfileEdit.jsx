import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LightMode02 from '../images/LightMode02.png';
import DarkMode02 from '../images/DarkMode02.png';
import GlobalStyle from '../theme/GlobalStyle';
import { lightTheme, darkTheme } from '../theme/darkMode';
import Loading from './Loading';
import MyContext from '../Context/MyContext';

const ProfileEdit = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [backGround, setBackGround] = useState('');
  const { theme, setTheme } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme');
    setTheme(themeLocal);
    if (themeLocal === 'light') {
      setBackGround(LightMode02);
    } else setBackGround(DarkMode02);
  }, [theme]);

  useEffect(() => {
    setLoading(true);
    const getUserData = async () => {
      const dataUser = await getUser();
      setName(dataUser.name);
      setEmail(dataUser.email);
      setDescription(dataUser.description);
      setImage(dataUser.image);
      setLoading(false);
    };
    getUserData();
  }, []);

  const onInputImage = async (file) => {
    if (file) {
      setImage(file[0].name);
    }
  };

  const handleClickSave = async () => {
    const profileEdit = {
      name,
      email,
      description,
      image,
    };
    await updateUser(profileEdit);
    history.push('/profile');
  };

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <ProfileEditContainer data-testid="page-profile-edit">
        <Header />
        <img src={ backGround } alt="" className="bg" />
        <h1>Profile</h1>

        {loading ? <Loading />
          : (
            <form>
              <label className="imageInput" htmlFor="imageInput">
                <input
                  id="imageInput"
                  type="file"
                  accept="image/png"
                  className="imageInput"
                  data-testid="edit-input-image"
                  onChange={ ({ target }) => onInputImage(target.files) }
                />
                <span className="imageInput"> Choose an image</span>
                <img src={ image } alt={ image } />
              </label>
              <div className="inputs">
                <label htmlFor="name">
                  <span>Nome</span>
                  <input
                    type="text"
                    id="name"
                    value={ name }
                    className="form-control input"
                    data-testid="edit-input-name"
                    onChange={ ({ target }) => setName(target.value) }
                  />
                </label>
                <label htmlFor="email">
                  <span>Email</span>
                  <input
                    type="email"
                    id="email"
                    value={ email }
                    className="form-control input"
                    data-testid="edit-input-email"
                    onChange={ ({ target }) => setEmail(target.value) }
                  />
                </label>
                <label htmlFor="descripton">
                  <span>Description</span>
                  <textarea
                    type="text-area"
                    id="descripton"
                    value={ description }
                    className="form-control input area"
                    data-testid="edit-input-description"
                    onChange={ ({ target }) => setDescription(target.value) }
                  />
                </label>
                <button
                  type="button"
                  className="btn btn-success submit mt-2"
                  data-testid="edit-button-save"
                  onClick={ handleClickSave }
                >
                  Editar perfil
                </button>
              </div>
            </form>
          )}
      </ProfileEditContainer>
    </ThemeProvider>
  );
};

const ProfileEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  .bg {
    position: fixed;
    top: 100px;
    left: 0;
    opacity: 30%;
    z-index: -1;
  }

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    label {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: 5px 0;
      gap: 5px;
      input {
        width: 100%;
        border-radius: 5px;
      }
      textarea {
        width: 100%;
        height: 50px;
        border-radius: 5px;
      }
    }
    button {
      width: 90%;
      height: 25px;
      border-radius: 5px;
      margin: 5px 0;
      color: white;
      background-color: #036b5352;
      border-radius: 3px;
      border: 1px solid #036B52;
    }
  }

  .form-control {
    height: 25px;
    width: 80%;
  }

  #imageInput {
    display: none;
  }

  .imageInput {
    align-items: center;
    background: rgb(200, 200, 200);
    border: 3px dashed;
    color: rgb(100, 100, 100);
    cursor: pointer;
    display: flex;
    height: 250px;
    justify-content: center;
    transition: color 300ms ease-in-out , background 300ms ease-in-out;
    width: 250px;
    img {
      position: absolute;
      width: 100%;
    }
  }

  .imageInput:hover {
    background: rgb(150, 150, 150);
    color: rgb(50, 50, 50);
  }

  .imageInput:active {
    background: rgb(150, 150, 250);
    color: rgb(150, 150, 150);
    transition: color 300ms ease-in-out , background 300ms ease-in-out;
  }
`;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
