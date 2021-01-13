import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native'
import CandidateCard from './components/CandidateCard'
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 35,
        color: '#0057FF',
        marginTop: 50,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 5,
    },
    headerSubtitleText: {
        fontSize: 17,
        color: 'grey',
        alignSelf: 'flex-start',
        marginLeft: 10,
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
    }
})


export default function Candidate() {

    const [candidates, setCandidates] = useState([
        {
            'id': 1,
            'firstname': 'Joe',
            'lastname': 'Biden',
            'party': 'Democratic Party',
            'avatar': 'https://scontent.flfw2-1.fna.fbcdn.net/v/t1.0-9/43691103_1918625128216184_2289209966675886080_o.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=O7Z-Wet_ziMAX9YNk-p&_nc_ht=scontent.flfw2-1.fna&oh=447088a6351ad87a44595648c4088cc4&oe=5FD09378',
            'selected': true
        },
        {
            'id': 2,
            'firstname': 'Joe',
            'lastname': 'Biden',
            'party': 'Democratic Party',
            'avatar': 'https://scontent.flfw2-1.fna.fbcdn.net/v/t1.0-9/43691103_1918625128216184_2289209966675886080_o.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=O7Z-Wet_ziMAX9YNk-p&_nc_ht=scontent.flfw2-1.fna&oh=447088a6351ad87a44595648c4088cc4&oe=5FD09378',
            'selected': false
        },
        {
            'id': 3,
            'firstname': 'Joe',
            'lastname': 'Biden',
            'party': 'Democratic Party',
            'avatar': 'https://scontent.flfw2-1.fna.fbcdn.net/v/t1.0-9/43691103_1918625128216184_2289209966675886080_o.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=O7Z-Wet_ziMAX9YNk-p&_nc_ht=scontent.flfw2-1.fna&oh=447088a6351ad87a44595648c4088cc4&oe=5FD09378',
            'selected': false
        },
        {
            'id': 4,
            'firstname': 'Joe',
            'lastname': 'Biden',
            'party': 'Democratic Party',
            'avatar': 'https://scontent.flfw2-1.fna.fbcdn.net/v/t1.0-9/43691103_1918625128216184_2289209966675886080_o.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=O7Z-Wet_ziMAX9YNk-p&_nc_ht=scontent.flfw2-1.fna&oh=447088a6351ad87a44595648c4088cc4&oe=5FD09378',
            'selected': false
        }
    ]);

    function toogleCandidate(id) {
        let newCandidates = []
        candidates.forEach((candidate) => {
            if (candidate.id === id) {
                candidate.selected = true
            }
            else {
                if (candidate.selected = true) {
                    candidate.selected = false
                }
            }
            console.log(candidate)
            newCandidates.push(candidate)
        });
        setCandidates(newCandidates)
    }

    function confirm() {
        console.log("hello")
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Text style={styles.headerText} >Candidates</Text>
            <Text style={styles.headerSubtitleText}>Vote by selecting your candidate</Text>
            {candidates.map(candidate => <CandidateCard key={candidate.id} id={candidate.id} party={candidate.party} firstName={candidate.firstname} lastName={candidate.lastname} avatar={candidate.avatar} selected={candidate.selected} select={toogleCandidate} ></CandidateCard>)
            }
            <TouchableOpacity
                onPress={confirm}
                style={[styles.elementSpacing, styles.loginZone]}
            >
                <Text style={styles.loginText}>Confirm</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
