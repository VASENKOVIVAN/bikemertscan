import React, { useCallback, useState, useEffect, Component, useImperativeHandle, useRef } from 'react'
import * as Location from 'expo-location';
import { Dimensions, StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, Alert, TextInput } from 'react-native'
import { Navbar } from '../src/Navbar'
import { AddTodo } from '../src/AddTodo'
import { AddTodo22 } from '../src/AddTodo22'
import { Keyboard } from 'react-native'
import { Todo } from '../src/Todo'
import { Todo22 } from '../src/Todo22'
import {
    AppRegistry,
    TouchableHighlight
} from 'react-native';
import { AlertPrompt } from 'react-native-alert-prompt';
import prompt from 'react-native-prompt-android';
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { KEYS_TELEGRAM } from '../src/keys/keys-telegram'
import { KEYS_RIC } from '../src/keys/keys-ric'
import { ResultContainer } from '../src/components/ResultContainer'
import { getAuth } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import { UID_LIST } from "../src/UIDS/UIDS";
import * as ScreenOrientation from 'expo-screen-orientation'
import { THEME } from '../src/theme'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

import { useSelector, useDispatch } from "react-redux";
import { addPosts, changeValueInputAddNumberOpen, deleteAllPosts } from '../src/store/actions/post';
import { Todo123 } from '../src/Todo123';
import { ButtonGoAvaliable } from '../src/components/buttons/ButtonGoAvaliable';
import { ButtonGoBroken } from '../src/components/buttons/ButtonGoBroken';

import { ResultsCommandsScootersContainer } from '../src/ResultsCommandsScootersContainer';
import { ButtonGoOpenBattery } from '../src/components/buttons/ButtonGoOpenBattery';
import { ButtonDelete } from '../src/components/buttons/ButtonDelete';
import { ContainerAddedObjects } from '../src/components/containers-tables/ContainerAddedObjects';
import { ImageEmpty } from '../src/components/image/ImageEmpty';
import { ContainerResultsCommands } from '../src/components/containers-tables/ContainerResultsCommands';
import { TitleLine } from '../src/components/TitleLine';
import { InputAddNumber } from '../src/components/InputAddNumber';
import { VersionLine } from '../src/components/VersionLine';

import Constants from 'expo-constants';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const MainScreen = ({ navigation }, setValue) => {


    // Высота экрана для стилей, ни на что не влияет
    // let SCREEN_HEIGHT = Dimensions.get('window');
    // Высота навигатор-бара устройства





    let SCREEN_HEIGHT = Dimensions.get('screen').height
    console.log("SCREEN_HEIGHT 1:", SCREEN_HEIGHT);

    let WINDOW_HEIGHT = Dimensions.get('window').height
    console.log("WINDOW_HEIGHT 1:", WINDOW_HEIGHT);

    let STATUS_HEIGHT = getStatusBarHeight()
    console.log("STATUS_HEIGHT 1:", STATUS_HEIGHT);

    let NAVBAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT - STATUS_HEIGHT
    console.log("NAVBAR_HEIGHT 1:", NAVBAR_HEIGHT);



    let TESTTTTTTTTTTTTTTTT = 0

    const [orientation, setOrientation] = useState(0);

    const TESTFUNK = async (TESTTTTTTTTTTTTTTTT) => {
        const orientationId = await ScreenOrientation.getOrientationAsync();
        console.log("ТЕКУЩАЯ ОРИЕНТАЦИЯ 2564:", orientationId);
        if (orientationId == 1 || orientationId == 2) {
            console.log("Я ТУТ - ");
            TESTTTTTTTTTTTTTTTT = 50
            console.log("Я ТУТ2 - ", TESTTTTTTTTTTTTTTTT);
        } else {
            TESTTTTTTTTTTTTTTTT = 50
        }
    }
    TESTFUNK()
    console.log("Я ТУТ 5644 - ", TESTTTTTTTTTTTTTTTT);
    const listener = async () => {
        console.log('Сменил');

        const orientationId = await ScreenOrientation.getOrientationAsync();
        console.log("ТЕКУЩАЯ ОРИЕНТАЦИЯ 2:", orientationId);

        if (orientationId == 1 || orientationId == 2) {



            setOrientation(12)
            console.log("ВЕРТИКАЛЬНАЯ");
            SCREEN_HEIGHT = Dimensions.get('screen').height
            console.log("SCREEN_HEIGHT 2:", SCREEN_HEIGHT);

            WINDOW_HEIGHT = Dimensions.get('window').height
            console.log("WINDOW_HEIGHT 2:", WINDOW_HEIGHT);

            STATUS_HEIGHT = getStatusBarHeight()
            console.log("STATUS_HEIGHT 2:", STATUS_HEIGHT);

            NAVBAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT - STATUS_HEIGHT
            console.log("NAVBAR_HEIGHT 2:", NAVBAR_HEIGHT);

        } else {



            setOrientation(34)
            console.log("ГОРИЗОНТАЛЬНАЯ");
            SCREEN_HEIGHT = Dimensions.get('screen').height
            console.log("SCREEN_HEIGHT 2:", SCREEN_HEIGHT);

            WINDOW_HEIGHT = Dimensions.get('window').height
            console.log("WINDOW_HEIGHT 2:", WINDOW_HEIGHT);

            STATUS_HEIGHT = getStatusBarHeight()
            console.log("STATUS_HEIGHT 2:", STATUS_HEIGHT);

            NAVBAR_HEIGHT = 0
            console.log("NAVBAR_HEIGHT 2:", NAVBAR_HEIGHT);
        }

    }

    const [count, setCount] = useState(0)

    const onPressLearnMore = () => {
        console.log("BOTTOM_SHEET_HEIGHT123231:", TESTTTTTTTTTTTTTTTT);
        TESTTTTTTTTTTTTTTTT = TESTTTTTTTTTTTTTTTT - 20
        console.log("BOTTOM_SHEET_HEIGHT123231:", TESTTTTTTTTTTTTTTTT);
        setCount(count + 1)
    }
    console.log("Я ТУТ 5644 ---- ", TESTTTTTTTTTTTTTTTT);

    // Высота нижней слайд-панели (минус высота навигатор-бара, минус высота всех элементов, которые должны выводиться)
    let BOTTOM_SHEET_HEIGHT = -NAVBAR_HEIGHT - 1 - 10 - 4 - 5 - 48 - 20 - TESTTTTTTTTTTTTTTTT
    // Насколько можно поднимать слайд-панель
    const MAX_TRANSLATE_Y = BOTTOM_SHEET_HEIGHT - 30;
    // Насколько можно опускать слайд-панель
    const MIN_TRANSLATE_Y = BOTTOM_SHEET_HEIGHT;










    // SCREEN_HEIGHT = Dimensions.get('window');
    // console.log("Я тут: " + SCREEN_HEIGHT);
    // = = = = = = = = = = = = = = = = = = = = = 
    // СЛАЙД-ПАНЕЛЬ
    const translateY = useSharedValue(0);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            // Насколько можно поднимать слайд-панель
            // translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
            // Насколько можно опускать слайд-панель
            // translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y);
        })
        .onEnd(() => {
            // Если подняли панель выше чем BOTTOM_SHEET_HEIGHT, то установи ей высоту BOTTOM_SHEET_HEIGHT (верни назад)
            // if (translateY.value > BOTTOM_SHEET_HEIGHT) {
            //     translateY.value = withSpring(BOTTOM_SHEET_HEIGHT, { damping: 50 })
            // }
            // Если опустили панель ниже чем BOTTOM_SHEET_HEIGHT, то установи ей высоту BOTTOM_SHEET_HEIGHT (верни назад)
            // else if (translateY.value < BOTTOM_SHEET_HEIGHT) {
            //     translateY.value = withSpring(BOTTOM_SHEET_HEIGHT, { damping: 50 })
            // }
        });

    useEffect(() => {
        // Дефолтная установка (на какой высоте будет отображаться слайд-панель)
        // translateY.value = withSpring(WINDOW_HEIGHT + BOTTOM_SHEET_HEIGHT, { damping: 50 });
        translateY.value = withSpring(100, { damping: 50 });

    }, []);
    // Это фича для изменения радиуса закругления углов слайд-панели (хз как работает)
    // const rBottomSheetStyle = useAnimatedStyle(() => {
    //     const borderRadius = interpolate(
    //         translateY.value,
    //         [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
    //         [25, 5],
    //         Extrapolate.CLAMP
    //     );

    //     return {
    //         borderRadius,
    //         transform: [{ translateY: translateY.value }],
    //     };
    // });
    // СЛАЙД-ПАНЕЛЬ
    // = = = = = = = = = = = = = = = = = = = = = 



    // const [orientationIsLandscape, setOrientation] = useState(true)
    // console.log(ScreenOrientation.getOrientationAsync())

    // ScreenOrientation.getOrientationAsync().then((letqScreenOrientation) => console.log(letqScreenOrientation));



    let qweasd = ScreenOrientation.addOrientationChangeListener(listener)



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
    const [inputAddNumber, setInputAddNumber] = useState(false);

    const [loadingBroken, setLoadingBroken] = useState(false);
    const [loadingGoOpenBattery, setLoadingGoOpenBattery] = useState(false);

    const [scooterGoBrokenDisabledButton, setscooterGoBrokenDisabledButton] = useState(false);
    const [scooterGoAvailableDisabledButton, setscooterGoAvailableDisabledButton] = useState(false);
    const [scooterGoOpenBatteryDisabledButton, setscooterGoOpenBatteryDisabledButton] = useState(false);

    const [todos22, setTodos22] = useState([])

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid.toString();


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
                        onPress: () => scooterGoCommand('GoBroken'),
                    }
                ]
            )
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
                        onPress: () => scooterGoCommand('GoAvailable'),
                    }
                ]
            )
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
                        onPress: () => scooterGoCommand('GoOpenBattery'),
                    }
                ]
            )
        }
    }

    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // const scooterGoCommand = async (GoCommand) => {
    //     console.log("\nКоманда: " + GoCommand + " = = = = = = = = = =");
    //     // Проверяем, что список объектов не пустой
    //     if (todos.length == 0) {
    //         showToastErrorEmptyList();
    //     } else {

    //         if (GoCommand == 'GoBroken') {
    //             setLoadingBroken(!loadingBroken);
    //             setscooterGoBrokenDisabledButton(!scooterGoBrokenDisabledButton);
    //         }
    //         else if (GoCommand == 'GoAvailable') {
    //             setLoadingAvailable(!loadingAvailable);
    //             setscooterGoAvailableDisabledButton(!scooterGoAvailableDisabledButton);
    //         }
    //         else {
    //             setLoadingGoOpenBattery(!loadingGoOpenBattery);
    //             setscooterGoOpenBatteryDisabledButton(!scooterGoOpenBatteryDisabledButton);
    //         }

    //         // Получаем ключ
    //         const responseFireBase = await fetch(
    //             'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
    //             {
    //                 method: 'GET',
    //             }
    //         )
    //         const dataResponseFireBase = await responseFireBase.json()
    //         const dataView = Object.keys(dataResponseFireBase).map(key => ({ ...dataResponseFireBase[key], id: key }))
    //         let API_RIC_KEY = dataView[0].title;

    //         // Получаем список объектов от RIC
    //         const RIC_OBJECTS_LIST = await
    //             fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Authorization": API_RIC_KEY
    //                 },
    //             });
    //         const data_RIC_OBJECTS_LIST = await RIC_OBJECTS_LIST.json();

    //         try {
    //             // Проверяем и получаем разрешение на использование камеры
    //             const response46 = await Location.requestForegroundPermissionsAsync();
    //             // Получаем координаты устройства
    //             const { coords } = await Location.getCurrentPositionAsync();
    //             var x = coords.latitude.toString();
    //             var y = coords.longitude.toString();
    //         } catch (error) {
    //             Alert.alert('Вы не предоставили разрешение на использование гео-позиции (перейдите в настройки)');
    //         }

    //         if (RIC_OBJECTS_LIST.status == 401) {
    //             // Если 401 ошибка, то выводим тост и в консоль
    //             console.log('Error-401');
    //             showToastWithError401();
    //         }
    //         // Если ошибки нет, запускаем:
    //         else {

    //             // Массив, в котором мы пробегаем по значениям из списка отсканированных объектов
    //             setTodos22([]);
    //             addTodo22('Номер', 'Онлайн', 'Команда')
    //             let eroorExistsGoBroken = 0;
    //             let IDsForLabels = [];

    //             for (var i = 0; i < todos.length; i++) {
    //                 var now1 = new Date().toLocaleTimeString();
    //                 console.log("\n" + now1); // Выводим в консоль номер цикла

    //                 setCounterPerformedCommands(0)
    //                 console.log('ЦИКЛ: ' + i); // Выводим в консоль номер цикла
    //                 setCounterPerformedCommands(i + 1)

    //                 // Массив, в котором мы пробегаем по объектам из RIC
    //                 for (let j = 0; j < data_RIC_OBJECTS_LIST.length; j++) {
    //                     // Ищем отсканированный объект в списке объектов RIC
    //                     if (data_RIC_OBJECTS_LIST[j].config.data.qr == todos[i].title) {

    //                         IDsForLabels.push(`${data_RIC_OBJECTS_LIST[j]._id}`);

    //                         let url_go_command;
    //                         try {
    //                             if (GoCommand == 'GoBroken') {
    //                                 url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/change-status-broken?withChildGroups=true`
    //                             }
    //                             else if (GoCommand == 'GoAvailable') {
    //                                 url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/change-status-available?withChildGroups=true`
    //                             }
    //                             else {
    //                                 if (uid == UID_LIST.UID_ARCHANGELSK) {
    //                                     url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/meulk_cmd?withChildGroups=true`
    //                                     console.log("Архангельск команда АКБ");
    //                                 } else {
    //                                     url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/scsetmode-eco-wxs9m-7qnlg?withChildGroups=true`
    //                                     console.log("Мурманск команда АКБ");
    //                                 }
    //                             }

    //                             const api_url_scooterlockall = await
    //                                 fetch(url_go_command, {
    //                                     method: "POST",
    //                                     headers: {
    //                                         "Authorization": API_RIC_KEY
    //                                     },
    //                                 });
    //                             // Выводим в консоль статус HTTP ответа
    //                             const data2345 = await api_url_scooterlockall.json()
    //                             let numQrScooter = data_RIC_OBJECTS_LIST[j].config.data.qr
    //                             let objectStatusOnline = 0;

    //                             // console.log(data2345);

    //                             if (data_RIC_OBJECTS_LIST[j].state.online) {
    //                                 objectStatusOnline = 'Да'
    //                             } else {
    //                                 objectStatusOnline = 'Нет'
    //                             }

    //                             let statusResponse = api_url_scooterlockall.status;

    //                             console.log('СТАТУС: ' + statusResponse);

    //                             console.log('Номер самоката:', numQrScooter);

    //                             let titleResponse

    //                             if (numQrScooter.substr(0, 2) == 29) {
    //                                 console.log('OKAI');
    //                                 if (GoCommand == 'GoOpenBattery') {
    //                                     if (statusResponse == 400) {
    //                                         titleResponse = data2345.codes[0];
    //                                     } else {
    //                                         titleResponse = "Какая то ошибка";
    //                                     }
    //                                 }
    //                                 else {
    //                                     if (statusResponse == 200) {
    //                                         titleResponse = "Успешно";


    //                                     } else {
    //                                         titleResponse = data2345.codes[0];
    //                                     }
    //                                 }
    //                             } else {
    //                                 console.log('НЕ ОКАИ');
    //                                 if (statusResponse == 400 || statusResponse == 422) {
    //                                     titleResponse = data2345.codes[0];
    //                                 } else {
    //                                     titleResponse = "Какая то ошибка";
    //                                 }
    //                             }


    //                             if (statusResponse == 422) {
    //                                 // Поломка
    //                                 if (titleResponse == 'error_api_already_broken') {
    //                                     console.log('  Ответ: Уже в поломке!');
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Уже в поломке')
    //                                 }
    //                                 else if (titleResponse == 'error_api_cant_change_from_taken_to_broken') {
    //                                     console.log('  Ответ: Самокат в аренде');
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в аренде)')
    //                                     eroorExistsGoBroken = eroorExistsGoBroken + 1
    //                                 }
    //                                 else if (titleResponse == 'error_api_cant_change_from_reserved_to_broken') {
    //                                     console.log('  Ответ: Самокат забронирован');
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат забронирован)')
    //                                     eroorExistsGoBroken = eroorExistsGoBroken + 1
    //                                 }
    //                                 else if (titleResponse == 'error_api_cant_change_from_park_to_broken') {
    //                                     console.log('  Ответ: Самокат в ожидании');
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в ожидании)')
    //                                     eroorExistsGoBroken = eroorExistsGoBroken + 1

    //                                 }
    //                                 // Свободен
    //                                 else if (titleResponse == 'error_api_already_available') {
    //                                     console.log('  Ответ: Уже свободен!');
    //                                     console.log(titleResponse);
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Уже свободен')
    //                                 }
    //                                 else if (titleResponse == 'error_api_cant_change_from_taken_to_available') {
    //                                     console.log('  Ответ: Самокат в аренде');
    //                                     console.log(titleResponse);
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в аренде)')
    //                                 }
    //                                 else if (titleResponse == 'error_api_cant_change_from_reserved_to_available') {
    //                                     console.log('  Ответ: Самокат забронирован');
    //                                     console.log(titleResponse);
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат забронирован)')
    //                                 }
    //                                 else if (titleResponse == 'error_api_cant_change_from_park_to_available') {
    //                                     console.log('  Ответ: Самокат в ожидании');
    //                                     console.log(titleResponse);
    //                                     addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в ожидании)')
    //                                 }
    //                                 // НЕИЗВЕСНАЯ ОШИБКА
    //                                 else {
    //                                     console.log('  Ответ: НЕИЗВЕСНАЯ ОШИБКА!');
    //                                     addTodo22(numQrScooter, objectStatusOnline, titleResponse)
    //                                     eroorExistsGoBroken = eroorExistsGoBroken + 1
    //                                 }
    //                             }
    //                             else if (statusResponse == 200) {
    //                                 console.log('  Ответ: Статус переведен!');
    //                                 addTodo22(numQrScooter, objectStatusOnline, 'Успешно')
    //                             }
    //                             else {
    //                                 console.log('  Ошибка!\nСтатус ответа: ', statusResponse);
    //                                 addTodo22(numQrScooter, objectStatusOnline, statusResponse + ' ' + titleResponse)
    //                                 eroorExistsGoBroken = eroorExistsGoBroken + 1
    //                             }
    //                         }
    //                         catch (err) {
    //                             console.log(err);
    //                         }
    //                         // console.log('eroorExistsGoBroken1: ' + eroorExistsGoBroken)

    //                         // Запускаем команду на перевод объекта в статус "На складе"
    //                         // try {
    //                         //     const api_url_scooterlockall123 = await
    //                         //         fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/00e9f?withChildGroups=true`, {
    //                         //             method: "POST",
    //                         //             headers: {
    //                         //                 "Authorization": API_RIC_KEY
    //                         //             },
    //                         //         })
    //                         //     console.log(' ПЕРЕВОД "В ГОРОД"');
    //                         //     if (api_url_scooterlockall123.status == 200) {
    //                         //         console.log('  Ответ: Статус переведен!');
    //                         //     } else {
    //                         //         console.log('  Ошибка!\nСтатус ответа: ', api_url_scooterlockall123.status);
    //                         //     }
    //                         // }
    //                         // catch (err) {
    //                         //     console.log(err);
    //                         // }

    //                         // Тут дальше я отправляю в гугл таблицу
    //                         var now = new Date().toLocaleTimeString();
    //                         let objt
    //                         if (GoCommand == 'GoBroken') {
    //                             objt = `?p1=${todos[i].title}&p2=${now}&p3=Забрал&p4=${x},${y}`
    //                         }
    //                         else if (GoCommand == 'GoAvailable') {
    //                             objt = `?p1=${todos[i].title}&p2=${now}&p3=Выставил&p4=${x},${y}`
    //                         }
    //                         else {
    //                             objt = `?p1=${todos[i].title}&p2=${now}&p3=Замена АКБ&p4=${x},${y}`
    //                         }

    //                         const GOOGLE_SHEET_PUSH = await fetch(
    //                             `https://script.google.com/macros/s/AKfycbzpfVBOETyWNDXES7goQIq3KQ8c3OQupri_y2581JnPblpAgL6TB6r7K7MebVlieai3/exec${objt}`,
    //                             {
    //                                 method: 'GET',
    //                             }
    //                         )
    //                         let GOOGLE_SHEET_PUSH_StatusResponse = GOOGLE_SHEET_PUSH.status;
    //                         console.log("Гугл таблица: " + GOOGLE_SHEET_PUSH_StatusResponse);
    //                     }
    //                 }
    //             }

    //             var rawLinkGoBroken
    //             var rawUnlinkGoBroken
    //             var rawLinkGoAvailable
    //             var rawUnlinkGoAvailable

    //             if (GoCommand == 'GoBroken') {
    //                 console.log("ПЕРЕВОЖУ МЕТКИ НА СКЛАД");
    //                 rawLinkGoBroken = {
    //                     "item": "62e235a14630030010ec2131",
    //                     "link": IDsForLabels,
    //                     "unlink": []
    //                 }
    //                 await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
    //                     method: "POST",
    //                     headers: {
    //                         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: JSON.stringify(rawLinkGoBroken),
    //                 })
    //                     .then(response => console.log("Метка склад (статус): " + response.status))
    //                     .catch(error => console.log('error', error));

    //                 rawUnlinkGoBroken = {
    //                     "item": "62e38291595fd50010ade2fb",
    //                     "link": [],
    //                     "unlink": IDsForLabels
    //                 }
    //                 await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
    //                     method: "POST",
    //                     headers: {
    //                         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: JSON.stringify(rawUnlinkGoBroken),
    //                 })
    //                     .then(response => console.log("Метка город анлинк (статус): " + response.status))
    //                     .catch(error => console.log('error', error));
    //             }
    //             else if (GoCommand == 'GoAvailable') {
    //                 console.log("ПЕРЕВОЖУ МЕТКИ В ГОРОД");
    //                 rawLinkGoAvailable = {
    //                     "item": "62e38291595fd50010ade2fb",
    //                     "link": IDsForLabels,
    //                     "unlink": []
    //                 }
    //                 await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
    //                     method: "POST",
    //                     headers: {
    //                         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: JSON.stringify(rawLinkGoAvailable),
    //                 })
    //                     .then(response => console.log("Метка город (статус): " + response.status))
    //                     .catch(error => console.log('error', error));

    //                 rawUnlinkGoAvailable = {
    //                     "item": "62e235a14630030010ec2131",
    //                     "link": [],
    //                     "unlink": IDsForLabels
    //                 }
    //                 await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
    //                     method: "POST",
    //                     headers: {
    //                         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: JSON.stringify(rawUnlinkGoAvailable),
    //                 })
    //                     .then(response => console.log("Метка склад анлинк (статус): " + response.status))
    //                     .catch(error => console.log('error', error));
    //             }




    //             // На данном этапе мы пробежали по всем объектам и перевели их в статус "Поломка"
    //             // Определяем функцию, которая отправит сообщение и гео-позицию в Телеграм
    //             // Определяем сообщение, которое отправим в Телеграм
    //             // let scootlistnumlog = todos22.map(todo22 => todo22.title22 + ' - ' + todo22.code22 + ' - ' + todo22.status22).join("\n");

    //             let message
    //             if (eroorExistsGoBroken != 0) {
    //                 if (GoCommand == 'GoBroken') {
    //                     message = `*Забрал и перевел в поломку:*\n${scootlistnum}\n@vasenkovivan`;
    //                 }
    //                 else if (GoCommand == 'GoAvailable') {
    //                     message = `*Выставил и перевел в свободен:*\n${scootlistnum}\n@vasenkovivan`;
    //                 }
    //                 else {
    //                     message = `*Заменил АКБ:*\n${scootlistnum}\n@vasenkovivan`;
    //                 }
    //             }
    //             else {
    //                 if (GoCommand == 'GoBroken') {
    //                     message = `*Забрал и перевел в поломку:*\n${scootlistnum}`;
    //                 }
    //                 else if (GoCommand == 'GoAvailable') {
    //                     message = `*Выставил и перевел в свободен:*\n${scootlistnum}`;
    //                 }
    //                 else {
    //                     message = `*Заменил АКБ:*\n${scootlistnum}`;
    //                 }
    //             }


    //             console.log('\nСообщение в ТГ: \n' + message)

    //             // Получаем ключ
    //             const response = await fetch(
    //                 'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
    //                 {
    //                     method: 'GET',
    //                 }
    //             )
    //             const data = await response.json()
    //             // console.log('DATATA: ', data)
    //             const dataView = Object.keys(data).map(key => ({ ...data[key], id: key }))
    //             let API_TELEGRAM_KEY = dataView[1].title;

    //             let TELEGRAM_KEY_CHAT_ID
    //             if (uid == UID_LIST.UID_ARCHANGELSK) {
    //                 TELEGRAM_KEY_CHAT_ID = dataView[3].title;
    //             } else {
    //                 TELEGRAM_KEY_CHAT_ID = dataView[2].title;
    //             }
    //             // console.log('КЛЮЧ: ' + API_TELEGRAM_KEY)
    //             // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
    //             const TG_MESSAGE_PUSH = await
    //                 axios.post(`https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendMessage`, {
    //                     chat_id: TELEGRAM_KEY_CHAT_ID,
    //                     text: message,
    //                     parse_mode: 'Markdown',
    //                 });
    //             let TG_MESSAGE_PUSH_StatusResponse = TG_MESSAGE_PUSH.status;
    //             console.log("\nОтправка сообщения в ТГ: " + TG_MESSAGE_PUSH_StatusResponse);

    //             if (TG_MESSAGE_PUSH_StatusResponse == 200) {
    //                 addTodo22("Telegram", TG_MESSAGE_PUSH_StatusResponse, 'Успешно')
    //             } else {
    //                 addTodo22("Telegram", TG_MESSAGE_PUSH_StatusResponse, 'Не отправлено!')
    //             }

    //             // console.log(api_urlTG.status)
    //             // Асинхронная функция на axios для отправки POST запроса, для отправки гео-позиции устройства в Телеграм
    //             const TG_LOCATION_PUSH = await
    //                 axios.post(KEYS_TELEGRAM.URI_API_LOCATION, {
    //                     chat_id: TELEGRAM_KEY_CHAT_ID,
    //                     latitude: x,
    //                     longitude: y,
    //                 })
    //             let TG_LOCATION_PUSH_StatusResponse = TG_LOCATION_PUSH.status;
    //             console.log("Отправка гео в ТГ: " + TG_LOCATION_PUSH_StatusResponse);

    //             if (GoCommand == 'GoBroken') {
    //                 setLoadingBroken(loadingBroken);    // Выключаем loading-индикатор
    //                 showToastWithGoBroken();            // Показываем тост успеха
    //             }
    //             else if (GoCommand == 'GoAvailable') {
    //                 setLoadingAvailable(loadingAvailable);  // Выключаем loading-индикатор
    //                 showToastWithGoAvailable();
    //             }
    //             else {
    //                 setLoadingGoOpenBattery(loadingGoOpenBattery);  // Выключаем loading-индикатор
    //                 showToastWithGoOpenBattery();             // Показываем тост успеха
    //             }

    //             setTimeout(() => {
    //                 if (GoCommand == 'GoBroken') {
    //                     setscooterGoBrokenDisabledButton(scooterGoBrokenDisabledButton);
    //                 }
    //                 else if (GoCommand == 'GoAvailable') {
    //                     setscooterGoAvailableDisabledButton(scooterGoAvailableDisabledButton);
    //                 }
    //                 else {
    //                     setscooterGoOpenBatteryDisabledButton(scooterGoOpenBatteryDisabledButton);
    //                 }
    //             }, 5000);
    //         }
    //     }
    // }
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================


    const objectsInSuper = useSelector(state => state.post.allAddedObjectsArray)
    // console.log("objectsInSuper: ", objectsInSuper.length);

    const scooterGoCommand = async (GoCommand) => {
        console.log("\nКоманда: " + GoCommand + " = = = = = = = = = =");
        // Проверяем, что список объектов не пустой
        if (objectsInSuper.length == 0) {
            showToastErrorEmptyList();
        } else {

            if (GoCommand == 'GoBroken') {
                setLoadingBroken(!loadingBroken);
                setscooterGoBrokenDisabledButton(!scooterGoBrokenDisabledButton);
            }
            else if (GoCommand == 'GoAvailable') {
                setLoadingAvailable(!loadingAvailable);
                setscooterGoAvailableDisabledButton(!scooterGoAvailableDisabledButton);
            }
            else {
                setLoadingGoOpenBattery(!loadingGoOpenBattery);
                setscooterGoOpenBatteryDisabledButton(!scooterGoOpenBatteryDisabledButton);
            }

            // Получаем ключ
            const responseFireBase = await fetch(
                'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
                {
                    method: 'GET',
                }
            )
            const dataResponseFireBase = await responseFireBase.json()
            const dataView = Object.keys(dataResponseFireBase).map(key => ({ ...dataResponseFireBase[key], id: key }))
            let API_RIC_KEY = dataView[0].title;

            // Получаем список объектов от RIC
            const RIC_OBJECTS_LIST = await
                fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, {
                    method: "GET",
                    headers: {
                        "Authorization": API_RIC_KEY
                    },
                });
            const data_RIC_OBJECTS_LIST = await RIC_OBJECTS_LIST.json();

            try {
                // Проверяем и получаем разрешение на использование камеры
                const response46 = await Location.requestForegroundPermissionsAsync();
                // Получаем координаты устройства
                const { coords } = await Location.getCurrentPositionAsync();
                var x = coords.latitude.toString();
                var y = coords.longitude.toString();
            } catch (error) {
                Alert.alert('Вы не предоставили разрешение на использование гео-позиции (перейдите в настройки)');
            }

            if (RIC_OBJECTS_LIST.status == 401) {
                // Если 401 ошибка, то выводим тост и в консоль
                console.log('Error-401');
                showToastWithError401();
            }
            // Если ошибки нет, запускаем:
            else {

                // Массив, в котором мы пробегаем по значениям из списка отсканированных объектов
                setTodos22([]);
                addTodo22('Номер', 'Онлайн', 'Команда')
                let eroorExistsGoBroken = 0;
                let IDsForLabels = [];

                for (var i = 0; i < objectsInSuper.length; i++) {
                    var now1 = new Date().toLocaleTimeString();
                    console.log("\n" + now1); // Выводим в консоль номер цикла

                    setCounterPerformedCommands(0)
                    console.log('ЦИКЛ: ' + i); // Выводим в консоль номер цикла
                    setCounterPerformedCommands(i + 1)

                    // Массив, в котором мы пробегаем по объектам из RIC
                    for (let j = 0; j < data_RIC_OBJECTS_LIST.length; j++) {
                        // Ищем отсканированный объект в списке объектов RIC
                        if (data_RIC_OBJECTS_LIST[j].config.data.qr == objectsInSuper[i].title) {

                            IDsForLabels.push(`${data_RIC_OBJECTS_LIST[j]._id}`);

                            let url_go_command;
                            try {
                                if (GoCommand == 'GoBroken') {
                                    url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/change-status-broken?withChildGroups=true`
                                }
                                else if (GoCommand == 'GoAvailable') {
                                    url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/change-status-available?withChildGroups=true`
                                }
                                else {
                                    if (uid == UID_LIST.UID_ARCHANGELSK) {
                                        url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/meulk_cmd?withChildGroups=true`
                                        console.log("Архангельск команда АКБ");
                                    } else {
                                        url_go_command = `https://app.rightech.io/api/v1/objects/${data_RIC_OBJECTS_LIST[j]._id}/commands/scsetmode-eco-wxs9m-7qnlg?withChildGroups=true`
                                        console.log("Мурманск команда АКБ");
                                    }
                                }

                                const api_url_scooterlockall = await
                                    fetch(url_go_command, {
                                        method: "POST",
                                        headers: {
                                            "Authorization": API_RIC_KEY
                                        },
                                    });
                                // Выводим в консоль статус HTTP ответа
                                const data2345 = await api_url_scooterlockall.json()
                                let numQrScooter = data_RIC_OBJECTS_LIST[j].config.data.qr
                                let objectStatusOnline = 0;

                                // console.log(data2345);

                                if (data_RIC_OBJECTS_LIST[j].state.online) {
                                    objectStatusOnline = 'Да'
                                } else {
                                    objectStatusOnline = 'Нет'
                                }

                                let statusResponse = api_url_scooterlockall.status;

                                console.log('СТАТУС: ' + statusResponse);

                                console.log('Номер самоката:', numQrScooter);

                                let titleResponse

                                if (numQrScooter.substr(0, 2) == 29) {
                                    console.log('OKAI');
                                    if (GoCommand == 'GoOpenBattery') {
                                        if (statusResponse == 400) {
                                            titleResponse = data2345.codes[0];
                                        } else {
                                            titleResponse = "Какая то ошибка";
                                        }
                                    }
                                    else {
                                        if (statusResponse == 200) {
                                            titleResponse = "Успешно";


                                        } else {
                                            titleResponse = data2345.codes[0];
                                        }
                                    }
                                } else {
                                    console.log('НЕ ОКАИ');
                                    if (statusResponse == 400 || statusResponse == 422) {
                                        titleResponse = data2345.codes[0];
                                    } else {
                                        titleResponse = "Какая то ошибка";
                                    }
                                }


                                if (statusResponse == 422) {
                                    // Поломка
                                    if (titleResponse == 'error_api_already_broken') {
                                        console.log('  Ответ: Уже в поломке!');
                                        addTodo22(numQrScooter, objectStatusOnline, 'Уже в поломке')
                                    }
                                    else if (titleResponse == 'error_api_cant_change_from_taken_to_broken') {
                                        console.log('  Ответ: Самокат в аренде');
                                        addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в аренде)')
                                        eroorExistsGoBroken = eroorExistsGoBroken + 1
                                    }
                                    else if (titleResponse == 'error_api_cant_change_from_reserved_to_broken') {
                                        console.log('  Ответ: Самокат забронирован');
                                        addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат забронирован)')
                                        eroorExistsGoBroken = eroorExistsGoBroken + 1
                                    }
                                    else if (titleResponse == 'error_api_cant_change_from_park_to_broken') {
                                        console.log('  Ответ: Самокат в ожидании');
                                        addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в ожидании)')
                                        eroorExistsGoBroken = eroorExistsGoBroken + 1

                                    }
                                    // Свободен
                                    else if (titleResponse == 'error_api_already_available') {
                                        console.log('  Ответ: Уже свободен!');
                                        console.log(titleResponse);
                                        addTodo22(numQrScooter, objectStatusOnline, 'Уже свободен')
                                    }
                                    else if (titleResponse == 'error_api_cant_change_from_taken_to_available') {
                                        console.log('  Ответ: Самокат в аренде');
                                        console.log(titleResponse);
                                        addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в аренде)')
                                    }
                                    else if (titleResponse == 'error_api_cant_change_from_reserved_to_available') {
                                        console.log('  Ответ: Самокат забронирован');
                                        console.log(titleResponse);
                                        addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат забронирован)')
                                    }
                                    else if (titleResponse == 'error_api_cant_change_from_park_to_available') {
                                        console.log('  Ответ: Самокат в ожидании');
                                        console.log(titleResponse);
                                        addTodo22(numQrScooter, objectStatusOnline, 'Ошибка (Самокат в ожидании)')
                                    }
                                    // НЕИЗВЕСНАЯ ОШИБКА
                                    else {
                                        console.log('  Ответ: НЕИЗВЕСНАЯ ОШИБКА!');
                                        addTodo22(numQrScooter, objectStatusOnline, titleResponse)
                                        eroorExistsGoBroken = eroorExistsGoBroken + 1
                                    }
                                }
                                else if (statusResponse == 200) {
                                    console.log('  Ответ: Статус переведен!');
                                    addTodo22(numQrScooter, objectStatusOnline, 'Успешно')
                                }
                                else {
                                    console.log('  Ошибка!\nСтатус ответа: ', statusResponse);
                                    addTodo22(numQrScooter, objectStatusOnline, statusResponse + ' ' + titleResponse)
                                    eroorExistsGoBroken = eroorExistsGoBroken + 1
                                }
                            }
                            catch (err) {
                                console.log(err);
                            }
                            // console.log('eroorExistsGoBroken1: ' + eroorExistsGoBroken)

                            // Запускаем команду на перевод объекта в статус "На складе"
                            // try {
                            //     const api_url_scooterlockall123 = await
                            //         fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/00e9f?withChildGroups=true`, {
                            //             method: "POST",
                            //             headers: {
                            //                 "Authorization": API_RIC_KEY
                            //             },
                            //         })
                            //     console.log(' ПЕРЕВОД "В ГОРОД"');
                            //     if (api_url_scooterlockall123.status == 200) {
                            //         console.log('  Ответ: Статус переведен!');
                            //     } else {
                            //         console.log('  Ошибка!\nСтатус ответа: ', api_url_scooterlockall123.status);
                            //     }
                            // }
                            // catch (err) {
                            //     console.log(err);
                            // }

                            // Тут дальше я отправляю в гугл таблицу
                            var now = new Date().toLocaleTimeString();
                            let objt
                            if (GoCommand == 'GoBroken') {
                                objt = `?p1=${objectsInSuper[i].title}&p2=${now}&p3=Забрал&p4=${x},${y}`
                            }
                            else if (GoCommand == 'GoAvailable') {
                                objt = `?p1=${objectsInSuper[i].title}&p2=${now}&p3=Выставил&p4=${x},${y}`
                            }
                            else {
                                objt = `?p1=${objectsInSuper[i].title}&p2=${now}&p3=Замена АКБ&p4=${x},${y}`
                            }

                            const GOOGLE_SHEET_PUSH = await fetch(
                                `https://script.google.com/macros/s/AKfycbzpfVBOETyWNDXES7goQIq3KQ8c3OQupri_y2581JnPblpAgL6TB6r7K7MebVlieai3/exec${objt}`,
                                {
                                    method: 'GET',
                                }
                            )
                            let GOOGLE_SHEET_PUSH_StatusResponse = GOOGLE_SHEET_PUSH.status;
                            console.log("Гугл таблица: " + GOOGLE_SHEET_PUSH_StatusResponse);
                        }
                    }
                }

                var rawLinkGoBroken
                var rawUnlinkGoBroken
                var rawLinkGoAvailable
                var rawUnlinkGoAvailable

                if (GoCommand == 'GoBroken') {
                    console.log("ПЕРЕВОЖУ МЕТКИ НА СКЛАД");
                    rawLinkGoBroken = {
                        "item": "62e235a14630030010ec2131",
                        "link": IDsForLabels,
                        "unlink": []
                    }
                    await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(rawLinkGoBroken),
                    })
                        .then(response => console.log("Метка склад (статус): " + response.status))
                        .catch(error => console.log('error', error));

                    rawUnlinkGoBroken = {
                        "item": "62e38291595fd50010ade2fb",
                        "link": [],
                        "unlink": IDsForLabels
                    }
                    await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(rawUnlinkGoBroken),
                    })
                        .then(response => console.log("Метка город анлинк (статус): " + response.status))
                        .catch(error => console.log('error', error));
                }
                else if (GoCommand == 'GoAvailable') {
                    console.log("ПЕРЕВОЖУ МЕТКИ В ГОРОД");
                    rawLinkGoAvailable = {
                        "item": "62e38291595fd50010ade2fb",
                        "link": IDsForLabels,
                        "unlink": []
                    }
                    await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(rawLinkGoAvailable),
                    })
                        .then(response => console.log("Метка город (статус): " + response.status))
                        .catch(error => console.log('error', error));

                    rawUnlinkGoAvailable = {
                        "item": "62e235a14630030010ec2131",
                        "link": [],
                        "unlink": IDsForLabels
                    }
                    await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmNlYjYzODU1ZWFhMTAwMTA0ZTFhZGQiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1NzcxNDIzMiwiZXhwIjoxNjYwMjUxNjAwfQ.3xbtlgva90_2DMQi95dutbCYEy-BIzmlEWqRUi2lZ8M",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(rawUnlinkGoAvailable),
                    })
                        .then(response => console.log("Метка склад анлинк (статус): " + response.status))
                        .catch(error => console.log('error', error));
                }




                // На данном этапе мы пробежали по всем объектам и перевели их в статус "Поломка"
                // Определяем функцию, которая отправит сообщение и гео-позицию в Телеграм
                // Определяем сообщение, которое отправим в Телеграм
                // let scootlistnumlog = todos22.map(todo22 => todo22.title22 + ' - ' + todo22.code22 + ' - ' + todo22.status22).join("\n");

                let message
                if (eroorExistsGoBroken != 0) {
                    if (GoCommand == 'GoBroken') {
                        message = `*Забрал и перевел в поломку:*\n${scootlistnum}\n@vasenkovivan`;
                    }
                    else if (GoCommand == 'GoAvailable') {
                        message = `*Выставил и перевел в свободен:*\n${scootlistnum}\n@vasenkovivan`;
                    }
                    else {
                        message = `*Заменил АКБ:*\n${scootlistnum}\n@vasenkovivan`;
                    }
                }
                else {
                    if (GoCommand == 'GoBroken') {
                        message = `*Забрал и перевел в поломку:*\n${scootlistnum}`;
                    }
                    else if (GoCommand == 'GoAvailable') {
                        message = `*Выставил и перевел в свободен:*\n${scootlistnum}`;
                    }
                    else {
                        message = `*Заменил АКБ:*\n${scootlistnum}`;
                    }
                }


                console.log('\nСообщение в ТГ: \n' + message)

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

                let TELEGRAM_KEY_CHAT_ID
                if (uid == UID_LIST.UID_ARCHANGELSK) {
                    TELEGRAM_KEY_CHAT_ID = dataView[3].title;
                } else {
                    TELEGRAM_KEY_CHAT_ID = dataView[2].title;
                }
                // console.log('КЛЮЧ: ' + API_TELEGRAM_KEY)
                // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
                const TG_MESSAGE_PUSH = await
                    axios.post(`https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendMessage`, {
                        chat_id: TELEGRAM_KEY_CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown',
                    });
                let TG_MESSAGE_PUSH_StatusResponse = TG_MESSAGE_PUSH.status;
                console.log("\nОтправка сообщения в ТГ: " + TG_MESSAGE_PUSH_StatusResponse);

                if (TG_MESSAGE_PUSH_StatusResponse == 200) {
                    addTodo22("Telegram", TG_MESSAGE_PUSH_StatusResponse, 'Успешно')
                } else {
                    addTodo22("Telegram", TG_MESSAGE_PUSH_StatusResponse, 'Не отправлено!')
                }

                // console.log(api_urlTG.status)
                // Асинхронная функция на axios для отправки POST запроса, для отправки гео-позиции устройства в Телеграм
                const TG_LOCATION_PUSH = await
                    axios.post(KEYS_TELEGRAM.URI_API_LOCATION, {
                        chat_id: TELEGRAM_KEY_CHAT_ID,
                        latitude: x,
                        longitude: y,
                    })
                let TG_LOCATION_PUSH_StatusResponse = TG_LOCATION_PUSH.status;
                console.log("Отправка гео в ТГ: " + TG_LOCATION_PUSH_StatusResponse);

                if (GoCommand == 'GoBroken') {
                    setLoadingBroken(loadingBroken);    // Выключаем loading-индикатор
                    showToastWithGoBroken();            // Показываем тост успеха
                }
                else if (GoCommand == 'GoAvailable') {
                    setLoadingAvailable(loadingAvailable);  // Выключаем loading-индикатор
                    showToastWithGoAvailable();
                }
                else {
                    setLoadingGoOpenBattery(loadingGoOpenBattery);  // Выключаем loading-индикатор
                    showToastWithGoOpenBattery();             // Показываем тост успеха
                }

                setTimeout(() => {
                    if (GoCommand == 'GoBroken') {
                        setscooterGoBrokenDisabledButton(scooterGoBrokenDisabledButton);
                    }
                    else if (GoCommand == 'GoAvailable') {
                        setscooterGoAvailableDisabledButton(scooterGoAvailableDisabledButton);
                    }
                    else {
                        setscooterGoOpenBatteryDisabledButton(scooterGoOpenBatteryDisabledButton);
                    }
                }, 5000);
            }
        }
    }

    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================

    const [counterPerformedCommands, setCounterPerformedCommands] = useState();

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

        const dataView = Object.keys(data).map(key => ({ ...data[key], id: key }))
        let API_RIC_KEY = dataView[0].title;

        // Получаем список объектов от RIC
        const RIC_OBJECTS_LIST = await
            fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, {
                method: "GET",
                headers: {
                    "Authorization": API_RIC_KEY
                },
            });
        // Приводим к формату JSON
        const dataObjectsListCount = await RIC_OBJECTS_LIST.json();

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
        if (RIC_OBJECTS_LIST.status == 401) {
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

                setCounterPerformedCommands(0)
                console.log('ЦИКЛ: ' + i); // Выводим в консоль номер цикла
                setCounterPerformedCommands(i + 1)

                console.log('ЦИКЛ2: ', counterPerformedCommands);
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
                            console.log(data2345);
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
                            let titleResponse
                            if (statusResponse == 422) {
                                titleResponse = data2345.codes[0];
                                console.log(titleResponse);
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
                                titleResponse = data2345.codes[0];

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

                let TELEGRAM_KEY_CHAT_ID
                if (uid == UID_LIST.UID_ARCHANGELSK) {
                    TELEGRAM_KEY_CHAT_ID = dataView[3].title;
                } else {
                    TELEGRAM_KEY_CHAT_ID = dataView[2].title;
                }
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
                        chat_id: TELEGRAM_KEY_CHAT_ID,
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



    // Функция кнопки "В ПОЛОМКУ" 
    // Перевод объектов в статус "Свободен" 
    const scooterGoOpenBattery = async () => {

        setLoadingGoOpenBattery(!loadingGoOpenBattery);
        setscooterGoOpenBatteryDisabledButton(!scooterGoOpenBatteryDisabledButton);

        const responseFireBase = await
            fetch('https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
                {
                    method: 'GET',
                }
            )
        const data = await responseFireBase.json()
        const dataView = Object.keys(data).map(key => ({ ...data[key], id: key }))

        let API_RIC_KEY = dataView[0].title;

        // Получаем список объектов от RIC
        const RIC_OBJECTS_LIST = await
            fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, {
                method: "GET",
                headers: {
                    "Authorization": API_RIC_KEY
                },
            });

        const dataObjectsListCount = await RIC_OBJECTS_LIST.json();

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

        if (RIC_OBJECTS_LIST.status == 401) {
            // Если 401 ошибка, то выводим тост и в консоль
            console.log('Error-401');
            showToastWithError401();
        }
        // Если ошибки нет, запускаем:
        else {
            // Массив, в котором мы пробегаем по значениям из списка отсканированных объектов
            for (var i = 0; i < todos.length; i++) {

                console.log('\nЦИКЛ: ' + i); // Выводим в консоль номер цикла

                for (let j = 0; j < dataObjectsListCount.length; j++) {
                    // Ищем отсканированный объект в списке объектов RIC
                    if (dataObjectsListCount[j].config.data.qr == todos[i].title) {

                        let reqs
                        console.log('ID из RIC: ' + dataObjectsListCount[j]._id)

                        if (uid == UID_LIST.UID_ARCHANGELSK) {
                            reqs = `https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/meulk_cmd?withChildGroups=true`
                            console.log("Арх команда АКБ");
                        } else {
                            reqs = `https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/scsetmode-eco-wxs9m-7qnlg?withChildGroups=true`
                            console.log("Мур команда АКБ");
                        }
                        try {
                            const api_url_scooterlockall = await
                                fetch(reqs, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": API_RIC_KEY
                                    },
                                });
                            // Выводим в консоль статус HTTP ответа
                            console.log('Открытие АКБ статус: ', api_url_scooterlockall.status);
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
                        console.log("Отправка в таблицу: " + response2.status)

                    }
                }
            }
            // На данном этапе мы пробежали по всем объектам и перевели их в статус "Поломка"
            // Определяем функцию, которая отправит сообщение и гео-позицию в Телеграм

            // Определяем сообщение, которое отправим в Телеграм
            let message = `Заменил АКБ:\n${scootlistnum}`;

            let API_TELEGRAM_KEY = dataView[1].title;

            let TELEGRAM_KEY_CHAT_ID
            if (uid == UID_LIST.UID_ARCHANGELSK) {
                TELEGRAM_KEY_CHAT_ID = dataView[3].title;
                console.log("Арх чат ТГ");
            } else {
                TELEGRAM_KEY_CHAT_ID = dataView[2].title;
                console.log("Мур чат ТГ");
            }
            // console.log('КЛЮЧ: ' + API_TELEGRAM_KEY)
            // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
            const api_urlTG = await
                axios.post(`https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendMessage`, {
                    chat_id: TELEGRAM_KEY_CHAT_ID,
                    text: message
                });
            console.log("\nОтправка текста в ТГ: " + api_urlTG.status)
            // Асинхронная функция на axios для отправки POST запроса, для отправки гео-позиции устройства в Телеграм
            const api_urlTG2 = await
                axios.post(KEYS_TELEGRAM.URI_API_LOCATION, {
                    chat_id: TELEGRAM_KEY_CHAT_ID,
                    latitude: x,
                    longitude: y,
                })
            console.log("Отправка гео в ТГ: " + api_urlTG2.status)
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




    // const [todos, setTodos] = useState([
    //     {
    //         "id": "1",
    //         "title": "290001"
    //     },
    //     {
    //         "id": "2",
    //         "title": "290002"
    //     },
    //     {
    //         "id": "3",
    //         "title": "290003"
    //     },
    //     {
    //         "id": "4",
    //         "title": "290004"
    //     },
    //     {
    //         "id": "5",
    //         "title": "290005"
    //     },
    //     {
    //         "id": "6",
    //         "title": "290006"
    //     }
    // ])
    const [todos, setTodos] = useState([])
    // console.log(todos);


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
        setTodos22([]);
        showToastWithCleared();
        dispatch(deleteAllPosts())
    }

    // console.log("allPosts2: ", useSelector(state => state.post.allAddedObjectsArray));
    useSelector(state => state.post.allAddedObjectsArray)
    useSelector(state => state.post.resultsCommandsScootersArray)
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

    const addTodo22 = (title22, code22, status22) => {
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


    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    // const [text, setText] = useState('Not yet scanned')
    // const [result22, setResult22] = useState('')

    const [value22, setValue22] = useState('')

    // What happens when we scan the bar code

    // console.log("тут234 ", value22, "тут ");



    const [value123123, setValue123123] = useState('')
    const dispatch = useDispatch()
    const handleBarCodeScanned22 = () => {

        if (value123123.trim().length < 6) {
            console.log("gegfkegf " + value123123);
            ToastAndroid.showWithGravityAndOffset(
                "ОШИБКА\nВведите шестизначный номер",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            addTodo(value123123)
            Keyboard.dismiss()
            setValue123123('')
            ToastAndroid.showWithGravityAndOffset(
                "Номер добавлен",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            const scooter = {
                title: value123123
            }

            dispatch(addPosts(scooter))

        }



    }

    const inputAddNumberOpenValue = useSelector(state => state.post.inputAddNumberOpen)

    // const InputAddNumberOpen = () => {
    //     setInputAddNumber(true)
    // }
    // const InputAddNumberClose = () => {
    //     setInputAddNumber(false)
    // }
    const InputAddNumberOpen = () => {
        dispatch(changeValueInputAddNumberOpen())
    }
    const InputAddNumberClose = () => {
        dispatch(changeValueInputAddNumberOpen())
    }


    const allAddedObjectsArray = useSelector(state => state.post.allAddedObjectsArray)
    const resultsCommandsScootersArray = useSelector(state => state.post.resultsCommandsScootersArray)

    // console.log("Массив результата (ХомСкрин):\n", useSelector(state => state.post.resultsCommandsScootersArray));
    return (
        <GestureHandlerRootView style={{ flex: 1 }} count={count}>
            <Text >
                {count}
            </Text>
            <View style={styles.MainScreen}>
                {orientation == 34 ?
                    <ScrollView style={styles.One}>
                        <View style={styles.container}>
                            <AddTodo onSubmit={addTodo} />
                        </View>

                        <TitleLine />

                        <ScrollView style={styles.containerWithTables}>
                            <ContainerResultsCommands />
                            <ContainerAddedObjects />
                        </ScrollView>

                        {inputAddNumberOpenValue ?
                            <InputAddNumber />
                            :
                            <GestureDetector gesture={gesture}>
                                {/* <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}> */}
                                <Animated.View style={[styles.bottomSheetContainer]}>

                                    <View style={styles.line} />

                                    <View style={styles.bottomContainer}>
                                        <View style={styles.bottomContainerButtons}>
                                            <ButtonGoBroken />
                                            <ButtonDelete />
                                            <ButtonGoOpenBattery />
                                            <ButtonGoAvaliable />
                                        </View >
                                        <VersionLine />
                                    </View >

                                </Animated.View>
                            </GestureDetector>
                        }

                    </ScrollView >
                    :
                    <View style={styles.One} >
                        <Button
                            onPress={onPressLearnMore}
                            title="Learn More"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />


                        {/* <Text>1231321</Text> */}
                        <View style={styles.container}>
                            <AddTodo onSubmit={addTodo} />
                        </View>

                        <TitleLine />

                        <ScrollView style={styles.containerWithTables}>
                            <ContainerResultsCommands />
                            <ContainerAddedObjects />
                        </ScrollView>

                        {inputAddNumberOpenValue ?
                            <InputAddNumber />
                            :
                            <GestureDetector gesture={gesture} >
                                {/* <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}> */}
                                <Animated.View style={[styles.bottomSheetContainer]}>
                                    <View style={styles.line} />

                                    <View style={styles.bottomContainer}>
                                        <View style={styles.bottomContainerButtons}>
                                            <ButtonGoBroken />
                                            <ButtonDelete />
                                            <ButtonGoOpenBattery />
                                            <ButtonGoAvaliable />
                                        </View >
                                        <VersionLine />
                                    </View >

                                </Animated.View>
                            </GestureDetector>
                        }

                    </View >
                }
            </View >



        </GestureHandlerRootView >
    )
}

const styles = StyleSheet.create({
    container99999: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomSheetContainer: {
        // height: SCREEN_HEIGHT,
        height: 200,

        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        // top: SCREEN_HEIGHT,
        top: '80%',

        borderRadius: 25,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderColor: '#DFDFDF',
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: '#DFDFDF',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 2,
    },
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
        // justifyContent: 'space-between',
        flexWrap: "wrap",
        paddingHorizontal: 8,
        // flexGrow: 4
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
    bottomContainer: {
        flexDirection: "column",
        backgroundColor: 'white',
    },
    bottomContainerButtons: {
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingHorizontal: 30,
        marginVertical: 10
        // paddingTop: 10,

    },
    bottomContainerTitle: {
        alignItems: 'center',

    },
    bottomContainerText: {
        fontSize: 12,
        color: 'lightgray',
        marginVertical: 2,

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
    },
    containerWithTables: {
        paddingVertical: 10
    }
})

export default MainScreen

// const styles = StyleSheet.create({})