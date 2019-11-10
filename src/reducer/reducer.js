
import {chooseOffersByCity} from '../utils.js';
import Offers from '../mocks/offers.js';

const initialState = {
  currentCity: Offers[0].city,
  currentOffers: chooseOffersByCity(Offers[0].city, Offers),
};

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
