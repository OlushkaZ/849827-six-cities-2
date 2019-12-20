import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from '../../reducer/reducer';
import {Link} from "react-router-dom";
import ReviewList from '../review-list/review-list.jsx';
import NearPlaceList from '../near-place-list/near-place-list.jsx';
import Map from '../map/map.jsx';
const DetailInfo = (props) => {
  const {offers, match, onButtonFavoriteClick} = props;
  const offerInfo = offers.filter((offer)=>offer.id === Number(match.params.id))[0];
  // const buttonFavorite = React.createRef();
  // buttonFavorite.current.style.fill = `#ff0000`;
  let isFavorite = offerInfo.isFavorite;
  const setButtonFavoriteColor = (button)=>{
    if (button && isFavorite) {
      button.firstChild.firstChild.style.fill = `#4481c3`;
    }
  };
  const handleButtonFavoriteClick = (evt)=>{
    const target = evt.target;
    if (isFavorite) {
      target.style.fill = `#ffffff`;
      onButtonFavoriteClick(offerInfo.id, 0);
    } else {
      target.style.fill = `#4481c3`;
      onButtonFavoriteClick(offerInfo.id, 1);
    }
    isFavorite = !isFavorite;
  };

  return <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offerInfo.images.slice(0, 6).map((src, ind)=>{
              return (<div key= {ind} className="property__image-wrapper">
                <img className="property__image" src={src} alt="Photo studio"/>
              </div>);
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offerInfo.isPremium ?
              <div className="property__mark">
                <span>Premium</span>
              </div> : ``}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offerInfo.title}
              </h1>
              <button className="property__bookmark-button button" type="button" onClick = {handleButtonFavoriteClick} ref = {setButtonFavoriteColor}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${Math.round(offerInfo.rating) * 20}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{Math.round(offerInfo.rating)}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offerInfo.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offerInfo.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offerInfo.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offerInfo.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offerInfo.goods.map((good, ind)=> {
                  return (<li key={ind} className="property__inside-item">
                    {good}
                  </li>);
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offerInfo.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {offerInfo.host.name}
                </span>
                <span className="property__user-status">
                  {offerInfo.host.isPro ? `Pro` : ``}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offerInfo.description}
                </p>
              </div>
            </div>
            <ReviewList>
            </ReviewList>
          </div>
        </div>
        <section className="property__map map">
          <Map
            onlyClosest = {true}
          />
        </section>
      </section>
      <div className="container">
        <NearPlaceList
        />
      </div>
    </main>
  </div>;
};

DetailInfo.propTypes = {
  onButtonFavoriteClick: PropTypes.func,
  offers: PropTypes.arrayOf(
      PropTypes.exact({
        bedrooms: PropTypes.number,
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
  match: PropTypes.object,
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  currentOffer: state.currentOffer,
});

const mapDispatchToProps = (dispatch)=>({
  onButtonFavoriteClick: (hotelID, isFavorite)=>{
    dispatch(Operation.putFavorite(hotelID, isFavorite));
  }
});

export {DetailInfo};
export default connect(mapStateToProps, mapDispatchToProps
)(DetailInfo);
