import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    isSaveButtonDisabled: true,
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const dataUser = await getUser();
      this.setState({
        name: dataUser.name,
        email: dataUser.email,
        description: dataUser.description,
        image: dataUser.image,
        isLoading: false,
      });
    });
  }

  validateTextInputs = ({ name, email, description } = this.state) => {
    const arrayInputs = [name, email, description, image];
    return arrayInputs.some((input) => input.length === 0);
  }

  onInputImage = async (file) => {
    console.log('Upload Image', file);

    let fileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          this.setState({ image: result });
        }
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

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.setState({ isSaveButtonDisabled: this.validateTextInputs() });
    });
  }

  handleClickSave = async () => {
    const { name, email, description, image } = this.state;
    const profileEdit = {
      name,
      email,
      description,
      image,
    };
    await updateUser(profileEdit);
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const {
      isLoading,
      name,
      email,
      description,
      image,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div data-testid="page-profile-edit">
          Profile
          <br />
          {isLoading ? <Loading />
            : (
              <form>
                <input
                  type="text"
                  name="name"
                  value={ name }
                  className="form-control input"
                  data-testid="edit-input-name"
                  onChange={ (e) => this.onInputChange(e) }
                />
                <input
                  type="email"
                  name="email"
                  value={ email }
                  className="form-control input"
                  data-testid="edit-input-email"
                  onChange={ (e) => this.onInputChange(e) }
                />
                <input
                  type="text"
                  name="description"
                  value={ description }
                  className="form-control input"
                  data-testid="edit-input-description"
                  onChange={ (e) => this.onInputChange(e) }
                />
                <label className="imageInput" htmlFor="imageInput" tabIndex="0">
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/png"
                    name="image"
                    value={ image }
                    className="imageInput"
                    data-testid="edit-input-image"
                    onChange={ (e) => this.onInputImage(e.target.files) }
                  />
                  <span className="image input"> Choose an image</span>
                  <img src={ image } alt="" />
                </label>
                <button
                  type="button"
                  className="btn btn-success submit mt-2"
                  data-testid="edit-button-save"
                  disabled={ isSaveButtonDisabled }
                  onClick={ this.handleClickSave }
                >
                  Editar perfil
                </button>
              </form>
            )}
        </div>
      </div>
    );
  }
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
