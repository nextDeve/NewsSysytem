import axios from 'axios'
import store from '../redux/store'
import {changeLodingState} from '../redux/actions/newsbox'
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.dispatch(changeLodingState(true))
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch(changeLodingState(false))
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });