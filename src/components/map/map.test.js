import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

it(`Map correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<Map
   offers = {[{
     id: ``,
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
