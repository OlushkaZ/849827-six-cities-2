import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

jest.mock(`leaflet`, ()=> {
  return {
    icon: jest.fn(),
    tileLayer: jest.fn().mockImplementation(() => {
      return {
        addTo: jest.fn(),
      };
    }),
    marker: jest.fn().mockImplementation(() => {
      return {
        addTo: jest.fn(),
      };
    }),
    map: jest.fn().mockImplementation(() => {
      return {
        setView: jest.fn(),
      };
    }),
  };
});

it(`Map correctly renders after relaunch`, () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
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
        }]
    });

    component = renderer.create(
        <Provider store={store}>
          <Map
            offers = {[{
              id: `id1`,
              title: ``,
              coast: 0,
              isPremium: true,
              type: ``,
              src: ``,
              coordinates: [0, 0]
            }]}
          />
        </Provider>
    );
  });
  const tree = renderer
 .create(component)
 .toJSON();
  expect(tree).toMatchSnapshot();
});


// it(`Map correctly renders after relaunch`, () => {
//
//   const tree = renderer
//  .create(<Map
//    offers = {[{
//      id: `id1`,
//      title: ``,
//      coast: 0,
//      isPremium: true,
//      type: ``,
//      src: ``,
//      coordinates: [0, 0]
//    }]}
//  />)
//  .toJSON();
//   expect(tree).toMatchSnapshot();
// });
