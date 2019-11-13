
import {chooseOffersByCity} from '../utils.js';
import Offers from '../mocks/offers.js';
import configureAPI from '../configure-api';


const initialState = {
  currentCity: Offers[0].city,
  currentOffers: [
    {
      id: `id1`,
      city: `crumlov`,
      type: `apartment`,
      title: `Beautiful & luxurious apartment at great location`,
      coast: 120,
      isPremium: true,
      src: `http://placeimg.com/260/200/arch`,
      coordinates: [48.806887, 14.308579]
    }],
  // currentCity: ``,
  // currentOffers: [],
  offers: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  RESET: `RESET`,
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHANGE_CITY: return Object.assign(
        {}, state, {currentCity: action.payload}
    );
    case ActionType.GET_OFFERS: return Object.assign(
        {}, state, {currentOffers: action.payload}
    );
    case ActionType.RESET: return Object.assign(
        {}, initialState
    );
    case ActionType.LOAD_OFFERS: return Object.assign(
        {}, state, {offers: action.payload}
    );
  }
  return state;
};


const ActionCreator = {
  changeCity: (city)=>({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  getOffers: (offers)=>({
    type: ActionType.GET_OFFERS,
    payload: offers
  }),
  reset: ()=>({
    type: ActionType.RESET
  }),
  loadOffers: (offers)=>({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
};

const Operation = {
  loadOffers: () => (dispatch) => {
    return configureAPI.get(`/hotels`)
    .then((response)=>{
      dispatch(ActionCreator.loadOffers(response.data));
      dispatch(ActionCreator.changeCity(response.data[0].city.name));
      dispatch(ActionCreator.getOffers(chooseOffersByCity(response.data[0].city, response.data)));
    });
  },
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
