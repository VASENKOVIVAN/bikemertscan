import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {
  changeValueInputAddNumberOpen,
  changeValueInputAddNumberOpenRemont,
} from "../store/actions/post";
import { UID_LIST } from "../UIDS/UIDS";
import { getAuth } from "firebase/auth";
import axios from "axios";
export const TitleLine = () => {
  // Данные аутентификация
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid.toString();
  // Тост успеха
  const showToastWithCopy = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Скопировано",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  // Список номеров для отправки в ТГ
  let NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD = useSelector(
    (state) => state.post.allAddedObjectsArray
  )
    .map((num) => num.title + "")
    .join(",\n");

  const copyToClipboard = () => {
    Clipboard.setStringAsync(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
    showToastWithCopy();
  };

  // Получаем массив добавленных объектов в переменную
  const ALL_ADDED_OBJECTS_ARRAY = useSelector(
    (state) => state.post.allAddedObjectsArray
  );

  // Объявляем диспач (чтобы пушить объекты в стор)
  const dispatch = useDispatch();

  const InputAddNumberOpen = () => {
    dispatch(changeValueInputAddNumberOpen());
  };
  const InputAddNumberOpenRemont = () => {
    if (NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD.length !== 6) {
      console.log("Нужно выбрать только 1 самокат");
      console.log(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
    } else {
      console.log("Успех!");
      console.log(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);

      dispatch(changeValueInputAddNumberOpenRemont());
    }
  };

  const [DATA_FIREBASE, setDATA_FIREBASE] = useState({
    API_RIC_KEY: "",
    API_TELEGRAM_KEY: "",
    TELEGRAM_KEY_CHAT_ID_MURMANSK: "",
    TELEGRAM_KEY_CHAT_ID_ARCHANGELSK: "",
  });

  const [value, onChangeText] = React.useState("Useless Multiline Placeholder");

  const sendToTg = async () => {
    if (NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD.length !== 6) {
      console.log("Нужно выбрать только 1 самокат");
      console.log(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
    } else {
      console.log("Успех!");
      console.log(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);

      sendToTg2();
    }
  };

  const sendToTg2 = async () => {
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

    setDATA_FIREBASE({
      API_RIC_KEY: API_RIC_KEY,
      API_TELEGRAM_KEY: MAP_DATA_REQUEST_FIREBASE[1].title,
      TELEGRAM_KEY_CHAT_ID_MURMANSK: MAP_DATA_REQUEST_FIREBASE[2].title,
      TELEGRAM_KEY_CHAT_ID_ARCHANGELSK: MAP_DATA_REQUEST_FIREBASE[3].title,
    });
    // Chat ID Telegram
    let TELEGRAM_KEY_CHAT_ID;
    if (uid == UID_LIST.UID_ARCHANGELSK) {
      TELEGRAM_KEY_CHAT_ID = DATA_FIREBASE.TELEGRAM_KEY_CHAT_ID_ARCHANGELSK;
    } else {
      TELEGRAM_KEY_CHAT_ID = DATA_FIREBASE.TELEGRAM_KEY_CHAT_ID_MURMANSK;
    }

    // Переменная для сообщения, которое отправлю в Telegram
    let message;

    message = `*В ремонт: *${NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD}\n*Описание: *\nСломан руль`;

    console.log(NUMBERS_LIST_FOT_PUSH_TO_CLIPBOARD);
    // Асинхронная функция на axios для отправки POST запроса, для отправки сообщения в Телеграм
    const REQUEST_TELEGRAM_MESSAGE_PUSH = await axios.post(
      `https://api.telegram.org/bot${DATA_FIREBASE.API_TELEGRAM_KEY}/sendMessage`,
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
    console.log(
      "\nОтправка сообщения в ТГ: " + REQUEST_TELEGRAM_MESSAGE_PUSH.status
    );
  };

  return (
    <View style={styles.containerCounterAndButtons}>
      <View style={styles.titleCounter}>
        <Text style={styles.containerCounterAndButtonsTitle}>Выбрано:</Text>
        <Text style={styles.titleValue}>
          {ALL_ADDED_OBJECTS_ARRAY.length} шт.
        </Text>
      </View>

      <View style={styles.containerButtons}>
        {/* Кнопка для отчета по поломке самокатов */}
        {/* <TouchableOpacity
          style={styles.buttons}
          onPress={InputAddNumberOpenRemont}
        >
          <View style={styles.containerCounterAndButtonsButtonRemont}>
            <FontAwesome name="wrench" size={18} color="white" />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.buttons} onPress={InputAddNumberOpen}>
          <View style={styles.containerCounterAndButtonsButtonAdd}>
            <FontAwesome name="pencil-square-o" size={18} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={copyToClipboard}>
          <View style={styles.containerCounterAndButtonsButtonCopy}>
            <AntDesign name="copy1" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCounterAndButtons: {
    flexDirection: "row",
    backgroundColor: "#DFDFDF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  containerCounterAndButtonsTitle: {
    paddingVertical: 7,
    backgroundColor: "#DFDFDF",
    marginRight: 5,
  },
  containerCounterAndButtonsButtonAdd: {
    backgroundColor: "#728ACA",
    borderRadius: 4,
    fontSize: 19,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerCounterAndButtonsButtonRemont: {
    backgroundColor: "#a33c3c",
    borderRadius: 4,
    fontSize: 19,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  containerCounterAndButtonsButtonCopy: {
    backgroundColor: "#6FA75C",
    borderRadius: 4,
    fontSize: 19,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  titleText: {
    color: "#DFDFDF",
  },
  titleValue: {
    fontWeight: "bold",
  },
  containerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    marginRight: 15,
  },
  titleCounter: {
    flexDirection: "row",
    alignItems: "center",
  },
});
