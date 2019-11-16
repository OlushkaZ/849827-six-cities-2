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
        city: PropTypes.exact({
          name: PropTypes.string,
          location: PropTypes.exact({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
          })
        }),
        description: PropTypes.string,
        goods: PropTypes.arrayOf(PropTypes.string),
        host: PropTypes.exact({
          avatarUrl: PropTypes.string,
          id: PropTypes.number,
          isPro: PropTypes.bool,
          name: PropTypes.string,
        }),
        id: PropTypes.number,
        images: PropTypes.arrayOf(PropTypes.string),
        isFavorite: PropTypes.bool,
        isPremium: PropTypes.bool,
        location: PropTypes.exact({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
          zoom: PropTypes.number,
        }),
        maxAdults: PropTypes.number,
        previewImage: PropTypes.string,
        price: PropTypes.number,
        rating: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
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
