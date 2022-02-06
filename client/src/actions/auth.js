import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const signin = (formData , navigate ) => async (dispatch) => {
  try {

    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate('/');

  } catch (error) {
   alert ( "Authhentication error Check your credentials and try again" ) ;
    console.log(error.message);
  }
};

export const signup = (formData , navigate ) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate('/');

  } catch (error) {
   alert ( "AUTHENTICATION EROR" ) ;
    console.log(error.message);
  }
};
