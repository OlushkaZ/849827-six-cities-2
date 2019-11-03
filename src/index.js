import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from './components/app/app.jsx';
import Offers from './mocks/offers.js';
import {reducer, ActionCreator} from './reducer/reducer';

const init = () => {
  const store = createStore(reducer);
  // store.dispatch(ActionCreator.changeCity(`Budeevice`));
  ReactDOM.render(<Provider store={store}>
    <App
      offers={Offers}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
