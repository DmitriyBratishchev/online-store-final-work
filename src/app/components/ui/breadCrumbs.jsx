import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
// import history from '../../utils/histiry';

const BreadCrumbs = () => {
  const history = useHistory();
  const location = useLocation();
  console.log(history);
  console.log('location', location);
  const { pathname } = history.location;
  // const [count, setCount] = useState(0);
  const [linksArray, setLinksArray] = useState([]);

  console.log('rerender path', pathname);
  useEffect(() => {
    setLinksArray(() => pathname.split('/').filter(s => s));
  }, [pathname]);
  const getPathName = (link) => {
    const index = linksArray.indexOf(link);
    console.log('click', index, linksArray.length - 1);
    if (index === linksArray.length - 1) return;
    console.log('rerender');
    const newPath = linksArray.slice(0, index + 1).join('/');
    history.push(`/${newPath}`);
    setLinksArray(() => pathname.split('/').filter(s => s));
    // setCount((prev) => ++prev)
  };
  return (
    <div>
      <span onClick={ () => getPathName() }>Главная</span>
      { linksArray.length !== 0 && linksArray.map(link => {
        return <span key={ link } onClick={ () => getPathName(link) }>/{ link }</span>;
      }) }
    </div>
  );
};

export default BreadCrumbs;
