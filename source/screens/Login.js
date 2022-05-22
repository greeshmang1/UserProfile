import React,{useState} from 'react';
import {View, TextInput,Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
import Signup from './Signup';

// import Signup from './Signup';
const Login = () => {
    const navigation= useNavigation()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    return (
        <View>
            <TextInput  placeholder='email' onChangeText={text=>setEmail(text)} value={email}/>
        <TextInput placeholder='password' onChangeText={text=>setPassword(text)} value={password} />
        <Button title='Login' onPress={()=>reg()}/>
        <Button title='Signup' onPress={()=>navigation.navigate(Signup)}/>
        </View>
    );
}

export default Login;