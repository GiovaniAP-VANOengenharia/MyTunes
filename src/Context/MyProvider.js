import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const providerValue = useMemo(() => (
    { favoriteIds, setFavoriteIds }), [favoriteIds]);

  return (
    <MyContext.Provider value={ providerValue }>
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
