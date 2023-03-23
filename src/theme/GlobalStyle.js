import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    z-index: -1;
    .login {
      color: ${(props) => props.theme.fontColor};;
    }
    span, p {
      color: ${(props) => props.theme.fontColor};;
    }
    h1 {
      color: ${(props) => props.theme.fontColor};;
    }
    .search-div{
      /* background-color: ${(props) => props.theme.body}; */
    }
    .button {
      &:disabled {
        color: ${(props) => props.theme.fontColor};
    }
    }
    .card {
      border: solid 1px ${(props) => props.theme.fontColor};
      color: ${(props) => props.theme.fontColor};
    }
    .header-div {
      border-bottom: solid 2px ${(props) => props.theme.headerBorder};
    }
    .header-btn {
      color: ${(props) => props.theme.fontColor};;
    }
    .music_card-false {
      border: solid 1px ${(props) => props.theme.fontColor};
    }
    .favorite {
      border: solid 1px ${(props) => props.theme.fontColor};
    }
  }
`;
