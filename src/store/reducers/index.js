import { combineReducers } from 'redux';
import User from './user_reducer';
import Products from './products_reducer';
import Blogs from './blogs_reducer';

const rootReducer = combineReducers({
    User,
    Products,
    Blogs
});

export default rootReducer;