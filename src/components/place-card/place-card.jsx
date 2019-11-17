import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/reducer';
const PlaceCard = (props) => {
  const {offer, onUserHover, onClick} = props;

  return <article className="cities__place-card place-card" onMouseEnter = {()=>onUserHover(offer.id)} onMouseLeave = {()=>onUserHover(null)}>
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `93%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name" onClick = {onClick}>
        <a href={`details${offer.id}`}>{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

PlaceCard.propTypes = {
  offer: PropTypes.exact({
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
  }),
  onUserHover: PropTypes.func,
  onClick: PropTypes.func,
};
// export default PlaceCard;
// const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
//   currentCity: state.currentCity,
//   currentOffers: state.currentOffers,
// });

const mapDispatchToProps = (dispatch)=>({
  onUserHover: (offerID)=>{
    dispatch(ActionCreator.changeCurrentOffer(
        offerID
    ));
  }
});
export {PlaceCard};
export default connect(null, mapDispatchToProps
)(PlaceCard);
