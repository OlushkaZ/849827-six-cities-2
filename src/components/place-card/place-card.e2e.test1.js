import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Hover on card takes good data`, () => {
  const hoverHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    key={``}
    id={1}
    offer = {{
      id: `id1`,
      title: ``,
      coast: 0,
      isPremium: true,
      type: ``,
      src: ``,
      coordinates: [0, 0]
    }}
    onClick={()=>{}}
    onUserHover={hoverHandler}
  />);
  const placeCardElement = placeCard.find(`.cities__place-card`);
  placeCardElement.simulate(`mouseEnter`);
  expect(hoverHandler).toHaveBeenCalledTimes(1);
  expect(hoverHandler).toHaveBeenCalledWith(`id1`);
});
