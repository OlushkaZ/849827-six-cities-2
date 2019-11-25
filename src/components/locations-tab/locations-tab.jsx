import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from '../../reducer/reducer';
import {chooseOffersByCity} from '../../utils.js';
import {getCurrentOffers} from '../../selectors.js';
const CITY_COUNT = 6;

class LocationsTab extends React.PureComponent {
  _isActiveSity(city) {
    const {currentCity} = this.props;
    return currentCity === city ? `locations__item-link tabs__item tabs__item--active` : `locations__item-link tabs__item`;
  }
  _getCities() {
    const {offers} = this.props;
    const cities = offers.map(({city})=>city.name);
    return cities.filter((item, pos)=>{
      return cities.indexOf(item) === pos;
    }).slice(0, CITY_COUNT);

  }

  render() {
    const {onMyClick, offers, state} = this.props;
    console.log(getCurrentOffers(state));
    const handleTabClick = (evt)=>{
      const {target} = evt;
      evt.preventDefault();
      onMyClick(target.textContent, chooseOffersByCity(target.textContent, offers));
    };
    return <section className="locations container">
      <ul className="locations__list tabs__list">
        {this._getCities().map((city, ind)=>{
          return <li key={ind} className="locations__item">
            <a className= {this._isActiveSity(city)} href="#" onClick = {handleTabClick}>
              <span>{city}</span>
            </a>
          </li>;
        })}
      </ul>
    </section>;
  }
}

LocationsTab.propTypes = {
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
  onMyClick: PropTypes.func,
  currentCity: PropTypes.string,
  state: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
  state
});

const mapDispatchToProps = (dispatch)=>({
  onMyClick: (city, offers)=>{
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers(offers));
    dispatch(ActionCreator.getClosest([]));
  }
});
// 1.55
export {LocationsTab};
export default connect(mapStateToProps, mapDispatchToProps
)(LocationsTab);
