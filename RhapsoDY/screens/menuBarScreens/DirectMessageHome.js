import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DMContacts from './DMContacts';
import DMConversations from './DMConversations';


export default function DirectMessageHome({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'honeydew', marginBottom: 5 }}>
      <Button 
        title="Go to Contacts"
        onPress={() => navigation.navigate('DMContacts')}
      />
    </View>
  );
}