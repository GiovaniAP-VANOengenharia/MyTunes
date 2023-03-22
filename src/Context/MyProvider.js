import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const userTheme = localStorage.getItem('theme');
    if (userTheme) setTheme(userTheme);
  }, []);

  const providerValue = useMemo(() => (
    { favoriteIds, setFavoriteIds, theme, setTheme }), [favoriteIds, theme]);

  return (
    <MyContext.Provider value={ providerValue }>
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
