import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PlaceCard from '../place-card/place-card.jsx';
const PlaceList = ({currentOffers, onClick, onUserHover})=> {
  return <div className="cities__places-list places__list tabs__content">
    {currentOffers.map((offer)=>{
      return <PlaceCard
        key={offer.id}
        offer={offer}
        onClick={onClick}
        onUserHover = {onUserHover}
      />;
    })}
  </div>;
};

PlaceList.propTypes = {
  currentOffers: PropTypes.arrayOf(
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
  ),
  onClick: PropTypes.func,
  onUserHover: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentOffers: state.currentOffers,
});
export {PlaceList};
export default connect(mapStateToProps, null
)(PlaceList);
