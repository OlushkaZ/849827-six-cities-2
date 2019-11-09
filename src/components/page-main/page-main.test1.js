import React from 'react';
import renderer from 'react-test-renderer';
import PageMain from './page-main.jsx';

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

it(`PageMain correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<PageMain
   offers = {[{
     id: `id1`,
     title: ``,
     coast: 0,
     isPremium: true,
     type: ``,
     src: ``,
     coordinates: [0, 0]
   }]}
   // minutes={0}
   // onClick={jest.fn()}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
