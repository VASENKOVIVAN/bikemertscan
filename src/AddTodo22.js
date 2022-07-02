import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button, ToastAndroid } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';

import { THEME } from './theme'

export const AddTodo22 = ({ onSubmit }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [text, setText] = useState('Not yet scanned')
  // const [result22, setResult22] = useState('')

  const [value22, setValue22] = useState('')

  // What happens when we scan the bar code

  console.log("тут234 ", value22, "тут ");

  const handleBarCodeScanned22 = () => {

    if (value22.trim()) {
      onSubmit(value22)
      setValue22('')
    } else {
      // error
    }


  }



  return (

    <View style={styles.block}>



      <View style={styles.block}>

        <TextInput
          // style={styles.input}
          onChangeText={setValue22}
          // value={value22}
          placeholder='Введите номер...'
        />
        <View style={styles.addbutton}>
          <Button title='Добавить' onPress={handleBarCodeScanned22} color='#2C9B29' />
        </View>



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
  scanelsebutton2: {
    color: THEME.MAIN_COLOR
  }


})
