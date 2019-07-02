import React, { PureComponent } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import IconButton from '../simple/Buttons/IconButton';
import { spacing, colors } from '../../../utils/constants';

const TAB_BAR_OFFSET = -50;

class CustomTabBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
        };
    }

    navigate = (screen) => {
        this.props.navigation.navigate(screen)
    }

    componentWillReceiveProps(props) {
        const oldState = this.props.navigation.state;

        // skip animating if not on home screen
        if (oldState.index !== 0) {
            return;
        }
        const oldRoute = oldState.routes[oldState.index];
        const oldRouteRoute = oldRoute.routes[oldRoute.index]
        const oldParams = oldRouteRoute.params;
        const wasVisible = !oldParams || oldParams.visible;
    
        const newState = props.navigation.state;
        
        if (newState.index !== 0) {
            return;
        }
        const newRoute = newState.routes[newState.index];
        const newRouteRoute = newRoute.routes[newRoute.index]
        const newParams = newRouteRoute.params;
        const isVisible = !newParams || newParams.visible;
        
        if (wasVisible && !isVisible) {
            Animated.timing(this.state.offset, { toValue: TAB_BAR_OFFSET, duration: 300 }).start();
        } else if (isVisible && !wasVisible) {
            Animated.timing(this.state.offset, { toValue: 0, duration: 300 }).start();
        }
    }

    getIcon = (screen) => {
        switch(screen) {
            case 'Home':
                return 'home';
            case 'ProductFeed':
                return 'search';
            case 'MyWishList':
                return 'heart';
            default:
                return 'home';
        }
    }

    render() {
        return (
            <Animated.View 
                style={[styles.container, { bottom: this.state.offset}]}
            >
                {
                    this.props.navigation.state.routes.map((route, i) => (
                        <View style={styles.tab} key={route.routeName}>
                            <IconButton
                                iconName={this.getIcon(route.routeName)}
                                iconSize={20}//{this.props.navigation.state.index === i ? 25 : 20}
                                iconColor={this.props.navigation.state.index === i ? colors.default : colors.semiGray}
                                containerStyle={this.props.navigation.state.index === i ?
                                    [styles.unselectedTab, styles.selectedTab] :
                                    styles.unselectedTab
                                }
                                onPress={() => this.navigate(route.routeName)}
                            />
                        </View>
                    ))
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        height: 50,
        padding: spacing.small,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderColor: colors.lightGray
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unselectedTab: {
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 40
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderColor: colors.default
    }
});

export default CustomTabBar;