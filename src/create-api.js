
import axios from 'axios';
import {ActionCreator} from './reducer/reducer.js';
import {useHistory} from "react-router-dom";
// import {Route, Redirect} from "react-router-dom";
// import React from "react";
const createAPI = (dispatch) => {
  const history = useHistory();
  const configureAPI = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response)=>response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.reset());
      // dispatch(ActionCreator.requireAutorization());
    }
    if (err.response.status === 400) {
      dispatch(ActionCreator.loadUserData(null));
    }
    if (err.response.status === 401) {
      history.push(`/sign_in`);
    }
    return err;
  };
  configureAPI.interceptors.response.use(onSuccess, onFail);
  return configureAPI;
};
export default createAPI;
