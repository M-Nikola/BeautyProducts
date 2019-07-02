import {
    GET_PRODUCTS,
    GET_PRODUCT_DETAILS,
    GET_NEXT_PRODUCTS,
    GET_PRODUCT_BLOGS,
    CLEAR_PRODUCTS,
    CLEAR_PRODUCT_DETAILS
} from '../types';

const initialState = {
    products: null,//[],
    productDetails: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case GET_NEXT_PRODUCTS:
            return {
                ...state,
                products: action.payload ? [...state.products, ...action.payload] : state.products
            }
        case GET_PRODUCT_DETAILS: 
            return {
                ...state,
                productDetails: action.payload
            }
        case GET_PRODUCT_BLOGS: 
            return {
                ...state,
                productDetails: {...state.productDetails, blogs: action.payload}
            }
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: null
            }
        case CLEAR_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: null
            }
        default:
            return state;
    }
}