import {
    GET_BLOGS,
    GET_NEXT_BLOGS,
    CLEAR_BLOGS
} from '../types';
import axios from 'axios';

export async function getBlogs(category, search, skip) {
    const data = {
        'section' : 'Skin Care',
    };

    if (category) {
        data['categories'] = [category]; 
    }

    if (search && search !== '') {
        data['search'] = search;
    }

    if (skip) {
        data['skip'] = skip;
    }

    console.log(data, 'before await');
    const result = await axios({
        method: 'POST',
        url: 'http://ezenciel.com:5000/blogs',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data,       
    });
    console.log('after await', result)
    // .then(response => {
    //     console.log(response.data)
    //     return response.data;
    // }).catch(error => console.log(error));

    if (skip) {
        console.log('Get NExt BLogs')
        return {
            type: GET_NEXT_BLOGS,
            payload: { result: result.data, category }
            //payload: result
        }
    }

    console.log('Get BLogs')
    return {
        type: GET_BLOGS,
        payload: { result: result.data, category }
        //payload: result
    }
}

export function clearBlogs() {
    return {
        type: CLEAR_BLOGS
    }
}