// import {connect} from "react-redux";
import {createSelector} from 'reselect';

// const {state} = props;

const offers = (state) => state.offers;
const currentCity = (state) => state.currentCity;
const sortType = (state) => state.sortType;

export const getCurrentOffers = createSelector(
    offers,
    currentCity,
    sortType,
    (ofs, city, sType) => {
      const filteredOffers = ofs.slice()
      .filter((offer)=>offer.city.name === city);
      switch (sType) {
        case `Price: low to high`:
          filteredOffers.sort((a, b)=>a.price - b.price);
          break;
        case `Price: high to low`:
          filteredOffers.sort((a, b)=>b.price - a.price);
          break;
        case `Top rated first`:
          filteredOffers.sort((a, b)=>b.rating - a.rating);
          break;
        // case `Popular`:
        //   sortedOffers = filteredOffers;
        //   break;
      }
      return filteredOffers;
    }
);

// offers.slice().filter((offer)=>offer.city.name === city);

// const taxSelector = createSelector(
//   subtotalSelector,
//   taxPercentSelector,
//   (subtotal, taxPercent) => subtotal * (taxPercent / 100)
// )
//
// export const totalSelector = createSelector(
//   subtotalSelector,
//   taxSelector,
//   (subtotal, tax) => ({ total: subtotal + tax })
// )
//
// let exampleState = {
//   shop: {
//     taxPercent: 8,
//     items: [
//       { name: 'apple', value: 1.20 },
//       { name: 'orange', value: 0.95 },
//     ]
//   }
// }

// console.log(subtotalSelector(exampleState)) // 2.15

// const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
//   state,
// });

// const mapDispatchToProps = {
//   getClosest: ActionCreator.getClosest,
// };

// export default connect(mapStateToProps, null
// )(Map);
