import 'react-native-gesture-handler';
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux'
// import splashscreen
import Splash from './src/screens/SplashScreen'
// import home
import Profile from './src/screens/Profile'
import SurveyDetail from './src/screens/SurveyDetail'
import Vote from './src/screens/Vote'
import VoteDetail from './src/screens/VoteDetail'
import SignIn from './src/screens/SignIn'
import ScanUser from './src/screens/CheckUser'
import Candidate from './src/screens/Candidate'
import Thanks from './src/screens/Thanks'
// import Survey screens
import Survey from './src/screens/Survey'

const AuthStack = createStackNavigator();
const VoteStack = createStackNavigator();
const SurveyStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SignIn" component={SignIn} />
  </AuthStack.Navigator>
);

const VoteStackScreen = () => (
  <SurveyStack.Navigator headerMode="none">
    <SurveyStack.Screen name="Dashboard" component={Vote} />
    <SurveyStack.Screen name="VoteDetail" component={VoteDetail} />
    <SurveyStack.Screen name="CheckUser" component={ScanUser} />
    <SurveyStack.Screen name="Candidate" component={Candidate} />
    <SurveyStack.Screen name="Thanks" component={Thanks} />
  </SurveyStack.Navigator>
);

const SurveyStackScreen = () => (
  <VoteStack.Navigator headerMode="none">
    <VoteStack.Screen name="Survey" component={Survey} />
    <VoteStack.Screen name="SurveyDetail" component={SurveyDetail} />
    <VoteStack.Screen name="Thanks" component={Thanks} />
  </VoteStack.Navigator>
);

const MyTabs = () => (
  <Tab.Navigator tabBarPosition="top"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Vote') {
          iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
        } else if (route.name === 'Survey') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Vote" component={VoteStackScreen} />
    <Tab.Screen name="Survey" component={SurveyStackScreen} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
)

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => {
  return (
    <RootStack.Navigator>
    {userToken ? (
      <RootStack.Screen
        name="Snapvote"
        component={MyTabs}
        options={{
          animationEnabled: false,
          headerTitleStyle: { alignSelf: 'center', color: '#fff' },
          headerStyle: {backgroundColor: '#0057FF'},
        }}
      />
    ) : (
        <RootStack.Screen
          name="Login"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
            headerShown: false
          }}
        />
      )}
  </RootStack.Navigator>
  )
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    if (this.state.isLoading) {
      return <Splash />;
    }

    const { user } = this.props;
    return (
      <NavigationContainer>
        <RootStackScreen userToken={user.elector_id} />
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
