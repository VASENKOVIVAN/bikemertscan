import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import reducer from '../src/reducer';

export const Todo1234 = ({ value1231235, onRemove }) => {
  return (


    <View style={styles.container}>
      <View style={styles.todo}>
        <Text>{value1231235.title}</Text>
        <Text>{value1231235.id}</Text>
      </View>
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',

  },

  todo: {
    // flex: 1,
    // width: 80,
    // marginHorizontal: 30,
    padding: 7,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    marginBottom: 5
  }
})
