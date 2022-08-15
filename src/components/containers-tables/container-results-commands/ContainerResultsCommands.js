import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from "react-redux"
import { ResultsCommands } from './ResultsCommands'

export const ContainerResultsCommands = () => {

    // Получаем массив добавленных объектов в переменную
    const ALL_ADDED_OBJECTS_ARRAY = useSelector(state => state.post.allAddedObjectsArray)

    // Получаем массив добавленных объектов в переменную
    const RESULTS_COMMANDS_SCOOTERS_ARRAY = useSelector(state => state.post.resultsCommandsScootersArray)

    return (
        <View>
            {RESULTS_COMMANDS_SCOOTERS_ARRAY.length ?
                <View style={styles.containerResult}>
                    <View style={styles.containerResultTitleBox}>
                        <Text style={styles.containerResultTitleBoxText}>
                            Результат
                            ( {RESULTS_COMMANDS_SCOOTERS_ARRAY.length - 2} / {ALL_ADDED_OBJECTS_ARRAY.length} )
                        </Text>
                    </View>
                    <View style={styles.containerResultTable}>
                        {RESULTS_COMMANDS_SCOOTERS_ARRAY.map(resultsCommandsScooter => (
                            <ResultsCommands
                                resultsCommandsScooter={resultsCommandsScooter}
                                key={resultsCommandsScooter.id}
                            />
                        ))}
                    </View>
                </View >
                :
                <View>
                </View>
            }
        </View>

    )
}

const styles = StyleSheet.create({

    containerResult: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#DADADA',
        backgroundColor: '#DFDFDF',
        borderRadius: 15,
        marginBottom: 10
    },
    containerResultTitleBox: {
        alignItems: "center",
        marginVertical: 3,
        flexDirection: "row",
        justifyContent: "center",
    },
    containerResultTitleBoxText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2
    },
    containerResultTable: {
        backgroundColor: "#F1F1F1",
        paddingBottom: 10,
        borderWidth: 0,
        borderColor: '#DADADA',
        borderRadius: 14,
        paddingHorizontal: 10
    }

})