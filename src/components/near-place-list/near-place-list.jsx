import React from "react";
import {connect} from "react-redux";
import {getCurrentOffers} from '../../selectors.js';
import PropTypes from "prop-types";
import PlaceCard from '../place-card/place-card.jsx';
const getOffersByCoordinates = (closestPoints, currentOffers)=>{
  const closestOffers = [];
  closestPoints.forEach((point)=>{
    const item = currentOffers.slice().filter((offer)=>offer.location.latitude === point[0]
                                    && offer.location.longitude === point[1]);
    closestOffers.push(item[0]);
  });
  return closestOffers;
};
const NearPlaceList = (props)=> {
  const {closestPoints, state} = props;
  if (closestPoints.length > 0) {
    const currentOffers = getCurrentOffers(state);
    let arr = getOffersByCoordinates(closestPoints, currentOffers);
    return <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {arr.map((offer)=>{
          return <PlaceCard
            key={offer.id}
            offer={offer}
          // onClick={onClick}
          // onUserHover = {onUserHover}
          />;
        })}
      </div>
    </section>;
  }
  return ``;
};
NearPlaceList.propTypes = {
  state: PropTypes.object,
  // currentOffers: PropTypes.arrayOf(
  //     PropTypes.exact({
  //       bedrooms: PropTypes.number,
  //       city: PropTypes.exact({
  //         name: PropTypes.string,
  //         location: PropTypes.exact({
  //           latitude: PropTypes.number,
  //           longitude: PropTypes.number,
  //           zoom: PropTypes.number,
  //         })
  //       }),
  //       description: PropTypes.string,
  //       goods: PropTypes.arrayOf(PropTypes.string),
  //       host: PropTypes.exact({
  //         avatarUrl: PropTypes.string,
  //         id: PropTypes.number,
  //         isPro: PropTypes.bool,
  //         name: PropTypes.string,
  //       }),
  //       id: PropTypes.number,
  //       images: PropTypes.arrayOf(PropTypes.string),
  //       isFavorite: PropTypes.bool,
  //       isPremium: PropTypes.bool,
  //       location: PropTypes.exact({
  //         latitude: PropTypes.number,
  //         longitude: PropTypes.number,
  //         zoom: PropTypes.number,
  //       }),
  //       maxAdults: PropTypes.number,
  //       previewImage: PropTypes.string,
  //       price: PropTypes.number,
  //       rating: PropTypes.number,
  //       title: PropTypes.string,
  //       type: PropTypes.string,
  //     })
  // )
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  closestPoints: state.closestPoints,
  state,
});

export {NearPlaceList};
export default connect(mapStateToProps, null
)(NearPlaceList);
