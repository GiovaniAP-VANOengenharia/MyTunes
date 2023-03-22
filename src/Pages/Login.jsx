import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { createUser } from '../services/userAPI';
import { lightTheme, darkTheme } from '../theme/darkMode';
import LightMode01 from '../images/LightMode01.png';
import DarkMode01 from '../images/DarkMode01.png';
import GlobalStyle from '../theme/GlobalStyle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [backGround, setBackGround] = useState('');
  const history = useHistory();

  const theme = localStorage.getItem('theme');

  useEffect(() => {
    const SEIS = 6;
    const inputEmail = /^([a-z\d-]+)@([a-z\d-]+)\.com$/;
    if (inputEmail.test(email) && password.length >= SEIS) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (theme === 'dark') setBackGround(DarkMode01);
    else {
      setBackGround(LightMode01);
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const loginButtonClick = async () => {
    history.push('/loading');
    await createUser({ email });
    history.push('/search');
  };

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <LoginContainer data-testid="page-login">
        <img src={ backGround } alt="" />
        <LoginForm>
          <label htmlFor="email" className="login">
            Login
            <input
              id="email"
              type="text"
              data-testid="login-name-input"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
          <label htmlFor="senha" className="login">
            Senha
            <input
              id="senha"
              type="password"
              className="loginInputs"
              placeholder="Senha"
              value={ password }
              data-testid="password-input"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ loginButtonClick }
          >
            Entrar
          </button>
        </LoginForm>
      </LoginContainer>
    </ThemeProvider>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  margin-top: 5%;
  img {
    position: absolute;
    z-index: -1;
    top: 100px;
  }
`;

const LoginForm = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  border: 1px solid #CBD4D2;
  padding: 35px 20px;
  margin-top: 10px;
  & > label {
    display: flex;
    flex-direction: column;
  }
  & > label > input {
    padding: 10px;
    width: 250px;
    margin: 7px 0;
    border-radius: 3px;
  }
  & > :nth-child(3) {
    &:disabled {
      background-color: #036b5352;
      color: white
    }
    margin: 6px 0;
    width: 270px;
    padding: 10px;
    background-color: #036B52;
    color: white;
    border-radius: 3px;
    border: 1px solid #036B52;
  }
  & > :nth-child(4) {
    width: 270px;
    padding: 10px;
    color: #036B52;
    border-radius: 3px;
    border: 1px solid #036B52;
  }
`;

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
