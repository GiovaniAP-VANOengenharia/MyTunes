import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    setLoading(true);
    const getUserData = async () => {
      const userData = await getUser();
      setDataUser(userData);
      setLoading(false);
    };
    getUserData();
  }, []);

  return (
    <>
      <Header />
      <div data-testid="page-profile">
        Profile
        <br />
        {loading ? <Loading />
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
};

export default Profile;
