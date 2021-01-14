import React, { useState, useEffect } from 'react'
import { Text, ScrollView, View, StyleSheet } from 'react-native'
import axios from 'axios'
import SurveyCard from './components/SurveyCard'
// import LottieView from 'lottie-react-native';


export default function Survey({navigation}) {

    const [surveys, setSurveys] = useState([]);
    const electorId = "ab06fe6e-9"
    let myAnimation = null


    useEffect(() => {
        axios.get(`https://eb34a3589563.ngrok.io/api/survey/get_survey_for_elector/${electorId}/`)
            .then((response) => {
                setSurveys(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [surveys])

    useEffect(() => {
        if (myAnimation) {
            myAnimation.play();
        }
    }, [])


    return (

        <ScrollView contentContainerStyle={styles.container} >
            <Text style={styles.headerText} >Surveys</Text>
            <Text style={styles.headerSubtitleText}>Let us know what you think.</Text>
            { surveys.length > 0 ?
                surveys.map(survey =>
                    <SurveyCard
                        key={survey.id}
                        id={survey.id}
                        survey={survey}
                        title={survey.title}
                        description={survey.description}
                        navigation={navigation}>
                    </SurveyCard>)
                : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <LottieView
                        ref={animation => {
                            myAnimation = animation;
                        }}
                        style={{
                            width: 300,
                            height: 300,
                            backgroundColor: '#eee',
                        }}
                        source={require('../../assets/no-more-survey.json')}
                    /> */}
                    <Text style={{ fontSize: 17, marginTop: 10 }}>No survey available for you.</Text>
                </View>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
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
        fontSize: 17,
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
    }
})