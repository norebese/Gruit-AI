import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import TopNavigationBar from './TopNavigationBar';
import BottomNavigationBar from './BottomNavigationBar';
import { SERVER_URL } from './config.js';  // 글로벌 서버 URL 설정
import sampleResponse from './sample-response.json';  // 임시 JSON 파일 import

const PictureUploadVegetableScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

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
      setSelectedImage(result.assets[0].uri);
      convertImageToBase64(result.assets[0].uri);
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
      setSelectedImage(result.assets[0].uri);
      convertImageToBase64(result.assets[0].uri);
    } else {
      console.log('User cancelled image picker');
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64);
    } catch (error) {
      console.log('Error converting image to base64:', error);
    }
  };

  const handleConfirm = async () => {
    if (base64Image) {
      try {
        // 서버와 통신 부분 (현재는 임시 JSON 파일을 사용)
        // 실제 서버가 준비되면 fetch 요청으로 교체할 수 있음
        const response = sampleResponse;

        console.log('Server Response:', response);

        if (response.status === 'success') {
          Alert.alert('이미지 업로드 성공', response.message);
          navigation.navigate('PictureResult', { image: selectedImage, result: response.result });
        } else {
          Alert.alert('이미지 업로드 실패', '이미지 업로드 중 문제가 발생했습니다.');
        }
      } catch (error) {
        console.log('Error uploading image:', error);
        Alert.alert('서버 오류', '이미지 업로드 중 서버 오류가 발생했습니다.');
      }
    } else {
      Alert.alert('이미지를 선택하거나 촬영해주세요.');
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
