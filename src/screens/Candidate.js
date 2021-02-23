import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native'
import CandidateCard from './components/CandidateCard'
import { connect } from 'react-redux'
import axios from 'axios'

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


function Candidate({baseUrl, user, route,navigation}) {

    const [url, setUrl] = useState(baseUrl);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState({});

    useEffect(() => {
        axios.get(`${url}api/election/candidates/`)
            .then((response) => {
                setCandidates(response.data)
            }).catch(err => {
                console.log(err)
            })
    },[])

    function toogleCandidate(id) {
        let newCandidates = []
        candidates.forEach((candidate) => {
            if (candidate.id === id) {
                candidate.selected = true
                setSelectedCandidate(candidate)
            }
            else {
                if (candidate.selected = true) {
                    candidate.selected = false
                }
            }
            newCandidates.push(candidate)
        });
        setCandidates(newCandidates)
    }

    function confirm() {
        const post_url = `${url}api/elector/vote/${user.elector_id}/`
        const formData = new FormData();
        formData.append('candidateId', selectedCandidate)
        formData.append('voteId', route.params.vote.id)

        axios.post(post_url, {formData}, {
            headers: {
                'Content-Type':'multipart/form-data'
                }
        })
        .then(response => {
            console.log(response)
            navigate.push('Thanks')
        })
        .catch(error => console.log(error))
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


const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      baseUrl: state.auth.baseUrl,
    };
  };


export default connect(mapStateToProps)(Candidate)
