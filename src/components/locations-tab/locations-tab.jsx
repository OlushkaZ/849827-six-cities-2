import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from '../../reducer/reducer';
import {chooseOffersByCity} from '../../utils.js';
const CITY_COUNT = 6;

class LocationsTab extends React.PureComponent {
//   constructor(props) {
//     super(props);
//
//     // this.state = {
//     //   activCard: 1,
//     // };
//     // this._chooseOffersByCity = this._chooseOffersByCity.bind(this);
//   }
  _getCities() {
    const {offers} = this.props;
    const cities = offers.map(({city})=>city);
    return cities.filter((item, pos)=>{
      return cities.indexOf(item) === pos;
    }).slice(0, CITY_COUNT);

  }
  // _chooseOffersByCity(city) {
  //   const {offers} = this.props;
  //   return offers.slice().filter((offer)=>offer.city === city);
  // }

  render() {
    const {onMyClick, offers} = this.props;
    const handleTabClick = (evt)=>{
      const {target} = evt;
      evt.preventDefault();
      onMyClick(target.textContent, chooseOffersByCity(target.textContent, offers));
    };
    // const onMyClick = ()=>{};
    return <section className="locations container">
      <ul className="locations__list tabs__list">
        {this._getCities().map((city, ind)=>{
          return <li key={ind} className="locations__item">
            <a className="locations__item-link tabs__item" href="#" onClick = {handleTabClick}>
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
  onMyClick: PropTypes.func,
  currentCity: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
  // currentOffers: state.currentOffers,
});

const mapDispatchToProps = (dispatch)=>({
  onMyClick: (city, offers)=>{
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers(
        offers
    ));
  }
});
// 1.55
export {LocationsTab};
export default connect(mapStateToProps, mapDispatchToProps
)(LocationsTab);
