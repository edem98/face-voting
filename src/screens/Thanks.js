import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,87,255,0.7)',
        justifyContent: 'space-around'
    },
    headerText: {
        height: '15%',
        fontSize: 40,
        color: '#fff',
        marginTop: 20
    },
    logo: {
        width: 230,
        height: 230,
        marginTop: -70,
    },
    exitZone: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#fff",
        borderWidth: 2,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },
    elementSpacing: {
        marginVertical: 10,
    },
    exitText: {
        fontSize: 25,
        color: "#fff",
        paddingHorizontal: 30,
    },
    checkBox: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#0057FF',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '51%'
    },
    checkMark: {
        width: 30,
        height: 30,
    }
})

export default function Thanks() {


    const navigation = useNavigation();

    function exit() {
        navigation.push('Survey')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Thank you for voting</Text>
            <Image style={styles.logo} source={require('../../assets/vote.png')} />
            <TouchableOpacity
                onPress={exit}
                style={[styles.elementSpacing, styles.exitZone]}
            >
                <Text style={styles.exitText}>Go Back to Surveys</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkBox}>
                <Image style={styles.checkMark} source={require('../../assets/checkmark.png')} />
            </TouchableOpacity>
        </View>
    )
}
