import React from 'react'
import { View ,TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60,
        backgroundColor: '#eeeeee',
        margin: 5,
        borderRadius: 20
    },
    info: {
        fontWeight: '500',
        fontSize: 17,
        color: '#444444',
        marginLeft: 20,
    }
})

export default function ProfileInfo({iconName, info, action}) {

    return (
        <TouchableWithoutFeedback onPress={() => {
            if(action != null){
                action()
            }
            else{
                console.log("Non")
            }
        }}>
            <View style={styles.container}>
                <Ionicons name={iconName} size={30} color="#0057FF" />
                <Text style={styles.info}>{info}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
