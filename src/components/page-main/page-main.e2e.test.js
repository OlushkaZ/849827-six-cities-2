import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageMain from './page-main.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Click on title work correctly`, () => {
  const clickHandler = jest.fn();
  const pageMain = mount(<PageMain
    offers = {[{
      title: ``,
      coast: 0,
      isPremium: true,
      type: ``,
      src: ``,
    }]}
    onClick={clickHandler}
  />);
  const nameRef = pageMain.find(`.place-card__name`).first().children().first();
  nameRef.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
