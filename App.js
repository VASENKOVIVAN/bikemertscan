import React, { useState, useEffect, Component } from 'react'
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import { Navbar } from './src/Navbar'
import { AddTodo } from './src/AddTodo'
import { Todo } from './src/Todo'
import * as Clipboard from 'expo-clipboard';
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { Alert } from 'react-native-web';

export default function App() {

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MjkwZDFmNjQ0NDRjOTAwMTAyNGM2ZWYiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1MzY1ODEwMiwiZXhwIjoxNjU2MTkwODAwfQ.ky2HUNdE86MigVhCT_VjtXvszEMiGeOgXxV5sgCkJVM"
  );

  var requestOptionsPOST = {
    method: "POST",
    headers: myHeaders,
  };

  var requestOptionsGET = {
    method: "GET",
    headers: myHeaders,
  };


  const showToastWithError401 = () => {
    ToastAndroid.showWithGravityAndOffset(
      "ERROR 401\nОБРАТИТЕСЬ К РАЗРАБОТЧИКУ",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const showToastWithCopy = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Скопировано",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const showToastWithGoAvailable = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Переведено в СВОБОДЕН и\nОтправлено в Телеграм",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const showToastWithGoBroken = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Переведено в ПОЛОМКУ и\nОтправлено в Телеграм",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const showToastWithCleared = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Очищено",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [loadingBroken, setLoadingBroken] = useState(false);

  const scooterGoBroken = async () => {

    setLoadingBroken(!loadingBroken);

    const api_url_objects_list_count = await
      fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, requestOptionsGET);
    const dataObjectsListCount = await api_url_objects_list_count.json();

    if (api_url_objects_list_count.status == 401) {
      console.log('Error-401');
      showToastWithError401();
    } else {

      console.log('Кол-во объектов: ' + dataObjectsListCount.length)

      for (var i = 0; i < todos.length; i++) {
        console.log('ЦИКЛ: ' + i);
        for (let j = 0; j < dataObjectsListCount.length; j++) {

          if (dataObjectsListCount[j].config.data.qr == todos[i].title) {
            console.log('Н А Й Д Е Н О ! ! ! ! !')
            console.log('Номер по RIC: ' + j)
            console.log('Вывод QR из RIC: ' + dataObjectsListCount[j].config.data.qr)
            console.log('Вывод QR из скана: ' + todos[i].title)
            console.log('Вывод ID из RIC: ' + dataObjectsListCount[j]._id)
            console.log('ЗАПУСКАЮ КОМАНДУ НА ПЕРЕВОД В ПОЛОМКУ!!!!!')
            try {
              const api_url_scooterlockall = await
                fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/change-status-broken?withChildGroups=true`, requestOptionsPOST);
              console.log('response.status: ', api_url_scooterlockall.status);
            }
            catch (err) {
              console.log(err);

            }
          }
        }
      }

      const TOKEN_TELEGRAM = "5486245743:AAG-NZzrNigBA3uquPHqt07f9aeNe8dpgvQ";
      const CHAT_ID = "-639005167";
      const URI_API_MESSAGE = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendMessage`;
      const URI_API_LOCATION = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendLocation`;

      const scooterListSendToTelegramBroken = async () => {
        let message = `Забрал и перевел в поломку:\n${scootlistnum}`;
        console.log(message);

        const api_urlTG = await
          axios.post(URI_API_MESSAGE, {
            chat_id: CHAT_ID,
            text: message
          });

        try {
          const response = await Location.requestForegroundPermissionsAsync();
          console.log(response);
          const { coords } = await Location.getCurrentPositionAsync();
          let x = coords.latitude.toString();
          let y = coords.longitude.toString();
          // console.log('Широта2: ', x, ' Долгота2: ', y,);
          const api_urlTG2 = await
            axios.post(URI_API_LOCATION, {
              chat_id: CHAT_ID,
              latitude: x,
              longitude: y,
            })
        } catch (error) {
          Alert.alert('Не могу гео найти');
        }
      }
      scooterListSendToTelegramBroken();

      setLoadingBroken(loadingBroken);
      showToastWithGoBroken();
    }
  }





  // Функция
  const scooterGoAvailable = async () => {


    setLoadingAvailable(!loadingAvailable);


    const api_url_objects_list_count = await
      fetch(`https://app.rightech.io/api/v1/objects?withChildGroups=true`, requestOptionsGET);
    const dataObjectsListCount = await api_url_objects_list_count.json();

    if (api_url_objects_list_count.status == 401) {
      console.log('Error-401');
      showToastWithError401();
    } else {

      console.log('Кол-во объектов: ' + dataObjectsListCount.length)

      for (var i = 0; i < todos.length; i++) {
        console.log('ЦИКЛ: ' + i);
        for (let j = 0; j < dataObjectsListCount.length; j++) {
          if (dataObjectsListCount[j].config.data.qr == todos[i].title) {
            console.log('Н А Й Д Е Н О ! ! ! ! !')
            console.log('Номер по RIC: ' + j)
            console.log('Вывод QR из RIC: ' + dataObjectsListCount[j].config.data.qr)
            console.log('Вывод QR из скана: ' + todos[i].title)

            // console.log('Вывод ТЕСТА 1: ' + todos[i].teston)
            // todos[i].teston = dataObjectsListCount[j].state.online
            // console.log('Вывод ТЕСТА 2: ' + todos[i].teston)

            console.log('Вывод ID из RIC: ' + dataObjectsListCount[j]._id)
            console.log('ЗАПУСКАЮ КОМАНДУ НА ПЕРЕВОД В СВОБОДЕН!!!!!')
            const api_url_scooterunlockall = await
              fetch(`https://app.rightech.io/api/v1/objects/${dataObjectsListCount[j]._id}/commands/change-status-available?withChildGroups=true`, requestOptionsPOST);
            // .then(function (response) {
            //   console.log(response.status);
            // });
            console.log('response.status: ', api_url_scooterunlockall.status);

            const api_url_scooterunlockall_data = await api_url_scooterunlockall.json();
            console.log(api_url_scooterunlockall_data)
          }
        }
      }

      const TOKEN_TELEGRAM = "5486245743:AAG-NZzrNigBA3uquPHqt07f9aeNe8dpgvQ";
      const CHAT_ID = "-639005167";
      const URI_API_MESSAGE = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendMessage`;
      const URI_API_LOCATION = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendLocation`;

      const scooterListSendToTelegramAvailable = async () => {
        let message = `Выставил и перевел в свободен:\n${scootlistnum}`;
        console.log(message);

        const api_urlTG = await
          axios.post(URI_API_MESSAGE, {
            chat_id: CHAT_ID,
            text: message
          });

        try {
          const response = await Location.requestForegroundPermissionsAsync();
          console.log(response);
          const { coords } = await Location.getCurrentPositionAsync();
          let x = coords.latitude.toString();
          let y = coords.longitude.toString();
          // console.log('Широта2: ', x, ' Долгота2: ', y,);
          const api_urlTG2 = await
            axios.post(URI_API_LOCATION, {
              chat_id: CHAT_ID,
              latitude: x,
              longitude: y,
            })
        } catch (error) {
          Alert.alert('Не могу гео найти');
        }
      }
      scooterListSendToTelegramAvailable();

      setLoadingAvailable(loadingAvailable);
      showToastWithGoAvailable();
    }

  }


  const getLocation = async () => {
    try {
      const response = await Location.requestForegroundPermissionsAsync();
      console.log(response);
      const { coords } = await Location.getCurrentPositionAsync();
      console.log('Широта: ', coords.latitude, ' Долгота: ', coords.longitude,);
    } catch (error) {
      Alert.alert('Не могу гео найти');
    }
  }







  const TOKEN_TELEGRAM = "5486245743:AAG-NZzrNigBA3uquPHqt07f9aeNe8dpgvQ";
  const CHAT_ID = "-639005167";
  const URI_API_MESSAGE = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendMessage`;
  const URI_API_LOCATION = `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendLocation`;

  const scooterListSendToTelegram = async () => {
    let message = `Выставил:\n${scootlistnum}`;
    console.log(message);

    const api_urlTG = await
      axios.post(URI_API_MESSAGE, {
        chat_id: CHAT_ID,
        text: message
      });

    try {
      const response = await Location.requestForegroundPermissionsAsync();
      console.log(response);
      const { coords } = await Location.getCurrentPositionAsync();
      let x = coords.latitude.toString();
      let y = coords.longitude.toString();
      // console.log('Широта2: ', x, ' Долгота2: ', y,);
      const api_urlTG2 = await
        axios.post(URI_API_LOCATION, {
          chat_id: CHAT_ID,
          latitude: x,
          longitude: y,
        })
    } catch (error) {
      Alert.alert('Не могу гео найти');
    }
  }

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
  console.log("Первое: ", scootlistnum)
  // console.log("Первое: ", todos[3].title)


  // let scootlistnum2 = scootlistnum.replace("*,", " ,");
  // console.log("Второе: ", scootlistnum2)
  const copyToClipboard = () => {
    Clipboard.setStringAsync(scootlistnum);
    showToastWithCopy();
  };


  const [textscoot, onChangeText] = useState("");

  const [show, setShow] = useState(false)



  return (

    <View style={styles.MainScreen}>

      <View style={styles.One} >

        <Navbar title='BikeMe - Scanner' />

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
            // backgroundColor: "red",
            paddingVertical: 10,

            // marginHorizontal: 30,
            // flex: 2,
            // height: 100,
          }]}
        >
          <View style={[styles.container, {

            flexDirection: "row",
            justifyContent: 'space-between',
            flexWrap: "wrap",
            marginHorizontal: 26,

          }]}>
            {todos.map(todo => (
              <Todo todo={todo} key={todo.id} />
            ))}
          </View>

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
        <TouchableOpacity onPress={scooterGoBroken}>
          <View
            style={{
              ...styles.button,
              backgroundColor: loadingBroken ? "#444647" : "#444647",
            }}
          >
            {loadingBroken && <ActivityIndicator style={styles.buttonText333} size="large" color="white" />}
            <Text style={styles.buttonText}>
              {loadingBroken ? "" : "В ПОЛОМКУ"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={pressDelete}>
          <View style={styles.button2}>
            <MaterialIcons name="delete-sweep" size={26} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={scooterGoAvailable}>
          <View
            style={{
              ...styles.button,
              backgroundColor: loadingAvailable ? "#2F71A2" : "#2F71A2",
            }}
          >
            {loadingAvailable && <ActivityIndicator style={styles.buttonText333} size="large" color="white" />}
            <Text style={styles.buttonText}>
              {loadingAvailable ? "" : "В СВОБОДЕН"}
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
    backgroundColor: 'white',
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
    width: 110,
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
    fontSize: 14
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

  }
})
