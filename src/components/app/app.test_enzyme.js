import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';
Enzyme.configure({adapter: new Adapter()});

it(`App correctly renders after relaunch`, () => {
  const tree = shallow(<App
    offers = {[{
      id: `id1`,
      city: ``,
      title: ``,
      coast: 0,
      isPremium: true,
      type: ``,
      src: ``,
      coordinates: [0, 0]
    }]}
  />
  );
  expect(toJson(tree)).toMatchSnapshot();
});
