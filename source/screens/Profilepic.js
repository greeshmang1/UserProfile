import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
export default function Profilepic() {
    const navigation = useNavigation()
    
    const user = auth().currentUser.uid
    const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log(response.assets[0].uri);
        setImage(source);
      }
    });
  };
  
  
  
  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    console.log("f",filename)
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    const photo = await storage().ref(filename).getDownloadURL();
    setImage(null);
    database().ref('/users/'+user).update({
        Pic: photo
    }).then(()=>navigation.navigate('Home'))
   
    
    


  };
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
      <Text style={styles.buttonText}>Pick an image</Text>
    </TouchableOpacity>
    <View style={styles.imageContainer}>
      {image !== null ? (
        <Image source={{ uri: image.uri }} style={styles.imageBox} />
      ) : null}
      {uploading ? (
        <View style={styles.progressBarContainer}>
          <Progress.Bar progress={transferred} width={300} />
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload image</Text>
        </TouchableOpacity>
      )}
    </View>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#bbded6'
    },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  });

// import React from "react";
// import {
//     StyleSheet,
//     View,
//     Button,
//     Image,
//     ActivityIndicator,
//     Platform,
//     SafeAreaView,
//     Text,
// } from "react-native";
// import storage from '@react-native-firebase/storage';
// import {launchImageLibrary} from 'react-native-image-picker';
// export default class Profilepic extends React.Component {

//     state = {
//         imagePath: require("../images/user.png"),
//         isLoading: false,
//         status: '',
//     }

//     chooseFile = () => {
//         this.setState({ status: '' });
//         var options = {
//             title: 'Select Image',
//             customButtons: [
//                 { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//             ],
//             storageOptions: {
//                 skipBackup: true, // do not backup to iCloud
//                 path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
//             },
//         };
//         launchImageLibrary(options, response => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker', storage());
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 let path = this.getPlatformPath(response).value;
//                 let fileName = this.getFileName(response.fileName, path);
//                 this.setState({ imagePath: path });
//                 this.uploadImageToStorage(path, fileName);
//             }
//         });
//     };

//     getFileName(name, path) {
//         if (name != null) { return name; }

//         if (Platform.OS === "ios") {
//             path = "~" + path.substring(path.indexOf("/Documents"));
//         }
//         return path.split("/").pop();
//     }

//     uploadImageToStorage(path, name) {
//         this.setState({ isLoading: true });
//         let reference = storage().ref(name);
//         let task = reference.putFile(path);
//         task.then(() => {
//             console.log('Image uploaded to the bucket!');
//             this.setState({ isLoading: false, status: 'Image uploaded successfully' });
//         }).catch((e) => {
//             status = 'Something went wrong';
//             console.log('uploading image error => ', e);
//             this.setState({ isLoading: false, status: 'Something went wrong' });
//         });
//     }

//     /**
//      * Get platform specific value from response
//      */
//     getPlatformPath({ path, uri }) {
//         return Platform.select({
//             android: { "value": path },
//             ios: { "value": uri }
//         })
//     }

//     getPlatformURI(imagePath) {
//         let imgSource = imagePath;
//         if (isNaN(imagePath)) {
//             imgSource = { uri: this.state.imagePath };
//             if (Platform.OS == 'android') {
//                 imgSource.uri = "file:///" + imgSource.uri;
//             }
//         }
//         return imgSource
//     }

//     render() {
//         let { imagePath } = this.state;
//         let imgSource = this.getPlatformURI(imagePath)
//         return (
//             <SafeAreaView style={styles.container}>
//                 {this.state.isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
//                 <View style={styles.imgContainer}>
//                     <Text style={styles.boldTextStyle}>{this.state.status}</Text>
//                     <Image style={styles.uploadImage} source={imgSource} />
//                     <View style={styles.eightyWidthStyle} >
//                         <Button title={'Upload Image'} onPress={this.chooseFile}></Button>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#e6e6fa',
//     },
//     imgContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'absolute',
//         width: '100%',
//         height: '100%'
//     },
//     eightyWidthStyle: {
//         width: '80%',
//         margin: 2,
//     },
//     uploadImage: {
//         width: '80%',
//         height: 300,
//     },
//     loadingIndicator: {
//         zIndex: 5,
//         width: '100%',
//         height: '100%',
//     },
//     boldTextStyle: {
//         fontWeight: 'bold',
//         fontSize: 22,
//         color: '#5EB0E5',
//     }

// });
// import React, {useState} from 'react';
// // Import required components
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Platform,
//   PermissionsAndroid,
// } from 'react-native';
 
// // Import Image Picker
// // import ImagePicker from 'react-native-image-picker';
// import {
//   launchCamera,
//   launchImageLibrary
// } from 'react-native-image-picker';
 
// const Profilepic = () => {
//   const [filePath, setFilePath] = useState({});
 
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs camera permission',
//           },
//         );
//         // If CAMERA Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     } else return true;
//   };
 
//   const requestExternalWritePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'External Storage Write Permission',
//             message: 'App needs write permission',
//           },
//         );
//         // If WRITE_EXTERNAL_STORAGE Permission is granted
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         alert('Write permission err', err);
//       }
//       return false;
//     } else return true;
//   };
 
//   const captureImage = async (type) => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//       videoQuality: 'low',
//       durationLimit: 30, //Video max duration in seconds
//       saveToPhotos: true,
//     };
//     let isCameraPermitted = await requestCameraPermission();
//     let isStoragePermitted = await requestExternalWritePermission();
//     if (isCameraPermitted && isStoragePermitted) {
//       launchCamera(options, (response) => {
//         console.log('Response = ', response);
 
//         if (response.didCancel) {
//           alert('User cancelled camera picker');
//           return;
//         } else if (response.errorCode == 'camera_unavailable') {
//           alert('Camera not available on device');
//           return;
//         } else if (response.errorCode == 'permission') {
//           alert('Permission not satisfied');
//           return;
//         } else if (response.errorCode == 'others') {
//           alert(response.errorMessage);
//           return;
//         }
//         console.log('base64 -> ', response.base64);
//         console.log('uri -> ', response.uri);
//         console.log('width -> ', response.width);
//         console.log('height -> ', response.height);
//         console.log('fileSize -> ', response.fileSize);
//         console.log('type -> ', response.type);
//         console.log('fileName -> ', response.fileName);
//         setFilePath(response.assets[0].uri);
//       });
//     }
//   };
 
//   const chooseFile = (type) => {
//     let options = {
//       mediaType: type,
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//     };
//     launchImageLibrary(options, (response) => {
//       console.log('Response = ', response);
 
//       if (response.didCancel) {
//         alert('User cancelled camera picker');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         alert(response.errorMessage);
//         return;
//       }
//       console.log('base64 -> ', response.assets[0].fileName);
//       console.log('uri -> ', response.uri);
//       console.log('width -> ', response.width);
//       console.log('height -> ', response.height);
//       console.log('fileSize -> ', response.fileSize);
//       console.log('type -> ', response.type);
//       console.log('fileName -> ', response.fileName);
//       setFilePath(response);
//     });
//   };
 
//   return (
//     <SafeAreaView style={{flex: 1}}>
    
//       <View style={styles.container}>
//         <Image
//           source={{
//             uri: 'data:image/jpeg;base64,' + filePath.data,
//           }}
//           style={styles.imageStyle}
//         />
//         <Image
//           source={{uri: filePath.uri}}
//           style={styles.imageStyle}
//         />
//         <Text style={styles.textStyle}>{filePath.uri}</Text>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => captureImage('photo')}>
//           <Text style={styles.textStyle}>
//             Launch Camera for Image
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => captureImage('video')}>
//           <Text style={styles.textStyle}>
//             Launch Camera for Video
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => chooseFile('photo')}>
//           <Text style={styles.textStyle}>Choose Image</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.buttonStyle}
//           onPress={() => chooseFile('video')}>
//           <Text style={styles.textStyle}>Choose Video</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };
 
// export default Profilepic;
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
    
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   textStyle: {
//     padding: 10,
//     color: 'black',
//     textAlign: 'center',
//   },
//   buttonStyle: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 5,
//     marginVertical: 10,
//     width: 250,
//   },
//   imageStyle: {
//     width: 200,
//     height: 200,
//     margin: 5,
//   },
// });