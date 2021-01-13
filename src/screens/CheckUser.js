import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios'

const dimensions = Dimensions.get('window')

export default function Scanner() {

    const [hasPermission, setHasPermission] = useState(null);
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

    function createFormData(photo, electorId) {
        const data = new FormData();
        data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
        data.append("electorId", electorId)

        return data
    }

    function handleUploadPhoto(photo, electorId) {

        console.log("-------------------------")
        const url = 'https://686c2188e275.ngrok.io/upload/'

        let data = new FormData();
        data.append("photo", {
            name: "checkedImage",
            type: 'jpeg',
            uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
        data.append("electorId", electorId)

        const headers = {
            'Content-Type': 'multipart/form-data;',
        }

        axios({
            method: 'post',
            url: url,
            data: data
          });

        axios.post(url, data, { headers })
            .then((response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                console.log("done")
            })
    };

    async function snap() {
        if (camera) {
            let photo = await camera.takePictureAsync();
            handleUploadPhoto(photo, "5a11b14f-5");
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