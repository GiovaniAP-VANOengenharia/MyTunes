import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
      userImg: '',
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({
      userName: !userInfo.name ? userInfo.email : userInfo.name,
      userImg: userInfo.image,
      loading: false,
    });
  }

  render() {
    const { userName, userImg, loading } = this.state;
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
}

export default Header;
