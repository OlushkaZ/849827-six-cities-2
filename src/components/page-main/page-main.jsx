import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator, Operation} from '../../reducer/reducer';
import {Link} from "react-router-dom";
import PlaceList from '../place-list/place-list.jsx';
import LocationsTab from '../locations-tab/locations-tab.jsx';
import NoPlace from '../no-place/no-place.jsx';
// import {getCurrentOffers} from '../../selectors.js';
import Map from '../map/map.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import withInnerElement from '../../hocs/with-inner-element/with-inner-element.js';
import HeaderNavSignIn from '../header-nav-sign-in/header-nav-sign-in.jsx';
import HeaderNavUserName from '../header-nav-user-name/header-nav-user-name.jsx';

const PlaceListWrapped = withActiveItem(withInnerElement(PlaceList));

const PageMain = ({isLoading, offers, userData, onLogoClick}) => {
  // const isLoad = isLoading;
  const handleLogoClick = ()=>{
    onLogoClick();
  };
  if (!isLoading) {
    return ``;
  }
  console.log(`show main start ` + (userData ? `user` : `null`));
  if (offers.length === 0) {
    return <NoPlace/>;
  }
  // const currentOffers = getCurrentOffers(state);
  // const offers = state.offers;
  // const currentCity = state.currentCity;
  return <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active" onClick={handleLogoClick}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {userData === null ? <HeaderNavSignIn/> : <HeaderNavUserName email = {userData.email}/>}
        </div>
      </div>
    </header>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsTab
          // offers={offers}
          // onMyClick = {()=>{
          //   console.log(`myClick`);
          // }}
        />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <PlaceListWrapped
            // offers={offers}
            // onClick={()=>{}}
          />
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map
                // offers={offers}
                onlyClosest = {false}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>;

};
PageMain.propTypes = {
  onLogoClick: PropTypes.func,
  userData: PropTypes.object,
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
  // onClick: PropTypes.func,
  // currentCity: PropTypes.string,
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
  // ),
  isLoading: PropTypes.bool,
  // state: PropTypes.object,
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  isLoading: state.isLoading,
  userData: state.userData,
});

const mapDispatchToProps = (dispatch)=>({
  onLogoClick: ()=>{
    dispatch(Operation.refreshOffers());
    dispatch(ActionCreator.isLoading(false));
  }
});
// 1.55
export {PageMain};
export default connect(mapStateToProps, mapDispatchToProps
)(PageMain);
