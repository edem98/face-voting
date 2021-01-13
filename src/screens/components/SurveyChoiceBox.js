import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0057FF',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        margin: 10
    },
    containerSelected: {
        flexDirection: 'row',
        width: '95%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0057FF',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgba(0,87,255,0.5)',
        margin: 10
    },
    candidateInfo: {
        flex: 1,
        flexDirection: 'column'
    },
    checkBox: {
        width: 35,
        height: 35,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#0057FF',
        justifyContent: "center",
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        marginLeft: 10
    },
    selectedPartyName: {
        fontSize: 17,
        marginLeft: 10,
        color: 'rgba(0,0,0,0.7)'
    },
    partyName: {
        fontSize: 19,
        marginLeft: 10,
        color: 'grey'
    },
    checkMark: {
        width: 18,
        height: 18,
    }
})

export default function SurveyChoiceBox({ id, choice, selected = false, select }) {
    return (
        <TouchableOpacity key={id} style={[styles.container, selected && styles.containerSelected]} onPress={() => select(id)}>
            <View style={styles.candidateInfo}>
                <Text style={styles.name}>
                    {choice}
                </Text>
            </View>
            <TouchableOpacity style={styles.checkBox}>
                {selected && <Image style={styles.checkMark} source={require('../../../assets/checkmark.png')} />}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
