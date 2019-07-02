import React, { Component } from 'react';
import { StyleSheet, View, Animated, Share, StatusBar, ActivityIndicator } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Header } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import Image from '../../common/simple/ProductComponents/Image';
import ProductDetails from './components/ProductDetails';
import TopTabs from './components/TopTabs';

import { connect } from 'react-redux';
import { addToWishList, removeFromWishList } from '../../../store/actions/user_actions';
import { getProductBlogs } from '../../../store/actions/products_actions';
import { bindActionCreators } from 'redux';

import { getRandomColor, isImageExtensionPng } from '../../../utils/functions';
import { colors, fontSize, spacing, strings } from '../../../utils/constants';

class ProductDetailsScreen extends Component {
    static navigationOptions = {
        headerTransparent: true,
    }

    constructor(props) {
        super(props);

        this.state = {
            scrollAnim: new Animated.Value(0),
            backgroundColor: colors.white,
            enableTopTabsScroll: false
        }
    }

    componentDidMount() {
        this.navListener = this.props.navigation.addListener('willFocus', () => {
            StatusBar.setTranslucent(false);
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor(this.state.backgroundColor, false);
        });

        this.state.scrollAnim.addListener(({value}) => this.scrollAnimValue = value);
    }

    componentWillUnmount() {
        this.navListener.remove();
        this.state.scrollAnim.removeAllListeners();
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.Products.productDetails.blogs) {
            const product = newProps.Products.productDetails;
            const backgroundColor = isImageExtensionPng(product.img) ? getRandomColor() : colors.white;
            this.setState({
                backgroundColor
            }, () => StatusBar.setBackgroundColor(backgroundColor));
            this.props.getProductBlogs(product._id);
        }
    }

    onProductLike = (product, liked) => {
        if (liked) {
            this.props.removeFromWishList(product._id);
        } else {
            this.props.addToWishList(product);
        }
    }

    onShare = (product) => {
        // TODO chnage what to share
        Share.share({title: strings.shareTitle, message: strings.shareMessage})
            .then(result => console.log("success", result))
            .catch(error => console.log('error', error))
    }

    shouldRenderTopTabs = (product) => {
        const { blogs, influencers, videos, comments } = product;
        const render = (blogs && blogs.length > 0) || (influencers && influencers.length > 0) ||
        // (videos && videos.length > 0) || 
        (comments && comments.length > 0);
        return  render ? true : false;
    }

    renderTopTabs = (product, shouldRenderTopTabs) => {
        if (shouldRenderTopTabs) {
            return (
                <TopTabs 
                    color={this.state.backgroundColor}
                    product={product}
                    enableScroll={this.state.enableTopTabsScroll}
                />
            )
        }
        return null;
    }

    render() {
        const product = this.props.Products.productDetails;
        if (!product) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator  
                        size="large"
                        color={colors.black}
                    />
                </View>
            )
        }
        const liked = this.props.User.myWishListProducts.filter(item => item._id === product._id).length !== 0;
        const shouldRenderTopTabs = this.shouldRenderTopTabs(product);
        
        const titleOpacity = this.state.scrollAnim.interpolate({
            inputRange: [270, 320],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <ParallaxScrollView
                //scrollEnabled={shouldRenderTopTabs} 
                style={{marginBottom: 50}}
                //nestedScrollEnabled={this.state.enableTopTabsScroll} // true
                contentContainerStyle={{}}
                backgroundColor={this.state.backgroundColor}
                parallaxHeaderHeight={280}
                renderBackground={() => (
                    <View style={[styles.imageContainer, { backgroundColor: this.state.backgroundColor}]}>                                   
                        <Image
                            img={product.img}
                            style={{width: '50%'}}
                        />
                        
                        <LinearGradient 
                            colors={['rgba(255,255,255,0)', 'rgba(16,16,16,0.56)', 'rgba(0,0,0,0.76)']}
                            locations={[0, 0.78, 1]}
                            style={styles.gradient}
                        />
                    </View>
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim }}}]
                )}
                onScrollBeginDrag={({nativeEvent: {layoutMeasurement, contentOffset, contentSize}}) => {
                    const enableTopTabsScroll = layoutMeasurement.height + contentOffset.y >= contentSize.height;
                    if (this.state.enableTopTabsScroll !== enableTopTabsScroll) {
                        this.setState({
                            enableTopTabsScroll
                        });
                    }
                }}
                onMomentumScrollEnd={({nativeEvent: {layoutMeasurement, contentOffset, contentSize}}) => {
                    const enableTopTabsScroll = layoutMeasurement.height + contentOffset.y >= contentSize.height;
                    if (this.state.enableTopTabsScroll !== enableTopTabsScroll) {
                        this.setState({
                            enableTopTabsScroll
                        });
                    }
                }}
                stickyHeaderHeight={Header.HEIGHT}
                renderStickyHeader={() => (
                        <View style={styles.headerContainer}>
                            <Animated.Text 
                                style={[styles.headerTitle, {opacity: titleOpacity}]}
                                numberOfLines={1}
                            >
                                {product.name}
                            </Animated.Text>  
                        </View>
                    )
                }
            >
                <View style={styles.container}>
                    <ProductDetails 
                        product={product}
                        liked={liked}
                        backgroundColor={this.state.backgroundColor}
                        onProductLike={() => this.onProductLike(product, liked)}
                        onShare={() => this.onShare(product)}
                    />

                    {this.renderTopTabs(product, shouldRenderTopTabs)}
                </View>
          </ParallaxScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightGray,
    },
    activityIndicatorContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    imageContainer: {
        height: 280,
        width: '100%',
        alignItems: 'center',
    },
    gradient: {
        position: 'absolute', 
        bottom: 0, 
        width: '100%',  
        height: 80, 
        opacity: 0.35
    },
    headerContainer: {
        width: '100%', 
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingLeft: spacing.extraHuge, 
        paddingRight: spacing.extraBig,
        borderBottomWidth: 1,
        borderColor: colors.lightGray
    },
    headerTitle: {
        fontFamily: 'Open Sans',
        fontSize: fontSize.huge,
        fontWeight: 'bold',
        color: colors.extraDarkGray,
    }
});

function mapStateToProps(state) {
    return {
        User: state.User,
        Products: state.Products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addToWishList, removeFromWishList, getProductBlogs}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen);