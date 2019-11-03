const initialState = {
  currentCity: `Amsterdam`,
  currentOffers: [
    {
      id: `id1`,
      type: `apartment`,
      title: `Beautiful & luxurious apartment at great location`,
      coast: 120,
      isPremium: true,
      // src: `http://placehold.it/260x200`,
      src: `http://placeimg.com/260/200/arch`,
      coordinates: [52.3909553943508, 4.85309666406198]
    },
    {
      id: `id2`,
      type: `apartment`,
      title: `Nice, cozy, warm big bed apartment`,
      coast: 150,
      isPremium: true,
      src: `http://placeimg.com/260/200/arch`,
      coordinates: [52.369553943508, 4.85309666406198]
    },
    {
      id: `id3`,
      type: `room`,
      title: `Wood and stone place`,
      coast: 12,
      isPremium: false,
      src: `http://placeimg.com/260/200/arch`,
      coordinates: [52.3909553943508, 4.929309666406198]
    },
    {
      id: `id4`,
      type: `castle`,
      title: `Canal View Prinsengracht`,
      coast: 1300,
      isPremium: false,
      src: `http://placeimg.com/260/200/arch`,
      coordinates: [52.3809553943508, 4.939309666406198]
    },
  ]
};

// {
//   type: `CHANGE_CITY`,
//   payload: `Antverpen`
// }
// {
//   type: `GET_OFFERS`,
//   payload: [{},{}]
// }
//   type: `RESET`
// }

export const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign(
        {}, state, {currentCity: action.payload}
    );
    case `GET_OFFERS`: return Object.assign(
        {}, state, {currentOffers: action.payload}
    );
    case `RESET`: return Object.assign(
        {}, initialState
    );
  }
  return state;
};


export const ActionCreator = {
  changeCity: (city)=>({
    type: `CHANGE_CITY`,
    payload: city
  }),
  getOffers: (offers)=>({
    type: `GET_OFFERS`,
    payload: offers
  }),
  reset: ()=>({
    type: `RESET`
  })
};
