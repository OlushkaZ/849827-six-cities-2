
// import Offers from '../mocks/offers.js';
import createAPI from '../create-api';
import {chooseOffersByCity} from '../utils.js';


const initialState = {
  currentCity: ``,
  currentOffer: 0,
  // currentOffers: [],
  offers: [],
  comments: [],
  isLoading: false,
  closestPoints: [],
  sortType: `Popular`,
  userData: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_CURRENT_OFFER: `CHANGE_CURRENT_OFFER`,
  GET_OFFERS: `GET_OFFERS`,
  RESET: `RESET`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  IS_LOADING: `IS_LOADING`,
  GET_CLOSEST: `GET_CLOSEST`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  LOAD_USER_DATA: `LOAD_USER_DATA`,
};

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case ActionType.CHANGE_CITY: return Object.assign(
        {}, state, {currentCity: action.payload}
    );
    case ActionType.CHANGE_CURRENT_OFFER: return Object.assign(
        {}, state, {currentOffer: action.payload}
    );
    case ActionType.GET_OFFERS: return Object.assign(
        {}, state, {currentOffers: action.payload}
    );
    case ActionType.RESET: return Object.assign(
        {}, initialState
    );
    case ActionType.LOAD_OFFERS: return Object.assign(
        {}, state, {offers: action.payload}
    );
    case ActionType.LOAD_COMMENTS: return Object.assign(
        {}, state, {comments: action.payload}
    );
    case ActionType.IS_LOADING: return Object.assign(
        {}, state, {isLoading: action.payload}
    );
    case ActionType.GET_CLOSEST: return Object.assign(
        {}, state, {closestPoints: action.payload}
    );
    case ActionType.CHANGE_SORT_TYPE: return Object.assign(
        {}, state, {sortType: action.payload}
    );
    case ActionType.LOAD_USER_DATA: return Object.assign(
        {}, state, {userData: action.payload}
    );
  }
  return state;
};


const ActionCreator = {
  changeCity: (city)=>({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  changeCurrentOffer: (offerID)=>({
    type: ActionType.CHANGE_CURRENT_OFFER,
    payload: offerID
  }),
  getOffers: (offers)=>({
    type: ActionType.GET_OFFERS,
    payload: offers
  }),
  reset: ()=>({
    type: ActionType.RESET
  }),
  loadOffers: (offers)=>({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  loadComments: (comments)=>({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),
  isLoading: (i)=>({
    type: ActionType.IS_LOADING,
    payload: i
  }),
  getClosest: (closestPoints)=>({
    type: ActionType.GET_CLOSEST,
    payload: closestPoints
  }),
  changeSortType: (sortType)=>({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType
  }),
  loadUserData: (userData)=>({
    type: ActionType.LOAD_USER_DATA,
    payload: userData
  }),
};

const Operation = {
  loadOffers: () => (dispatch) => {
    return createAPI(dispatch).get(`/hotels`)
    .then((response)=>adapteOffers(response.data))
    .then((offers)=>{
      dispatch(ActionCreator.loadOffers(offers));
      const city = offers[0].city.name;
      dispatch(ActionCreator.changeCity(city));
      dispatch(ActionCreator.getOffers(chooseOffersByCity(city, offers)));
      dispatch(ActionCreator.isLoading(true));
    });
  },
  loadComments: (id) => (dispatch) => {
    return createAPI(dispatch).get(`/comments/${id}`)
    .then((response)=>adapteComments(response.data))
    .then((comments)=>{
      dispatch(ActionCreator.loadComments(comments));
    });
  },
  login: (loginData) => (dispatch) => {
    return createAPI(dispatch).post(`/login`, loginData)
    .then((response)=>dispatch(ActionCreator.loadUserData(adapteUserData(response.data))));
  },
  putComment: (hotelID, comment) => (dispatch) => {
    return createAPI(dispatch).post(`/comments/${hotelID}`, comment)
    .then((response)=>adapteComments(response.data))
    .then((comments)=>{
      dispatch(ActionCreator.loadComments(comments));
    });
  },
};

const adapteUserData = (userData)=>{
  return ({
    id: userData.id,
    email: userData.email,
    name: userData.name,
    avatarUrl: userData.avatar_url,
    isPro: userData.is_pro,
  });
};
const adapteComments = (comments)=>{
  return comments.map((comment)=>({
    id: comment.id,
    user: {
      id: comment.user.id,
      isPro: comment.user.is_pro,
      name: comment.user.name,
      avatarUrl: comment.user.avatar_url,
    },
    rating: comment.rating,
    comment: comment.comment,
    date: comment.date,
  }));
};

const adapteOffers = (offers)=>{
  return offers.map((offer)=>({
    bedrooms: offer.bedrooms,
    city: {
      name: offer.city.name,
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom,
      }
    },
    description: offer.description,
    goods: [...offer.goods],
    host: {
      avatarUrl: offer.host.avatar_url,
      id: offer.host.id,
      isPro: offer.host.is_pro,
      name: offer.host.name,
    },
    id: offer.id,
    images: [...offer.images],
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
    },
    maxAdults: offer.max_adults,
    previewImage: offer.preview_image,
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    type: offer.type,
  }));
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
