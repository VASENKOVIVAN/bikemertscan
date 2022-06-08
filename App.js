import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { StyleSheet, Button, View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import { Ionicons } from '@expo/vector-icons';
import { AppHeaderIcon } from './src/components/AppHeaderIcon'

import { THEME } from './src/theme'


const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require('./src/img/logo-title.png')}
    />
  );
}

export default function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}
          options={{
            title: 'Профиль',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: THEME.MAIN_COLOR,

              // elevation: 0, // remove shadow on Android
              // shadowOpacity: 0, // remove shadow on iOS
            },
          }}
        />
        <Stack.Screen name="MainScreen" component={HomeScreen}
          options={({ navigation }) => ({

            title: 'BikeMe - Scanner',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: THEME.MAIN_COLOR,

              // elevation: 0, // remove shadow on Android
              // shadowOpacity: 0, // remove shadow on iOS
            },
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
                <Item title='Filter' iconName='account-circle'
                  onPress={() => navigation.navigate('ProfileScreen')}
                />
              </HeaderButtons>
              // <Button
              //   onPress={() => navigation.navigate('ProfileScreen')}
              //   title="Info"
              //   color="#00cc00"
              // />
            ),
            headerLeft: () => (
              <LogoTitle />
            ),
          })} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

// const styles = StyleSheet.create({

// })
