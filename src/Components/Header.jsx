import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Pages/Loading';
import { getUser } from '../services/userAPI';

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  
  useEffect(() => {
    setLoading(true);
    const getUserInfo = async() => {
      const userInfo = await getUser();
      setUserName(!userInfo.name ? userInfo.email : userInfo.name);
      setUserImg(userInfo.image);
      setLoading(false);
    };
    getUserInfo();
  }, []);

  return (
    <header data-testid="header-component">
      {
        loading ? <Loading />
          : (
            <div>
              <img src={ userImg } alt={ userImg } />
              <span data-testid="header-user-name">{ userName }</span>
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              <Link to="/">Sair</Link>
            </div>
          )
      }
    </header>
  );
}

export default Header;
