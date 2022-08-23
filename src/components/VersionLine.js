import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getAuth } from 'firebase/auth'
import { UID_LIST } from '../UIDS/UIDS'

export const VersionLine = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid.toString();

    return (

        <View style={styles.bottomContainerTitle}>
            {uid == UID_LIST.UID_MURMANSK ?
                <Text style={styles.bottomContainerText}>
                    version 5.0.4 - Мурманск
                </Text>
                :
                uid == UID_LIST.UID_ARCHANGELSK ?
                    <Text style={styles.bottomContainerText}>
                        version 5.0.4 - Архангельск
                    </Text>
                    :
                    <Text>
                        ошибка
                    </Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    bottomContainerTitle: {
        alignItems: 'center',
    },
    bottomContainerText: {
        fontSize: 12,
        color: 'lightgray',
        marginVertical: 9,
    },

})