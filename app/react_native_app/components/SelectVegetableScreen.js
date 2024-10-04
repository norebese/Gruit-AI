import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TopNavigationBar from './TopNavigationBar';
import BottomNavigationBar from './BottomNavigationBar';

const PictureUploadVegetableScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCapture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('카메라 권한이 필요합니다!', '앱에서 카메라를 사용하려면 권한을 허용해주세요.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 촬영한 사진을 placeholder에 설정
    } else {
      console.log('User cancelled image picker');
    }
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('앨범 접근 권한이 필요합니다!', '앱에서 사진을 선택하려면 권한을 허용해주세요.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 선택한 사진을 placeholder에 설정
    } else {
      console.log('User cancelled image picker');
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      navigation.navigate('PictureResult', { imageUri: selectedImage });
    } else {
      Alert.alert('사진을 선택해주세요', '사진을 선택한 후에 확인 버튼을 눌러주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar />
      <View style={styles.mainContent}>
        <Text style={styles.blinkingText}>사진을 찍어주세요.</Text>
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.imagePlaceholder} onPress={handleSelectImage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
                <Text>갤러리에서 사진 업로드</Text>
                <Text>jpg, png</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <Text style={styles.captureButtonText}>사진 촬영</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={handleConfirm}>
            <Text style={styles.captureButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
  },
  mainContent: {
    marginTop: 200,
    padding: 20,
    alignItems: 'center',
  },
  blinkingText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: 300,
    height: 200,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FFD700',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  captureButton: {
    padding: 10,
    backgroundColor: '#1c2219',
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PictureUploadVegetableScreen;
