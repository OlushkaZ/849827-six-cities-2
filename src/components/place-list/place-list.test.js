import React from 'react';
import renderer from 'react-test-renderer';
import PlaceList from './place-list.jsx';

it(`PlaceList correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<PlaceList
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
