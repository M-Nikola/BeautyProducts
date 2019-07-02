import {
    GET_PRODUCTS,
    GET_PRODUCT_DETAILS,
    GET_NEXT_PRODUCTS,
    GET_PRODUCT_BLOGS,
    CLEAR_PRODUCTS,
    CLEAR_PRODUCT_DETAILS
} from '../types';
import axios from 'axios';

export function getProducts(category, sortby, tags, search, skip) {
    const data = {
        'section' : 'Skin Care',
    };

    if (category) {
        data['categories'] = [category];
    }

    if (sortby && sortby.key) {
        data['sortby'] = sortby.key;
    }

    if (search && search !== '') {
        data['search'] = search;
    }

    if (skip) {
        data['skip'] = skip;
    }

    console.log('get products')
    console.log(tags)
    if (tags) {
        if (Object.keys(tags).length > 0) {
            data['tags'] = {};
            tags.forEach(tag => {
                if (tag.selectedSubCategories.length > 0) {
                    if (tag.name !== 'Brands' && tag.name !== 'Price') {
                        data['tags'][tag.name] = tag.selectedSubCategories;
                    } else {
                        if (tag.name === 'Brands') {
                            data['brand'] = tag.selectedSubCategories;
                        } else if (tag.name === 'Price') {
                            data['price'] = tag.selectedSubCategories;
                        }
                    }
                }
            });
        }
    }

    console.log(data)
    const result = axios({
        method: 'POST',
        url: 'http://ezenciel.com:5000/search',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data,       
    }).then(response => {
        console.log('success', response, response.data)
        return response.data;
    }).catch(error => {
        console.log(error);
        return null;
    });

    if (skip) {
        return {
            type: GET_NEXT_PRODUCTS,
            payload: result
        }
    }

    return {
        type: GET_PRODUCTS,
        payload: result
    }
}

export function getProductDetails(id) {
    const result = axios(`http://ezenciel.com:5000/product/${id}`)
    .then(response => {
        console.log(response.data)
        return response.data;
    }).catch(error => {
        console.log(error);
        return null;
    });

    return {
        type: GET_PRODUCT_DETAILS,
        payload: result
    }
}

export function getProductBlogs(id) {
    console.log('getProductBlogs')
    const result = axios(`http://ezenciel.com:5000/blogs/${id}`)
    .then(response => {
        console.log(response.data)
        return response.data;
    }).catch(error => {
        console.log(error);
        return null;
    });

    return {
        type: GET_PRODUCT_BLOGS,
        payload: result
    }
}

export function clearProducts() {
    return {
        type: CLEAR_PRODUCTS
    }
}

export function clearProductDetails() {
    return {
        type: CLEAR_PRODUCT_DETAILS
    }
}