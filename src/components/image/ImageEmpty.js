import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { useSelector } from "react-redux"
import { Todo123 } from '../../Todo123'

export const ImageEmpty = () => {

    // Получаем массив добавленных объектов в переменную
    const ALL_ADDED_OBJECTS_ARRAY = useSelector(state => state.post.allAddedObjectsArray)

    return (

        <View style={styles.containerAddImageEmptyList}>
            <Image
                style={styles.imageEmptyList}
                source={require('../../img/empty.png')}
            />
        </View>

    )
}

const styles = StyleSheet.create({

    containerAddImageEmptyList: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        height: 220,
    },
    imageEmptyList: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.4
    }

})