import Axios from "axios";
import { BASE_URL } from "../../../constants";

export const actionTypes = {
	ADD_PRODUCT_TO_ORDER: 'cart/ADD_PRODUCT_TO_ORDER',
	REMOVE_PRODUCT_FROM_ORDER: 'cart/REMOVE_PRODUCT_FROM ORDER',
	FETCH_ALL_USER_ORDERS: 'cart/FETCH_ALL_USER_ORDERS',
	FETCH_ALL_USER_ORDERS_SUCCESS: 'cart/FETCH_ALL_USER_ORDERS_SUCCESS',
        FETCH_ALL_USER_ORDERS_ERROR: 'cart/FETCH_ALL_USER_ORDERS_ERROR',
        MAKE_ORDER:'cart/MAKE_ORDER',
        MAKE_ORDER_SUCCESS: 'cart/MAKE_ORDER_SUCCESS',
        MAKE_ORDER_ERROR:'cart/MAKE_ORDER_ERROR',
        RESET_STATUS: 'cart/RESET_STATUS'
}
const apiUrl = `${BASE_URL}/order`
export const addProductToOrder = product => dispatch => {
	dispatch({ type: actionTypes.ADD_PRODUCT_TO_ORDER, payload: product })
}
export const removeProductFromOrder = id => dispatch => {
	dispatch({ type: actionTypes.REMOVE_PRODUCT_FROM_ORDER, payload: id })
}

export const resetStatus = () => dispatch => {
        dispatch({type: actionTypes.RESET_STATUS})
}

export const makeOrder = ({order, token}) => dispatch => {
        dispatch({type:actionTypes.MAKE_ORDER})
        Axios.post(apiUrl,order,{
                headers:{
                        'Content-Type': 'application/json',
                        token
                }
        }).then(res=>res.data.data).then(data=>dispatch({type:actionTypes.MAKE_ORDER_SUCCESS})).catch(
                err=>dispatch({type:actionTypes.MAKE_ORDER_ERROR})
        )

}
