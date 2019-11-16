import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {compose} from "recompose";
import App from './components/app/app.jsx';
// import Offers from './mocks/offers.js';
import {reducer, Operation} from './reducer/reducer';
import createAPI from './create-api';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  /* eslint-enable */
  store.dispatch(Operation.loadOffers());

  ReactDOM.render(<Provider store={store}>
    <App
      // offers={Offers}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
