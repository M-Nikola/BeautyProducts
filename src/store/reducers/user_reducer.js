import {
    REGISTER_USER,
    SIGN_IN_USER,
    LOG_OUT_USER,
    ADD_TO_WISH_LIST,
    REMOVE_FROM_WISH_LIST,
    SET_WISH_LIST_DATA
} from '../types';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    userData: null,
    myWishListProducts: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_USER:
            return {
                ...state, 
                userData: action.payload
            };
        case REGISTER_USER:
            return {
                ...state, 
                userData: action.payload
            };
        case LOG_OUT_USER:
            return {
                ...state,
                userData: action.payload
            }
        case ADD_TO_WISH_LIST:
            AsyncStorage.setItem('whishListData', JSON.stringify([...state.myWishListProducts, action.payload]));
            return {
                ...state,
                myWishListProducts: [...state.myWishListProducts, action.payload]
            }
        case REMOVE_FROM_WISH_LIST:
            return {
                ...state,
                myWishListProducts: state.myWishListProducts.filter((product) => product._id !== action.payload)
            }
        case SET_WISH_LIST_DATA:
            console.log(state.myWishListProducts, action.payload)
            return {
                ...state,
                myWishListProducts: [...state.myWishListProducts, ...action.payload]
            }
        default:
            return state;
    }
}