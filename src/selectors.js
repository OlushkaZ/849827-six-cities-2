// import {connect} from "react-redux";
import {createSelector} from 'reselect';

// const {state} = props;

const offers = (state) => state.offers;
const currentCity = (state) => state.currentCity;

export const getCurrentOffers = createSelector(
    offers,
    currentCity,
    (ofs, city) => ofs.slice().filter((offer)=>offer.city.name === city)
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
