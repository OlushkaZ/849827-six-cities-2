import React from 'react';
import renderer from 'react-test-renderer';
import PageMain from './page-main.jsx';

it(`PageMain correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<PageMain
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