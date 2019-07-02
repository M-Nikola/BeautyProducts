import { getStatusBarHeight } from 'react-native-status-bar-height';
import { NativeModules, Platform } from 'react-native';
import axios from 'axios';

export const fontSize = {
    extraSmall: 9,
    small: 11,
    semiMedium: 12,
    medium: 14,
    big: 16,
    extraBig: 18,
    huge: 19,
    extraHuge: 35
};

export const spacing = {
    extraSmall: 2,
    small: 5,
    medium: 10,
    big: 15,
    extraBig: 20,
    huge: 30,
    extraHuge: 50
};

export const colors = {
    white: '#FFFFFF',
    extraLightGray: '#F8F8F8',
    lighterGray: '#F2F2F2',
    lightGray: '#EFF1F2',
    semiGray: '#D4D4D6',
    followersColor: '#ABA9AB',
    transparentGray: '#9B9B9B48', // 30% transparency
    categoriesLightGray: '#383C41CC', // 80% transparency
    categoriesGray: '#383C41',
    iconGray: '#BCBCBC',
    gray: '#9B9B9B',
    darkGray: '#4A4A4A',
    extraDarkGray: '#393C42',
    red: '#FF2222',
    darkRed: '#D00F02',
    default: '#7C7F82', 
    defaultTransparent: '#7C7F82B3',// 70% transparency
    green: '#157B5B',
    lightBlue: '#1dcaff',
    blue: '#3B5998',
    orange: '#E56751',
    black: '#000000',
    transparentBlack: '#00000080',

    randomColors: ['#F6BCBB', '#D7EBF3', '#D8EAE9', '#B5DAE6', '#D4CADA']
}

const language =  Platform.OS === 'android' ?  
    NativeModules.I18nManager.localeIdentifier.slice(0, 2) :
    NativeModules.SettingsManager.settings.AppleLocale.slice(0, 2);

const allStrings = {
    en: {
        goBack: 'Go Back',
        blogs: 'Blogs',
        media: 'Media',
        influencers: 'Influencers',
        videos: 'Videos',
        comments: 'Comments',
        rank: 'Rank',
        searchFor: 'Search for',
        signIn: 'Sign in',
        signUp: 'Sign up',
        logOut: 'Log Out',
        continue: 'Continue',
        confirmPassword: 'confirm password',
        eMail: 'e-mail',
        password: 'password',
        welcome: 'Welcome',
        logInToContinue: 'Log in to continue',
        notYetRegistered: 'Not yet registered',
        haveAnAccount: 'Have an account',
        noProductsForCategory: 'There are no products from selected category added to wish list!',
        shareTitle: 'This product is awesome',
        shareMessage: 'I love this product. Try it out.',
        cancel: 'Cancel',
        filters: 'Filters',
        reset: 'Reset',
        sortBy: 'Sort by',
        filterBy: 'Filter by',
        applyFilters: 'Apply filters',
        searchByNameBrandConcern: 'Search by name, brand or even concern',
        errorLoadingApplication: 'Failed to load application!',
        invalidEmailFormat: 'Email format is not valid!',
        passwordMinLength: 'Minimum length of password must be',
        passwordMaxLength: 'Maximum length of password must be',
        invalidConfirmPassword: `Passwords doesn't match!`,

        seconds: 'seconds ago',
        second: 'second ago',
        minutes: 'minutes ago',
        minute: 'minute ago',
        hours: 'hours ago',
        hour: 'hour ago',
        days: 'days ago',
        day: 'day ago',
        weeks: 'weeks ago',
        week: 'week ago',
        months: 'months ago',
        month: 'month ago',
        years: 'years ago',
        year: 'year ago'
    }
};

export const strings = allStrings[language] ? allStrings[language] : allStrings['en'];

export const statusBarHeight = getStatusBarHeight();
export const logoSize = 20;

export let categories = [];
export let tags = [];
export let brands = [];
export let sortOptions = [];

export const getInitalDataFromApi = () => {
    console.log('getInitalDataFromApi')

    const getCategories = axios('http://ezenciel.com:5000/categories');
    const getTags = axios('http://ezenciel.com:5000/tags');
    const getSortBy = axios('http://ezenciel.com:5000/sortby');
    const getBrands = axios('http://ezenciel.com:5000/brands');

    const result = Promise.all([getCategories, getTags, getSortBy, getBrands])
    .then(responses => {
        console.log("initial data return from api", responses)
        //const response  = Promise.all([responses[0].json(), responses[1].json(), responses[2].json()])
        // .then(jsonResponses => {
        //     console.log(jsonResponses)
        //     categories = jsonResponses[0]['Skin Care'];
        //     tags = jsonResponses[1]['Skin Care'];
        //     sortOptions = jsonResponses[2].sortby;
        //     return { categories, tags, sortOptions };
        // })
        // .catch(error => {
        //     console.log('error')
        //     return { error };
        // })

        categories = responses[0].data['Skin Care'];
        tags = responses[1].data['Skin Care'];
        sortOptions = responses[2].data.sortby;
        const brands = responses[3].data['Skin Care'];
        for (const category in brands) {
            console.log(category, brands[category]);
            tags[category]['Brands'] = brands[category];
            tags[category]['Price'] = ['$', '$$', '$$$', '$$$$'];
        }
        console.log(tags)
        return { categories, tags, sortOptions };
    })
    .catch(error => {
        console.log(error);
        return { error };
    });

    return result;
}

export const setInitialData = (data) => {
    console.log("setInitialData consts", data)
    categories = data.categories;
    tags = data.tags;
    sortOptions = data.sortOptions;
}