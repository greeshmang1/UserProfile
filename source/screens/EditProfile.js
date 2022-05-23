import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {View,Text, TextInput,Button,Image,TouchableHighlight,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
const EditProfile = () => {
    const user = auth().currentUser.uid
    const navigation= useNavigation()
    const [mobile,setMobile] = useState()
  const [name,setName] = useState()  
  const [email,setEmail] = useState()
  const [ename,setEname] = useState()  
  const [eemail,setEemail] = useState()
  const [emobile,setEmobile] = useState()
  
  function edit(){
      if(ename!=''){
          setName(ename)
      }
      if (eemail!=''){
          setEmail(eemail)
      }
      if(emobile!='')
      {
          setMobile(emobile)
      }
      
database()
.ref('/users/'+user)
.update({
    Name: name,
    Email: email,
    mobile:mobile
})
.then(() => navigation.navigate('Home'));
auth().currentUser.updateEmail({email:email})
  }
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

     


  });


    return (
        <View style={styles.container}>
            <View>
            <View style={styles.welcome}>
                    <Text style={styles.Textwelcome}> Welcome {name}</Text>
                    <TouchableHighlight onPress={() => logout()}>
                        <Icon name='logout' size={32} color='#939696' />

                    </TouchableHighlight>
                </View>
      

            </View>
            <View>
                <View style={styles.inputvw}>
                    <Icon name='person' size={32} color='#939696' />
                    <TextInput style={styles.inputtext} placeholder={name} onChangeText={setEname} placeholderTextColor='#939696'/>

                </View>
                <View style={styles.inputvw}>
                    <Icon name='call' size={32} color='#939696' />
                    <TextInput style={styles.inputtext} placeholder={mobile} onChangeText={text=>setEmobile(text)} placeholderTextColor='#939696'/>

                </View>
                <View style={styles.inputvw}>
                    <Icon name='mail' size={32} color='#939696' />
                    <TextInput style={styles.inputtext}placeholder={email} onChangeText={setEemail} placeholderTextColor='#939696'/>

                </View>


            </View>

            <View style={styles.btview}>
                <View style={styles.btn}><Button title='Cancel' onPress={()=>navigation.navigate('Home')} /></View>
                <View style={styles.btn}><Button title='Edit' onPress={()=>edit()}/></View>
                
            </View>
           


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   alignItems:'center',
        //   justifyContent:'center',
        backgroundColor: '#102a33'
    },
    welcome: {
        height: 100,
        width: '100%',
        margin: 25, flexDirection: 'row'
        // justifyContent:'center',
    },
    btn:{
        marginLeft:10,
        marginRight:10,
        height:50,
        width:100,
      
        
      },
    inputvw:{
        height: 50,
        width: 350,
        margin: 25, flexDirection: 'row', borderWidth:1,
        borderColor:'#ccdde3',borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
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
    inputtext:{
        marginTop:10,
        height:50,
        width:300,borderLeftWidth:1,
        // borderWidth:1,
        borderColor:'#ccdde3',
        // borderRadius:1,
        marginLeft:10,
        marginBottom:10,
        color:'white',
        paddingLeft:10
        
      },
      btview:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    
      },
  

})

export default EditProfile;