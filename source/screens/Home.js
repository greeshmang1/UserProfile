import { useNavigation } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


const Home = () => {
    const user = auth().currentUser.uid
    const navigation = useNavigation()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [pic, setPic] = useState('')
    function logout() {

        auth()
            .signOut()
            .then(() =>
                console.log('User signed out!'),
                navigation.navigate('Login'));

    }
    useEffect(()=>{
        database()
        .ref('/users/' + user)
        .once('value')
        .then(snapshot => {
            //   console.log('User data: ', snapshot.val().Name);
            //   console.log('User data: ', snapshot.val().Email);
            setName(snapshot.val().Name)
            setEmail(snapshot.val().Email)
            setMobile(snapshot.val().mobile)
            setPic(snapshot.val().Pic)
            console.log(pic)


    })
   



        });

    return (
        <View style={styles.container}>
            <View  style={{alignItems:'center',justifyContent:'center'}}>
                <View style={styles.welcome}>
                    <Text style={styles.Textwelcome}> Welcome {name}</Text>
                    <TouchableHighlight onPress={() => logout()} style={{alignSelf:'baseline'}}>
                        <Icon name='logout' size={32} color='#939696' />

                    </TouchableHighlight>
                </View>
                <View style={styles.profilepicvw}> 
                    {!pic?
                    <View>
                        <View style={styles.picvw}>
                            <Image source={require('../images/user.png')}  style={styles.imgstyle}/>
                            </View>
                            <View style={styles.piceditvw}>
                                <TouchableHighlight onPress={() => navigation.navigate('Profilepic')} >
                                <Icon name='edit' size={20} color='#939696' />

                            </TouchableHighlight>
                             </View>
                            
                    </View>
                        
                    :

                    <View>
                        <View style={styles.picvw}>
                            <Image source={{uri:pic}}  style={styles.imgstyle}/>
                            </View>
                            <View style={styles.piceditvw}>
                                <TouchableHighlight onPress={() => navigation.navigate('Profilepic')} >
                                <Icon name='edit' size={20} color='#939696' />

                            </TouchableHighlight>
                             </View>
                        
                        </View>}
                </View>
            </View>
                <View style={{borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <View>
                <View style={styles.profile}>
                    <Icon name='person' size={32} color='#939696' />
                    <Text style={styles.profileText}>{name}</Text>

                </View>
                <View style={styles.profile}>
                    <Icon name='call' size={32} color='#939696'/>
                    <Text style={styles.profileText}>{mobile}</Text>

                </View>
                <View style={styles.profile}>
                    <Icon name='mail' size={32} color='#939696' />
                    <Text style={styles.profileText}>{email}</Text>

                </View>


            </View>

            <View style={styles.editvw}>
                <TouchableHighlight onPress={() => navigation.navigate('EditProfile')}>
                    <Icon name='edit' size={32} color='#939696' />

                </TouchableHighlight>

            </View>
                </View>
            



        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      
        backgroundColor: '#102a33'
    },
    welcome: {
        height: 100,
        width: '100%',
        margin: 20, flexDirection: 'row',
        marginBottom:10,
        

        // justifyContent:'center',
    },
    profilepicvw:{
        height:130,
      
         width:200,
         paddingBottom:20,
         marginBottom:10,
         marginLeft:10,
         alignItems:'center',
         justifyContent:'center',
        flexDirection: 'row',
    },
    picvw: {
        height: 100,
        width: 100,
        borderRadius: 50,marginTop:15,
        alignItems: 'center'

    },
    Textwelcome: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white', marginRight: 150
    },
    profile: {
        height: 40,
        width: '100%',
        margin: 25, flexDirection: 'row'
    },
    profileText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        marginLeft: 30
    },
    piceditvw:{
        marginLeft:60,marginTop:-20,
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#2a4a7a',
        justifyContent: 'center', alignItems: 'center',
        alignSelf: 'flex-end'
    },
    editvw: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#2a4a7a',
        justifyContent: 'center', alignItems: 'center',
        alignSelf: 'flex-end'
    },
    imgstyle: {
        height:'100%',
        width:'100%',
        
        flex:1,
        resizeMode:'contain'

    }

})

export default Home;