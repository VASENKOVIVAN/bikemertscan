import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';

import { Keyboard } from 'react-native'
import { addPosts, changeValueInputAddNumberOpen } from '../store/actions/post'
import { Ionicons } from '@expo/vector-icons';

export const InputAddNumber = () => {

    const [valueNumberInput, setValueNumberInput] = useState('')

    // Объявляем диспач (чтобы пушить объекты в стор)
    const dispatch = useDispatch()

    const inputAddNumberClose = () => {
        dispatch(changeValueInputAddNumberOpen())
    }

    const addNumber = () => {

        if (valueNumberInput.trim().length < 6) {
            ToastAndroid.showWithGravityAndOffset(
                "ОШИБКА\nВведите шестизначный номер",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {

            Keyboard.dismiss()
            setValueNumberInput('')
            ToastAndroid.showWithGravityAndOffset(
                "Номер добавлен",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            const scooter = {
                title: valueNumberInput
            }

            dispatch(addPosts(scooter))

        }

    }

    return (

        <View style={styles.containerInputAddNumber} >
            <View style={styles.containerInputAddNumberTitleAndButtonClose}>
                <Text style={styles.containerInputAddNumberTitle} >
                    Ручной ввод номера
                </Text>
                <TouchableOpacity onPress={inputAddNumberClose}>
                    <Ionicons name="close-sharp" size={30} color="#DF9A9A" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerInputAddNumberWithButton}>
                <TextInput
                    style={styles.containerInputAddNumberViewInput}
                    onChangeText={setValueNumberInput}
                    keyboardType='number-pad'
                    maxLength={6}
                    value={valueNumberInput}
                    placeholder='Введите номер...'
                />
                <View >
                    <Button title='Добавить' onPress={addNumber} color='#2C9B29' />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    containerInputAddNumber: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        // borderStartWidth: 5,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderColor: '#DFDFDF',

    },
    containerInputAddNumberTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    containerInputAddNumberWithButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 10,

    },
    containerInputAddNumberViewInput: {
        borderBottomColor: "#DFDFDF",
        borderBottomWidth: 3,
        flex: 1,
        marginRight: 30

    }, containerInputAddNumberTitleAndButtonClose: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 25,


    }

})