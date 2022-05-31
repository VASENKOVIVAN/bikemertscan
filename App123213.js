import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
// import Clipboard from '@react-native-clipboard/clipboard';
// import CopyToClipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from 'expo-clipboard';


const App = () => {
  // const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = () => {
    Clipboard.setStringAsync('hccccelaaaaaaldadaso world');
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={fetchCopiedText}>
          <Text>View copied text</Text>
        </TouchableOpacity> */}

        {/* <Text style={styles.copiedText}>{copiedText}</Text> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
});

export default App;