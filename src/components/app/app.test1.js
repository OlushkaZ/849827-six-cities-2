import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

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

it(`App correctly renders after relaunch`, () => {
  let store;
  let component;
  // let component;
  beforeEach(() => {
    store = mockStore({
      currentCity: `Amsterdam`,
      currentOffers: [
        {
          bedrooms: 0,
          city: {
            location: {
              latitude: 0,
              longitude: 0,
              zoom: 0,
            },
            name: ``},
          description: ``,
          goods: [
            ``,
            ``,
          ],
          host: {
            avatarUrl: ``,
            id: 0,
            isPro: true,
            name: ``},
          id: 0,
          images: [
            ``,
          ],
          isFavorite: false,
          isPremium: false,
          location: {
            latitude: 0,
            longitude: 0,
            zoom: 0,
          },
          maxAdults: 0,
          previewImage: ``,
          price: 0,
          rating: 0,
          title: ``,
          type: ``,
        }]
    });

    component = renderer.create(
        <Provider store={store}>
          <App
            offers = {[{
              bedrooms: 0,
              city: {
                location: {
                  latitude: 0,
                  longitude: 0,
                  zoom: 0,
                },
                name: ``},
              description: ``,
              goods: [
                ``,
                ``,
              ],
              host: {
                avatarUrl: ``,
                id: 0,
                isPro: true,
                name: ``},
              id: 0,
              images: [
                ``,
              ],
              isFavorite: false,
              isPremium: false,
              location: {
                latitude: 0,
                longitude: 0,
                zoom: 0,
              },
              maxAdults: 0,
              previewImage: ``,
              price: 0,
              rating: 0,
              title: ``,
              type: ``,
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
