import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, StatusBar, PanResponder } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Header from './components/Header';
import ProductCard  from '../ProductFeedScreen/components/ProductCard';
import { colors, categories, spacing, strings } from '../../../utils/constants';

import { connect } from 'react-redux';
import { removeFromWishList, setWishListData } from '../../../store/actions/user_actions';
import { bindActionCreators } from 'redux';

class MyWishListScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        
        this.state = {
            category: 'All'
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            //onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return gestureState.dx != 0 && gestureState.dy != 0;
            },
            onPanResponderEnd: (event, gestureState) => {
                if (Math.abs(gestureState.vx) >= 0.5 || Math.abs(gestureState.dx) >= 50) {
                    this.header.selectNextCategory(gestureState.dx < 0 ? 1 : -1);
                }
            }
        });
    }
    
    componentWillMount() {
        if (this.props.User.myWishListProducts.length === 0) {
            this.getWishListDataFromStorage();
        }
    }

    componentDidMount() {
        this.navListener = this.props.navigation.addListener('willFocus', () => {    
            StatusBar.setTranslucent(false);
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('white');     
        });
    }

    componentWillUnmount() {
        this.navListener.remove();
    }
    
    getWishListDataFromStorage = () => {
        AsyncStorage.getItem('whishListData').then((result) => {
            console.log('whishListData', result)
            if (result) {
                this.props.setWishListData(JSON.parse(result));
            }
        }).catch(error => {
            console.log('whishListData error', error)
        });
    }

    onProductLike = (product) => {
        this.props.removeFromWishList(product._id)
    }

    onProductClicked = (product) => {
        this.props.navigation.push('ProductDetails', {product});
    }

    selectedCategoryChanged = (category) => {
        this.setState({
            category
        });
    }

    render() {
        let myWishListProducts = [];
        if (this.state.category !== 'All') {
            myWishListProducts = this.props.User.myWishListProducts.filter(product => product.categories.includes(this.state.category));
        } else {
            myWishListProducts = this.props.User.myWishListProducts;
        }
        return (
            <View style={styles.container}>
                <View
                    style={styles.container}
                    {...this.panResponder.panHandlers}
                >
                    <FlatList
                        contentContainerStyle={styles.sectionListContainer}
                        data={myWishListProducts}
                        renderItem={({item, index}) =>          
                            <ProductCard
                                product={item}
                                liked={true}
                                onProductLike={() => this.onProductLike(item)}
                                onProductClicked={this.onProductClicked}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent}></View>}
                        ListEmptyComponent={() => (
                            <View style={styles.listEmptyComponentContainer}>
                                <Text style={styles.listEmptyComponentText}>
                                    {strings.noProductsForCategory}
                                </Text>
                            </View>
                        )}
                    />
                </View>        

                <Header
                    ref={ref => this.header = ref}
                    categories={['All', ...categories]}
                    selectedCategoryChanged={this.selectedCategoryChanged}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionListContainer: {
        backgroundColor: colors.lightGray,
        paddingTop: 120
    },
    itemSeparatorComponent: {
        height: spacing.small, 
        backgroundColor: colors.lightGray
    },
    listEmptyComponentContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: colors.white, 
        padding: spacing.medium
    },
    listEmptyComponentText: {
        paddingLeft: spacing.big, 
        paddingRight: spacing.big, 
        textAlign: 'center',
    }
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({removeFromWishList, setWishListData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWishListScreen);
