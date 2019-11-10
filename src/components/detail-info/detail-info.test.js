import React from 'react';
import renderer from 'react-test-renderer';
import DetailInfo from './detail-info.jsx';

it(`DetailInfo correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<DetailInfo
   offerInfo = {{
     id: `id1`,
     city: ``,
     title: ``,
     coast: 0,
     isPremium: true,
     type: ``,
     src: ``,
     coordinates: [0, 0]
   }}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
