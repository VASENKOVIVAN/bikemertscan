import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const Todo = ({ todo }) => {
  return (

    <View style={styles.container}>
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
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
    padding: 10,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    marginBottom: 10
  }
})
