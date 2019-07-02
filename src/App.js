import React, { Component } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import { Provider } from 'react-redux';
import ConfigureStore from './store/config';

import CustomTabBar from './components/common/complex/CustomTabBar';
import LoginRegisterScreen from './components/screens/LoginRegisterScreen';
import HomeScreen from './components/screens/HomeScreen';
import ProductFeedScreen from './components/screens/ProductFeedScreen';
import MyWishListScreen from './components/screens/MyWishListScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ProductDetailsScreen from './components/screens/ProductDetailsScreen';
import SplashScreen from './components/screens/SpashScreen';
import { colors } from './utils/constants';

const store = ConfigureStore();

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const ProductFeedStack = createStackNavigator({
  ProductFeed: ProductFeedScreen,
  ProductDetails: ProductDetailsScreen
});

const MyWishListStack = createStackNavigator({
  MyWishList: MyWishListScreen,
  ProductDetails: ProductDetailsScreen
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});


const TabNavigation = createBottomTabNavigator(
  {
    Home: HomeStack,
    ProductFeed: ProductFeedStack,
    MyWishList: MyWishListStack,
    //Profile: ProfileStack
  },
  {
    tabBarComponent: ({navigation}) => <CustomTabBar navigation={navigation} />
  }
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      autoLogIn: true,
    }
  }

  componentWillMount() {
    StatusBar.setBackgroundColor(colors.white);
    StatusBar.setBarStyle('dark-content');
  }

  onLoadFinished = (autoLogIn) => {
    this.setState({
      loading: false,
      autoLogIn
    });
  }

  render() {
    const AppStack = createSwitchNavigator({
      LoginRegister: LoginRegisterScreen,
      Tabs: TabNavigation
    }, {
      initialRouteName: this.state.autoLogIn ? 'Tabs' : 'LoginRegister'
    });
    
    const Navigation = createAppContainer(AppStack);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Provider store={store}>
          {
            this.state.loading ? 
              <SplashScreen
                onLoadFinished={this.onLoadFinished}
              /> :
              <Navigation />
          }
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;