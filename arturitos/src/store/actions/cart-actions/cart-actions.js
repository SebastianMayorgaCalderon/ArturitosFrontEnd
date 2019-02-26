export const actionTypes = {
	ADD_PRODUCT_TO_ORDER: 'cart/ADD_PRODUCT_TO_ORDER',
	REMOVE_PRODUCT_FROM_ORDER: 'cart/REMOVE_PRODUCT_FROM ORDER',
	FETCH_ALL_USER_ORDERS: 'cart/FETCH_ALL_USER_ORDERS',
	FETCH_ALL_USER_ORDERS_SUCCESS: 'cart/FETCH_ALL_USER_ORDERS_SUCCESS',
	FETCH_ALL_USER_ORDERS_ERROR: 'CART/FETCH_ALL_USER_ORDERS_ERROR',
}

export const addProductToOrder = product => dispatch => {
	dispatch({ type: actionTypes.ADD_PRODUCT_TO_ORDER, payload: product })
}
export const removeProductFromOrder = id => dispatch => {
	dispatch({ type: actionTypes.REMOVE_PRODUCT_FROM_ORDER, payload: id })
}
