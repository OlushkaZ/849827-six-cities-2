import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

// jest.mock(`leaflet`, ()=> {
//   return {
//     icon: jest.fn(),
//     tileLayer: jest.fn().mockImplementation(() => {
//       return {
//         addTo: jest.fn(),
//       };
//     }),
//     marker: jest.fn().mockImplementation(() => {
//       return {
//         addTo: jest.fn(),
//       };
//     }),
//     map: jest.fn().mockImplementation(() => {
//       return {
//         setView: jest.fn(),
//       };
//     }),
//   };
// });

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
 .create(<App
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
 />, {
   createNodeMock: ()=>{
     return {};
   }
 })
 .toJSON();
  expect(tree).toMatchSnapshot();
});
