import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

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

  const tree = renderer
 .create(<Map
   offers = {[{
     id: `id1`,
     title: ``,
     coast: 0,
     isPremium: true,
     type: ``,
     src: ``,
     coordinates: [0, 0]
   }]}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
