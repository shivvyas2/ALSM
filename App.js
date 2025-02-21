import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Containers
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import LandingScreen from './screens/LandingScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/Main/Add'

//Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { users } from './redux/reducers/users';

//firebase
import firebase from './Firebase';
import { auth } from './Firebase';



const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createNativeStackNavigator();

const globalScreenOptions ={
  headerStyle:{backgroundColor: "#FFF" },
  headerTitleStyle: {color: "#222222"},
  headerTintColor: {color: "#222222"},
  
}

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      loaded: false,
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((users) => {
      if(!users){
        this.setState({
          loggedIn: false,
          loaded : true,
        }) 
      }
      else{
        this.setState({
          loggedIn: true,
          loaded : true,
        })
      }
    })
  }
  render() {
    const {loggedIn, loaded} = this.state

    if(!loaded){
      return(
        <View style = {{flex:1, justifyContent:'center'}} >
        <Text>Loading</Text>
        </View>
      )
      
    }

    if(!loggedIn){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login' screenOptions={globalScreenOptions}>
            <Stack.Screen name="Login" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
    }
        return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={globalScreenOptions}>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Add" component={AddScreen} options={{ headerShown: false }} />
              
  
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );

    }

  
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
