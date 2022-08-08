import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, ToastAndroid, TouchableOpacity } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { THEME } from './theme'
import { useIsFocused } from "@react-navigation/native";


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
  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data, todos }) => {
    console.log("я готов " + qwre);
    setQwre(!qwre)
    console.log("я готов " + qwre);
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





  };

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

  return (

    <View style={styles.block}>



      <View style={styles.barcodeboxcontainer}>


        {/* 
        <View style={styles.container}>


          <View style={styles.barcodebox}>

            {isFocused && <Camera
              style={styles.camera}
              // flashMode='torch'
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

            }
            <Button
              //   onPress={onPressLearnMore}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>


          <Camera
            style={styles.camera}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={({ type, data }) => {
              console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
            }}
          />

          <Camera style={styles.camera} flashMode={type}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(type === 'off' ? 'torch' : 'off');
                }}>
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View> */}

        <View style={styles.barcodebox}>
          {isFocused && <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400, }} />
          }
        </View>

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
  container: {
    height: 400, width: 400
  },
  camera: {
    height: 400, width: 400
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
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
