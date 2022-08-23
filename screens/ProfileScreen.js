import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, Form, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert, TextInput } from 'react-native'
import { signOut } from "firebase/auth";
import { auth } from '../firebase-config'
import axios from 'axios'
import { app } from '../firebase-config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { UID_LIST } from "../src/UIDS/UIDS";



const ProfileScreen = ({ navigation, onSubmit }) => {

    const signOutUser = () => {
        signOut(auth)
            .then(() => {

                navigation.navigate("LoginScreen")
                setisSignedIn(false);
            }).catch((error) => {
                console.log(error);
            });
    }

    const [result, setResult] = useState()
    const [changeApiRicKeyValue, setChangeApiRicKeyValue] = useState()
    const [changeApiTelegramKeyValue, setChangeApiTelegramKeyValue] = useState()

    console.log('nen ', changeApiRicKeyValue)

    const presss = async (title) => {

        console.log(changeApiRicKeyValue)

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                console.log(user.uid)
                console.log('fjkhfdlaskhkdjhakls', user.uid)
            } else {
            }
        });

        const obj = { title: result };
        const myJSON = JSON.stringify(obj);
        const response = await fetch(
            'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ title })
                body: myJSON,
            }
        )
        const data = await response.json()
        console.log('DATATA: ', data)




        // const obj = { title: result };
        // const myJSON = JSON.stringify(obj);
        // const response = await fetch(
        //     'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        //     {
        //         method: 'GET',
        //         // headers: { 'Content-Type': 'application/json' },
        //         // body: JSON.stringify({ title })
        //     }
        // )
        // const data = await response.json()
        // console.log('Кол-во объектов: ' + data.length)

        // console.log('DATATA: ', data)
        // const todosss = Object.keys(data).map(key => ({ ...data[key], id: key }))
        // console.log('DATATA: ', todosss[2].id)




        // const obj = { title: result };
        // const myJSON = JSON.stringify(obj);
        // const response = await fetch(
        //     'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        //     {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         // body: JSON.stringify({ title })
        //         body: myJSON,
        //     }
        // )
        // const data = await response.json()
        // console.log('DATATA: ', data)
    }


    // const presss221 = async (title) => {

    //     const obj = { title: changeApiRicKeyValue };
    //     const myJSON = JSON.stringify(obj);
    //     const response = await fetch(
    //         'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
    //         {
    //             method: 'GET',
    //             // headers: { 'Content-Type': 'application/json' },
    //             // body: JSON.stringify({ title })
    //         }
    //     )
    //     const data = await response.json()
    //     console.log('Кол-во объектов: ' + data.length)

    //     console.log('DATATA: ', data)
    //     const todosss = Object.keys(data).map(key => ({ ...data[key], id: key }))
    //     console.log('DATATA: ', todosss[1].id)
    //     let qweqwe = todosss[1].id;
    //     console.log('Кол-во объектов: ' + qweqwe)

    // }


    const changeApiRicKey = async (title) => {
        const obj = { title: changeApiRicKeyValue };
        const myJSON = JSON.stringify(obj);
        const response = await fetch(
            'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            {
                method: 'GET',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ title })
            }
        )
        const data = await response.json()
        console.log('Кол-во объектов: ' + data.length)
        console.log('DATATA: ', data)
        const todosss = Object.keys(data).map(key => ({ ...data[key], id: key }))
        console.log('DATATA: ', todosss[0].id)
        let qweqwe = todosss[0].id;
        console.log('Кол-во объектов: ' + qweqwe)
        console.log('ПРОВЕРКА РЕЗУЛТА: ' + changeApiRicKeyValue)
        const obj2 = { title: changeApiRicKeyValue };
        const myJSON2 = JSON.stringify(obj);
        fetch(
            `https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos/${qweqwe}.json`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ result })
                body: myJSON2
            }
        )
    }

    const changeApiTelegramKey = async (title) => {
        const obj = { title: changeApiTelegramKeyValue };
        const myJSON = JSON.stringify(obj);
        const response = await fetch(
            'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            {
                method: 'GET',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ title })
            }
        )
        const data = await response.json()
        console.log('Кол-во объектов: ' + data.length)
        console.log('DATATA: ', data)
        const todosss = Object.keys(data).map(key => ({ ...data[key], id: key }))
        console.log('DATATA: ', todosss[1].id)
        let qweqwe = todosss[1].id;
        console.log('Кол-во объектов: ' + qweqwe)
        console.log('ПРОВЕРКА РЕЗУЛТА: ' + changeApiTelegramKeyValue)
        const obj2 = { title: changeApiTelegramKeyValue };
        const myJSON2 = JSON.stringify(obj);
        fetch(
            `https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos/${qweqwe}.json`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ result })
                body: myJSON2
            }
        )
    }

    let GOD = 0;
    const auth = getAuth();
    const user = auth.currentUser;

    const uid = user.uid.toString();
    console.log('да', uid);
    const email = user.email;
    if (uid == '2yQd4LYgKqYInxbfr4AlHlHhwqG3') {
        console.log('да', uid);
        GOD = 1;
    } else {


    }


    // console.log(uid);

    // if (uid === '2yQd4LYgKqYInxbfr4AlHlHhwqG3') {
    //             setLoadingAvailable(true)
    //         }




    // console.log('fjkhfdlaskhkdjhakls', user.uid)

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState('');
    const [hobby, setHobby] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const objt = { name, age, salary, hobby };
    //     console.log(objt);

    //     axios
    //         .post(
    //             'https://sheet.best/api/sheets/edbb911e-afc9-4c9e-bebb-48882648bec9',
    //             objt
    //         )
    //         .then((response) => {
    //             console.log(response);
    //         });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const objt = `?p1=${name}&p2=${age}&p3=${salary}`
    //     // const objt = `?p1=123&p2=234&p3=345`

    //     // const objt = { "?p1=", name, "&p2=" , age, "&p3=" , salary };
    //     console.log(objt);
    //     // console.log("?p1=",name,"&p2=", age, "&p3=", salary);
    //     console.log('https://script.google.com/macros/s/AKfycbxDPyJp-NOvZvSmBb4wDyb-wG1RS7XQIy0xcI7tV1-416lm1hOQtNqW07F51sP-v_qr/exec', objt);

    //     axios
    //         .get(
    //             `https://script.google.com/macros/s/AKfycbyfIvLltSi15k77-jALNQwXiAVpIHWvNGYx7Uv9-fbAvd8pb8h7F63hPDa29f4PSKGN/exec${objt}`
    //         )

    // .catch(function (error) {
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('Error', error.message);
    //     }
    //     console.log(error.config);
    // });
    // };


    return (
        <View style={styles.MainScreen}>

            <View style={styles.MainBlock}>
                <View style={styles.block}>
                    <Text style={styles.titleText}>
                        Ваш email:
                    </Text>
                    <Text>
                        {email}
                    </Text>
                </View>
                <View style={styles.block}>
                    <Text style={styles.titleText}>
                        Ваша роль:
                    </Text>
                    {uid == UID_LIST.UID_ADMIN ?
                        <Text>Администратор</Text> :
                        <Text>Механик</Text>
                    }
                </View>
                <View style={styles.block}>
                    <Text style={styles.titleText}>
                        Ваш город:
                    </Text>
                    {uid == UID_LIST.UID_MURMANSK ?
                        <Text>Мурманск</Text> :
                        uid == UID_LIST.UID_ARCHANGELSK ?
                            <Text>Архангельск</Text> :
                            <Text>Вы админ, весь мир подвластен</Text>
                    }
                </View>
                {uid == UID_LIST.UID_ADMIN ?
                    <View>
                        <View style={styles.block}>
                            <Text style={styles.titleText}>
                                API KEY RIC
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setChangeApiRicKeyValue}
                                value={changeApiRicKeyValue}
                                placeholder='Введите API KEY RIC...'
                            />
                            <TouchableOpacity onPress={changeApiRicKey}>
                                <View style={styles.buttonChange}>
                                    <Text style={styles.buttonText}>
                                        Изменить
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <Text style={styles.titleText}>
                                API KEY TELEGRAM
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setChangeApiTelegramKeyValue}
                                value={result}
                                placeholder='Введите API KEY TELEGRAM...'
                            />
                            <TouchableOpacity onPress={changeApiTelegramKey}>
                                <View style={styles.buttonChange}>
                                    <Text style={styles.buttonText}>
                                        Изменить
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <Text style={styles.titleText}>
                                CHAT ID TELEGRAM
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setResult}
                                value={result}
                                placeholder='Введите CHAT ID TELEGRAM...'
                            />
                            <TouchableOpacity onPress={presss}>
                                <View style={styles.buttonChange}>
                                    <Text style={styles.buttonText}>
                                        Изменить
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View></View>
                }
            </View>

            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={signOutUser}>
                    <View style={styles.buttonExit}>
                        <Text style={styles.buttonText}>
                            В Ы Й Т И
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.bottomVersionTextContainer} >
                    <Text style={styles.bottomVersionText}>
                        version 5.0.5
                    </Text>
                </View>

            </View>


        </View >
    )
}

const styles = StyleSheet.create({
    MainScreen: {
        flex: 1,
        // marginHorizontal: 20,
        marginTop: 10
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    MainBlock: {
        flex: 1,
        marginHorizontal: 20,

        // justifyContent: 'center',
        // alignItems: 'center'
    },
    MainBlock2: {
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center'

        // justifyContent: 'center',
        // alignItems: 'center'
    },
    BottomButton: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    block: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // marginBottom: 15
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 20
    }, input: {
        marginBottom: 10,
        borderBottomWidth: 1,
        height: 40,
        borderColor: '#C6C6C6'

    }, buttonChange: {

        backgroundColor: '#2E72D8',
        paddingVertical: 12,
        borderColor: "#666",
        borderRadius: 10,
        paddingHorizontal: 7,
        alignItems: 'center'

    }, buttonExit: {

        backgroundColor: '#892525',
        paddingVertical: 12,
        borderColor: "#666",
        borderRadius: 10,
        marginHorizontal: 30,
        alignItems: 'center'

    },
    buttonText: {
        color: 'white',
        fontWeight: '500'
    },
    titleText: {
        fontWeight: '700'
    },
    bottomBar: {
        backgroundColor: 'white',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderColor: '#DFDFDF',
    },
    bottomVersionText: {
        fontSize: 12,
        // fontWeight: "bold",
        color: 'lightgray',
        marginTop: 10,
    }, bottomVersionTextContainer: {
        alignItems: 'center'
    }

})

export default ProfileScreen