import React from 'react';
import renderer from 'react-test-renderer';
import PlaceList from './place-list.jsx';

it(`PlaceList correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<PlaceList
   offers = {[{
     title: ``,
     coast: 0,
     isPremium: true,
     type: ``,
     src: ``,
   }]}
   // minutes={0}
   // onClick={jest.fn()}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
