import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div data-testid="page-loading">
        <span>Carregando...</span>
      </div>
    );
  }
}

export default Loading;
