import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageMain from './page-main.jsx';

Enzyme.configure({adapter: new Adapter()});

jest.mock(`leaflet`, ()=> {
  return {
    icon: jest.fn(),
    tileLayer: jest.fn().mockImplementation(() => {
      return {
        addTo: jest.fn(),
      };
    }),
    marker: jest.fn().mockImplementation(() => {
      return {
        addTo: jest.fn(),
      };
    }),
    map: jest.fn().mockImplementation(() => {
      return {
        setView: jest.fn(),
      };
    }),
  };
});

it(`Click on title work correctly`, () => {
  const clickHandler = jest.fn();
  const pageMain = mount(<PageMain
    offers = {[{
      id: `id1`,
      title: ``,
      coast: 0,
      isPremium: true,
      type: ``,
      src: ``,
      coordinates: [0, 0]
    }]}
    onClick={clickHandler}
  />);
  const nameRef = pageMain.find(`.place-card__name`).first().children().first();
  nameRef.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
