/* eslint-disable prettier/prettier */
import { actionTypes } from '../actions/cart-actions/cart-actions'

const initialState = {
        userOrderHistory: [],
        currentOrderProducts: [],
        waitingForResponce: false,
        errorMsj: null,
        success: false
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
                case actionTypes.MAKE_ORDER:
                        return {
                                ...state,
                                waitingForResponce: true
                        }
                case actionTypes.MAKE_ORDER_SUCCESS:
                        return {
                                ...state,
                                waitingForResponce: false,
                                errorMsj: null,
                                success: true,
                                currentOrderProducts: []
                        }
                case actionTypes.MAKE_ORDER_ERROR:
                        return {
                                ...state,
                                waitingForResponce: false,
                                success: false,
                                errorMsj: true
                        }
                case actionTypes.RESET_STATUS:
                        return {
                                ...state,
                                waitingForResponce: false,
                                success: false,
                                errorMsj: false
                        }
                default:
                        return {
                                ...state
                        }
        }
}

export default cartReducer;
