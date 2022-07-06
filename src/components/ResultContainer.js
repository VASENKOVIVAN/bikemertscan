import React, { useState, useEffect, Component } from 'react'
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert, TextInput } from 'react-native'
import axios from 'axios'
import { KEYS_TELEGRAM } from '../keys/keys-telegram'

import { AddTodo } from '../AddTodo'
import { THEME } from '../theme'
import { Todo22 } from '../Todo22'

export const ResultContainer = ({ todos22 }) => {

    return (
        <View style={styles.containerResult}>
            <View style={styles.containerResultTitleBox}>
                <Text style={styles.containerResultTitleBoxText}>
                    Результат
                </Text>

            </View>
            <View style={styles.containerResultTable}>
                {todos22.map(todo22 => (
                    <Todo22
                        todo22={todo22}
                        status22={todo22.status22}
                        key={todo22.id}
                        onRemove={removeTodo} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MainScreen: {
        flex: 1
    },
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
    },
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
        justifyContent: 'space-between',
        flexWrap: "wrap",
        paddingHorizontal: 8
    },
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
    },
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


    },
    containerInputAddNumberButtonClose: {

    },





    container: {
        // paddingHorizontal: 30,
        // paddingVertical: 20
    },
    alllists: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
        // marginBottom: 15
    },
    containerCounterAndButtonsTitle: {
        paddingVertical: 7,
        backgroundColor: '#DFDFDF',
    },
    listscopy: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        fontSize: 18
    },
    addbutton: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        // backgroundColor: '#DFDFDF',
    },
    deletebutton: {
        paddingHorizontal: 10,
        // paddingVertical: 10,
        flex: 1,
        // backgroundColor: '#DFDFDF',
    },
    copybutton: {
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // flex: 1,
        // backgroundColor: '#DFDFDF',
    },
    bottomflex: {
        justifyContent: 'flex-end',
    },
    One: {
        flex: 3,
        // backgroundColor: 'white',
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    Two: {
        // flex: 2,
        // flexDirection: "row",
        // paddingHorizontal: 20,
        // paddingVertical: 10,
        // backgroundColor: 'blue',
    },
    Three: {
        // flex: 1,
        // backgroundColor: 'lightblue',
        justifyContent: 'space-between',
        // width: '100%',
        flexDirection: "row",
        // justifyContent: 'space-around',
        // justifyContent: 'space-between',
        // alignItems: "center",

        paddingHorizontal: 30,
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
    button: {
        flex: 1,
        display: "flex",
        // flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        // width: 100,
        // height: 70,
        paddingVertical: 15,
        // borderWidth: 1,
        borderColor: "#666",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button2: {
        // flex: 1,
        // display: "flex",
        // flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DB645C',
        // paddingHorizontal: 30,
        // paddingVertical: 15,
        // borderWidth: 1,
        borderColor: "#666",
        // borderWidth: 1,
        // borderRadius: 10,
        // paddingHorizontal: 10,
    },
    button22: {
        justifyContent: "space-evenly",
        alignItems: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        // backgroundColor: '#919E42',
        borderColor: "#666",
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
    button4: {
        // flex: 1,
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-evenly",
        backgroundColor: '#2BA2DE',

        // alignItems: "center",
        // width: 240,
        // height: 70,
        // paddingVertical: 15,
        // borderWidth: 1,
        // borderColor: "#666",
        borderRadius: 4,
        // paddingHorizontal: 10,
        fontSize: 19,
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10
    },
    containerCounterAndButtons: {
        flexDirection: "row",
        backgroundColor: '#DFDFDF',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    buttonText3: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12

    },
    buttonText4: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12

    },
    buttonText333: {
        alignItems: "center",
        // justifyContent: '',
        marginBottom: -10,

    },
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
    },





    block: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // marginBottom: 15
    },
    barcodeboxcontainer: {
        // backgroundColor: '#DFDFDF',
        alignItems: 'center',
        paddingVertical: 5
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    },
    resultscan: {
        // alignItems: 'center',
        // marginHorizontal: 20
    },
    resultscan: {
        justifyContent: 'center',
    },
    maintext: {
        alignItems: 'center',
        // fontSize: 16,
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: '#DFDFDF',

    },
    scanelsebutton: {
        paddingHorizontal: 30,
        paddingTop: 5,
        paddingBottom: 10
        // backgroundColor: '#DFDFDF',
    },
    addbutton: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        // backgroundColor: '#DFDFDF',
    },
    input: {
        // width: '70%',
        // padding: 10,
        // borderStyle: 'solid',
        // borderBottomWidth: 2,
        // borderBottomColor: '#3949ab',
        opacity: 0,
        height: 0
    },
    scanelsebutton2: {
        color: THEME.MAIN_COLOR
    }
})

export default ResultContainer
