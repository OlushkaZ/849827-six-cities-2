import React from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
// import {ActionCreator} from '../../reducer/reducer';
import PageMain from '../page-main/page-main.jsx';
import DetailInfo from '../detail-info/detail-info.jsx';
import PropTypes from "prop-types";

// const getPageScreen = (offers) => {
//   const pathName = (location.pathname.replace(/\d/, ``));
//   const cardNumber = Number(location.pathname.replace(`/details`, ``)) - 1;
//   switch (pathName) {
//     case `/`:
//       // return null;
//       return <PageMain offers={offers} onClick={()=>{}}/>;
//     case `/details`:
//       // return null;
//       return <DetailInfo offerInfo={offers[cardNumber]}/>;
//   }
//   return null;
// };

const App = () => {
  // const {offers} = props;
  // const cardNumber = Number(location.pathname.replace(`/details`, ``)) - 1;
  // return getPageScreen(offers);
  return (
    <Switch>
      <Route path = '/' exact component={PageMain}/>;
      <Route path = '/details:id' exact component={DetailInfo}/>;
      <Route
        render={() => (
          <h1>
            404.
            <br />
            <small>Page not found</small>
          </h1>
        )}
      />
    </Switch>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.exact({
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
  )
};

// export default App;

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  // currentOffers: state.currentOffers,
});

// const mapDispatchToProps = (dispatch)=>({
//   onMyClick: (city, offers)=>{
//     dispatch(ActionCreator.changeCity(city));
//     dispatch(ActionCreator.getOffers(
//         offers
//     ));
//   }
// });
// 1.55
export {App};
export default connect(mapStateToProps, null
)(App);
