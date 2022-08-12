import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import { changeValueInputAddNumberOpen } from '../store/actions/post'

export const TitleLine = () => {

    // Тост успеха
    const showToastWithCopy = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Скопировано",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }

    // Список номеров для отправки в ТГ
    let NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD = useSelector(state => state.post.allAddedObjectsArray).map(num => num.title + '').join(",\n")

    const copyToClipboard = () => {
        Clipboard.setStringAsync(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
        showToastWithCopy();
    }

    // Получаем массив добавленных объектов в переменную
    const ALL_ADDED_OBJECTS_ARRAY = useSelector(state => state.post.allAddedObjectsArray)

    // Объявляем диспач (чтобы пушить объекты в стор)
    const dispatch = useDispatch()

    const InputAddNumberOpen = () => {
        dispatch(changeValueInputAddNumberOpen())
    }

    return (

        <View style={styles.containerCounterAndButtons} >

            <View style={styles.titleCounter}>
                <Text style={styles.containerCounterAndButtonsTitle}>
                    Выбрано:
                </Text>
                <Text style={styles.titleValue}>
                    {ALL_ADDED_OBJECTS_ARRAY.length} шт.
                </Text>
            </View>

            <View style={styles.containerButtons}>

                <TouchableOpacity
                    style={styles.buttons}
                    onPress={InputAddNumberOpen}
                >
                    <View style={styles.containerCounterAndButtonsButtonAdd}>
                        <FontAwesome name="pencil-square-o" size={18} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={copyToClipboard}
                >
                    <View style={styles.containerCounterAndButtonsButtonCopy}>
                        <AntDesign name="copy1" size={18} color="white" />
                    </View>
                </TouchableOpacity>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    containerCounterAndButtons: {
        flexDirection: "row",
        backgroundColor: '#DFDFDF',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    containerCounterAndButtonsTitle: {
        paddingVertical: 7,
        backgroundColor: '#DFDFDF',
        marginRight: 5
    },
    containerCounterAndButtonsButtonAdd: {
        backgroundColor: '#728ACA',
        borderRadius: 4,
        fontSize: 19,
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    containerCounterAndButtonsButtonCopy: {
        backgroundColor: '#6FA75C',
        borderRadius: 4,
        fontSize: 19,
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    titleText: {
        color: '#DFDFDF',
    },
    titleValue: {
        fontWeight: "bold"
    },
    containerButtons: {
        flexDirection: "row",
        alignItems: 'center'
    },
    buttons: {
        marginRight: 15
    },
    titleCounter: {
        flexDirection: 'row',
        alignItems: "center",
    }


})