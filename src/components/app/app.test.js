import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<App
   offers = {[{
     title: ``,
     coast: 0,
     isPremium: true,
     type: ``,
     src: ``,
   }]}
 />)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
