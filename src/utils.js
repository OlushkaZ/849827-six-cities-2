// import Offers from './mocks/offers.js';
// export const getFirstCity = (offers)=>{
//   return offers[0].city;
// };
export const chooseOffersByCity = (city, offers)=> {
  return offers.slice().filter((offer)=>offer.city.name === city.name);
};
