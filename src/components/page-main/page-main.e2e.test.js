import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageMain from './page-main.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`PageMain e2e test`, () => {
  const clickHandler = jest.fn();
  const pageMain = shallow(<PageMain
    offers = {[``]}
    onClick={clickHandler}
  />);
  const startButton = pageMain.find(`.place-card__bookmark-button`);
  startButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
