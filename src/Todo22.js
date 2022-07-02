import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export const Todo22 = ({ todo22, onRemove }) => {
  return (

    <TouchableOpacity
      style={styles.container12}
      activeOpacity={0.5}
      onPress={() => console.log("TAP")}
      onLongPress={() => onRemove(todo22.id)}
    >
      <View style={styles.container}>
        {todo22.title22 == 'Номер' ?
          <View style={styles.titleBox}>
            <Text style={styles.titleText} >{todo22.title22}</Text>
          </View>
          :
          <View style={styles.numberColumn}>
            <Text style={styles.numberText}>{todo22.title22}</Text>
          </View>
        }

        {todo22.code22 == 'Онлайн' ?
          <View style={styles.titleBox}>
            <Text style={styles.titleText} >{todo22.code22}</Text>
          </View>
          :
          todo22.code22 == 'Да' ?
            <View style={styles.onlineGreen}>
              <Text style={styles.onlineText}>{todo22.code22}</Text>
            </View>
            :
            <View style={styles.onlineRed}>
              <Text style={styles.onlineText}>{todo22.code22}</Text>
            </View>
        }

        {todo22.status22 == 'Команда' ?
          <View style={styles.titleBoxForCommand}>
            <Text style={styles.titleText} >{todo22.status22} </Text>
          </View>
          :
          todo22.status22 == 'Успешно' ?
            <View style={styles.responseGreen}>
              <Text style={styles.responseText}>
                {todo22.status22}
              </Text>
            </View>
            :
            todo22.status22 == 'Уже свободен' ?
              <View style={styles.responseBlue}>
                <Text style={styles.responseText}>
                  {todo22.status22}
                </Text>
              </View>
              :
              <View style={styles.responseRed}>
                <Text style={styles.responseText}>
                  {todo22.status22}
                </Text>
              </View>
        }
      </View>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "green",
  },
  numberColumn: {
    // flex: 1,
    width: 60,
    // marginHorizontal: 30,
    padding: 2,
    // marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 2,
    marginRight: 2,
    alignItems: "center"
  },
  numberText: {
    marginLeft: 2,
    fontSize: 12
  },
  onlineText: {
    fontSize: 12
  },
  responseText: {
    fontStyle: 'italic',
    marginLeft: 4,
    fontSize: 12
  },
  titleText: {
    fontWeight: '700',
  },
  titleBoxForCommand: {
    flex: 2,
    fontSize: 7,
    padding: 2,
    // borderWidth: 1,
    // borderColor: '#555',
    // borderRadius: 5,
    marginBottom: 2,
    marginRight: 2,
    // backgroundColor: 'white',
    alignItems: "center"
  },
  titleBox: {
    width: 60,
    fontSize: 7,
    padding: 2,
    // borderWidth: 1,
    // borderColor: '#555',
    // borderRadius: 5,
    marginBottom: 2,
    marginRight: 2,
    // backgroundColor: 'white',
    alignItems: "center"
  },
  onlineGreen: {
    width: 60,
    fontSize: 7,
    padding: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 2,
    marginRight: 2,
    backgroundColor: '#ACDF9A',
    alignItems: "center"
  },
  onlineRed: {
    width: 60,
    fontSize: 7,
    padding: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 2,
    marginRight: 2,
    backgroundColor: '#DF9A9A',
    alignItems: "center"
  },
  responseGreen: {
    flex: 2,
    padding: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 2,
    backgroundColor: '#ACDF9A',
  },
  responseBlue: {
    flex: 2,
    flexDirection: "row",
    padding: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 2,
    backgroundColor: '#9AADDF',
  },
  responseRed: {
    flex: 2,
    flexDirection: "row",
    padding: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 2,
    backgroundColor: '#DF9A9A',
  }
})
