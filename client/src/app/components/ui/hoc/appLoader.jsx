import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loadCatalogList } from '../../../store/catalog';
import { loadBasketList } from '../../../store/basket';
import { loadCurrentUser } from '../../../store/user';
import { loadCategoriesList } from '../../../store/categories';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategoriesList());
    dispatch(loadCatalogList());
    dispatch(loadBasketList());
    dispatch(loadCurrentUser());
  }, []);

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
