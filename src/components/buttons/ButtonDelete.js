import React from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { deleteAllPosts, deleteAllResultCommandScooter } from '../../store/actions/post'
import { MaterialIcons } from '@expo/vector-icons'

export const ButtonDelete = () => {

    // Получаем массив добавленных объектов в переменную
    const ALL_ADDED_OBJECTS_ARRAY = useSelector(state => state.post.allAddedObjectsArray)

    // Объявляем диспач (чтобы пушить объекты в стор)
    const dispatch = useDispatch()

    // Тост, если список объектов и так пустой
    const showToastListYetClean = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Нечего очищать\nСписок пустой",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    // Алерт подтверждения команды
    const goDeleteAlert = () => {
        if (ALL_ADDED_OBJECTS_ARRAY.length == 0) {
            showToastListYetClean()
        } else {
            Alert.alert(
                "Отчистить",
                "Вы уверены, что хотите отчистить список?",
                [
                    {
                        text: "Закрыть",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Да, отчистить",
                        onPress: () => goDelete(),
                    }
                ]
            )
        }
    }

    // Тост успеха
    const showToastWithCleared = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Очищено",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    const goDelete = () => {

        // Отчищаем массив объектов добавленных в стейт результата
        dispatch(deleteAllResultCommandScooter())

        // Отчищаем массив объектов добавленных в стейт добавления
        dispatch(deleteAllPosts())

        // Показываем тост успеха
        showToastWithCleared()

    }

    return (
        <View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={goDeleteAlert}>
                <MaterialIcons name="delete-sweep" size={26} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DB645C',
        borderColor: "#666",
    }

})