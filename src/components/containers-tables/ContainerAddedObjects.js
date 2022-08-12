import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from "react-redux"
import { Todo123 } from '../../Todo123'
import { ImageEmpty } from '../image/ImageEmpty'

export const ContainerAddedObjects = () => {

    // Получаем массив добавленных объектов в переменную
    const ALL_ADDED_OBJECTS_ARRAY = useSelector(state => state.post.allAddedObjectsArray)

    return (
        <View>
            {ALL_ADDED_OBJECTS_ARRAY.length ?
                <View style={styles.containerAdd}>
                    <View style={styles.containerAddTitleBox}>
                        <Text style={styles.containerAddTitleBoxText}>Вы добавили</Text>
                    </View>
                    <View style={styles.containerAddTable} >
                        {ALL_ADDED_OBJECTS_ARRAY.map(scootersNumQR => (
                            <Todo123 scootersNumQR={scootersNumQR} key={scootersNumQR.id} />
                        ))}
                    </View>
                </View>
                :
                <ImageEmpty />
            }
        </View>
    )
}

const styles = StyleSheet.create({

    containerAdd: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#DADADA',
        backgroundColor: '#DFDFDF',
        borderRadius: 15,
        marginBottom: 25
    },
    containerAddTitleBox: {
        alignItems: "center",
        marginVertical: 3
    },
    containerAddTitleBoxText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2
    },
    containerAddTable: {
        backgroundColor: "#F1F1F1",
        paddingTop: 5,
        borderWidth: 0,
        borderColor: '#DADADA',
        borderRadius: 14,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 8,
    }

})