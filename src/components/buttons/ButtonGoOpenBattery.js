import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import * as Location from 'expo-location'
import { getAuth } from "firebase/auth"
import { addNewResultCommandScooter, deleteAllResultCommandScooter } from '../../store/actions/post'
import { UID_LIST } from '../../UIDS/UIDS'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const ButtonGoOpenBattery = () => {

    // Данные аутентификация
    const auth = getAuth()
    const user = auth.currentUser
    const uid = user.uid.toString()

    // Получаем массив добавленных объектов в переменную
    const ALL_ADDED_OBJECTS_ARRAY = useSelector(state => state.post.allAddedObjectsArray)

    // Лоадинг-индикатор (вкл/выкл)
    const [activityIndicatorSwitch, setActivityIndicatorSwitch] = useState(false)

    // Отключение кнопки
    const [disabledButtonSwitch, setDisabledButtonSwitch] = useState(false)

    // Тост успеха
    const showToastSuccess = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Переведено в СВОБОДЕН и\nОтправлено в Телеграм",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    // Тост ошибки (пустой список)
    const showToastErrorEmptyList = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Сначала нужно добавить объекты",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    // Тост ошибки 401 (ключ RIC недействителен)
    const showToastWithError401 = () => {
        ToastAndroid.showWithGravityAndOffset(
            "ERROR 401\nОБРАТИТЕСЬ К РАЗРАБОТЧИКУ",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    // Получаем массив добавленных объектов в переменную
    let RESULTS_COMMANDS_SCOOTERS_ARRAY = useSelector(state => state.post.resultsCommandsScootersArray)

    // Алерт подтверждения команды
    const goOpenBatteryAlert = () => {
        if (ALL_ADDED_OBJECTS_ARRAY.length == 0) {
            showToastErrorEmptyList()
        } else {
            Alert.alert(
                "Перевести статус в свободен?",
                "Вы уверены, что хотите\nОТКРЫТЬ СЛОТЫ АКБ\nна выбранных самокатах?",
                [
                    {
                        text: "Закрыть",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Да, уверен",
                        onPress: () => goOpenBattery(),
                    }
                ]
            )
        }
    }

    // Объявляем диспач (чтобы пушить объекты в стор)
    const dispatch = useDispatch()

    // Главная команда перевода объектов в статус Свободен, пуша в гугл-таблицы и телеграм
    const goOpenBattery = async () => {

        console.log("\nКОМАНДА ОТКРЫТЬ СЛОТ АКБ = = = = = = = = = =")

        // Проверяем, что список объектов не пустой
        if (ALL_ADDED_OBJECTS_ARRAY.length == 0) {
            showToastErrorEmptyList()
        } else {

            // Устанавливем лоадинг-индикатор и дизейбл кнопки
            setActivityIndicatorSwitch(!activityIndicatorSwitch)
            setDisabledButtonSwitch(!disabledButtonSwitch)

            // Получаем данные из FireBase
            const REQUEST_FIREBASE = await fetch(
                'https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
                {
                    method: 'GET',
                }
            )
            const DATA_REQUEST_FIREBASE = await REQUEST_FIREBASE.json()
            const MAP_DATA_REQUEST_FIREBASE = Object.keys(DATA_REQUEST_FIREBASE).map(key => ({ ...DATA_REQUEST_FIREBASE[key], id: key }))

            // Получаем ключ от RIC из FireBase
            let API_RIC_KEY = MAP_DATA_REQUEST_FIREBASE[0].title

            // Получаем список объектов от RIC
            const REQUEST_RIC_OBJECTS_LIST = await
                fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, {
                    method: "GET",
                    headers: {
                        "Authorization": API_RIC_KEY
                    },
                })
            const DATA_RIC_OBJECTS_LIST = await REQUEST_RIC_OBJECTS_LIST.json()

            // Переменные для хранения гео
            var x = 0
            var y = 0

            // Получаем разрешение на гео и координаты гео
            try {
                // Проверяем и получаем разрешение на использование камеры
                const response46 = await Location.requestForegroundPermissionsAsync()
                // Получаем координаты устройства
                const { coords } = await Location.getCurrentPositionAsync()
                x = coords.latitude.toString()
                y = coords.longitude.toString()
            } catch (error) {
                Alert.alert('Вы не предоставили разрешение на использование гео-позиции (перейдите в настройки)')
            }

            // Если 401 ошибка, то выводим тост и в консоль
            if (REQUEST_RIC_OBJECTS_LIST.status == 401) {
                console.log('Error-401')
                showToastWithError401()
            }
            // Если ошибки нет, запускаем:
            else {

                // Отчищаем массив объектов добавленных в стейт результата
                dispatch(deleteAllResultCommandScooter())

                // Добавляем первый элемент в массив результата (заголовки таблицы)
                dispatch(addNewResultCommandScooter({
                    title: "Номер",
                    online: "Онлайн",
                    command: "Команда"
                }))

                // Переменная, которая будет считать количество ошибок (если ошибки есть добавим в сообщение в тг пинг Ивана)
                let isEroorExists = 0

                // Массив, в котором мы пробегаем по значениям из списка отсканированных объектов
                for (var i = 0; i < ALL_ADDED_OBJECTS_ARRAY.length; i++) {

                    // Переменная, в которую прибавим 1, если самокат найдется
                    // Если не найдется, то после цикла в if выведем ошибку
                    let isScooterExists = 0

                    // Выводим в консоль время
                    console.log("\nВРЕМЯ: " + new Date().toLocaleTimeString())

                    // Выводим в консоль номер цикла
                    console.log('ЦИКЛ: ' + i)

                    // Массив, в котором мы пробегаем по объектам из RIC
                    for (let j = 0; j < DATA_RIC_OBJECTS_LIST.length; j++) {

                        // Ищем отсканированный объект в списке объектов RIC
                        if (DATA_RIC_OBJECTS_LIST[j].config.data.qr == ALL_ADDED_OBJECTS_ARRAY[i].title) {

                            isScooterExists = isScooterExists + 1

                            // Номер QR-кода самоката
                            let numberQrScooter = DATA_RIC_OBJECTS_LIST[j].config.data.qr

                            console.log('Номер самоката:', numberQrScooter)
                            // url api на открытие АКБ (ДЛЯ КНОПКИ "ОТКРЫТЬ АКБ")
                            let url_go_openbattery_command
                            if (numberQrScooter.substr(0, 2) == 29) {
                                url_go_openbattery_command = `https://app.rightech.io/api/v1/objects/${DATA_RIC_OBJECTS_LIST[j]._id}/commands/meulk_cmd?withChildGroups=true`
                                console.log("Архангельск команда АКБ")
                            } else {
                                url_go_openbattery_command = `https://app.rightech.io/api/v1/objects/${DATA_RIC_OBJECTS_LIST[j]._id}/commands/scsetmode-eco-wxs9m-7qnlg?withChildGroups=true`
                                console.log("Мурманск команда АКБ")
                            }

                            // Отправляем команду самокату на изменение статуса
                            const REQUEST_RIC_OBJECT_COMMAND = await
                                fetch(url_go_openbattery_command, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": API_RIC_KEY
                                    },
                                })
                            const DATA_REQUEST_RIC_OBJECT_COMMAND = await REQUEST_RIC_OBJECT_COMMAND.json()

                            // Получаю статус ответа от RIC по выполнению команды
                            let statusResponseCommandRIC = REQUEST_RIC_OBJECT_COMMAND.status
                            console.log('СТАТУС: ' + statusResponseCommandRIC)

                            // Переменная, в которую запишу онлайн самокат или оффлайн
                            let objectStatusOnline = ''

                            // Записываю в переменную онлайн самокат или оффлайн
                            if (DATA_RIC_OBJECTS_LIST[j].state.online) {
                                objectStatusOnline = 'Да'
                            } else {
                                objectStatusOnline = 'Нет'
                            }

                            // Переменная, в которую запишу заголовок ответа запроса на выполнение команды
                            let titleResponse

                            // Проверю самокат OKAI или G30/PRO и в зависимости от того, какая модель самоката запишу заголовок ответа запроса на выполнение команды
                            if (numberQrScooter.substr(0, 2) == 29) {
                                console.log('OKAI')
                                if (statusResponseCommandRIC == 400) {
                                    titleResponse = DATA_REQUEST_RIC_OBJECT_COMMAND.codes[0]
                                } else {
                                    titleResponse = "Какая то ошибка"
                                }
                            } else {
                                console.log('НЕ ОКАИ')
                                if (statusResponseCommandRIC == 400 || statusResponseCommandRIC == 422) {
                                    titleResponse = DATA_REQUEST_RIC_OBJECT_COMMAND.codes[0]
                                } else {
                                    titleResponse = "Какая то ошибка"
                                }
                            }

                            // Тут я выясняю, какой статус ответа на выполнение команды
                            // В зависимости от статуса ответа (422, 200 или другой)
                            // Затем зависимости от ответа на команду и отправлю эти данные в таблицу результата
                            if (statusResponseCommandRIC == 422) {
                                // НИЖЕ ИФЫ ДЛЯ ПЕРЕВОДА В ПОЛОМКУ
                                if (titleResponse == 'error_api_already_broken') {
                                    console.log('  Ответ: Уже в поломке!')
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Уже в поломке'
                                    }))
                                }
                                else if (titleResponse == 'error_api_cant_change_from_taken_to_broken') {
                                    console.log('  Ответ: Самокат в аренде')
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Ошибка (Самокат в аренде)'
                                    }))
                                    isEroorExists = isEroorExists + 1
                                }
                                else if (titleResponse == 'error_api_cant_change_from_reserved_to_broken') {
                                    console.log('  Ответ: Самокат забронирован')
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Ошибка (Самокат забронирован)'
                                    }))
                                    isEroorExists = isEroorExists + 1
                                }
                                else if (titleResponse == 'error_api_cant_change_from_park_to_broken') {
                                    console.log('  Ответ: Самокат в ожидании')
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Ошибка (Самокат в ожидании)'
                                    }))
                                    isEroorExists = isEroorExists + 1

                                }
                                // НИЖЕ ИФЫ ДЛЯ ПЕРЕВОДА В СВОБОДЕН
                                else if (titleResponse == 'error_api_already_available') {
                                    console.log('  Ответ: Уже свободен!')
                                    console.log(titleResponse)
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Уже свободен'
                                    }))
                                }
                                else if (titleResponse == 'error_api_cant_change_from_taken_to_available') {
                                    console.log('  Ответ: Самокат в аренде')
                                    console.log(titleResponse)
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Ошибка (Самокат в аренде)'
                                    }))
                                }
                                else if (titleResponse == 'error_api_cant_change_from_reserved_to_available') {
                                    console.log('  Ответ: Самокат забронирован')
                                    console.log(titleResponse)
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Ошибка (Самокат забронирован)'
                                    }))
                                }
                                else if (titleResponse == 'error_api_cant_change_from_park_to_available') {
                                    console.log('  Ответ: Самокат в ожидании')
                                    console.log(titleResponse)
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: 'Ошибка (Самокат в ожидании)'
                                    }))
                                }
                                // НЕИЗВЕСНАЯ ОШИБКА
                                else {
                                    console.log('  Ответ: НЕИЗВЕСНАЯ ОШИБКА!')
                                    dispatch(addNewResultCommandScooter({
                                        title: numberQrScooter,
                                        online: objectStatusOnline,
                                        command: titleResponse
                                    }))
                                    isEroorExists = isEroorExists + 1
                                }
                            }
                            else if (statusResponseCommandRIC == 200) {
                                console.log('  Ответ: Статус переведен!')
                                dispatch(addNewResultCommandScooter({
                                    title: numberQrScooter,
                                    online: objectStatusOnline,
                                    command: 'Успешно'
                                }))
                            }
                            else {
                                console.log('  Ошибка!\nСтатус ответа: ', statusResponseCommandRIC)
                                dispatch(addNewResultCommandScooter({
                                    title: numberQrScooter,
                                    online: objectStatusOnline,
                                    command: statusResponseCommandRIC + ' ' + titleResponse
                                }))
                                isEroorExists = isEroorExists + 1
                            }

                            // Тут дальше я отправляю в гугл таблицу

                            // Переменная для вычисления даты и времени для отправки в Google Sheet
                            var dateAndTimeNow = new Date().toLocaleTimeString()

                            // Строка query-параметров для отправки в Google Sheet
                            let queryParamsForGoogleSheet = `?p1=${ALL_ADDED_OBJECTS_ARRAY[i].title}&p2=${dateAndTimeNow}&p3=Замена АКБ&p4=${x},${y}`

                            // Отправляю данные в гугл таблицу
                            const REQUEST_GOOGLE_SHEET = await fetch(
                                `https://script.google.com/macros/s/AKfycbzpfVBOETyWNDXES7goQIq3KQ8c3OQupri_y2581JnPblpAgL6TB6r7K7MebVlieai3/exec${queryParamsForGoogleSheet}`,
                                {
                                    method: 'GET',
                                }
                            )
                            console.log("Гугл таблица: " + REQUEST_GOOGLE_SHEET.status)
                        }

                    }

                    // Если самокат с таким номером не найден, выведем ошибку в таблицу результата
                    if (isScooterExists == 0) {
                        console.log("НЕ НАЙДЕН: " + ALL_ADDED_OBJECTS_ARRAY[i].title)
                        dispatch(addNewResultCommandScooter({
                            title: ALL_ADDED_OBJECTS_ARRAY[i].title,
                            online: "-",
                            command: "САМОКАТ НЕ НАЙДЕН!!!"
                        }))
                    }

                }

                // На данном этапе мы пробежали по всем объектам и перевели их в статус

                // = = = = = = = = = = = = = = = = = = = = = = = =
                // Ниже отправим данные в Telegram

                // Переменная для сообщения, которое отправлю в Telegram
                let message

                // Удаляю первый и последний элемент из массива результата (заголовки и отчет Телеграма)
                RESULTS_COMMANDS_SCOOTERS_ARRAY.shift()
                RESULTS_COMMANDS_SCOOTERS_ARRAY.pop()

                // Список номеров для отправки в ТГ
                let NUMBERS_LIST_FOT_PUSH_TELEGRAM = RESULTS_COMMANDS_SCOOTERS_ARRAY.map(num => num.title + ' - ' + num.online + ' - ' + num.command).join("\n")

                // Если ошибок нет, то отправим без пинга, если есть то пингуем
                if (isEroorExists != 0) {
                    message = `*Заменил АКБ:*\n${NUMBERS_LIST_FOT_PUSH_TELEGRAM}\n@vasenkovivan`
                }
                else {
                    message = `*Заменил АКБ:*\n${NUMBERS_LIST_FOT_PUSH_TELEGRAM}`
                }


                console.log('\nСообщение в ТГ: \n' + message)

                // Ключ API Telegram
                let API_TELEGRAM_KEY = MAP_DATA_REQUEST_FIREBASE[1].title

                // Chat ID Telegram
                let TELEGRAM_KEY_CHAT_ID
                if (uid == UID_LIST.UID_ARCHANGELSK) {
                    TELEGRAM_KEY_CHAT_ID = MAP_DATA_REQUEST_FIREBASE[3].title
                } else {
                    TELEGRAM_KEY_CHAT_ID = MAP_DATA_REQUEST_FIREBASE[2].title
                }

                // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
                const REQUEST_TELEGRAM_MESSAGE_PUSH = await
                    axios.post(`https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendMessage`, {
                        chat_id: TELEGRAM_KEY_CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown',
                    })
                console.log("\nОтправка сообщения в ТГ: " + REQUEST_TELEGRAM_MESSAGE_PUSH.status)

                // Отправляю данные в таблицу результата
                if (REQUEST_TELEGRAM_MESSAGE_PUSH.status == 200) {
                    dispatch(addNewResultCommandScooter({
                        title: 'Telegram',
                        online: REQUEST_TELEGRAM_MESSAGE_PUSH.status,
                        command: 'Успешно'
                    }))
                } else {
                    dispatch(addNewResultCommandScooter({
                        title: 'Telegram',
                        online: REQUEST_TELEGRAM_MESSAGE_PUSH.status,
                        command: 'Не отправлено!'
                    }))
                }

                // Асинхронная функция на axios для отправки POST запроса, для отправки гео-позиции устройства в Телеграм
                const REQUEST_TELEGRAM_LOCATION_PUSH = await
                    axios.post(`https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendLocation`, {
                        chat_id: TELEGRAM_KEY_CHAT_ID,
                        latitude: x,
                        longitude: y,
                    })
                console.log("Отправка гео в ТГ: " + REQUEST_TELEGRAM_LOCATION_PUSH.status)

                // Убираем лоадинг-индикатор
                setActivityIndicatorSwitch(activityIndicatorSwitch)

                // Показываем тост успеха
                showToastSuccess()

                // Ждем 5 секунд и выключаем дизейбл кнопки
                setTimeout(() => {
                    setDisabledButtonSwitch(disabledButtonSwitch)
                }, 5000)
            }
        }
    }

    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.buttonContainer,
                    {
                        backgroundColor: disabledButtonSwitch || activityIndicatorSwitch ? "#E7E6E6" : "#919E42",
                    }
                ]}
                onPress={goOpenBatteryAlert}
                disabled={disabledButtonSwitch}
                activeOpacity={0.7}>
                {activityIndicatorSwitch ?
                    <ActivityIndicator size="large" color="white" />
                    :
                    <MaterialCommunityIcons name="battery-charging-medium" size={26} color="white" />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonContainer: {
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        backgroundColor: "#2F71A2"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 11,
    },
    buttonActivityIndicator: {
        alignItems: "center",
    }

})