import React,{useState} from 'react';
import {View, TextInput,Button,StyleSheet,Text,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

// import Signup from './Signup';
const Login = () => {
   
  
    const navigation= useNavigation()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    function reg(){
      if(email !=='' && password!=''){
        auth().signInWithEmailAndPassword(email,password) .then(() => {
          navigation.navigate('Home')
          setEmail('')
        setPassword('')
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
        
      }
      else{
        Alert.alert("fill both fields")
      }
     

      
    }
    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Login</Text>
            <View style={styles.inputvw}>
            <Icon name='person'size={32} color='#939696'/>
          
            <TextInput  placeholder='Email' onChangeText={text=>setEmail(text)} value={email} style={styles.inputtext}
        placeholderTextColor='#939696'/>
            </View>
           <View style={styles.inputvw}>
           <Icon name='lock'size={32} color='#939696'/>
              <TextInput placeholder='Password' onChangeText={text=>setPassword(text)} value={password} style={styles.inputtext} 
        secureTextEntry={true}
        placeholderTextColor='#939696' />
           </View>
       
    
        <View style={styles.btview}>
           <View style={styles.btn}><Button title='Login' onPress={()=>reg()} /></View>
           <View style={styles.btn}><Button title='Signup' onPress={()=>navigation.navigate('Signup')}/></View>
           
       
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

    inputvw:{
      height: 50,
      width: 350,
      margin: 25, flexDirection: 'row', borderWidth:1,
      borderColor:'#ccdde3',borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
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
export default Login;