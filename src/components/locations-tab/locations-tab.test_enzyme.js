import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
// import renderer from 'react-test-renderer';
import {LocationsTab} from './locations-tab.jsx';
Enzyme.configure({adapter: new Adapter()});

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

it(`LocationsTab correctly renders after relaunch`, () => {
  const tree = shallow(<LocationsTab
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
    onMyClick = {()=>{}}
    currentCity = {``}
  />
  // ,{
  //   createNodeMock: ()=>{
  //     return {};
  //   }
  // }
  );
  expect(toJson(tree)).toMatchSnapshot();
});
