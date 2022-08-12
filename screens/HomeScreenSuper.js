import React, { useCallback, useState, useReducer, useEffect, Component, useImperativeHandle, useRef } from 'react'
import * as Location from 'expo-location';
import { Dimensions, StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert, TextInput } from 'react-native'
import { Navbar } from '../src/Navbar'
import { AddTodo } from '../src/AddTodo'
import { AddTodo22 } from '../src/AddTodo22'
import { Keyboard } from 'react-native'
import { Todo } from '../src/Todo'
import { Todo22 } from '../src/Todo22'
import {
    AppRegistry,
    TouchableHighlight
} from 'react-native';
import { AlertPrompt } from 'react-native-alert-prompt';
import prompt from 'react-native-prompt-android';
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { KEYS_TELEGRAM } from '../src/keys/keys-telegram'
import { KEYS_RIC } from '../src/keys/keys-ric'
import { GoAvaliableButton } from '../src/components/GoAvaliableButton'
import { ResultContainer } from '../src/components/ResultContainer'
import { getAuth } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import { UID_LIST } from "../src/UIDS/UIDS";
import * as ScreenOrientation from 'expo-screen-orientation'
import { THEME } from '../src/theme'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';


import { Todo123 } from '../src/Todo123';
import { useSelector, useDispatch } from "react-redux";
import { addPosts } from '../src/store/actions/post';

import { MainButton } from '../src/components/buttons/test button';



const MainScreen = ({ navigation }, setValue) => {

    const [scootersNumQR, setScootersNumQR] = useState('')
    const [todos123, setTodos123] = useState([])

    const dispatch = useDispatch()
    const handleBarCodeScanned22 = () => {

        const scooter = {
            title: scootersNumQR
        }

        dispatch(addPosts(scooter))

        setTodos123(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title: scootersNumQR
            }
        ])

        Keyboard.dismiss()
        console.log("zzz")
        setScootersNumQR('')

    }
    // console.log("state: ", state);
    console.log("todos123: ", todos123);

    const allPosts = useSelector(state => state.post.allPosts)
    console.log("allPosts: ", allPosts);

    return (
        <View>
            {/* <Text>{state.count}</Text> */}
            <MainButton />
            <Button
                onPress={() => dispatch({ type: "increment" })}
                title="+++++++++++"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => dispatch({ type: "decrement" })}
                title="------------"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => dispatch({ type: "add" })}
                title="add"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <TextInput
                style={styles.containerInputAddNumberInput}
                onChangeText={setScootersNumQR}
                keyboardType='number-pad'
                maxLength={6}
                value={scootersNumQR}
                placeholder='Введите номер...'
            />
            <View >
                <Button title='Добавить' onPress={handleBarCodeScanned22} color='#2C9B29' />
            </View>
            <Text style={{ backgroundColor: 'red' }}>
                Из локала
            </Text>
            <View style={{ backgroundColor: 'blue' }}>
                {todos123.map(scootersNumQR => (
                    <Todo123 scootersNumQR={scootersNumQR} key={scootersNumQR.id} />
                ))}
            </View>
            <Text>
                Из супер пупера
            </Text>
            <View style={{ backgroundColor: 'blue' }}>
                {allPosts.map(scootersNumQR => (
                    <Todo123 scootersNumQR={scootersNumQR} key={scootersNumQR.id} />
                ))}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({

})

export default MainScreen
