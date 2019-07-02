import {
    GET_BLOGS,
    GET_NEXT_BLOGS,
    CLEAR_BLOGS
} from '../types';

const initialState = {
    blogs: {}//null
};

export default function(state = initialState, action) {
    const blogs = state.blogs;
    switch (action.type) {
        case GET_BLOGS:
            console.log('getBLogs reducer', blogs, state.blogs)
            blogs[action.payload.category] = action.payload.result;
            console.log(blogs, 'getblogs');
            return {
                ...state,
                //blogs: action.payload
                blogs
            };
        case GET_NEXT_BLOGS:
            blogs[action.payload.category] = action.payload ? [...blogs[action.payload.category], ...action.payload.result] : blogs[action.payload.category];
            console.log(blogs, 'getNextBlogs');
            return {
                ...state,
                //blogs: action.payload ? [...state.blogs, ...action.payload] : state.blogs
                blogs
            }
        case CLEAR_BLOGS:
            return {
                ...state,
                blogs: {}//null
            }
        default:
            return state;
    }
}