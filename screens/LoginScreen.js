import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase-config'
import { app } from '../firebase-config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import { signOut } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {

    const [isSignedIn, setisSignedIn] = useState(false)
    const [email, setEmail] = useState('test4@test.com')
    const [password, setPassword] = useState('12345678')


    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // alert(user.uid)
            // alert("Signed in user!")
            navigation.navigate("Home")
            // ...
        } else {
            // alert("No user!")
        }
    });

    // const auth = getAuth(app);

    // onAuthStateChanged(user => {

    //     if (user) {
    //         const uid = user.uid;
    //         navigation.navigate("Home")
    //     }
    // });

    // firebase.auth.onAuthStateChanged(function (user) {
    //     if (user) {
    //         // User is signed in.
    //     }
    // });

    const RegisterUser = ({ auth }) => {
        // const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)

            .then((re) => {
                console.log(re);
            })
            .catch((re) => {
                console.log("fsdfsd", re);
            })
    }

    const LoginUser = () => {
        // const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)

            .then((re) => {
                console.log(re);
                setisSignedIn(true)
            })
            .catch((re) => {
                console.log("fsdfsd", re);
            })
    }
    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                setisSignedIn(false);
            }).catch((error) => {
                console.log(error);
            });
    }

    // const navigation = useNavigation();


    if (isSignedIn === true) {
        console.log("ВОШЕЛ");
        // navigation.navigate("Home")

    }
    // const handleSignUp = () => {
    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(userCredentials => {
    //             const user = userCredentials.user;
    //             console.log('Registered with:', user.email);
    //         })
    //         .catch(error => alert(error.message))
    // }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
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
                    secureTextEntry
                />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={LoginUser}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={RegisterUser}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={signOutUser}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Выйти</Text>
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
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})