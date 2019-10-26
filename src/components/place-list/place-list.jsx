import React from "react";
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
    const {offers, onClick} = this.props;
    return <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, i)=>{
        return <PlaceCard
          key={offer.title + i}
          id={i + 1}
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
        title: PropTypes.string,
        coast: PropTypes.number,
        isPremium: PropTypes.bool,
        type: PropTypes.string,
        src: PropTypes.string,
      })
  ),
  onClick: PropTypes.func,
};
export default PlaceList;
