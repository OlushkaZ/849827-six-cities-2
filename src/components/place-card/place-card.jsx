import React from "react";
import PropTypes from "prop-types";
const PlaceCard = (props) => {
  const {id, offer, onUserHover, onClick} = props;

  return <article className="cities__place-card place-card" onMouseEnter = {()=>onUserHover(id)} onMouseLeave = {()=>onUserHover(null)}>
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={offer.src} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.coast}</b>
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
        <a href={`details${id}`}>{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

PlaceCard.propTypes = {
  id: PropTypes.number,
  offer: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    coast: PropTypes.number,
    isPremium: PropTypes.bool,
    type: PropTypes.string,
    src: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
  onUserHover: PropTypes.func,
  onClick: PropTypes.func,
};
export default PlaceCard;
