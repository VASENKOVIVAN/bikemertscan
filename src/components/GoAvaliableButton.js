import React, { useState, useEffect, Component } from 'react'
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert, TextInput } from 'react-native'
import axios from 'axios'
import { KEYS_TELEGRAM } from '../keys/keys-telegram'

import { AddTodo } from '../AddTodo'
import { THEME } from '../theme'
import { Todo } from '../Todo'

import { ResultContainer } from '../components/ResultContainer'

export const GoAvaliableButton = ({ todos, onSubmit }) => {
    const [loadingAvailable22, setLoadingAvailable22] = useState();
    const [loadingAvailable, setLoadingAvailable] = useState(false);
    const [scooterGoAvailableDisabledButton, setscooterGoAvailableDisabledButton] = useState(false);
    // const [todos, setTodos] = useState([])
    const [todos22, setTodos22] = useState([])

    let scootlistnum = todos.map(todo => todo.title + '').join(",\n");
    // let scootlistnum = '1231231321321';


    console.log('todos22.length: ' + todos22.length)
    const addTodo22 = (title22, code22, status22) => {


        setTodos22(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title22,
                code22: code22,
                status22: status22
            }
        ])

    }

    console.log(todos22)


    const showToastWithGoAvailable = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Переведено в СВОБОДЕН и\nОтправлено в Телеграм",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const showToastErrorEmptyList = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Сначала нужно добавить объекты",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const scooterGoAvailableAlert = () => {

        if (todos.length == 0) {
            showToastErrorEmptyList();
        } else {
            Alert.alert(
                "Перевести статус в свободен?",
                "Вы уверены, что хотите\nперевести статус В СВОБОДЕН\nна выбранных самокатах?",
                [
                    {
                        text: "Закрыть",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Да, уверен",
                        onPress: () => scooterGoAvailable(),
                    }
                ]
            )
        }
    }

    const wqeqwe = () => {
        console.log(todos.length)
    }


    const scooterGoAvailable = async () => {
        // Проверяем, что список объектов не пустой
        // Устанавливаем loading-индикатор кнопки "В СВОБОДЕН" в значение true, что бы активировать его
        setLoadingAvailable(!loadingAvailable);
        setscooterGoAvailableDisabledButton(!scooterGoAvailableDisabledButton);
        // Получаем ключ
        const response = await fetch(
            'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            {
                method: 'GET',
            }
        )
        const data = await response.json()
        // console.log('DATATA: ', data)
        const dataView = Object.keys(data).map(key => ({ ...data[key], id: key }))
        let API_RIC_KEY = dataView[0].title;
        // console.log('КЛЮЧ: ' + API_RIC_KEY)

        // Получаем список объектов от RIC
        const api_url_objects_list_count = await
            fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, {
                method: "GET",
                headers: {
                    "Authorization": API_RIC_KEY
                },
            });
        // Приводим к формату JSON
        const dataObjectsListCount = await api_url_objects_list_count.json();

        // Проверяем ответ от RIC по запросу списка объектов
        try {
            // Проверяем и получаем разрешение на использование камеры
            const response = await Location.requestForegroundPermissionsAsync();
            // console.log(response);
            // Получаем координаты устройства
            const { coords } = await Location.getCurrentPositionAsync();
            var x = coords.latitude.toString();
            var y = coords.longitude.toString();
        } catch (error) {
            Alert.alert('Вы не предоставили разрешение на использование гео-позиции (перейдите в настройки)');
        }
        if (api_url_objects_list_count.status == 401) {
            // Если 401 ошибка, то выводим тост и в консоль
            console.log('Error-401');
            showToastWithError401();
        }
        // Если ошибки нет, запускаем:
        else {
            // Выводим в консоль количество объектов в RIC
            // console.log('Кол-во объектов: ' + dataObjectsListCount.length)
            // Массив, в котором мы пробегаем по значениям из списка отсканированных объектов
            setTodos22([]);
            addTodo22('Номер', 'Онлайн', 'Команда')

            for (var i = 0; i < todos.length; i++) {
                var now1 = new Date().toLocaleTimeString();
                console.log('\n'); // Выводим в консоль номер цикла
                console.log(now1); // Выводим в консоль номер цикла

                setLoadingAvailable22(0)
                console.log('ЦИКЛ: ' + i); // Выводим в консоль номер цикла
                setLoadingAvailable22(i + 1)
                console.log('var loadingAvailable22: ', loadingAvailable22);

                console.log('ЦИКЛ2: ', loadingAvailable22);
                for (let j = 0; j < dataObjectsListCount.length; j++) {
                    // Ищем отсканированный объект в списке объектов RIC
                    if (dataObjectsListCount[j].config.data.qr == todos[i].title) {
                        // Выводим кучу бреда в консоль
                        // console.log('Н А Й Д Е Н О ! ! ! ! !')
                        // console.log('Номер по RIC: ' + j)
                        // console.log('Вывод QR из RIC: ' + dataObjectsListCount[j].config.data.qr)
                        // console.log('Вывод QR из скана: ' + todos[i].title)
                        // console.log('Вывод ID из RIC: ' + dataObjectsListCount[j]._id)
                        // console.log('ЗАПУСКАЮ КОМАНДУ НА ПЕРЕВОД В СВОБОДЕН!!!!!')



                        try {
                            const api_url_scooterlockall = await
                                fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/change-status-available?withChildGroups=true`, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": API_RIC_KEY
                                    },
                                });
                            // Выводим в консоль статус HTTP ответа
                            const data2345 = await api_url_scooterlockall.json()

                            let numQrScooter = dataObjectsListCount[j].config.data.qr
                            let objectStatusOnline = 0;
                            if (dataObjectsListCount[j].state.online) {
                                objectStatusOnline = 'Да'
                            } else {
                                objectStatusOnline = 'Нет'
                            }

                            console.log('Номер самоката:', numQrScooter);
                            console.log(' ПЕРЕВОД "В СВОБОДЕН"');

                            let statusResponse = api_url_scooterlockall.status;

                            if (statusResponse == 422) {
                                let titleResponse = data2345.codes[0];
                                if (titleResponse == 'error_api_already_available') {
                                    console.log('  Ответ: Уже свободен!');
                                    console.log(titleResponse);
                                    addTodo22(numQrScooter, objectStatusOnline, 'Уже свободен')
                                } else if (titleResponse == 'error_api_cant_change_from_taken_to_available') {
                                    console.log('  Ответ: Самокат в аренде');
                                    console.log(titleResponse);
                                    addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в аренде)')
                                } else if (titleResponse == 'error_api_cant_change_from_reserved_to_available') {
                                    console.log('  Ответ: Самокат забронирован');
                                    console.log(titleResponse);
                                    addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат забронирован)')
                                } else if (titleResponse == 'error_api_cant_change_from_park_to_available') {
                                    console.log('  Ответ: Самокат в ожидании');
                                    console.log(titleResponse);
                                    addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в ожидании)')
                                } else {
                                    console.log('  Ответ: НЕИЗВЕСНАЯ ОШИБКА!');
                                    console.log(titleResponse);
                                    addTodo22(numQrScooter, objectStatusOnline, titleResponse)
                                }
                            } else if (statusResponse == 200) {
                                console.log('  Ответ: Статус переведен!');
                                addTodo22(numQrScooter, objectStatusOnline, 'Успешно')
                            } else {
                                console.log('  Ошибка!\nСтатус ответа: ', statusResponse);
                                addTodo22(numQrScooter, statusResponse, titleResponse)

                            }


                        }
                        catch (err) {
                            console.log(err);
                        }

                        // Запускаем команду на перевод объекта в статус "На складе"
                        // try {
                        //     const api_url_scooterlockall1236 = await
                        //         fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/00e9f-tga73?withChildGroups=true`, {
                        //             method: "POST",
                        //             headers: {
                        //                 "Authorization": API_RIC_KEY
                        //             },
                        //         });
                        //     const data23456 = await api_url_scooterlockall1236.json()
                        //     console.log(' ПЕРЕВОД "В ГОРОД"');
                        //     if (api_url_scooterlockall1236.status == 200) {
                        //         console.log('  Ответ: Статус переведен!');
                        //     } else {
                        //         console.log('  Ошибка!\nСтатус ответа: ', api_url_scooterlockall1236.status);
                        //     }

                        // }
                        // catch (err) {
                        //     console.log(err);
                        // }

                        // Тут дальше я отправляю в гугл таблицу
                        // Тут дальше я отправляю в гугл таблицу
                        var now = new Date().toLocaleTimeString();
                        const objt = `?p1=${todos[i].title}&p2=${now}&p3=Выставил&p4=${x},${y}`
                        const response2 = await fetch(
                            `https://script.google.com/macros/s/AKfycbzpfVBOETyWNDXES7goQIq3KQ8c3OQupri_y2581JnPblpAgL6TB6r7K7MebVlieai3/exec${objt}`,
                            {
                                method: 'GET',
                            }
                        )
                    }
                }
            }
            // На данном этапе мы пробежали по всем объектам и перевели их в статус "Поломка"
            // Определяем функцию, которая отправит сообщение и гео-позицию в Телеграм
            const scooterListSendToTelegramAvailable = async () => {
                // Определяем сообщение, которое отправим в Телеграм
                let message = `Выставил и перевел в свободен:\n${scootlistnum}`;
                // Получаем ключ
                const response = await fetch(
                    'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
                    {
                        method: 'GET',
                    }
                )
                const data = await response.json()
                // console.log('DATATA: ', data)
                const dataView = Object.keys(data).map(key => ({ ...data[key], id: key }))
                let API_TELEGRAM_KEY = dataView[1].title;
                let TELEGRAM_KEY_CHAT_ID = dataView[2].title;
                // console.log('КЛЮЧ: ' + API_TELEGRAM_KEY)
                // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
                const api_urlTG = await
                    axios.post(`https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendMessage`, {
                        chat_id: TELEGRAM_KEY_CHAT_ID,
                        text: message
                    });
                // console.log(api_urlTG.status)
                // Асинхронная функция на axios для отправки POST запроса, для отправки гео-позиции устройства в Телеграм
                const api_urlTG2 = await
                    axios.post(KEYS_TELEGRAM.URI_API_LOCATION, {
                        chat_id: KEYS_TELEGRAM.CHAT_ID,
                        latitude: x,
                        longitude: y,
                    })
            }
            scooterListSendToTelegramAvailable();   // Запускаем функцию описанную выше
            setLoadingAvailable(loadingAvailable);  // Выключаем loading-индикатор
            showToastWithGoAvailable();             // Показываем тост успеха
            setTimeout(() => {
                setscooterGoAvailableDisabledButton(scooterGoAvailableDisabledButton);
            }, 5000);
        }
    }
    return (

        < View >
            <TouchableOpacity onPress={scooterGoAvailableAlert}>
                <View
                    style={{
                        ...styles.button,
                        backgroundColor: loadingAvailable ? "#2F71A2" : "#2F71A2",
                        backgroundColor: scooterGoAvailableDisabledButton ? "#E7E6E6" : "#2F71A2",
                    }}
                >
                    {loadingAvailable &&
                        <View>
                            <ActivityIndicator style={styles.buttonText333} size="large" color="white" />
                        </View>
                    }
                    <Text style={styles.buttonText}>
                        {loadingAvailable ? "" : scooterGoAvailableDisabledButton ? "Блестяще" : "В СВОБОДЕН"}

                    </Text>
                </View>
            </TouchableOpacity>

        </View >
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

export default GoAvaliableButton
