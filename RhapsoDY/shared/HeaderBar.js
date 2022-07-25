import { signOut } from 'firebase/auth';
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, NativeModules } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
    return (
      <View style={styles.header}>

        <View style={styles.leftContainer}>
          <Text style={[styles.headerText, {textAlign:'left'}]}>RhapsoDY</Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.searchButton}
          onPress={() => { } }>
            <Ionicons name="search-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}
          onPress={() => {navigation.navigate('Profile Overview')} }>
            <Ionicons name="person-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logOutButton}
          onPress={() => signOut(auth).then(() => NativeModules.DevSettings.reload()).catch((error) => {})}
          >
            <Ionicons name="power-outline" size={30} color="white" />
          </TouchableOpacity>

        </View>

      </View>
    )
}

const styles = StyleSheet.create({
  header: {
    height:60,
    width: (Dimensions.get('screen').width),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'darkolivegreen',

  },

  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'darkolivegreen'
  },

  headerText: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
    color: 'white',
  },

  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  searchButton: {
    height: 60,
    backgroundColor: 'darkolivegreen',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  profileButton: {
    marginRight: 20,
    height: 60,
    backgroundColor: 'darkolivegreen',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logOutButton: {
    height: 60,
    backgroundColor: 'darkolivegreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

