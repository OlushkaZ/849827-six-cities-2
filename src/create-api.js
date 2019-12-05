
import axios from 'axios';
import {ActionCreator} from './reducer/reducer.js';
const createAPI = (dispatch) => {

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
    if (err.response.status === 401) {
      dispatch(ActionCreator.loadUserData(null));
    }
    return err;
  };
  configureAPI.interceptors.response.use(onSuccess, onFail);
  return configureAPI;
};
export default createAPI;
