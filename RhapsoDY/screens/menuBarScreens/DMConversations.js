import * as React from 'react';
import { TextInput, View, Text, TouchableOpacity, FlatList, Dimensions, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SendMessage, ReceiveMessage } from "./MessageFunction";
import { auth } from '../../firebase';
import { useState } from 'react';
import { RetrieveDatabaseMessage } from './RetrieveDatabaseMessages';

export default function DMConversations({ route, navigation }) {
  const [text, setText] = useState('');
  const { DisplayName, receiver } = route.params;
  const MessageData = RetrieveDatabaseMessage(auth.currentUser.uid, receiver);
  //console.log(auth.currentUser.uid, receiver); #check instance
  //console.log(MessageData) #check data
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
      inverted
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom: 60 }}
        data={MessageData.reverse()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 , maxWidth: Dimensions.get('window').width, alignSelf: auth.currentUser.uid == item.sendBy ? 'flex-end' : 'flex-start' }}>
            <View style={{ borderRadius: 20, backgroundColor: auth.currentUser.uid == item.sendBy ? '#7fffd4' : '#fdf5e6' }}>
              <Text style= {{ padding: 10, fontSize: 16, fontWeight: 'bold'}}>
                {item.message}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={{ bottom: 0, height: 50, width: '100%', position: 'absolute', flexDirection: 'row' }}>
        {/* <TouchableOpacity 
        style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }} 
        onPress={() => {}}>
            <Ionicons name="camera" size={30} color="black" />
        </TouchableOpacity> */}
        <View style={{ width: '85%', justifyContent: 'center', marginLeft: 5}}>
          <TextInput 
          placeholder='Type to refresh page' 
          placeholderTextColor="grey" 
          onChangeText={newText => setText(newText)} 
          defaultValue={text}
          style={{ height: 40, borderRadius: 10, backgroundColor: '#ccc'}}/>
        </View>
        <TouchableOpacity 
        style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} 
        onPress={() => { SendMessage(auth.currentUser.uid, receiver, text).then(setText('')), ReceiveMessage(auth.currentUser.uid, receiver, text).then(setText(''))}}>
          <Ionicons name="send" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
  }