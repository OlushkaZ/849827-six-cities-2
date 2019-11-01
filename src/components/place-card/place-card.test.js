import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';

it(`PlaceCard correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<PlaceCard
   offer = {{
     id: `id1`,
     title: ``,
     coast: 0,
     isPremium: true,
     type: ``,
     src: ``,
     coordinates: [0, 0]
   }}
   onUserHover={jest.fn()}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
