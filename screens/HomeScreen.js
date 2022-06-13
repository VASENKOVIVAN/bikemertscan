import React, { useState, useEffect, Component } from 'react'
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert } from 'react-native'
import { Navbar } from '../src/Navbar'
import { AddTodo } from '../src/AddTodo'
import { Todo } from '../src/Todo'
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'

import { KEYS_TELEGRAM } from '../src/keys/keys-telegram'
import { KEYS_RIC } from '../src/keys/keys-ric'

import { THEME } from '../src/theme'


const MainScreen = ({ navigation }, isSignedIn) => {

    // Заголовки запроса (Токен RIC)
    var myHeaders = new Headers();
    myHeaders.append(
        "Authorization", KEYS_RIC.AUTHORIZATION_KEY
    );
    // Опции запроса POST
    var requestOptionsPOST = {
        method: "POST",
        headers: {
            "Authorization": KEYS_RIC.AUTHORIZATION_KEY
        },
    };
    // Опции запроса POST на изменение статуса город/склад
    var raw = JSON.stringify({
        "testind": 0
    });
    var requestOptionsPOST2 = {
        method: "POST",
        headers: {
            "Authorization": KEYS_RIC.AUTHORIZATION_KEY
        },
        body: raw,
    };
    // Опции запроса GET
    var requestOptionsGET = {
        method: "GET",
        headers: myHeaders,
    };
    // Тост уведомления о 401 ошибке
    const showToastWithError401 = () => {
        ToastAndroid.showWithGravityAndOffset(
            "ERROR 401\nОБРАТИТЕСЬ К РАЗРАБОТЧИКУ",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };
    const showToastWithCopy = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Скопировано",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };
    const showToastWithGoAvailable = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Переведено в СВОБОДЕН и\nОтправлено в Телеграм",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };
    const showToastWithGoBroken = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Переведено в ПОЛОМКУ и\nОтправлено в Телеграм",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };
    const showToastWithCleared = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Очищено",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const showToastListYetClean = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Нечего очищать\nСписок пустой",
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

    const showToastWithGoOpenBattery = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Команда на открытие слотов АКБ\nОТПРАВЛЕНА",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    // Стейты для loading-индикаторов
    const [loadingAvailable, setLoadingAvailable] = useState(false);
    const [loadingBroken, setLoadingBroken] = useState(false);
    const [loadingGoOpenBattery, setLoadingGoOpenBattery] = useState(false);

    const [scooterGoBrokenDisabledButton, setscooterGoBrokenDisabledButton] = useState(false);
    const [scooterGoAvailableDisabledButton, setscooterGoAvailableDisabledButton] = useState(false);
    const [scooterGoOpenBatteryDisabledButton, setscooterGoOpenBatteryDisabledButton] = useState(false);

    const scooterGoBrokenAlert = () => {

        if (todos.length == 0) {
            showToastErrorEmptyList();
        } else {
            Alert.alert(
                "Перевести статус в поломку?",
                "Вы уверены, что хотите\nперевести статус В ПОЛОМКУ\nна выбранных самокатах?",
                [
                    {
                        text: "Закрыть",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Да, уверен",
                        onPress: () => scooterGoBroken(),
                    }
                ]
            )
        }

    }
    // Функция кнопки "В ПОЛОМКУ" 
    // Перевод объектов в статус "Поломка" 
    const scooterGoBroken = async () => {

        // Проверяем, что список объектов не пустой
        if (todos.length == 0) {
            showToastErrorEmptyList();
        } else {
            // Устанавливаем loading-индикатор кнопки "В ПОЛОМКУ" в значение true, что бы активировать его
            setLoadingBroken(!loadingBroken);
            setscooterGoBrokenDisabledButton(!scooterGoBrokenDisabledButton);
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
                for (var i = 0; i < todos.length; i++) {
                    console.log('ЦИКЛ: ' + i); // Выводим в консоль номер цикла
                    // Массив, в котором мы пробегаем по объектам из RIC
                    for (let j = 0; j < dataObjectsListCount.length; j++) {
                        // Ищем отсканированный объект в списке объектов RIC
                        if (dataObjectsListCount[j].config.data.qr == todos[i].title) {
                            // Выводим кучу бреда в консоль
                            // console.log('Н А Й Д Е Н О ! ! ! ! !')
                            // console.log('Номер по RIC: ' + j)
                            // console.log('Вывод QR из RIC: ' + dataObjectsListCount[j].config.data.qr)
                            // console.log('Вывод QR из скана: ' + todos[i].title)
                            // console.log('Вывод ID из RIC: ' + dataObjectsListCount[j]._id)
                            // console.log('ЗАПУСКАЮ КОМАНДУ НА ПЕРЕВОД В ПОЛОМКУ!!!!!')
                            // Запускаем команду на перевод объекта в статус "Поломка"
                            try {
                                const api_url_scooterlockall = await
                                    fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/change-status-broken?withChildGroups=true`, requestOptionsPOST);
                                // Выводим в консоль статус HTTP ответа
                                console.log('response.status: ', api_url_scooterlockall.status);

                            }
                            catch (err) {
                                console.log(err);
                            }


                            var myHeaders = new Headers();
                            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmEyMTJiZTE4ZTA1ZjAwMTAyZDJkZGIiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NDc4ODc5OCwiZXhwIjoxNjU3MzE0MDAwfQ.isQauAjhXpNgb-HPeLr1xpxbCUAUbfY58yWqtVx6tSs");
                            myHeaders.append("Content-Type", "application/json");

                            var raw = JSON.stringify({
                                "testind": 0
                            });

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };

                            fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/packets?withChildGroups=true`, requestOptions)
                                .then(response => response.text())
                                .then(result => console.log(result))
                                .catch(error => console.log('error', error));

                            // Тут дальше я отправляю в гугл таблицу
                            var now = new Date().toLocaleTimeString();
                            const objt = `?p1=${todos[i].title}&p2=${now}&p3=Забрал&p4=${x},${y}`
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
                const scooterListSendToTelegramBroken = async () => {
                    // Определяем сообщение, которое отправим в Телеграм
                    let message = `Забрал и перевел в поломку:\n${scootlistnum}`;
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
                scooterListSendToTelegramBroken();  // Запускаем функцию описанную выше
                setLoadingBroken(loadingBroken);    // Выключаем loading-индикатор
                showToastWithGoBroken();            // Показываем тост успеха
                setTimeout(() => {
                    setscooterGoBrokenDisabledButton(scooterGoBrokenDisabledButton);
                }, 5000);
            }
        }
    }

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
    // Функция кнопки "В ПОЛОМКУ" 
    // Перевод объектов в статус "Свободен" 
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
            for (var i = 0; i < todos.length; i++) {
                console.log('ЦИКЛ: ' + i); // Выводим в консоль номер цикла
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
                                fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/change-status-available?withChildGroups=true`, requestOptionsPOST);
                            // Выводим в консоль статус HTTP ответа
                            console.log('response.status: ', api_url_scooterlockall.status);
                        }
                        catch (err) {
                            console.log(err);
                        }

                        var myHeaders = new Headers();
                        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmEyMTJiZTE4ZTA1ZjAwMTAyZDJkZGIiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NDc4ODc5OCwiZXhwIjoxNjU3MzE0MDAwfQ.isQauAjhXpNgb-HPeLr1xpxbCUAUbfY58yWqtVx6tSs");
                        myHeaders.append("Content-Type", "application/json");

                        var raw = JSON.stringify({
                            "testind": 1
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };

                        fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/packets?withChildGroups=true`, requestOptions)
                            .then(response => response.text())
                            .then(result => console.log(result))
                            .catch(error => console.log('error', error));

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


    const scooterGoOpenBatteryAlert = () => {

        if (todos.length == 0) {
            showToastErrorEmptyList();
        } else {
            Alert.alert(
                "Открыть слоты АКБ?",
                "Вы уверены, что хотите\nОТКРЫТЬ СЛОТЫ АКБ\nна выбранных самокатах?",
                [
                    {
                        text: "Закрыть",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Да, уверен",
                        onPress: () => scooterGoOpenBattery(),
                    }
                ]
            )
        }

    }
    // Функция кнопки "В ПОЛОМКУ" 
    // Перевод объектов в статус "Свободен" 
    const scooterGoOpenBattery = async () => {
        // Проверяем, что список объектов не пустой

        setLoadingGoOpenBattery(!loadingGoOpenBattery);
        setscooterGoOpenBatteryDisabledButton(!scooterGoOpenBatteryDisabledButton);
        // Устанавливаем loading-индикатор кнопки "В СВОБОДЕН" в значение true, что бы активировать его
        // setLoadingAvailable(!loadingAvailable);
        // setscooterGoAvailableDisabledButton(!scooterGoAvailableDisabledButton);
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
            for (var i = 0; i < todos.length; i++) {
                console.log('ЦИКЛ: ' + i); // Выводим в консоль номер цикла
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
                                fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/scsetmode-eco-wxs9m-7qnlg?withChildGroups=true`, requestOptionsPOST);
                            // Выводим в консоль статус HTTP ответа
                            console.log('response.status: ', api_url_scooterlockall.status);
                        }
                        catch (err) {
                            console.log(err);
                        }

                        // Тут дальше я отправляю в гугл таблицу
                        // Тут дальше я отправляю в гугл таблицу
                        var now = new Date().toLocaleTimeString();
                        const objt = `?p1=${todos[i].title}&p2=${now}&p3=Замена АКБ&p4=${x},${y}`
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
            const scooterListSendToTelegramGoOpenBattery = async () => {
                // Определяем сообщение, которое отправим в Телеграм
                let message = `Заменил АКБ:\n${scootlistnum}`;
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
            scooterListSendToTelegramGoOpenBattery();   // Запускаем функцию описанную выше
            setLoadingGoOpenBattery(loadingGoOpenBattery);  // Выключаем loading-индикатор
            showToastWithGoOpenBattery();             // Показываем тост успеха
            setTimeout(() => {
                setscooterGoOpenBatteryDisabledButton(scooterGoOpenBatteryDisabledButton);
            }, 5000);
        }
    }

    // const getLocation = async () => {
    //   try {
    //     const response = await Location.requestForegroundPermissionsAsync();
    //     console.log(response);
    //     const { coords } = await Location.getCurrentPositionAsync();
    //     console.log('Широта: ', coords.latitude, ' Долгота: ', coords.longitude,);
    //   } catch (error) {
    //     Alert.alert('Не могу гео найти');
    //   }
    // }

    // const TOKEN_TELEGRAM = "5486245743:AAG-NZzrNigBA3uquPHqt07f9aeNe8dpgvQ";
    // const CHAT_ID = "-586513671";
    // const URI_API_MESSAGE = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendMessage`;
    // const URI_API_LOCATION = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendLocation`;

    // const scooterListSendToTelegram = async () => {
    //   let message = `Выставил:\n${scootlistnum}`;
    //   console.log(message);

    //   const api_urlTG = await
    //     axios.post(URI_API_MESSAGE, {
    //       chat_id: CHAT_ID,
    //       text: message
    //     });

    //   try {
    //     const response = await Location.requestForegroundPermissionsAsync();
    //     console.log(response);
    //     const { coords } = await Location.getCurrentPositionAsync();
    //     let x = coords.latitude.toString();
    //     let y = coords.longitude.toString();
    //     // console.log('Широта2: ', x, ' Долгота2: ', y,);
    //     const api_urlTG2 = await
    //       axios.post(URI_API_LOCATION, {
    //         chat_id: CHAT_ID,
    //         latitude: x,
    //         longitude: y,
    //       })
    //   } catch (error) {
    //     Alert.alert('Не могу гео найти');
    //   }
    // }

    // const scooterListSendToTelegram = async () => {
    //   let message = '123';
    //   console.log(message);
    //   const api_urlTG = await
    //     fetch(`https://api.telegram.org/bot5486245743:AAG-NZzrNigBA3uquPHqt07f9aeNe8dpgvQ/sendMessage`, {
    //       method: 'POST',
    //       chat_id: "-586513671",
    //       // parse_mode: 'html',
    //       text: message
    //     });
    //   const dataTG = await api_urlTG.json();
    //   console.log(dataTG);
    // }

    // axios
    // .get('https://app.rightech.io/api/v1/objects/6284878a3335070010a5766b', {
    //   headers: {
    //     'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MjkwZDFmNjQ0NDRjOTAwMTAyNGM2ZWYiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1MzY1ODEwMiwiZXhwIjoxNjU2MTkwODAwfQ.ky2HUNdE86MigVhCT_VjtXvszEMiGeOgXxV5sgCkJVM"
    //   }
    // })
    // .then((response) => {
    //   console.log(response)
    // })


    // let [isLoading, setIsLoading] = useState(true);
    // let [error, setError] = useState();
    // let [response, setResponse] = useState();



    // useEffect(() => {

    //   setResponse();
    //   setResponse2();

    //   fetch("https://app.rightech.io/api/v1/objects/6284878a3335070010a5766b/commands/scooterunlock?withChildGroups=true", requestOptions)
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         setIsLoading(false);
    //         setResponse(result);
    //       },
    //       (error) => {
    //         setIsLoading(false);
    //         setError(error);
    //       }
    //     )

    // }, []);

    // const getContent = () => {

    //   if (isLoading) {
    //     return <ActivityIndicator size="large" />;
    //   }

    //   if (error) {
    //     return <Text>{error}</Text>
    //   }
    //   console.log("ОТВЕТ   ");
    //   console.log(response);
    //   // setResponse();
    //   // console.log("ОТЧИЩЕНО   ");
    //   // console.log(response);
    //   // return <Text>Bitcoin (USD): {response["status"]["name"].rate}</Text>;
    // };



    // let [isLoading2, setIsLoading2] = useState(true);
    // let [error2, setError2] = useState();
    // let [response2, setResponse2] = useState();

    // useEffect(() => {

    //   setResponse('');
    //   setResponse2('');

    //   fetch("https://app.rightech.io/api/v1/objects/6284878a3335070010a5766b/commands/scooterlock?withChildGroups=true", requestOptions)
    //     .then(res2 => res2.json())
    //     .then(
    //       (result2) => {
    //         setIsLoading2(false);
    //         setResponse2(result2);
    //       },
    //       (error2) => {
    //         setIsLoading2(false);
    //         setError2(error2);
    //       }
    //     )

    // }, []);

    // const getContent2 = () => {

    //   if (isLoading) {
    //     return <ActivityIndicator size="large" />;
    //   }

    //   if (error2) {
    //     return <Text>{error2}</Text>
    //   }
    //   console.log("ОТВЕТ2   ");
    //   console.log(response2);
    //   // setResponse();
    //   // console.log("ОТЧИЩЕНО   ");
    //   // console.log(response);
    //   // return <Text>Bitcoin (USD): {response["status"]["name"].rate}</Text>;
    // };

    // const TESTTTT = () => {

    //   const [TESTTTTs, setTESTTTTs] = useState(null);


    //   useEffect(() => {

    //     console.log("TESTTT^ ", todos.length)

    //   }, [todos]);

    // }





    const [todos, setTodos] = useState([])

    const pressDelete = () => {

        if (todos.length == 0) {
            showToastListYetClean();
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
                        onPress: () => GoDelete(),
                    }
                ]
            )
        }

    }
    const GoDelete = () => {
        setTodos([]);
        showToastWithCleared();
    }


    const addTodo = (title) => {
        // const newTodo = {
        //   id: Date.now().toString(),
        //   title: title
        // }

        // setTodos(todos.concat([ newTodo ]))
        // setTodos((prevTodos) => {
        //   return [
        //     ...prevTodos,
        //     newTodo
        //   ]
        // })

        setTodos(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title
            }
        ])

    }

    let abc = todos.length
    let lastElem = todos[todos.length - 1];

    let scootlistnum = todos.map(todo => todo.title + '').join(",\n");
    // console.log("Первое: ", scootlistnum)
    // console.log("Первое: ", todos[3].title)


    // let scootlistnum2 = scootlistnum.replace("*,", " ,");
    // console.log("Второе: ", scootlistnum2)
    const copyToClipboard = () => {
        Clipboard.setStringAsync(scootlistnum);
        showToastWithCopy();
    };


    const [textscoot, onChangeText] = useState("");

    const [show, setShow] = useState(false)



    const removeTodo = id => {

        setTodos(prev => prev.filter(todo => todo.id !== id))

        ToastAndroid.showWithGravityAndOffset(
            "Объект удален",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }

    return (
        <View style={styles.MainScreen}>

            <View style={styles.One} >

                {/* <Navbar title='BikeMe - Scanner' /> */}

                <View style={styles.container}>

                    <AddTodo onSubmit={addTodo} />
                    {/* {getContent()} */}


                </View>

                <View style={styles.counterandbutton} >


                    <View >
                        <Text style={styles.titlelistscooters} >Выбрано:
                            <Text style={{ color: '#DFDFDF', }}>
                                -
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {abc} шт.
                            </Text>
                        </Text>
                    </View>
                    <View style={{

                        flexDirection: "row",
                        // justifyContent: 'space-between',
                        // flexWrap: "wrap",
                        // marginHorizontal: 26,
                        alignItems: 'center'

                    }}>

                        {/* <View >
              <TouchableOpacity onPress={scooterListSendToTelegram}>
                <View style={[styles.button4, {
                  marginRight: 10,

                }]} >

                  <Text style={[styles.buttonText4, { marginVertical: 1 }]}>
                    ОТПРАВИТЬ В ТГ
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}

                        <View>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <View style={styles.button3}>
                                    <AntDesign name="copy1" size={18} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                {/* <View >
          <TouchableOpacity onPress={scooterListSendToTelegram}>
            <View style={styles.button3}>
              <Text style={styles.buttonText3}>
                ОТПРАВИТЬ В ТЕЛЕГРАМ
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity onPress={getLocation}>
            <View style={styles.button3}>
              <Text style={styles.buttonText3}>
                ГЕО
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}

                <ScrollView
                    style={[{
                        paddingVertical: 10,
                    }]}
                >
                    {todos.length ?
                        <View style={[styles.container, {

                            flexDirection: "row",
                            justifyContent: 'space-between',
                            flexWrap: "wrap",
                            marginHorizontal: 26,

                        }]}>
                            {todos.map(todo => (
                                <Todo todo={todo} key={todo.id} onRemove={removeTodo} />
                            ))}
                        </View>
                        :
                        <View style={styles.imgwrap}>
                            <Image
                                style={styles.image}
                                source={require('../src/img/empty.png')}
                            />
                        </View>}

                </ScrollView>

            </View >

            {/* <View style={styles.Two}>


      </View> */}

            < View style={styles.Three} >
                {/* Кнопка копирования списка */}

                {/* Кнопка удаления списка */}
                {/* <View style={styles.deletebutton}>
          <Button title='Отчистить' onPress={pressDelete} color='#B0605F' />
        </View>
        <View style={styles.deletebutton}>
          <Button title='Блок ВСЕ' onPress={scooterlockall} color='#B0605F' />
        </View> */}
                {/* <View style={styles.deletebutton}>
          {
            loading ?
              <View style={styles.deletebutton}><ActivityIndicator size="large" color="#00ffff" /></View>
              :
              <Button title='Разблок ВСЕ' onPress={scooterunlockall} color='#B0605F' />
          }

        </View> */}
                <TouchableOpacity onPress={scooterGoBrokenAlert} disabled={scooterGoBrokenDisabledButton}>
                    <View
                        style={{
                            ...styles.button,
                            backgroundColor: loadingBroken ? "#444647" : "#444647",
                            backgroundColor: scooterGoBrokenDisabledButton ? "#E7E6E6" : "#444647",
                        }}
                    >
                        {loadingBroken && <ActivityIndicator style={styles.buttonText333} size="large" color="white" />}
                        <Text style={styles.buttonText}>
                            {loadingBroken ? "" : scooterGoBrokenDisabledButton ? "Блестяще" : "В ПОЛОМКУ"}
                            {/* {scooterGoBrokenDisabledButton ? "" : "В ПОЛОМКУ"} */}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={pressDelete}>
                    <View style={styles.button2}>

                        <MaterialIcons name="delete-sweep" size={26} color="white" />

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={scooterGoOpenBatteryAlert} disabled={scooterGoOpenBatteryDisabledButton}>
                    <View style={{
                        ...styles.button22,
                        backgroundColor: !scooterGoOpenBatteryDisabledButton ? "#919E42" : "#E7E6E6",
                    }}>
                        {!loadingGoOpenBattery ?
                            <MaterialCommunityIcons name="battery-charging-medium" size={26} color="white" />
                            :
                            <ActivityIndicator size="large" color="white" />
                        }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={scooterGoAvailableAlert}>
                    <View
                        style={{
                            ...styles.button,
                            backgroundColor: loadingAvailable ? "#2F71A2" : "#2F71A2",
                            backgroundColor: scooterGoAvailableDisabledButton ? "#E7E6E6" : "#2F71A2",
                        }}
                    >
                        {loadingAvailable && <ActivityIndicator style={styles.buttonText333} size="large" color="white" />}
                        <Text style={styles.buttonText}>
                            {loadingAvailable ? "" : scooterGoAvailableDisabledButton ? "Блестяще" : "В СВОБОДЕН"}
                        </Text>
                    </View>
                </TouchableOpacity>



                {/* <View style={styles.addbutton}>
          <Button title='РАЗБЛОКИРОВАТЬ' onPress={getContent} color='#2A71A3' />
        </View> */}
                {/* <View style={styles.addbutton}>
          <Button title='ЗАБЛОКИРОВАТЬ' onPress={getContent2} color='#0000A3' />
        </View> */}
                {/* <View style={styles.addbutton}>
          <Button title='РАЗБЛОКИРОВАТЬ' onPress={TESTTTT} color='#2A71A3' />
        </View> */}
                {/* <View style={styles.addbutton}>
          <Button title='ЗАБЛОКИРОВАТЬ' color='#0000A3' />
        </View> */}
            </View >

        </View >
    )
}

const styles = StyleSheet.create({
    MainScreen: {
        flex: 1
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
    titlelistscooters: {
        // paddingHorizontal: 30,
        paddingVertical: 5,
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
    button3: {
        // flex: 1,
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-evenly",
        backgroundColor: '#33853B',

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
    counterandbutton: {
        flexDirection: "row",
        backgroundColor: '#DFDFDF',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 30,

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
    imgwrap: {

        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        height: 220,

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.4
    }
})

export default MainScreen

// const styles = StyleSheet.create({})