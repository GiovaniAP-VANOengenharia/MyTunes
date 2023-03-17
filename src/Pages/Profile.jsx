import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    isLoading: false,
    dataUser: {},
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const dataUser = await getUser();
      this.setState({
        dataUser,
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, dataUser } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          Profile
          <br />
          {isLoading ? <Loading />
            : (
              <div>
                <span>{dataUser.name}</span>
                <br />
                <span>{dataUser.email}</span>
                <br />
                <span>{dataUser.description}</span>
                <br />
                <img
                  src={ dataUser.image }
                  alt={ dataUser.name }
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">
                  <button type="button">
                    Editar perfil
                  </button>
                </Link>
              </div>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
