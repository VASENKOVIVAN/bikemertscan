import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { deleteOnePosts } from '../../../store/actions/post'

export const AddedObjects = ({ scootersNumQR, onRemove }) => {

  // Объявляем диспач (чтобы пушить объекты в стор)
  const dispatch = useDispatch()

  const removeObject = id => {

    dispatch(deleteOnePosts({
      id: id
    }))

  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => console.log("TAP")}
      onLongPress={() => removeObject(scootersNumQR.id)}
    >
      <View style={styles.container}>
        <View style={styles.todo}>
          <Text>{scootersNumQR.title}</Text>
          {/* <Text>{scootersNumQR.id}</Text> */}
        </View>
      </View>
    </TouchableOpacity>

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
