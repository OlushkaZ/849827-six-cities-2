import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app.jsx';
const init = () => {
  const offers = [`Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`
  ];
  const onClick = ()=> {};

  ReactDOM.render(
      <App
        offers={offers}
        onClick={onClick}
      />,
      document.querySelector(`#root`)
  );
};

init();
