import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from './components/app/app.jsx';
import Offers from './mocks/offers.js';
import {reducer, ActionCreator} from './reducer/reducer';

const init = () => {
  const store = createStore(reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  // store.dispatch(ActionCreator.changeCity(Offers[0].city));
  ReactDOM.render(<Provider store={store}>
    <App
      offers={Offers}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
