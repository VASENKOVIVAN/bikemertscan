import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({ navigation }, isSignedIn) => {
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

// const styles = StyleSheet.create({})