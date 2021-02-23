import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ProfileInfo from './components/ProfileInfo'
import { connect } from 'react-redux'
import { logOut } from '../actions/authAction'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F1F1',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 40,
        marginTop: -15,
        borderColor: '#0057FF',
        borderWidth: 2,
    },
    remaingSection: {
        flexDirection: 'row',
        marginVertical: 15,
        height: '6%',
    },
    row: {
        flexDirection: 'row',
        height: '10%',
        margin: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    profileHeader: {
        marginTop: -20,
        marginLeft: 10,
    },
    profileHeaderName: {
        fontSize: 18,
        marginLeft: 4,
        fontWeight: 'bold',
        color: '#444444',
    },
    profileHeaderID: {
        marginTop: 7,
        fontSize: 16,
        marginLeft: 5,
        color: 'grey',
    },
    cardText: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 25,
        fontSize: 17,
        borderWidth: 1,
        padding: 7,
        borderRadius: 10,
        width: 200,
        alignSelf: 'center',
        borderColor: '#0057FF'
    }
})


class Profile extends React.Component {

    constructor(props){
        super(props);
    }

    signOut = () => {
        this.props.logout()
    } 

    componentDidMount(){
        console.log(this.props.user.front_picture)
    }
    


    render() {
        const {user} = this.props
        console.log(user.front_picture)
        return (
            <View style={styles.container} >
                <View style={styles.row}>
                    <Image style={styles.avatar} source={{ uri: `${user.front_picture}` }} />
                    <View style={styles.profileHeader}>
                    <Text style={styles.profileHeaderName}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.profileHeaderID}>{user.elector_id}</Text>
                    </View>
                </View>
                <Text style={styles.cardText}>Card Information</Text>
                <ProfileInfo iconName="ios-calendar" info={`Expire: ${user.date_of_expire}`} />
                <ProfileInfo iconName={`ios-${user.sexe}`} info={"Gender: " + user.sexe}/>
                <ProfileInfo iconName="ios-calendar" info={"Issuance: " +user.date_of_issuance} />
                <ProfileInfo iconName="ios-log-out" info="Log out" action={this.signOut} />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logOut()),
    };
  };
  
  const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)