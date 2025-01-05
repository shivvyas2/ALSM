import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { requestCameraPermissionsAsync } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus  = await requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
  }, []);

  const flipCamera = () => {
    setType(type === Camera.Constants.Type.back ?
       Camera.Constants.Type.front :
        Camera.Constants.Type.back);
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const options = { quality: 1.0, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
    }
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect:[1,1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })};
    const saveImage = () =>{

    }

  const retakePicture = () => {
    setImage(null);
  }

  if (hasCameraPermission === false|| hasGalleryPermission === false) {
    return <View />; 
  }

  if (hasCameraPermission === false|| hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type} 
        ref={cameraRef} 
        onCameraReady={() => setCameraReady(true)}
        ratio={'1:1'}
        focusMode={Camera.Constants.AutoFocus.on}
        flashMode={Camera.Constants.FlashMode.off}
      >
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
            <FontAwesome name="camera" size={23} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          {!image && <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInside}></View>

          </TouchableOpacity>}
          <TouchableOpacity style={styles.galleryButton} onPress={()=> pickImageAsync()}>
          <FontAwesome name="picture-o" size={28} color="#fff" />
        </TouchableOpacity>
          {image && <View style={styles.previewContainer}>
            <Image source={{uri: image}} style={styles.previewImage} />
            <View style={styles.previewButtonsContainer}>
              <TouchableOpacity style={styles.previewButton} onPress={retakePicture}>
                <Text style={styles.previewButtonText}>Retake</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
        </View>
      </Camera>
      // Camera ends
      <View>
    
 
      
      
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    flexDirection:'row'

  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  topContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  flipButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems:'flex-end',
  },

  captureButton: {
    flex:0,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 2,
    marginRight:10,
    marginBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInside: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  previewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  previewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  previewButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewfinder: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    bottom: '25%',
    borderWidth: 2,
    borderColor: '#fff',
  },
  galleryContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  galleryButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:15,
    marginBottom:10,
    
  },
});
