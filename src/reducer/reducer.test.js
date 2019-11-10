// import React from 'react';
// import renderer from 'react-test-renderer';
import {chooseOffersByCity} from '../utils.js';
import Offers from '../mocks/offers.js';
import {reducer} from './reducer.js';
import {ActionCreator} from './reducer.js';
describe(`Reducer works correctly`, ()=>{
  it(`Reducer without additional parameters should return initial state`, ()=>{
    expect(reducer(undefined, {})).toEqual(
        {
          currentCity: Offers[0].city,
          currentOffers: chooseOffersByCity(Offers[0].city, Offers),
        }
    );
  });
  it(`Reducer should set a sity by a given value`, ()=>{
    expect(reducer({
      currentCity: `Amsterdam`,
      currentOffers: [
        {
          id: ``,
          type: ``,
          title: ``,
          coast: 0,
          isPremium: true,
          src: ``,
          coordinates: [0, 0]
        }]},
    {
      type: `CHANGE_CITY`,
      payload: `Antverpen`
    }
    )).toEqual(
        {
          currentCity: `Antverpen`,
          currentOffers: [
            {
              id: ``,
              type: ``,
              title: ``,
              coast: 0,
              isPremium: true,
              src: ``,
              coordinates: [0, 0]
            }]}
    );
  });
  it(`Reducer should set the offers by a given value`, ()=>{
    expect(reducer({
      currentCity: ``,
      currentOffers: [
        {
          id: ``,
          type: ``,
          title: ``,
          coast: 0,
          isPremium: true,
          src: ``,
          coordinates: [0, 0]
        }]},
    {
      type: `GET_OFFERS`,
      payload: [{
        id: `id1`,
        type: `apartment`,
        title: `aaa`,
        coast: 1,
        isPremium: true,
        src: `aaa`,
        coordinates: [0.1, 0.1]
      }]
    }
    )).toEqual(
        {
          currentCity: ``,
          currentOffers: [
            {
              id: `id1`,
              type: `apartment`,
              title: `aaa`,
              coast: 1,
              isPremium: true,
              src: `aaa`,
              coordinates: [0.1, 0.1]
            }]}
    );
  });
  it(`Reducer should correctly reset application state`, ()=>{
    expect(reducer({
      currentCity: `aaaaaa`,
      currentOffers: [
        {
          id: `id188`,
          type: `apartment`,
          title: `Beautiful & luxurious`,
          coast: 99999,
          isPremium: true,
          src: `htt`,
          coordinates: [52.3, 0]
        }]
    }, {type: `RESET`})).toEqual(
        {
          currentCity: Offers[0].city,
          currentOffers: chooseOffersByCity(Offers[0].city, Offers),
        }
    );
  });
});
describe(`Action creators works correctly`, ()=>{
  it(`Action creator for change city returns correct action`, ()=>{
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Moscow`});
  });
  it(`Action creator for reset without additional parameters should return reset`, ()=>{
    expect(ActionCreator.reset()).toEqual({
      type: `RESET`});
  });
  it(`Action creator for reset with parameters should return reset`, ()=>{
    expect(ActionCreator.reset(`Moscow`)).toEqual({
      type: `RESET`});
  });
// ... написать тесты 1.34.57
});
