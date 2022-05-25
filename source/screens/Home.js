import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableHighlight, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


const Home = () => {
    const user = auth().currentUser.uid
    let itemRef = database().ref('/users/' + user)
    const navigation = useNavigation()
    const [field, setField] = useState()
    const [itemArray, setitemArray] = useState([])
    const [ifUpdate, setIfupdate] = useState(false)
    const [updateText, setUpadateText] = useState()
    function logout() {
        auth()
            .signOut()
            .then(() =>

                console.log('User signed out!'));
        navigation.navigate('Login')
    }
    const handleUpdate1 = (name) => {
        setField('Name')
        setUpadateText(name)
        setIfupdate(true)
    }
    const handleUpdate2 = (name) => {
        setField('Email')
        setUpadateText(name)
        setIfupdate(true)
    }
    const handleUpdate3 = (name) => {
        setField('mobile')
        setUpadateText(name)
        setIfupdate(true)
    }

    const submitUpdate = () => {
        if (field == 'Name') {

            itemRef.update({ Name: updateText })
            setIfupdate(false)
            console.log(updateText)
            navigation.navigate('Home')
        }
        else if (field == 'Email') {
            itemRef.update({ Email: updateText })
            setIfupdate(false)
            console.log(updateText)
            navigation.navigate('Home')
        }
        else {
            itemRef.update({ mobile: updateText })
            setIfupdate(false)
            console.log(updateText)
            navigation.navigate('Home')
        }

    }
    useEffect(() => {
        itemRef.on('value', snapshot => {
            let data = snapshot.val()
            setitemArray(data)

        })
    }, [])
    return (
        <View style={styles.container}>

            <View style={styles.welcome}>
                <Text style={styles.Textwelcome}> Welcome {itemArray.Name}</Text>
                <TouchableHighlight onPress={() => logout()} style={{ alignSelf: 'baseline' }}>
                    <Icon name='logout' size={32} color='#939696' />
                </TouchableHighlight>
            </View>
            <View style={styles.profilepicvw}>
                {!itemArray.Pic ?
                    <View>
                        <View style={styles.picvw}>
                            <Image source={require('../images/user.png')} style={styles.imgstyle} />
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
                            <Image source={{ uri: itemArray.Pic }} style={styles.imgstyle} />
                        </View>
                        <View style={styles.piceditvw}>
                            <TouchableHighlight onPress={() => navigation.navigate('Profilepic')} >
                                <Icon name='edit' size={20} color='#939696' />

                            </TouchableHighlight>
                        </View>

                    </View>
                }

            </View>
            <View>
                {ifUpdate ?

                    <View style={styles.container}>


                        <TextInput style={styles.inputtext} onChangeText={setUpadateText} value={updateText} placeholderTextColor='#939696' placeholder='name' />

                        <View style={styles.btview}>
                            <View style={styles.btn}><Button title='Cancel' onPress={() => setIfupdate(false)} /></View>
                            <View style={styles.btn}><Button title='Edit' onPress={() => submitUpdate()} /></View>

                        </View>
                    </View>
                    :
                    <View>
                        <View style={styles.profile}>
                            <Icon name='person' size={32} color='#939696' />
                            <Text style={styles.profileText}>{itemArray.Name}</Text>

                            <TouchableHighlight onPress={() => handleUpdate1(itemArray.Name)}>
                                <View style={styles.editvw}>
                                    <Icon name='edit' size={20} color='#939696' />
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.profile}>
                            <Icon name='call' size={32} color='#939696' />
                            <Text style={styles.profileText}>{itemArray.mobile}</Text>
                            <TouchableHighlight onPress={() => handleUpdate3(itemArray.mobile)}>
                                <View style={styles.editvw}>
                                    <Icon name='edit' size={20} color='#939696' />
                                </View>
                            </TouchableHighlight>

                        </View>
                        <View style={styles.profile}>
                            <Icon name='mail' size={32} color='#939696' />
                            <Text style={styles.profileText}>{itemArray.Email}</Text>
                            <TouchableHighlight onPress={() => handleUpdate2(itemArray.Email)}>
                                <View style={styles.editvw}>
                                    <Icon name='edit' size={20} color='#939696' />
                                </View>
                            </TouchableHighlight>

                        </View>
                    </View>
                }



            </View>


        </View>
    )














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
        marginBottom: 10,


        // justifyContent:'center',
    },
    profilepicvw: {
        height: 130,

        width: 200,
        paddingBottom: 20,
        marginBottom: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    picvw: {
        height: 100,
        width: 100,
        borderRadius: 50, marginTop: 15,
        alignItems: 'center'

    },
    inputtext: {
        marginTop: 10,
        height: 50,
        width: 300, borderWidth: 1,
        // borderWidth:1,
        borderColor: '#ccdde3',
        // borderRadius:1,
        marginLeft: 40,
        marginBottom: 20,
        color: 'white',
        paddingLeft: 10

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
        marginLeft: 30,

        width: 200
    },
    piceditvw: {
        marginLeft: 60, marginTop: -20,
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#2a4a7a',
        justifyContent: 'center', alignItems: 'center',
        alignSelf: 'flex-end'
    },
    editvw: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#2a4a7a',
        justifyContent: 'center', alignItems: 'center',
        alignSelf: 'flex-end',
        // marginTop: -0,
        marginLeft: 40
    },
    imgstyle: {
        height: '100%',
        width: '100%',

        flex: 1,
        resizeMode: 'contain'

    }, btview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    btn: {
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        width: 100,
        marginTop: 40


    },

})

export default Home;