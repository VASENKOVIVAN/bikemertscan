import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native'
import { Navbar } from './src/Navbar'
import { AddTodo } from './src/AddTodo'
import { Todo } from './src/Todo'
import * as Clipboard from 'expo-clipboard';
import axios from 'axios'
// import { ScrollView } from 'react-native-web'



export default function App() {

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MjkwZDFmNjQ0NDRjOTAwMTAyNGM2ZWYiLCJzdWIiOiI2MGMxY2FhOWFiZmM4NzAwMTBmM2IyYTUiLCJncnAiOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJvcmciOiI2MGE3YzhjMTdlMGI2ODAwMTBhYmE4ZjAiLCJsaWMiOmZhbHNlLCJ1c2ciOiJhcGkiLCJmdWxsIjpmYWxzZSwicmlnaHRzIjoxLjUsImlhdCI6MTY1MzY1ODEwMiwiZXhwIjoxNjU2MTkwODAwfQ.ky2HUNdE86MigVhCT_VjtXvszEMiGeOgXxV5sgCkJVM"
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    // redirect: "follow",
  };

  var requestOptions2 = {
    method: "GET",
    headers: myHeaders,
    // redirect: "follow",
  };

  // console.log("Первое: ", todos[3].title)

  const scooterlockall = async () => {
    for (var i = 0; i < todos.length; i++) {
      console.log('ЦИКЛ: ' + i);
      const api_url = await
        fetch(`https://app.rightech.io/api/v1/objects/${todos[i].title}/commands/scooterlock?withChildGroups=true`, requestOptions);
      const data = await api_url.json();
      console.log(data)
    }

  }
  const scooterunlockall = async () => {
    for (var i = 0; i < todos.length; i++) {
      console.log('ЦИКЛ: ' + i);
      const api_url = await
        fetch(`https://app.rightech.io/api/v1/objects/${todos[i].title}/commands/scooterunlock?withChildGroups=true`, requestOptions);
      const data = await api_url.json();
      console.log(data)
    }

  }

  const scooterlock = async () => {
    const api_url = await
      fetch(`https://app.rightech.io/api/v1/objects/6284878a3335070010a5766b/commands/scooterlock?withChildGroups=true`, requestOptions);
    const data = await api_url.json();
    console.log(data)
  }

  const scooterunlock = async () => {
    const api_url = await
      fetch(`https://app.rightech.io/api/v1/objects`, requestOptions2);
    const data = await api_url.json();
    console.log(data[1].config.data.qr)
    console.log(data[1]._id)
  }


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
    setTodos([])
  }

  const addTodo = title => {
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
  };


  const [textscoot, onChangeText] = useState("");

  return (

    <View style={styles.MainScreen}>

      <View style={styles.One} >

        <Navbar title='TEST - AXIOS' />

        <View style={styles.container}>

          <AddTodo onSubmit={addTodo} />
          {/* {getContent()} */}


        </View>
        <View >

          <View >
            <Text style={styles.titlelistscooters} >Выбранные самокаты:

            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              name='textscootarea'
              value={textscoot}
              placeholder='Введите номер...'
            />
          </View>

          <Text style={styles.titlelistscooters} >Выбранные самокаты:
            <Text style={{ color: '#DFDFDF', }}>
              -
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              {abc} шт.
            </Text>
          </Text>

          {/* <Text selectable={true} style={styles.listscopy}> */}
          {/* Вывод списка самокатов через запятую */}
          {/* {scootlistnum} */}

          {/* </Text> */}

        </View>
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

      </View>

      {/* <View style={styles.Two}>


      </View> */}

      <View style={styles.Three}>
        {/* Кнопка копирования списка */}
        <View style={styles.copybutton}>
          <Button title='Копировать' onPress={copyToClipboard} color='#158B12' />
        </View>
        {/* Кнопка удаления списка */}
        <View style={styles.deletebutton}>
          <Button title='Отчистить' onPress={pressDelete} color='#B0605F' />
        </View>
        <View style={styles.deletebutton}>
          <Button title='Блок ВСЕ' onPress={scooterlockall} color='#B0605F' />
        </View>
        <View style={styles.deletebutton}>
          <Button title='Разблок ВСЕ' onPress={scooterunlockall} color='#B0605F' />
        </View>
        <View style={styles.deletebutton}>
          <Button title='Заблокировать' onPress={scooterlock} color='#B0605F' />
        </View>
        <View style={styles.deletebutton}>
          <Button title='Разблокировать' onPress={scooterunlock} color='#B0605F' />
        </View>
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
      </View>

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
    paddingHorizontal: 30,
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
    paddingHorizontal: 10,
    // paddingVertical: 10,
    flex: 1,
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
    // justifyContent: 'center',
    // width: '100%',
    flexDirection: "row",
    // justifyContent: 'space-around',
    // justifyContent: 'space-between',
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
  }
})
