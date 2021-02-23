import React from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
  View
} from "react-native";
import { AntDesign, FontAwesome } from 'react-native-vector-icons';
import axios from "axios";
import { signIn } from '../actions/authAction'
import { connect } from 'react-redux'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      electorId: "",
      isConnecting: false,
    };
    this.url = props.baseUrl;
  }

  isValidCredentials = () => {
    const { electorId } = this.state;
    if (electorId.length == 10) {
      return true;
    }
    return false;
  };

  setUser = (data) => {
    this.props.signIn({
      date_of_expire: data.date_of_expire,
      date_of_issuance: data.date_of_issuance,
      elector_id: data.elector_id,
      first_name: data.first_name,
      front_picture: this.url + data.front_picture.slice(1),
      last_name: data.last_name,
      sexe: data.sexe,
    });
  };



  login = async () => {
    this.setState({
      isConnecting: true,
    });
    if (this.isValidCredentials()) {
      // send request for a visit on the current property
      await axios.get(`${this.url}api/elector/${this.state.electorId}`)
        .then((res) => {
          Alert.alert("SUCCÈS!!", "Vous vous êtes connectez avec succès", [
            {
              text: "Fermer",
              onPress: () => {
                this.setUser(res.data);
              },
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
          alert("Your Id is wrong. Please check it and try again.");
        });
    } else {
      Alert.alert(
        "ERROR!!",
        "Your Id format is wrong. Please check it and try again.",
        [
          {
            text: "Fermer",
          },
        ]
      );
    }
    this.setState({
      isConnecting: false,
    });
  };


  render() {
    return (
      <ImageBackground
        style={styles.container}
      >
        {this.state.isConnecting ? (
          <View>
            <Text>Chargement...</Text>
          </View>
        ) : (
            <>
              <Text style={styles.headerText}>Voter Card Number</Text>
              <TextInput
                placeholder=". . . . . . . . . ."
                placeholderTextColor={"#0057FF"}
                style={{ color: "#0057FF", marginTop: 60, fontSize: 50, width: '100%', textAlign: 'center', position: 'absolute', top: 80 }}
                secureTextEntry={true}
                maxLength={12}
                leftIcon={<FontAwesome name="key" size={30} color="#0057FF" />}
                containerStyle={styles.elementSpacing}
                onChangeText={(val) => {
                  this.setState({
                    electorId: val.toLowerCase(),
                  });
                }}
              />
              <View style={{ height: 2, backgroundColor: 'grey', width: '55%', position: 'absolute', top: 210 }}></View>
              <TouchableOpacity
                onPress={this.login}
                style={[styles.elementSpacing, styles.loginZone]}
              >
                <AntDesign name="login" size={30} color="white" />
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
    setUserType: (type) => dispatch(setUserType(type)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    baseUrl: state.auth.baseUrl,
    userType: state.auth.userType,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    resizeMode: "cover",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center",
    padding: 30,
  },
  loginZone: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0057FF",
    backgroundColor: '#0057FF',
    borderWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    marginTop: 50,
  },
  elementSpacing: {
    marginVertical: 10,
  },
  headerText: {
    fontSize: 35,
    color: "#0057FF",
    marginTop: 20,
    marginBottom: 30
  },
  loginText: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  }
});
