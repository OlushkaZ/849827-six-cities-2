import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from '../../reducer/reducer';
const CITY_COUNT = 6;

class LocationsTab extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   activCard: 1,
  //   // };
  // }
  _getCities() {
    const {offers} = this.props;
    const arr = offers.map(({city})=>city);
    return arr.filter((item, pos)=>{
      return arr.indexOf(item) === pos;
    }).slice(0, CITY_COUNT);

  }

  render() {
    const {currentCity, onMyClick} = this.props;
    const handleTabClick = (evt)=>{
      const {target} = evt;
      evt.preventDefault();
      onMyClick(target.textContent.toLowerCase());
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
  onMyClick: (city)=>dispatch(ActionCreator.changeCity(city))
});
// 1.55
export {LocationsTab};
export default connect(mapStateToProps, mapDispatchToProps
)(LocationsTab);
