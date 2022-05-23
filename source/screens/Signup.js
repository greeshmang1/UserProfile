import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, TextInput,Button,StyleSheet,Text} from 'react-native'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'


const Signup = () => {

const navigation= useNavigation()
  const [mobile,setMobile] = useState()
  const [name,setName] = useState()
  const [conformPassword,setConformPassword] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [pic,setPic] = useState()

  function add(){
    adddition(name,age)

  }
  function reg(){

auth().createUserWithEmailAndPassword(email,password).then((res) => {
  console.log('User account created & signed in!');
  database().ref('users/' + res.user.uid).set({
    Name: name,
    Email: email,
    Pic:pic,
    mobile:mobile
})

  
})
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    console.log('That email address is already in use!');
  }

  if (error.code === 'auth/invalid-email') {
    console.log('That email address is invalid!');
  }

  console.error(error);
});
setName('')
setEmail('')
setMobile('')
setConformPassword('')
setPassword('')
navigation.navigate('Login')


  }

 
  return (
    <View style={styles.container}> 
    <Text style={styles.Text}>Registration</Text>

    
        <TextInput  placeholder='Name' onChangeText={text=>setName(text)} value={name} style={styles.inputtext}  text
        placeholderTextColor='#939696'/>
        <TextInput  placeholder='Mobile' onChangeText={text=>setMobile(text)} value={mobile} style={styles.inputtext} 
        placeholderTextColor='#939696' keyboardType='numeric'/>
        <TextInput  placeholder='Email' onChangeText={text=>setEmail(text)} value={email} style={styles.inputtext}
        placeholderTextColor='#939696'/>
        <TextInput placeholder='Password' onChangeText={text=>setPassword(text)} value={password} style={styles.inputtext} 
        secureTextEntry={true}
        placeholderTextColor='#939696' />
        <TextInput placeholder='Re-enter password' onChangeText={text=>setConformPassword(text)} value={conformPassword} 
        style={styles.inputtext}
         secureTextEntry={true} 
         placeholderTextColor='#939696'/>
         <View style={styles.btview}>
           <View style={styles.btn}><Button title='submit' onPress={()=>reg()} /></View>
           <View style={styles.btn}><Button title='login' onPress={()=>navigation.navigate('Login')}/></View>
           {/* <View style={styles.btn}> <Button title='login' onPress={()=>navigation.navigate('Login')}/></View> */}
       
         </View>
        
    </View>
    
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#102a33'
  },
  inputtext:{
    height:50,
    width:350,
    borderWidth:1,
    borderColor:'#ccdde3',
    borderRadius:10,
    marginBottom:10,
    color:'white',
    paddingLeft:10
    
  },
  btview:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'

  },
  btn:{
    marginLeft:10,
    marginRight:10,
    height:50,
    width:100,
  
    
  },
  Text:{
    fontWeight:'bold',
    fontSize:20,
    marginBottom:20,
    color:'white',
  }

})

export default Signup;