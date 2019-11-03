// import React from 'react';
// import renderer from 'react-test-renderer';
import reducer from './reducer.js';
import ActionCreator from './reducer.js';
describe(`Reducer works correctly`, ()=>{
  it(`Reducer without additional parameters should return initial state`, ()=>{
    expect(reducer(undefined, {})).toEqual(
        {
          city: `Amsterdam`,
          offers: [
            {
              id: `id1`,
              type: `apartment`,
              title: `Beautiful & luxurious apartment at great location`,
              coast: 120,
              isPremium: true,
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
        }
    );
  });
  it(`Reducer should set a sity by a given value`, ()=>{
    expect(reducer({
      city: `Amsterdam`,
      offers: [
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
          city: `Antverpen`,
          offers: [
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
      city: ``,
      offers: [
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
          city: ``,
          offers: [
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
      city: `aaaaaa`,
      offers: [
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
          city: `Amsterdam`,
          offers: [
            {
              id: `id1`,
              type: `apartment`,
              title: `Beautiful & luxurious apartment at great location`,
              coast: 120,
              isPremium: true,
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
