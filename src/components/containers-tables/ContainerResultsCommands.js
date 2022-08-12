import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from "react-redux"
import { ResultsCommandsScootersContainer } from '../../ResultsCommandsScootersContainer'
import { Todo123 } from '../../Todo123'

export const ContainerResultsCommands = () => {

    // Получаем массив добавленных объектов в переменную
    const RESULTS_COMMANDS_SCOOTERS_ARRAY = useSelector(state => state.post.resultsCommandsScootersArray)

    return (
        <View>
            {RESULTS_COMMANDS_SCOOTERS_ARRAY.length ?
                <View style={styles.containerResult}>
                    <View style={styles.containerResultTitleBox}>
                        <Text style={styles.containerResultTitleBoxText}>
                            Результат
                            {/* ( {counterPerformedCommands} / {abc} ) */}
                        </Text>
                    </View>
                    <View style={styles.containerResultTable}>
                        {RESULTS_COMMANDS_SCOOTERS_ARRAY.map(resultsCommandsScooter => (
                            <ResultsCommandsScootersContainer
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