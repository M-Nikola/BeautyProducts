import React, { Component } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Animated, PanResponder, ActivityIndicator, Dimensions } from 'react-native';

import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import MenuOption from '../../common/complex/Popups/MenuOption';
import { colors, spacing, categories, tags, sortOptions } from '../../../utils/constants';

import { connect } from 'react-redux';
import { addToWishList, removeFromWishList } from '../../../store/actions/user_actions';
import { getProducts, getProductDetails, clearProducts, clearProductDetails } from '../../../store/actions/products_actions';
import { bindActionCreators } from 'redux';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ProductFeedScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        this.state = {
            search: '',
            category: categories[0],
            filters: [],
            sortBy: sortOptions[0],
            offsetAnim,
            scrollAnim,  
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    offsetAnim,
                ),
                0,
                111,
            ),
        };

        this.panResponder = PanResponder.create({
            //onStartShouldSetPanResponder: (evt, gestureState) => true,
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

    componentDidMount() {
        this.navListener = this.props.navigation.addListener('willFocus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor(colors.white);    
        });
    }

    componentWillMount() {
        this.props.getProducts(this.state.category, this.state.sortBy);
    }

    componentWillUnmount() {
        this.navListener.remove();
    }    

    searchTextChanged = (search) => {
        this.setState({
            search,
        }, () => this.props.getProducts(this.state.category, this.state.sortBy, this.state.filters, search));
    }   

    selectedCategoryChanged = (category) => {
        this.setState({
            category,
        }, () => {
            this.state.scrollAnim.setValue(0);
            this.props.clearProducts();
            this.props.getProducts(category, this.state.sortBy, this.state.filters, this.state.search)
        });
    }

    sortProducts = (sortBy) => {
        this.setState({
            sortBy,
        }, () => this.props.getProducts(this.state.category, sortBy, this.state.filters, this.state.search));
    }

    openFiltersModal = () => {
        this.filters.setModalVisible(true);
    }

    isProductLiked = (id) => this.props.User.myWishListProducts.filter(item => item._id === id).length !== 0;

    onProductLike = (product) => {
        if (this.isProductLiked(product._id)) {
           this.props.removeFromWishList(product._id);
        } else {
            this.props.addToWishList(product);
        }
    }

    onProductClicked = (product) => {
        this.props.clearProductDetails();
        this.props.getProductDetails(product._id);
        this.props.navigation.push('ProductDetails');
    }

    removeFilter = (subCategory, index) => {
        const filters = this.state.filters;
        filters[index].selectedSubCategories = filters[index].selectedSubCategories.filter(item => item !== subCategory);
        this.setState({
            filters,
        }, () => this.props.getProducts(this.state.category, this.state.sortBy, filters, this.state.search));
    }

    applyFilters = (filters, sortBy) => {
        this.setState({
            filters,
            sortBy,
        }, () => this.props.getProducts(this.state.category, sortBy, filters, this.state.search));
    }

    resetFilters = () => {
        this.setState({
            filters: [],
            sortBy: sortOptions[0],
        }, () => this.props.getProducts(this.state.category, this.state.sortBy, null, this.state.search));
    }

    handleLoadMore = () => {
        const products = this.props.Products.products;
        if (products.length >= 30) {
            this.props.getProducts(this.state.category, this.state.sortBy, this.state.filters, this.state.search, products.length);
        }
    }

    render() {
        const { clampedScroll } = this.state;
        const headerTranslate = clampedScroll.interpolate({
            inputRange: [0, 111], // 76 both
            outputRange: [0, -111],
            extrapolate: 'clamp',
        });

        const searchCategoriesTranslate = clampedScroll.interpolate({
            inputRange: [75, 111], // 40,76
            outputRange: [0, 36], //36
            extrapolate: 'clamp'
        });

        let currentSortOptions = sortOptions;
        if (this.state.search === '') {
            currentSortOptions = currentSortOptions.filter(option => option.key !== 'relevance');
        }

        return (
            <View  style={styles.container}>
                {
                    this.props.Products.products ? 
                        <View
                            style={styles.container}
                            {...this.panResponder.panHandlers}
                        >
                            <AnimatedFlatList
                                contentContainerStyle={styles.sectionListContainer}
                                scrollEventThrottle={1}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim }}}],
                                    { useNativeDriver: true}
                                )}
                                data={this.props.Products.products}
                                renderItem={({item, index}) =>                
                                    <ProductCard
                                        product={item}
                                        liked={this.props.User.myWishListProducts.filter(product => product._id === item._id).length !== 0}
                                        onProductLike={() => this.onProductLike(item)}
                                        onProductClicked={this.onProductClicked}
                                    />
                                }
                                ItemSeparatorComponent={() => <View style={styles.itemSeparatorComponent}/>}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={this.handleLoadMore}
                                onEndThreshold={0}
                            />
                        </View> :
                        <ActivityIndicator
                            style={{top: Dimensions.get('screen').height / 2 - 18}}
                            size="large"
                            color={colors.black}
                        />
                }

                <Header
                    ref={ref => this.header = ref}
                    categories={categories}
                    search={this.state.search}
                    searchTextChanged={this.searchTextChanged}
                    sortBy={this.state.sortBy}
                    filters={this.state.filters}
                    headerTranslate={headerTranslate}
                    searchCategoriesTranslate={searchCategoriesTranslate}
                    selectedCategoryChanged={this.selectedCategoryChanged}
                    openFiltersModal={this.openFiltersModal}
                    menuOption={() => this.menuOption.toggle()}
                    removeFilter={this.removeFilter}
                />

                <MenuOption 
                    ref={ref => this.menuOption = ref}
                    data={currentSortOptions}
                    headerTranslate={headerTranslate}
                    onItemPressed={this.sortProducts}
                />

                <Filters
                    ref={ref => this.filters = ref}
                    sortOptions={currentSortOptions}
                    filters={tags[this.state.category]}
                    sortBy={this.state.sortBy}
                    previousFilters={this.state.filters}
                    applyFilters={this.applyFilters}
                    resetFilters={this.resetFilters}
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
        paddingTop: 194,//165,
        paddingBottom: 50 
    },
    itemSeparatorComponent: {
        height: spacing.small, 
        backgroundColor: colors.lightGray
    }
});

function mapStateToProps(state) {
    return {
        User: state.User,
        Products: state.Products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToWishList, 
        removeFromWishList,
        getProducts,
        getProductDetails,
        clearProducts,
        clearProductDetails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFeedScreen);
