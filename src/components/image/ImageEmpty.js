import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

export const ImageEmpty = () => {

    return (

        <View style={styles.containerAddImageEmptyList}>
            <Image
                style={styles.imageEmptyList}
                source={require('../../img/empty.png')}
            />
        </View>

    )
}

const styles = StyleSheet.create({

    containerAddImageEmptyList: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        height: 180,
    },
    imageEmptyList: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.4
    }

})