import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceCard} from './place-card.jsx';
import {BrowserRouter as Router} from 'react-router-dom';

it(`PlaceCard correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<Router><PlaceCard
   offer = {{
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
   }}
   onUserHover={jest.fn()}
 /></Router>)
 .toJSON();
  expect(tree).toMatchSnapshot();
});
