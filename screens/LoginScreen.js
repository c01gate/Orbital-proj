import { useNavigation } from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { app, auth } from '../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    /*
    Sign user up and log in if they click on register an account
    */
    const handleSignup = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log('Registered in with', user.email)
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigation.navigate("Home")
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    
    /*
    Log in if they click on login to an existing account
    */
    const handleLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log('Logged in with', user.email)
            //const current = auth.currentUser;
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigation.navigate("Home")
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <KeyboardAvoidingView
    style={[styles.container, {backgroundColor: 'white', flex:1}]}
    behavior="padding"
    >
    <View style = {styles.logoContainer}> 
        <Text style = {styles.logoText}>
            RhapsoDY
        </Text>
    </View>

    <View style={styles.inputContainer}>
        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        />
        <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry //hide the input typed out
        />
    </View>

    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Log In to Existing Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={handleSignup}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>Register an Account</Text>
        </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
    )
    }

    export default LoginScreen

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        width: '80%'
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 20,
        fontSize: 18,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        // borderRadius: '15',
        marginTop: 5,
        // overflow: 'hidden'
        borderWidth: 1,
        borderColor: 'black',
    },

    buttonContainer: {
        width: '60%',
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    button: {
        backgroundColor: '#0782F9',
        width: '50%',
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5,
        alignItems: 'center'
    },

    buttonText: {
        backgroundColor: '#0782F9',
        color: 'white',
        fontSize: 15,
        fontWeight: 700,
        fontFamily: 'sans-serif'
    },

    buttonOutline: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#0782F9',
        borderWidth: 2
    },

    buttonOutlineText: {
        fontSize: 15,
        fontWeight: 700,
        fontFamily: 'sans-serif',
        color: '#0782F9'
}
})