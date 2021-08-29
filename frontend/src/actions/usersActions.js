import {
<<<<<<< HEAD
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS, 
    USER_DETAILS_FAIL ,
    USER_UPDATE_PROFILE_REQUEST, 
    USER_UPDATE_PROFILE_SUCCESS, 
    USER_UPDATE_PROFILE_FAIL ,
    USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants'
=======
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import axios from "axios";
>>>>>>> main

/*
 *LOGIN
 */
export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.post(
      "api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

/*
 * REGISTER
 */
export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.post(
      "api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

/*
 * DETAILS
 */
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    //That gives us access to login object
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    console.log(data);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_UPDATE_PROFILE_RESET,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

/*
 * UPDATE USER PROFILE
 */
export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    //That gives us access to login object
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

/*
 * GET ALL USERS
 */

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Non autorisé") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message
    });
  }
};

/*
 * DELETE USER
 */

export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    });
    //Let's access user info
    const {
      userLogin: { userInfo }
    } = getState();

<<<<<<< HEAD
/*
* UPDATE PROFILE
*/
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST,
        })

        //That gives us access to login object
        const {userLogin:{ userInfo}} = getState()

        const config ={
            headers:{
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile`, user, config)
        console.log(data)

        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        // dispatch({
        //     type:USER_UPDATE_PROFILE_RESET,
        //     payload: data
        // })
    }catch(error){
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
            :error.message,
        })
    }
}
=======
    //Let's pass the token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
>>>>>>> main

    /*To fetch the data in the backend we will make a delete request to the api
      users and pass in the id
    */
    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Non autorisé") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message
    });
  }
};
