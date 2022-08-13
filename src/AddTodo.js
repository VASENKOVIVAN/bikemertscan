import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, ToastAndroid, TouchableOpacity, Image } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { THEME } from './theme'
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import { useSelector, useDispatch } from "react-redux";
import { addPosts } from './store/actions/post';

export const AddTodo = ({ onSubmit }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [text, setText] = useState('Not yet scanned')
  console.log(scanned);
  const [value, setValue] = useState('')


  const askForCameraPermission = () => {
    (async () => {
      // const { status } = await BarCodeScanner.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
    })()
  }
  const isFocused = useIsFocused();
  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);



  // if (hasPermission === null) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Requesting for camera permission</Text>
  //     </View>)
  // }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  const showToastEroorElseExist = () => {
    ToastAndroid.showWithGravityAndOffset(
      "ERROR 401\nОБРАТИТЕСЬ К РАЗРАБОТЧИКУ",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const [qwre, setQwre] = useState(true)

  const qwreqwre = () => {
    console.log("qwre " + qwre);
    setQwre(!qwre)
  }

  const [sound, setSound] = React.useState();
  // What happens when we scan the bar code

  const dispatch = useDispatch()
  const handleBarCodeScanned = ({ type, data, todos }) => {




    playSound()
    setScanned(true);
    setValue(data)
    // console.log('Type: ' + type + '\nData: ' + data)

    var result = data.substring(data.length - 6);

    // if (data.includes('https')) {
    //   // console.log("это ХТТПССССС'");
    //   var result = data.replace("https://murmansk.bikeme.ru/?id=", "");
    // } else {
    //   // console.log("это НЕ ХТТПССССС'");
    //   var result = data.replace("http://murmansk.bikeme.ru/?id=", "");
    // }

    // console.log("тут234 ", result, "тут ");

    // console.log(todos.length);

    // if (todos.length = 0) {
    //   if (result.trim()) {
    //     onSubmit(result)
    //     setValue('')
    //   } else {
    //     // error
    //   }
    // } else {
    //   for (var i = 0; i < todos.length; i++) {
    //     if (todos[i].title == result) {
    //       showToastEroorElseExist();
    //     } else {
    //       if (result.trim()) {
    //         onSubmit(result)
    //         setValue('')
    //       } else {
    //         // error
    //       }
    //     }

    //   }
    // }

    if (result.trim()) {
      onSubmit(result)
      setValue('')
    } else {
      // error
    }


    const scooter = {
      title: result
    }

    dispatch(addPosts(scooter))

  };

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./sound/scan-sound.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  // const pressHandler = () => {
  //   if (result.trim()) {
  //     onSubmit(result)
  //     setValue('')
  //   } else {
  //     // error
  //   }


  // }
  // var result = value.replace("http://murmansk.bikeme.ru/?id=", "");
  // console.log(result);



  // var text = "http://murmansk.bikeme.ru/?id=510011";
  // var result = text.replace("http://murmansk.bikeme.ru/?id=", "");
  // console.log(result);

  // value.replace("http://murmansk.bikeme.ru/?id=", "TEST---");

  const [type, setType] = useState('off');
  const changeFlashMode = () => {
    if (type == 'off') {
      setType('torch')
    } else {
      setType('off')
    }
  }



  return (

    <View style={styles.block}>

      <View style={styles.barcodeboxcontainer}>

        <View style={styles.barcodebox}>

          {isFocused &&
            <Camera style={styles.camera} flashMode={type}
              onBarCodeScanned={scanned ? false : handleBarCodeScanned}
            >

              <View style={styles.buttonContainer}>
                <TouchableOpacity >

                  {type == 'off' ?
                    < Ionicons
                      style={styles.button}
                      name="flash-off"
                      size={20}
                      color="black"
                      onPress={changeFlashMode}
                    />
                    :
                    <Ionicons
                      style={styles.button}
                      name="flash"
                      size={20}
                      color="black"
                      onPress={changeFlashMode}
                    />
                  }
                </TouchableOpacity>
              </View>
            </Camera>
          }
        </View>

        {/* <View style={styles.barcodebox}>
          {isFocused && <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400, }} />
          }
        </View> */}

      </View>

      <View >
        <View style={styles.resultscan}>
          {/* <Text style={styles.maintext}>Результат: */}
          {/* <Text style={{ color: '#DFDFDF', }}> */}
          {/* - */}
          {/* </Text> */}
          {/* <Text style={{ fontWeight: "bold" }}> */}
          {/* {result} */}
          {/* </Text> */}
          {/*  */}

          {/* </Text> */}
          {/* <Text style={styles.maintext}>{value}</Text> */}
        </View>

        <View style={styles.scanelsebutton}>
          {scanned && <Button style={styles.scanelsebutton2} title={'Сканировать еще'} onPress={() => setScanned(false)} />}
        </View>
      </View>

      <View style={styles.block}>

        {/* <TextInput
          style={styles.input}
          onChangeText={setValue}
          // value={result}
          placeholder='Введите номер...'
        /> */}
        {/* <View style={styles.addbutton}>
          <Button title='Добавить' onPress={pressHandler} color='#2C9B29' />
        </View> */}



      </View>

    </View >
  )
}

const styles = StyleSheet.create({

  camera: {
    height: 400,
    width: 320,
  },
  buttonContainer: {

    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
  },
  button: {
    marginTop: 40,

    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },


  block: {
    backgroundColor: "#F1F1F1",
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // marginBottom: 15
  },
  barcodeboxcontainer: {

    // backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 5,
    // height: 300,
    // width: 300,
  },
  barcodebox: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,

    overflow: 'hidden',
    borderRadius: 20,
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
    marginBottom: 5
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
