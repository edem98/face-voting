import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        height: 80,
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
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0057FF',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgba(0,87,255,0.5)',
        margin: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50
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

export default function CandidateCard({ id, avatar, firstName, lastName, party, selected, select }) {
    return (
        <TouchableOpacity style={[styles.container, selected && styles.containerSelected]} onPress={() => select(id)}>
            <Image
                style={styles.avatar}
                source={{ uri: avatar }} />
            <View style={styles.candidateInfo}>
                <Text style={styles.name}>
                    {firstName + " " + lastName}
                </Text>
                <Text style={[styles.partyName, selected && styles.selectedPartyName]}>
                    {party}
                </Text>
            </View>
            <TouchableOpacity style={styles.checkBox}>
                {selected && <Image style={styles.checkMark} source={require('../../../assets/checkmark.png')} />}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
