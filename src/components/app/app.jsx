import React from "react";
import PageMain from '../page-main/page-main.jsx';
import PropTypes from "prop-types";
const App = ({offers}) => {

  return <PageMain
    offers={offers}
    // onClick={onClick}
  />;
};
App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.exact({
        title: PropTypes.string,
        coast: PropTypes.number,
        isPremium: PropTypes.bool,
        type: PropTypes.string,
        src: PropTypes.string,
      })
  )
  // onClick: ()=>{},
};
export default App;
