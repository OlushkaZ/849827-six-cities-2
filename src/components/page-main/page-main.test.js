import React from 'react';
import renderer from 'react-test-renderer';
import PageMain from './page-main.jsx';

it(`PageMain correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<PageMain
   offers = {[``, ``]}
   // minutes={0}
   // onClick={jest.fn()}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
