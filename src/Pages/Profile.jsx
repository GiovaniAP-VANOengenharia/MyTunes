import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import LightMode02 from '../images/LightMode02.png';
import DarkMode02 from '../images/DarkMode02.png';
import GlobalStyle from '../theme/GlobalStyle';
import { lightTheme, darkTheme } from '../theme/darkMode';
import Loading from './Loading';
import MyContext from '../Context/MyContext';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [image, setImage] = useState('');
  const [backGround, setBackGround] = useState('');
  const { theme, setTheme } = useContext(MyContext);
  const history = useHistory();

  const notDefined = 'Not defined';

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('user'));
    setImage(localData.image);
    setLoading(true);
    const getUserData = async () => {
      const userData = await getUser();
      setDataUser(userData);
      setLoading(false);
    };
    getUserData();
  }, []);

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme');
    setTheme(themeLocal);
    if (themeLocal === 'light') {
      setBackGround(LightMode02);
    } else setBackGround(DarkMode02);
  }, [theme]);

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <ProfileContainer data-testid="page-profile-edit">
        <Header />
        <img src={ backGround } alt="" className="bg" />
        <h1>Profile</h1>
        {loading ? <Loading />
          : (
            <div className="data">
              <div className="imageInput">
                <span className="imageInput"> Not defined image</span>
                <img src={ image } alt={ image } />
              </div>
              <div className="inputs">
                <div className="label">
                  <span>Nome</span>
                  <span className="input">
                    {dataUser.name ? dataUser.name : notDefined}
                  </span>
                </div>
                <div className="label">
                  <span>Email</span>
                  <span>
                    {dataUser.email ? dataUser.email : notDefined}
                  </span>
                </div>
                <div className="label">
                  <span>Description</span>
                  <span>
                    {dataUser.description ? dataUser.description : notDefined}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-success submit mt-2"
                  data-testid="edit-button-save"
                  onClick={ () => history.push('/profile/edit') }
                >
                  Editar perfil
                </button>
              </div>
            </div>
          )}
      </ProfileContainer>
    </ThemeProvider>
  );
};

const ProfileContainer = styled.div`
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

  .data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    .inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      .label {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 10px 0;
        gap: 5px;
        .input {
          width: 100%;
          border-radius: 5px;
        }
        .description {
          height: 50px;
        }
      }
      .btn-success {
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
  }

  .form-control {
    height: 25px;
    width: 80%;
  }

  .imageInput {
    align-items: center;
    background: rgb(200, 200, 200);
    border: 3px dashed;
    color: rgb(100, 100, 100);
    display: flex;
    height: 250px;
    justify-content: center;
    transition: color 300ms ease-in-out , background 300ms ease-in-out;
    width: 250px;
  }
`;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
