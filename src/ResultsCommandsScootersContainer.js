import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export const ResultsCommandsScootersContainer = ({ resultsCommandsScooter, onRemove }) => {
  return (
    <TouchableOpacity
      style={styles.container12}
      activeOpacity={0.5}
      onPress={() => console.log("TAP")}
      onLongPress={() => onRemove(resultsCommandsScooter.id)}
    >
      <View style={styles.container}>
        {resultsCommandsScooter.title == 'Номер' ?
          <View style={styles.titleBox}>
            <Text style={styles.titleText} >{resultsCommandsScooter.title}</Text>
          </View>
          :
          <View style={styles.numberColumn}>
            <Text style={styles.numberText}>{resultsCommandsScooter.title}</Text>
          </View>
        }

        {resultsCommandsScooter.online == 'Онлайн' ?
          <View style={styles.titleBox}>
            <Text style={styles.titleText} >{resultsCommandsScooter.online}</Text>
          </View>
          :
          resultsCommandsScooter.online == 'Да' ?
            <View style={styles.onlineGreen}>
              <Text style={styles.onlineText}>{resultsCommandsScooter.online}</Text>
            </View>
            : resultsCommandsScooter.online == 'Нет' ?
              <View style={styles.onlineRed}>
                <Text style={styles.onlineText}>{resultsCommandsScooter.online}</Text>
              </View>
              :
              <View style={styles.onlineBlue}>
                <Text style={styles.onlineText}>{resultsCommandsScooter.online}</Text>
              </View>
        }

        {resultsCommandsScooter.command == 'Команда' ?
          <View style={styles.titleBoxForCommand}>
            <Text style={styles.titleText} >{resultsCommandsScooter.command} </Text>
          </View>
          :
          resultsCommandsScooter.command == 'Успешно' ?
            <View style={styles.responseGreen}>
              <Text style={styles.responseText}>
                {resultsCommandsScooter.command}
              </Text>
            </View>
            :
            resultsCommandsScooter.command == 'Уже свободен' ?
              <View style={styles.responseBlue}>
                <Text style={styles.responseText}>
                  {resultsCommandsScooter.command}
                </Text>
              </View>
              :
              <View style={styles.responseRed}>
                <Text style={styles.responseText}>
                  {resultsCommandsScooter.command}
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
  onlineBlue: {
    width: 60,
    fontSize: 7,
    padding: 2,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 2,
    marginRight: 2,
    backgroundColor: '#9AADDF',
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
