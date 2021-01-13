import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    surveyAvatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0057FF'
    },
    surveyAvatarText: {
        marginLeft: 5,
        fontSize: 30,
        color: '#0057FF',
    },
    candidateInfo: {
        flex: 1,
        flexDirection: 'column'
    },
    checkBox: {
        width: 35,
        height: 35,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        marginLeft: 10
    },
    partyName: {
        fontSize: 18,
        marginLeft: 10,
        color: 'grey',
        marginTop: 5
    },
    checkMark: {
        width: 18,
        height: 18,
    }
})

const formatDescription = (text) => {
    if (text.length > 25) {
        return text.substring(0, 26) + "..."
    }
    return text
}

export default function VoteCard({ myvote, title, description, navigation }) {
    return (
        <TouchableOpacity style={[styles.container]} onPress={() => navigation.push("VoteDetail", {
            'vote': myvote
        })}>
            <View style={styles.surveyAvatar}>
                <Text style={styles.surveyAvatarText}>{title.charAt(0).toUpperCase()} </Text>
            </View>
            <View style={styles.candidateInfo}>
                <Text style={styles.name}>
                    {title}
                </Text>
                <Text style={[styles.partyName]}>
                    {formatDescription(description)}
                </Text>
            </View>
            <TouchableOpacity style={styles.checkBox}>
                <Ionicons name="ios-arrow-dropright" color="#0057FF" size={35} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
