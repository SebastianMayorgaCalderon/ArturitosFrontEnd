/* eslint-disable indent */
/* eslint-disable default-case */
import {
        actionTypes
} from '../actions/user-actions/user-actions'

const initialState = {
        username: null,
        email: null,
        token: null,
        waitingForResponce: false,
        errorMsj: null,
        suceedMessage: null,
        addingCard: false,
        addingCardError: null,
        cards: [],
        userBodies: [],
        userBodiesCantPages: null,
        userBodiesCurrentPage: null,
        size: 5,
        sellingStar: false,
        sellingStarMessaje: null
}
const userReducer = (state = initialState, action) => {
        const { payload, type } = action
        switch (type) {
                case actionTypes.LOG_OUT:
                        return {
                                ...state,
                                username: null,
                                email: null,
                                token: null,
                                waitingForResponce: false,
                                errorMsj: null,
                                suceedMessage: null,
                                addingCard: false,
                                addingCardError: null,
                                cards: [],
                                userBodies: [],
                                userBodiesCantPages: null,
                                userBodiesCurrentPage: null,
                                size: 5,
                                sellingStar: false,
                                sellingStarMessaje: null
                        }
                case actionTypes.LOGIN:
                case actionTypes.SIGN_UP:
                case actionTypes.FETCH_USER_BODIES:
                case actionTypes.FETCH_CARDS:
                        return {
                                ...state,
                                errorMsj: null,
                                waitingForResponce: true,
                        }
                case actionTypes.LOGIN_SUCCESS:
                        return {
                                ...state,
                                waitingForResponce: false,
                                username: payload.username,
                                email: payload.email,
                                token: payload.token,
                                errorMsj: null,
                        }
                case actionTypes.FETCH_USER_BODIES_SUCCESS:
                        return {
                                ...state,
                                waitingForResponce: false,
                                errorMsj: null,
                                userBodies: payload.content,
                                userBodiesCantPages: payload.totalPages,
                                userBodiesCurrentPage: payload.number
                        }
                case actionTypes.FETCH_USER_BODIES_ERROR:
                case actionTypes.LOGIN_FALIED:
                case actionTypes.SIGN_UP_ERROR:
                        return {
                                ...state,
                                waitingForResponce: false,
                                errorMsj: payload,
                        }
                case actionTypes.SIGN_UP_SUCCESS:
                        return {
                                ...state,
                                suceedMessage: 'User Crerated!',
                                waitingForResponce: false,
                                errorMsj: null,
                        }
                case actionTypes.REMOVE_ERROR:
                        return {
                                ...state,
                                errorMsj: null,
                        }
                case actionTypes.REMOVE_SUCCESS_MSJ:
                        return {
                                ...state,
                                suceedMessage: null,
                        }
                case actionTypes.FETCH_CARDS_SUCCESS:
                        return {
                                ...state,
                                waitingForResponce: false,
                                errorMsj: null,
                                cards: payload
                        }
                case actionTypes.RESET:
                        return {
                                ...state,
                                waitingForResponce: false,
                                errorMsj: null,
                                suceedMessage: null,
                                addingCard: false,
                                addingCardError: null
                        }
                case actionTypes.ADD_CARD:
                        return {
                                ...state,
                                addingCard: true
                        }
                case actionTypes.ADD_CARD_SUCCESS:
                        return {
                                ...state,
                                addingCard: false,
                                cards: [...state.cards, payload]
                        }
                case actionTypes.ADD_CARD_ERROR:
                        return {
                                ...state,
                                addingCard: false,
                                addingCardError: 'Error adding card try again later'
                        }
                case actionTypes.REMOVE_CARD:
                        return {
                                ...state,
                                waitingForResponce: true
                        }
                case actionTypes.REMOVE_CARD_SUCCESS:
                        return {
                                ...state,
                                cards: state.cards.filter(c => c.id !== payload.id),
                                waitingForResponce: false
                        }
                case actionTypes.SELL_STAR:
                        return {
                                ...state,
                                sellingStar: true
                        }
                case actionTypes.SELL_STAR_SUCCESS:
                        return {
                                ...state,
                                sellingStar: false,
                                userBodies: state.userBodies.filter(b => b.id !== payload.id)
                        }
                case actionTypes.SELL_STAR_ERROR:
                        return {
                                ...state,
                                sellingStar: false,
                                sellingStarMessaje: 'Error'
                        }
                default:
                        return { ...state }
        }
}

export default userReducer
