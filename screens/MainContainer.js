import * as React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import ListingHomeScreen from '../screens/menuBarScreens/ListingHomeScreen.js';
import ForumScreen from '../screens/menuBarScreens/ForumScreen.js';
import DirectMessageScreen from '../screens/menuBarScreens/DirectMessageScreen.js';
import PublishListingScreen from '../screens/menuBarScreens/PublishListingScreen.js';

// Screen Name
const listingHomeName = "Home";
const forumName = "Forum";
const directMessageName = "DM";
const publishListingName = "Publish";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={listingHomeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === listingHomeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === directMessageName) {
              iconName = focused ? 'mail' : 'mail-outline';

            } else if (rn === forumName) {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';

            } else if (rn === publishListingName) {
              iconName = focused ? 'share' : 'share-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'darkolivegreen',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={listingHomeName} component={ListingHomeScreen} />
        <Tab.Screen name={forumName} component={ForumScreen} />
        <Tab.Screen name={directMessageName} component={DirectMessageScreen} />
        <Tab.Screen name={publishListingName} component={PublishListingScreen} />

      </Tab.Navigator>
  );
}

export default MainContainer;
