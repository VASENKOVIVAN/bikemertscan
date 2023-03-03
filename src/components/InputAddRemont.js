import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { UID_LIST } from "../UIDS/UIDS";
import { getAuth } from "firebase/auth";

import { Keyboard } from "react-native";
import {
  addPosts,
  changeValueInputAddNumberOpenRemont,
} from "../store/actions/post";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
export const InputAddRemont = () => {
  // Данные аутентификация
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid.toString();

  // Список номеров для отправки в ТГ
  let NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD = useSelector(
    (state) => state.post.allAddedObjectsArray
  )
    .map((num) => num.title + "")
    .join(",\n");
  console.log("ТУТ", NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
  const [valueNumberInput, setValueNumberInput] = useState("");

  // Объявляем диспач (чтобы пушить объекты в стор)
  const dispatch = useDispatch();

  const inputAddNumberClose = () => {
    dispatch(changeValueInputAddNumberOpenRemont());
  };

  const addNumberREMONT = () => {
    if (NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD.length !== 6) {
      console.log("Нужно выбрать только 1 самокат");
    } else {
      Keyboard.dismiss();
      console.log("Номер: ", NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
      console.log("Сообщение: ", valueNumberInput);
      sendToTg2REMONT();
    }
  };
  const [DATA_FIREBASE, setDATA_FIREBASE] = useState({
    API_RIC_KEY: "",
    API_TELEGRAM_KEY: "",
    TELEGRAM_KEY_CHAT_ID_MURMANSK: "",
    TELEGRAM_KEY_CHAT_ID_ARCHANGELSK: "",
  });
  const sendToTg2REMONT = async () => {
    // Получаем данные из FireBase
    const REQUEST_FIREBASE = await fetch(
      "https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
      {
        method: "GET",
      }
    );

    const DATA_REQUEST_FIREBASE = await REQUEST_FIREBASE.json();
    const MAP_DATA_REQUEST_FIREBASE = Object.keys(DATA_REQUEST_FIREBASE).map(
      (key) => ({ ...DATA_REQUEST_FIREBASE[key], id: key })
    );

    // Получаем ключ от RIC из FireBase
    let API_RIC_KEY = MAP_DATA_REQUEST_FIREBASE[0].title;
    console.log(API_RIC_KEY);

    // Получаем ключ от RIC из FireBase
    let API_TELEGRAM_KEY = MAP_DATA_REQUEST_FIREBASE[1].title;
    console.log(API_RIC_KEY);

    // Получаем ключ от RIC из FireBase
    let TELEGRAM_KEY_CHAT_ID_MURMANSK = MAP_DATA_REQUEST_FIREBASE[2].title;
    console.log(API_RIC_KEY);

    // Получаем ключ от RIC из FireBase
    let TELEGRAM_KEY_CHAT_ID_ARCHANGELSK = MAP_DATA_REQUEST_FIREBASE[3].title;
    console.log(API_RIC_KEY);

    // setDATA_FIREBASE({
    //   API_RIC_KEY: API_RIC_KEY,
    //   API_TELEGRAM_KEY: MAP_DATA_REQUEST_FIREBASE[1].title,
    //   TELEGRAM_KEY_CHAT_ID_MURMANSK: MAP_DATA_REQUEST_FIREBASE[2].title,
    //   TELEGRAM_KEY_CHAT_ID_ARCHANGELSK: MAP_DATA_REQUEST_FIREBASE[3].title,
    // });
    // Chat ID Telegram
    let TELEGRAM_KEY_CHAT_ID;
    if (uid == UID_LIST.UID_ARCHANGELSK) {
      TELEGRAM_KEY_CHAT_ID = TELEGRAM_KEY_CHAT_ID_ARCHANGELSK;
    } else {
      TELEGRAM_KEY_CHAT_ID = TELEGRAM_KEY_CHAT_ID_MURMANSK;
    }

    // Переменная для сообщения, которое отправлю в Telegram
    let message;

    message = `*В ремонт: *${NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD}\n*Описание: *\n${valueNumberInput}`;

    console.log(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
    console.log("API_TELEGRAM_KEY", API_TELEGRAM_KEY);

    console.log("TELEGRAM_KEY_CHAT_ID", TELEGRAM_KEY_CHAT_ID);

    // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
    const REQUEST_TELEGRAM_MESSAGE_PUSH = await axios.post(
      `https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendMessage`,
      {
        // chat_id: "-586513671",
        chat_id: TELEGRAM_KEY_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }
    );
    console.log(
      "\nОтправка сообщения в ТГ: " + REQUEST_TELEGRAM_MESSAGE_PUSH.status
    );

    // Переменная для вычисления даты и времени для отправки в Google Sheet
    var dateAndTimeNow = new Date().toLocaleTimeString();

    let x = 1;
    let y = 1;

    // Строка query-параметров для отправки в Google Sheet
    let queryParamsForGoogleSheet = `?p1=${NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD}&p2=${dateAndTimeNow}&p3=Ремонт&p4=${valueNumberInput}`;

    // Отправляю данные в гугл таблицу
    const REQUEST_GOOGLE_SHEET = await fetch(
      `https://script.google.com/macros/s/AKfycbx3gqovH9iQbZ91rpjug9CNbRFTY-AbKFyPO_OZfbFre1EZ9FYk9CRGmUbH0KiEEMGc7g/exec${queryParamsForGoogleSheet}`,
      {
        method: "GET",
      }
    );
    console.log("Гугл таблица: " + REQUEST_GOOGLE_SHEET.status);
    console.log("ПЕРЕВОЖУ МЕТКИ В РЕМОНТ");
    // Получаем список объектов от RIC
    const REQUEST_RIC_OBJECTS_LIST = await fetch(
      `https://app.rightech.io/api/v1/objects?withChildGroups=true`,
      {
        method: "GET",
        headers: {
          Authorization: API_RIC_KEY,
        },
      }
    );
    const DATA_RIC_OBJECTS_LIST = await REQUEST_RIC_OBJECTS_LIST.json();
    // Массив, в который записываю все id объектов, чтобы потом сменить метки склад/город
    let IDsForLabels = [];
    // console.log(DATA_RIC_OBJECTS_LIST);
    for (let j = 0; j < DATA_RIC_OBJECTS_LIST.length; j++) {
      // Ищем отсканированный объект в списке объектов RIC
      // console.log(
      //   "ТУТ ID",
      //   `${DATA_RIC_OBJECTS_LIST[j].config.data.qr}`,
      //   "  -  ",
      //   `${NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD}`
      // );

      if (
        DATA_RIC_OBJECTS_LIST[j].config.data.qr ==
        NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD
      ) {
        // Добавляем в массив id объекта (массив для изменения метки склад/город)
        IDsForLabels.push(`${DATA_RIC_OBJECTS_LIST[j]._id}`);
        console.log("ТУТ ID", `${DATA_RIC_OBJECTS_LIST[j]._id}`);
      }
    }

    // Строка, которую отправлю в запросе к RIC на смену меток в body
    let rawLinkGoRemont = {
      item: "6401b56688d25900100e705b",
      link: IDsForLabels,
      unlink: [],
    };
    // Запрос на ДОБАВЛЕНИЕ новой метки
    await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
      method: "POST",
      headers: {
        Authorization: API_RIC_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawLinkGoRemont),
    })
      .then((response) =>
        console.log("Метка ремонт (статус): " + response.status)
      )
      .catch((error) => console.log("error", error));
  };
  const addNumberGOTOV = () => {
    if (NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD.length !== 6) {
      console.log("Нужно выбрать только 1 самокат");
    } else {
      Keyboard.dismiss();
      console.log("Номер: ", NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
      console.log("Сообщение: ", valueNumberInput);
      sendToTg2GOTOV();
    }
  };

  const sendToTg2GOTOV = async () => {
    // Получаем данные из FireBase
    const REQUEST_FIREBASE = await fetch(
      "https://bikeme-rt-scanner-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
      {
        method: "GET",
      }
    );

    const DATA_REQUEST_FIREBASE = await REQUEST_FIREBASE.json();
    const MAP_DATA_REQUEST_FIREBASE = Object.keys(DATA_REQUEST_FIREBASE).map(
      (key) => ({ ...DATA_REQUEST_FIREBASE[key], id: key })
    );

    // Получаем ключ от RIC из FireBase
    let API_RIC_KEY = MAP_DATA_REQUEST_FIREBASE[0].title;
    console.log(API_RIC_KEY);

    // Получаем ключ от RIC из FireBase
    let API_TELEGRAM_KEY = MAP_DATA_REQUEST_FIREBASE[1].title;
    console.log(API_RIC_KEY);

    // Получаем ключ от RIC из FireBase
    let TELEGRAM_KEY_CHAT_ID_MURMANSK = MAP_DATA_REQUEST_FIREBASE[2].title;
    console.log(API_RIC_KEY);

    // Получаем ключ от RIC из FireBase
    let TELEGRAM_KEY_CHAT_ID_ARCHANGELSK = MAP_DATA_REQUEST_FIREBASE[3].title;
    console.log(API_RIC_KEY);

    // setDATA_FIREBASE({
    //   API_RIC_KEY: API_RIC_KEY,
    //   API_TELEGRAM_KEY: MAP_DATA_REQUEST_FIREBASE[1].title,
    //   TELEGRAM_KEY_CHAT_ID_MURMANSK: MAP_DATA_REQUEST_FIREBASE[2].title,
    //   TELEGRAM_KEY_CHAT_ID_ARCHANGELSK: MAP_DATA_REQUEST_FIREBASE[3].title,
    // });
    // Chat ID Telegram
    let TELEGRAM_KEY_CHAT_ID;
    if (uid == UID_LIST.UID_ARCHANGELSK) {
      TELEGRAM_KEY_CHAT_ID = TELEGRAM_KEY_CHAT_ID_ARCHANGELSK;
    } else {
      TELEGRAM_KEY_CHAT_ID = TELEGRAM_KEY_CHAT_ID_MURMANSK;
    }

    // Переменная для сообщения, которое отправлю в Telegram
    let message;

    message = `*Починен: *${NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD}\n*Описание: *\n${valueNumberInput}`;

    console.log(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
    console.log("API_TELEGRAM_KEY", API_TELEGRAM_KEY);

    console.log("TELEGRAM_KEY_CHAT_ID", TELEGRAM_KEY_CHAT_ID);

    // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
    const REQUEST_TELEGRAM_MESSAGE_PUSH = await axios.post(
      `https://api.telegram.org/bot${API_TELEGRAM_KEY}/sendMessage`,
      {
        // chat_id: "-586513671",
        chat_id: TELEGRAM_KEY_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }
    );
    console.log(
      "\nОтправка сообщения в ТГ: " + REQUEST_TELEGRAM_MESSAGE_PUSH.status
    );

    // Переменная для вычисления даты и времени для отправки в Google Sheet
    var dateAndTimeNow = new Date().toLocaleTimeString();

    let x = 1;
    let y = 1;

    // Строка query-параметров для отправки в Google Sheet
    let queryParamsForGoogleSheet = `?p1=${NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD}&p2=${dateAndTimeNow}&p3=Починен&p4=${valueNumberInput}`;

    // Отправляю данные в гугл таблицу
    const REQUEST_GOOGLE_SHEET = await fetch(
      `https://script.google.com/macros/s/AKfycbx3gqovH9iQbZ91rpjug9CNbRFTY-AbKFyPO_OZfbFre1EZ9FYk9CRGmUbH0KiEEMGc7g/exec${queryParamsForGoogleSheet}`,
      {
        method: "GET",
      }
    );
    console.log("Гугл таблица: " + REQUEST_GOOGLE_SHEET.status);
    console.log("ПЕРЕВОЖУ МЕТКИ В РЕМОНТ");
    // Получаем список объектов от RIC
    const REQUEST_RIC_OBJECTS_LIST = await fetch(
      `https://app.rightech.io/api/v1/objects?withChildGroups=true`,
      {
        method: "GET",
        headers: {
          Authorization: API_RIC_KEY,
        },
      }
    );
    const DATA_RIC_OBJECTS_LIST = await REQUEST_RIC_OBJECTS_LIST.json();
    // Массив, в который записываю все id объектов, чтобы потом сменить метки склад/город
    let IDsForLabels = [];
    // console.log(DATA_RIC_OBJECTS_LIST);
    for (let j = 0; j < DATA_RIC_OBJECTS_LIST.length; j++) {
      // Ищем отсканированный объект в списке объектов RIC
      // console.log(
      //   "ТУТ ID",
      //   `${DATA_RIC_OBJECTS_LIST[j].config.data.qr}`,
      //   "  -  ",
      //   `${NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD}`
      // );

      if (
        DATA_RIC_OBJECTS_LIST[j].config.data.qr ==
        NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD
      ) {
        // Добавляем в массив id объекта (массив для изменения метки склад/город)
        IDsForLabels.push(`${DATA_RIC_OBJECTS_LIST[j]._id}`);
        console.log("ТУТ ID", `${DATA_RIC_OBJECTS_LIST[j]._id}`);
      }
    }

    // Строка, которую отправлю в запросе к RIC на смену меток в body
    let rawLinkGoRemont = {
      item: "6401b56688d25900100e705b",
      link: [],
      unlink: IDsForLabels,
    };
    // Запрос на ДОБАВЛЕНИЕ новой метки
    await fetch("https://app.rightech.io/api/v1/links/labels/to/objects", {
      method: "POST",
      headers: {
        Authorization: API_RIC_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawLinkGoRemont),
    })
      .then((response) =>
        console.log("Метка ремонт (статус): " + response.status)
      )
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.containerInputAddNumber}>
      <View style={styles.containerInputAddNumberTitleAndButtonClose}>
        <Text style={styles.containerInputAddNumberTitle}>
          Описание проблемы:
        </Text>
        <TouchableOpacity onPress={inputAddNumberClose}>
          <Ionicons name="close-sharp" size={30} color="#DF9A9A" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerInputAddNumberWithButton}>
        {/* <TextInput
          style={styles.containerInputAddNumberViewInput}
          onChangeText={setValueNumberInput}
          keyboardType="number-pad"
          maxLength={6}
          value={valueNumberInput}
          placeholder="Описание..."
        /> */}
        <TextInput
          style={styles.containerInputAddNumberViewInput}
          onChangeText={setValueNumberInput}
          // keyboardType="number-pad"
          editable
          multiline
          numberOfLines={4}
          maxLength={2000}
          value={valueNumberInput}
          placeholder="Описание..."
        />

        {/* <TextInput
          style={styles.containerInputAddNumberViewInput}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={setValueNumberInput}
          value={valueNumberInput}
          placeholder="Описание..."
        /> */}

        {/* <View>
          <Button title="Отправить" onPress={addNumber} color="#2C9B29" />
        </View> */}
      </View>
      <View style={styles.containerInputAddNumberWithButton2}>
        <TouchableOpacity
          style={[styles.buttonContainer1]}
          onPress={addNumberREMONT}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>В ремонт</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={addNumberGOTOV}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Починен</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInputAddNumber: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderColor: "#DFDFDF",
  },
  buttonContainer1: {
    height: 48,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#a33c3c",
  },
  buttonContainer: {
    height: 48,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#2C9B29",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },
  containerInputAddNumberTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  containerInputAddNumberWithButton: {
    flexDirection: "row",
    // height: 100,
    // justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 10,
  },
  containerInputAddNumberWithButton2: {
    flexDirection: "row",
    // height: 100,
    justifyContent: "space-between",
    // alignItems: "center",
    // marginBottom: 10,
  },
  containerInputAddNumberViewInput: {
    borderColor: "#DFDFDF",
    borderWidth: 3,
    flex: 1,
    // marginRight: 30,
  },
  containerInputAddNumberTitleAndButtonClose: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
});
