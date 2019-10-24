import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';

it(`PlaceCard correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<PlaceCard
   id = {1}
   offer = {{
     title: ``,
     coast: 0,
     isPremium: true,
     type: ``,
     src: ``
   }}
   onUserHover={jest.fn()}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
