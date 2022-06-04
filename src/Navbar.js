import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Navbar = ({ title }) => {

  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text2}>v.2.2.2</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 89,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#15A5C5',
    paddingBottom: 10
  },
  text: {
    // color: 'white',
    fontSize: 22,
    fontWeight: '700'
  },
  text2: {
    fontSize: 10,
    // fontWeight: '700'
  }
})
