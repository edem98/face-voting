import React, { useState, useEffect } from 'react'
import { Text, ScrollView, View, StyleSheet } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import VoteCard from './components/VoteCard'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 25,
        color: '#0057FF',
        marginTop: 40,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 5,
    },
    headerSubtitleText: {
        fontSize: 16,
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

const Vote = ({ navigation, baseUrl, user}) => {

    const [votes, setVotes] = useState([]);
    const [url, setUrl] = useState(baseUrl);
    const [userId,setUserId] = useState(user.elector_id)

    useEffect(() => {
        console.log(`${url}api/election/votes/${userId}/`)
        axios.get(`${url}api/election/votes/${userId}/`)
            .then((response) => {
                setVotes(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Text style={styles.headerText}>Upcoming Votes</Text>
            <Text style={styles.headerSubtitleText}>Select and proceed to vote.</Text>
            {votes.length > 0 ? votes.map(vote =>
                <VoteCard
                    key={vote.id}
                    id={vote.id}
                    myvote={vote}
                    title={vote.vote_title}
                    description={vote.vote_description}
                    navigation={navigation}
                >
                </VoteCard>)
                : <View style={styles.noVoteWrapper}><Text style={styles.noVote}>No vote scheduled.</Text></View>
            }
        </ScrollView>
    )
}

  
  const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      baseUrl: state.auth.baseUrl,
    };
  };
  
  export default connect(mapStateToProps)(Vote)
