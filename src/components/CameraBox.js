import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { THEME } from '../theme'
import { useIsFocused } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import { useDispatch } from "react-redux"
import { addPosts } from '../store/actions/post'

export const CameraBox = () => {

  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  console.log(scanned)

  const askForCameraPermission = () => {
    (async () => {
      // const { status } = await BarCodeScanner.requestPermissionsAsync();
      // setHasPermission(status === 'granted');
    })()
  }
  const isFocused = useIsFocused();

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission()
  }, [])


  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  const [sound, setSound] = React.useState();

  const dispatch = useDispatch()

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ data }) => {

    playSound()
    setScanned(true)

    var result = data.substring(data.length - 6)

    const scooter = {
      title: result
    }

    dispatch(addPosts(scooter))

  }

  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../sound/scan-sound.mp3')
    );
    setSound(sound);

    console.log('Playing Sound')
    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound')
        sound.unloadAsync();
      }
      : undefined;
  }, [sound])

  const [type, setType] = useState('off')

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
            <Camera
              style={styles.camera}
              flashMode={type}
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
      </View>

      <View >
        <View style={styles.scanelsebutton}>
          {scanned &&
            <Button
              style={styles.scanelsebutton2}
              title={'Сканировать еще'}
              onPress={() => setScanned(false)}
            />
          }
        </View>
      </View>

    </View >
  )
}

const styles = StyleSheet.create({

  block: {
    backgroundColor: "#F1F1F1",
  },
  barcodeboxcontainer: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 20,
  },
  camera: {
    height: 400,
    width: 320,
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
  scanelsebutton: {
    paddingHorizontal: 30,
    marginBottom: 5
  },
  scanelsebutton2: {
    color: THEME.MAIN_COLOR
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
  }

})
