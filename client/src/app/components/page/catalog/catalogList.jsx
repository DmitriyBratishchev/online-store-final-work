import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardHorizontal from '../../ui/cardProduct/cardHorizontal';
import Pagination from '../../ui/pagination/pagination';

const CatalogList = ({ catalog }) => {
  const [curentPage, setCarentPage] = useState(1);
  const countCatalog = catalog.length;
  const pageSize = 6;
  const hendelPageChange = (pageIndex) => {
    setCarentPage(pageIndex);
  };

  const firstCardVisibleIndex = curentPage * pageSize - pageSize;
  const lastCardVisibleIndex = curentPage * pageSize;
  const catalogCrop = [];
  for (let i = firstCardVisibleIndex; i < lastCardVisibleIndex; i++) {
    if (catalog[i]) {
      catalogCrop.push(catalog[i]);
    }
  }

  if (catalog.length === 0) return <h1>Список пуст.</h1>;
  return (
    <>
      <div className='d-flex flex-wrap grid-1 justify-content-around w-100 position-relative'>
        { catalogCrop.length !== 0 && catalogCrop.map((element, index) => {
          return (
            <CardHorizontal key={ element._id } element={ element } />
          );
        }) }

      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          itemsCount={ countCatalog }
          pageSize={ pageSize }
          curentPage={ curentPage }
          onPageChange={ hendelPageChange }
        />
      </div>
    </>
  );
};
CatalogList.propTypes = {
  catalog: PropTypes.array
};

export default CatalogList;
