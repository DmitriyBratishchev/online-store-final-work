import React from 'react';
import PropTypes from 'prop-types';
import CardHorizontal from '../../ui/cardProduct/cardHorizontal';

const CatalogList = ({ catalog }) => {
  if (catalog.length === 0) return <h1>Loading . . .</h1>;
  return (
    <div className='d-flex flex-wrap grid-1 justify-content-around w-100 position-relative'>
      {/* <div className="animate-wisible"></div> */ }
      { catalog.length !== 0 && catalog.map((element, index) => {
        console.log('catalog, elem №', index);
        return (
          <CardHorizontal key={ element._id } element={ element } animationDelay={ index / 5 } />
        );
      }) }

    </div>
  );
};
CatalogList.propTypes = {
  catalog: PropTypes.array
};

export default CatalogList;
