import {
    REGISTER_USER,
    SIGN_IN_USER,
    LOG_OUT_USER,
    ADD_TO_WISH_LIST,
    REMOVE_FROM_WISH_LIST,
    SET_WISH_LIST_DATA
} from '../types';
import firebase from 'react-native-firebase';

export function signIn(data){
    const request = firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(response => {
            console.log(response)
            return {
                email: data.email,
                password: data.password,
                uid: response.user.uid
            };
        })
        .catch(error => {
            return {
                error: error.message
            };
        })

    return {
        type: SIGN_IN_USER,
        payload: request
    }
}

export function register(data){
    const request = firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(response => {
            return {
                email: data.email,
                password: data.password,
                uid: response.user.uid
            };
        })
        .catch(error => {
            return {
                error: error.message
            };
        });

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function logOut() {
    const request = firebase.auth().signOut().then(() => {
        return null;
    });

    return {
        type: LOG_OUT_USER,
        payload: request
    }
}

export function addToWishList(product) {
    return {
        type: ADD_TO_WISH_LIST,
        payload: product
    }
}

export function removeFromWishList(id) {
    return {
        type: REMOVE_FROM_WISH_LIST,
        payload: id
    }
}

export function setWishListData(wishListData) {
    console.log('setWishListData', wishListData)
    return {
        type: SET_WISH_LIST_DATA,
        payload: wishListData
    }
}