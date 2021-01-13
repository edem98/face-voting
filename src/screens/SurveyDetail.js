import React from 'react'
import { StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import { SimpleSurvey } from 'react-native-simple-survey'
import SurveyChoiceBox from './components/SurveyChoiceBox'
import axios from 'axios'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    surveyContainer: {
        flex: 0.9,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    selectionGroupContainer: {

    },
    prevNextButton: {
        color: "#fff",
        backgroundColor: 'rgba(0,87,255,0.8)',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: 100,
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: "500"
    },
    QuestionText: {
        fontSize: 20,
        width: '95%',
        textAlign: 'center',
        marginBottom: 20
    },
    infoText: {
        fontSize: 20,
        width: '95%',
        textAlign: 'center',
    },
    textBox: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#0057ff',
        borderRadius: 10,
        paddingHorizontal: 5,
        fontSize: 17
    }
})

class SurveyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            surveyId: 0,
            questions: [],
            electorId: "ab06fe6e-9"
        }
        this.myRef = React.createRef();
    }

    closeSurver = async () => {
        const node = this.myRef.current;
        const config = {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        }

        await axios.post(`http://127.0.0.1:8000/api/survey/submit_survey/${this.state.surveyId}/${this.state.electorId}/`, node.getAnswers(), config)
            .then(data => {
                console.log(data.data.message)
            })
            .catch(err => {
                console.log(err)
            })

        this.props.navigation.push('Thanks')
    }

    formatSurvey = (questions) => {
        let survey = []
        for (let question of questions) {
            if (question.question_type == "TextInput" || question.question_type == "NumericInput") {
                survey.push({
                    "questionType": question.question_type,
                    "questionText": question.question_text,
                    "questionId": question.id.toString(),
                })
            }
            if (question.question_type == "SelectionGroup") {
                let choices = question.choices
                let options = []
                choices = choices.split(",")
                choices.forEach((choice) => {
                    options.push({
                        optionText: choice.charAt(0) + "" + choice.substring(1),
                        value: choice.toLowerCase()
                    })
                })
                survey.push({
                    "questionType": question.question_type,
                    "questionText": question.question_text,
                    "questionId": question.id.toString(),
                    "options": options
                })
            }
        }
        return survey
    }

    getSurveyQuestion = async (surveyId) => {
        const questions = await axios.get(`http://127.0.0.1:8000/api/survey/question_list/${surveyId}/`)
            .then((response) => {
                return response.data
            }).catch(err => {
                console.log(err)
            })
        if (questions) {
            let formatedSurvey = this.formatSurvey(questions)
            this.setState({
                survey: formatedSurvey
            })
        }
        else {
            console.log("Can't get survey questions")
        }
    }

    componentDidMount() {
        const survey = this.props.route.params.survey
        this.setState({
            survey: survey,
            surveyId: survey.id
        })
        // Get survey questions
        this.getSurveyQuestion(survey.id)
    }

    renderPreviousButton = (onPress, enabled) => {
        if (enabled === true){
            return (<TouchableOpacity
                style={styles.prevNextButton}
                onPress={() => {
                    try {
                        onPress()
                    }
                    catch(error) {
                        console.log(error)
                    }
                } }
            >
                <Text style={styles.buttonText} >Previous</Text>
            </TouchableOpacity>);
        }
        else {
            return (<TouchableOpacity
                style={styles.prevNextButton}
                onPress={() => {
                    try {
                        this.props.navigation.navigate('Survey')
                    }
                    catch(error) {
                        console.log(error)
                    }
                } }
            >
                <Text style={styles.buttonText} >Previous</Text>
            </TouchableOpacity>);
        }
    }

    renderNextButton = (onPress) => {
        return (<TouchableOpacity
            style={styles.prevNextButton}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>);
    }

    renderFinishedButton = (onPress) => {
        return (<TouchableOpacity
            style={styles.prevNextButton}
            onPress={this.closeSurver}
        >
            <Text style={styles.buttonText}>Finished</Text>
        </TouchableOpacity>);
    }

    renderQuestionText = (questionText) => {
        return (<Text style={styles.QuestionText}>{questionText}</Text>);
    }

    renderSelector = (data, index, isSelected, onPress) => {
        return (<SurveyChoiceBox
            choice={data.optionText}
            onPress={onPress}
            select={onPress}
            selected={isSelected}
            id={index}
            key={`${index}`}
        />);
    }

    onSurveyFinished = (answers) => {
    }

    onAnswerSubmitted = (answers) => {
    }

    renderTextBox = (onChange, value, placeholder, onBlur) => {
        return (<TextInput
            onChangeText={text => onChange(text)}
            value={value}
            placeholder={placeholder}
            onBlur={onBlur}
            style={styles.textBox}
        />);
    }

    renderNumericInput = (onChange, value) => {
        return (<TextInput
            style={styles.textBox}
            onChangeText={text => { onChange(text); }}
            underlineColorAndroid={'white'}
            placeholderTextColor={'rgba(184,184,184,1)'}
            fontSize={17}
            value={String(value)}
            keyboardType={'numeric'}
            maxLength={3}
        />);
    }

    renderInfoText = (infoText) => {
        return (<Text style={styles.infoText}>{infoText}</Text>);
    }


    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.state.survey.length > 0 ?
                    <SimpleSurvey
                        ref={this.myRef}
                        survey={this.state.survey}
                        containerStyle={styles.surveyContainer}
                        selectionGroupContainerStyle={styles.selectionGroupContainer}
                        navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                        renderPrevious={this.renderPreviousButton}
                        renderNext={this.renderNextButton}
                        renderFinished={this.renderFinishedButton}
                        renderQuestionText={this.renderQuestionText}
                        renderSelector={this.renderSelector}
                        onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                        onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
                        renderTextInput={this.renderTextBox}
                        renderNumericInput={this.renderNumericInput}
                        renderInfo={this.renderInfoText}
                    />
                    :
                    <View></View>
                }

            </ScrollView>
        )
    }

}

export default SurveyDetail;