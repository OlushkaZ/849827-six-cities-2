import React from "react";
import PageMain from '../page-main/page-main.jsx';
import PropTypes from "prop-types";
const App = (props) => {
  const {offers} = props;

  return <PageMain
    offers={offers}
  />;
};
App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.string),
};
export default App;
