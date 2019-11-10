import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PlaceCard from '../place-card/place-card.jsx';
class PlaceList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activCard: 1,
    };
  }

  render() {
    const {currentOffers, onClick} = this.props;
    return <div className="cities__places-list places__list tabs__content">
      {currentOffers.map((offer)=>{
        return <PlaceCard
          key={offer.id}
          offer={offer}
          onClick={onClick}
          onUserHover={(id) => {
            // console.log(this.state);
            this.setState({activCard: id}
            // this.setState(() => {
            //   return {activCard: id};
            // }
            );
          }}
        />;
      })}
    </div>;
  }
}

PlaceList.propTypes = {
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
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  // currentCity: state.currentCity,
  currentOffers: state.currentOffers,
});

// const mapDispatchToProps = (dispatch)=>({
//   onMyClick: (city)=>dispatch(ActionCreator.changeCity(city))
// });
// 1.55
export {PlaceList};
export default connect(mapStateToProps, null
)(PlaceList);
