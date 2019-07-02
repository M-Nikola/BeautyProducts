import React, { Component } from 'react';
import { StyleSheet, View, Animated, StatusBar, Dimensions } from 'react-native';

import BlogsTabView from './components/BlogsTabView';
import WebViewModal from '../../common/complex/WebView';
import { fontSize, spacing, colors, categories } from '../../../utils/constants';

import { connect } from 'react-redux';
import { getBlogs, clearBlogs } from '../../../store/actions/blogs_actions';
import { bindActionCreators } from 'redux';

const HEADER_HEIGHT = 159;

class HomeScreen extends Component {
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
            page: 1,
            showImages: {},
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
                HEADER_HEIGHT,
            )
        };
    }

    componentWillMount() {
        this.props.getBlogs(this.state.category);
    }

    componentDidMount() {
        this.navListener = this.props.navigation.addListener('willFocus', () => {
            StatusBar.setBackgroundColor(colors.white);
        }); 
    }

    componentWillUnmount() {
        this.navListener.remove();
    }

    searchTextChanged = (search) => {
        this.setState({
            search,
            showImages: {}
        }, () => this.props.getBlogs(this.state.category, search));
    }

    selectedCategoryChanged = (category) => {
        this.setState({
            category,
            showImages: {}
        }, () => {
            if (!this.props.Blogs.blogs[category]) {
                this.props.getBlogs(category, this.state.search);
            }
        });
    }

    handleLoadMore = (category) => {
        const blogs = this.props.Blogs.blogs[category];
        if (blogs.length < this.state.page * 24) {
            return;
        }
        this.setState(prevState => ({
            page: prevState.page + 1
        }));

        this.props.getBlogs(category, this.state.search, blogs.length);
    }

    render() {
        return (
            <View style={styles.container}>
                <BlogsTabView
                    search={this.state.search}
                    navigation={this.props.navigation}
                    searchTextChanged={this.searchTextChanged}
                    selectedCategoryChanged={this.selectedCategoryChanged}
                    handleLoadMore={this.handleLoadMore}
                    openWebView={(uri) => this.webViewModal.showWebView(uri)}
                />

                <WebViewModal 
                    ref={ref => this.webViewModal = ref}
                />  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContainer: {
        backgroundColor: colors.lightGray,
        paddingTop: HEADER_HEIGHT,
    },
    listHeaderContainer: {
        backgroundColor: colors.white,
        padding: spacing.medium,
        paddingLeft: spacing.medium,
    },
    listHeader: {
        fontFamily: 'Roboto',
        fontSize: fontSize.extraHuge, 
        color: colors.darkGray,
        fontWeight: 'bold',
    },
    emptyListContainer: { 
        width: '100%', 
        minHeight: Dimensions.get('screen').height - HEADER_HEIGHT - 20, 
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    horizontalList: {
        alignItems: 'flex-start', 
        paddingLeft: spacing.extraBig, 
        paddingRight: spacing.extraBig
    }
});

function mapStateToProps(state) {
    return {
        Blogs: state.Blogs
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBlogs,
        clearBlogs
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
