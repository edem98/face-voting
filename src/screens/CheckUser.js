import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux'
import axios from 'axios'

const dimensions = Dimensions.get('window')

const Scanner = ({baseUrl, user, route,navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [url, setUrl] = useState(baseUrl);
    const [type, setType] = useState(Camera.Constants.Type.front);
    let camera = null;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    async function handleUploadPhoto(photo, electorId,url) {

        try {
            const upload_url = `${url}api/elector/has-vote/${electorId}/${route.params.vote.id}`
  
            axios.get(upload_url)
                .then((response) => {
                    console.log(response.data);
                    navigation.push('Candidate')
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }
        catch (error) {
            console.log(error.message)
        }

        
    };

    async function snap() {
        try {
            if (camera) {
                let photo = await camera.takePictureAsync();
                handleUploadPhoto(photo, user.elector_id,baseUrl)
            }
        }
        catch (error) {
            console.log(error.message)
        }
        
    };

    return (
        <View style={styles.container}>
            <Camera style={{ flex: 1 }}
                ref={ref => {
                    camera = ref;
                }} type={type} ratio="16:9">
                <View
                    style={styles.screenButtonWrapper}>
                    <TouchableOpacity
                        style={styles.screenButton}
                        onPress={snap}>
                        <Text style={styles.buttonText}> Start identity check </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    screenButton: {
        flex: 0.9,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10
    },
    screenButtonWrapper: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        marginVertical: 5,
        color: '#000'
    }
});

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      baseUrl: state.auth.baseUrl,
    };
  };


export default connect(mapStateToProps)(Scanner)