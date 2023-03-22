import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../Pages/Loading';
import { getUser } from '../services/userAPI';
import moon from '../images/Moon.png';
import sun from '../images/Sun.png';
import MyContext from '../Context/MyContext';

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [darkMode, setDarkMode] = useState('');
  const { theme, setTheme } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    const themeLocal = localStorage.getItem('theme');
    console.log(themeLocal);
    if (themeLocal === 'dark') setDarkMode(sun);
    else setDarkMode(moon);
    const getUserInfo = async () => {
      const userInfo = await getUser();
      setUserName(!userInfo.name ? userInfo.email : userInfo.name);
      setUserImg(userInfo.image);
      setLoading(false);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    if (theme === 'dark') setDarkMode(sun);
    else setDarkMode(moon);
  }, [theme]);

  const darkModeHandle = () => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setDarkMode(moon);
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setDarkMode(sun);
      setTheme('dark');
    }
  };

  return (
    <HeaderContainer data-testid="header-component">
      {
        loading ? <Loading />
          : (
            <HeaderDiv className="header-div">
              <img className="user-img" src={ userImg } alt={ userImg } />
              <span id="user-name" data-testid="header-user-name">{ userName }</span>
              <div className="header-buttons">
                <button className="btn" type="button" onClick={ darkModeHandle }>
                  <img className="button" src={ darkMode } alt="" />
                </button>
                <Link to="/search" data-testid="link-to-search">
                  <button className="header-btn" type="button">
                    Pesquisa
                  </button>
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">
                  <button className="header-btn" type="button">
                    Favoritos
                  </button>
                </Link>
                <Link to="/profile" data-testid="link-to-profile">
                  <button className="header-btn" type="button">
                    Perfil
                  </button>
                </Link>
                <Link to="/">
                  <button className="header-btn" type="button">
                    Sair
                  </button>
                </Link>
              </div>
            </HeaderDiv>
          )
      }
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  #user-name {
    margin: 10px;
  }
  .user-img {
    display: flex;
    align-self: center;
    width: 70px;
    height: 70px;
  }
  .btn {
    background: transparent;
    margin: 5px;
  }
  .button {
    width: 28px;
    height: 28px;
    top: 0%;
    background: transparent;
  }
  .header-buttons {
    display: flex;
    justify-self: end;
    align-items: center;
    justify-content: center;
    width: 50%;
  }
  .header-btn {
    margin: 15px 5px;
    width: 90px;
    padding: 10px;
    background-color: #036b5352;
    border-radius: 3px;
    border: 1px solid #036B52;
  }
`;

export default Header;
