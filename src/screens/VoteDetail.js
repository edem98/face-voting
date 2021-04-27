import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function VoteDetail({ route ,navigation }) {

    const [vote, setVote] = useState([]);


    useEffect(() => {
        setVote(route.params.vote)
    }, [])

    const formatDate = (date) => {
        let myDate = new Date(date)
        const currentDayOfMonth = myDate.getDate();
        const currentMonth = parseInt(myDate.getMonth())+1 ; // Be careful! January is 0, not 1
        const currentYear = myDate.getFullYear();
        return (currentDayOfMonth + "/" + currentMonth + "/" + currentYear)
    }

    const formatTime = (date) => {
        let myDate = new Date(date)
        const hours = myDate.getHours();
        const minutes = myDate.getMinutes() ; // Be careful! January is 0, not 1
        const seconds = myDate.getSeconds();
        return (hours + " hours, " + minutes + " minutes, " + seconds + " seconds.")
    }


    return (
        <View style={styles.container} >
            <Text style={styles.headerText}>{vote.vote_title}</Text>
            <Text style={styles.headerSubtitleText}>{vote.vote_description}.</Text>
            <Text style={styles.voteClose}>Vote will close on:  {formatDate(vote.end_date)}.</Text>
            <Text style={styles.voteCloseTime}>Time: {formatTime(vote.end_date)}</Text>
            <TouchableWithoutFeedback 
                style={[styles.loginZone, {width: 220}]}
                onPress={() => navigation.push('CheckUser', {
                    vote: route.params.vote
                })}
            >
                <Text style={styles.loginText}>Proceed to vote</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback 
                style={[styles.loginZone, {width: 220}]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.loginText}>Cancel vote</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 35,
        color: '#0057FF',
        marginTop: 40,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 5,
    },
    headerSubtitleText: {
        fontSize: 20,
        color: 'grey',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20,
    },
    voteClose: {
        fontSize: 18,
        color: 'grey',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 20
    },
    voteCloseTime: {
        fontSize: 18,
        color: 'grey',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 20,
    },
    loginZone: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#0057FF",
        backgroundColor: '#fff',
        borderWidth: 1,
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        marginTop: 30,
    },
    elementSpacing: {
        marginBottom: 15,
    },
    loginText: {
        fontSize: 20,
        color: "#0057FF",
        paddingHorizontal: 20,
        paddingVertical: 3
    },
    noVoteWrapper: {
        width: '100%',
        marginTop: '50%'
    },
    noVote: {
        fontSize: 20,
        width: '100%',
        position: 'absolute',
        top: '10%',
        left: 0,
        zIndex: 10,
        textAlign: 'center'
    }
})