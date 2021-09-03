import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS
} from "../constants/orderConstants";

import axios from "axios";

export const createOrder = order => async (dispatch, getState) => {
  try {
    //Let's dispatching the state
    dispatch({
      type: ORDER_CREATE_REQUEST
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
    const { data } = await axios.post(`/api/orders`, order, config);
    console.log(data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });
    localStorage.removeItem( 'order' )

    dispatch( {
      type: ORDER_CREATE_RESET,
      payload: data
    } )

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }

};

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    //Let's dispatching the state
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });

    //That gives us access to login object
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    console.log(data);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      //Let's dispatching the state
      dispatch({
        type: ORDER_PAY_REQUEST
      });

      //That gives us access to login object containing user informations
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      console.log(data);

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
export const deliverOrder =
  ( order ) => async ( dispatch, getState ) => {
    try {
      //Let's dispatching the state
      dispatch( {
        type: ORDER_DELIVER_REQUEST
      } );

      //That gives us access to login object containing user informations
      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`, {}, config );
      console.log( data );

      dispatch( {
        type: ORDER_DELIVER_SUCCESS,
        payload: data
      } );
    } catch ( error ) {
      dispatch( {
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      } );
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    //Let's dispatch the state
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    });

    //That gives us access to login object containing user informations
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);
    //console.log(data);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const listOrders = () => async (dispatch, getState) => {
  try {
    //Let's dispatch the state
    dispatch({
      type: ORDER_LIST_REQUEST
    });

    //That gives us access to login object containing user informations
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get(`/api/orders`, config);
    console.log(data);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

