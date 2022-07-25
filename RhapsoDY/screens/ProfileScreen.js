import * as React from 'react';
import { Button, View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import { auth, db, storage } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { ref as ref_storage, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';
import fetchImages from './DisplayListing';


export default function ProfileScreen({ navigation }) {
    const currentUserRef = ref(db, 'users/');
    userDisplayName = [];
    userBio = [];
    userEmail = [];
    const currentUserUid = auth.currentUser.uid;

    onValue(currentUserRef, (snapshot) => {
        const DisplayName = snapshot.child(currentUserUid).child("displayName").val()
        const Bio = snapshot.child(currentUserUid).child("bio").val()
        const Email = snapshot.child(currentUserUid).child("email").val()
        userDisplayName.push(DisplayName)
        userBio.push(Bio)
        userEmail.push(Email)
        console.log(userDisplayName)
    })

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'honeydew'}}>
        <Text style={styles.displayNameText}>
            Display Name: {userDisplayName}
        </Text>
        <Text style={styles.bioText}>
            User Bio: {userBio}
        </Text>
        <Text style={styles.emailText}>
            {userEmail}
        </Text>
        <Button 
        title="Update Profile"
        onPress={() => navigation.navigate('Update Profile')}
        />
        <Button 
        title="Your Listings"
        onPress={() => {navigation.navigate('Your Listings')}}/>
    </View>
  );
}

const styles = StyleSheet.create({
    displayNameText: {
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
      width: "70%",
    },

    bioText: {
        marginTop:10, 
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        width: "70%",
    },

    emailText: {
        marginTop:10, 
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        width: "70%",
    },
});