import React from "react";
import {connect} from "react-redux";
import {Route, Switch, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
// import {ActionCreator} from '../../reducer/reducer';
import PageMain from '../page-main/page-main.jsx';
import DetailInfo from '../detail-info/detail-info.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withInput from '../../hocs/with-input/with-input.js';
const SignInWrapped = withInput(SignIn);
// const a = 3;
const PrivateRoute = ({component: Component, userData}) => (
  <Route
    render= {(props) =>{
      console.log(`check` + userData);
      return !userData ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }
    }
  />
);

const App = (props) => {
  const {userData} = props;
  // const cardNumber = Number(location.pathname.replace(`/details`, ``)) - 1;
  // return getPageScreen(offers);
  return (
    <Switch>
      <Route path = '/' exact component={PageMain}/>;
      <Route path = '/details:id' exact component={DetailInfo}/>;
      { // <Route path = '/sign_in' exact component={SignInWrapped}/>;
      }
      <PrivateRoute
        path="/sign_in"
        exact
        component={SignInWrapped}
        userData = {userData}
      />
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

PrivateRoute.propTypes = {
  component: PropTypes.func,
  userData: PropTypes.object,
};
App.propTypes = {
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
  )
};

// export default App;

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userData: state.userData,
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
