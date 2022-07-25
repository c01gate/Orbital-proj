import { update, ref } from 'firebase/database';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase';

export default function UpdateProfileScreen({ navigation }) {
  const [displayName, setDisplayNameText] = useState('');
  const [bio, setBText] = useState('');
  
  const updateProfile = (displayName, bio) => {
      update(ref(db, 'users/' + auth.currentUser.uid), {
          displayName: displayName,
          bio: bio,
      });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'honeydew', marginBottom: 5 }}>
        <TextInput 
        style={styles.displayNameInput}
        placeholder='Enter new display name'
        placeholderTextColor="grey"
        height="10%"
        onChangeText={newText => setDisplayNameText(newText)} 
        defaultValue={displayName}
        multiline={true}>
        </TextInput>

        <TextInput 
        style={styles.bioInput}
        placeholder='Enter new user bio'
        placeholderTextColor="grey"
        height="10%"
        onChangeText={newText => setBText(newText)} 
        defaultValue={bio}
        multiline={true}>
        </TextInput>

        <TouchableOpacity style={styles.saveButton}
          onPress={()=>{updateProfile(displayName, bio), navigation.navigate('Home')}}>
            <Text style={styles.buttonText}>
              Save
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  displayNameInput: {
    width: '70%',
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  bioInput: {
    width: '70%',
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonText: {
    width: '70%',
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  }
})