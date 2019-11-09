import React from "react";
// import {connect} from "react-redux";
// import {ActionCreator} from '../../reducer/reducer';
import PageMain from '../page-main/page-main.jsx';
import DetailInfo from '../detail-info/detail-info.jsx';
import PropTypes from "prop-types";

const getPageScreen = (offers) => {
  const pathName = (location.pathname.replace(/\d/, ``));
  const cardNumber = Number(location.pathname.replace(`/details`, ``)) - 1;
  switch (pathName) {
    case `/`:
      return <PageMain offers={offers} onClick={()=>{}}/>;
    case `/details`:
      return <DetailInfo offerInfo={offers[cardNumber]}/>;
  }
  return null;
};

const App = (props) => {
  const {offers} = props;
  return getPageScreen(offers);
};

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        city: PropTypes.string,
        title: PropTypes.string,
        coast: PropTypes.number,
        isPremium: PropTypes.bool,
        type: PropTypes.string,
        src: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      })
  )
};

export default App;
