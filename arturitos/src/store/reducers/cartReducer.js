/* eslint-disable prettier/prettier */
import { actionTypes } from '../actions/cart-actions/cart-actions'

const initialState = {
  userOrderHistory: [],
  currentOrderProducts: []
}

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.ADD_PRODUCT_TO_ORDER:
      return {
        ...state,
        currentOrderProducts: [...state.currentOrderProducts, payload],
      }
    case actionTypes.REMOVE_PRODUCT_FROM_ORDER:
      return {
        ...state,
        currentOrderProducts: state.currentOrderProducts.filter(product => product.id !== payload)
      }
    default:
      return {
        ...state
      }
  }
}

export default cartReducer;
