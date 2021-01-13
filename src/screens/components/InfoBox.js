import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        borderColor: 'rgba(0,87,255,1.0)',
        padding: 5,
        backgroundColor: '#fff'
    },
    dataBox: {
        flex: 1,
        width: '100%',
        flexDirection: 'column'
    },
    title: {
        fontSize: 17,
        color: '#000',
    },
    text: {
        fontSize: 16,
    },

})

function InfoBox({ title, text }) {
    return (
        <View style={styles.container}>
            <View style={styles.dataBox}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    )
}

export default InfoBox

