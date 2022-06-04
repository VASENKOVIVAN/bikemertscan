import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, ToastAndroid } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';


export const AddTodo = ({ onSubmit }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [text, setText] = useState('Not yet scanned')

  const [value, setValue] = useState('')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

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


  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data, todos }) => {
    setScanned(true);
    setValue(data)
    console.log('Type: ' + type + '\nData: ' + data)

    if (data.includes('https')) {
      console.log("это ХТТПССССС'");
      var result = data.replace("https://murmansk.bikeme.ru/?id=", "");
    } else {
      console.log("это НЕ ХТТПССССС'");
      var result = data.replace("http://murmansk.bikeme.ru/?id=", "");
    }

    console.log("тут234 ", result, "тут ");

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



  return (

    <View style={styles.block}>

      <View style={styles.barcodeboxcontainer}>

        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400, }} />
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
          {scanned && <Button title={'Сканировать еще'} onPress={() => setScanned(false)} color='#15A5C5' />}
        </View>
      </View>

      <View style={styles.block}>

        <TextInput
          style={styles.input}
          onChangeText={setValue}
          // value={result}
          placeholder='Введите номер...'
        />
        {/* <View style={styles.addbutton}>
          <Button title='Добавить' onPress={pressHandler} color='#2C9B29' />
        </View> */}



      </View>

    </View >
  )
}

const styles = StyleSheet.create({
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


})
