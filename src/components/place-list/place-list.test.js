import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceList} from './place-list.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

it(`PlaceList correctly renders after relaunch`, () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      currentCity: `Amsterdam`,
      currentOffers: [
        {
          id: ``,
          type: ``,
          title: ``,
          coast: 0,
          isPremium: true,
          src: ``,
          coordinates: [0, 0]
        }]
    });

    component = renderer.create(
        <Provider store={store}>
          <PlaceList
            offers = {[{
              id: `id1`,
              title: ``,
              coast: 0,
              isPremium: true,
              type: ``,
              src: ``,
              coordinates: [0, 0]
            }]}
          />
        </Provider>
    );
  });
  const tree = renderer
 .create(component)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
