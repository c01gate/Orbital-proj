import * as React from 'react';
import { Button, View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersList from './UsersList';
import { RetrieveDatabaseMessage } from './RetrieveDatabaseMessages';
import { auth } from '../../firebase';

const Stack = createNativeStackNavigator();
const DATA = UsersList();

export default function DMContacts({ navigation }) {
  console.log("List",DATA);
    return (
      <View style={{ backgroundColor:'honeydew', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
            keyExtractor={(item) => item.uuid}
            data={DATA}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.contacts} //IDEAL STATE - When Contact is clicked it brings to the specific conversation
                    onPress={() => navigation.navigate('DMConversations', {DisplayName: item.displayName, receiver: item.uuid})}>
                    <Text style={styles.item}>{item.displayName}</Text>
                </TouchableOpacity>
            )}
        />
        <Button title="Go to Direct Message Home" onPress={() => navigation.navigate('DirectMessageHome')} />
      </View>
    );
  }

const styles = StyleSheet.create({
    item: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 24,
        padding: 10,
        backgroundColor: 'transparent',
        fontSize: 24,
        borderRadius: 25,
        borderWidth: 1
    },
});