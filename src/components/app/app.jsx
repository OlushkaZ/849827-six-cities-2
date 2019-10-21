import React from "react";
import PageMain from '../page-main/page-main.jsx';
import PropTypes from "prop-types";
const App = ({offers, onClick}) => {

  return <PageMain
    offers={offers}
    onClick={onClick}
  />;
};
App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.string),
  onClick: ()=>{},
};
export default App;
