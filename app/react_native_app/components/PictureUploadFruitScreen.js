import React, { useEffect, useState } from 'react';
import { Linking, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import TopNavigationBar from './TopNavigationBar';
import BottomNavigationBar from './BottomNavigationBar';
// import * as Crypto from 'expo-crypto';
import CryptoJS from 'crypto-js';
import Constants from 'expo-constants';

const PictureUploadFruitScreen = ({ navigation, route }) => {
  const { category, subcategory } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const serverApi = Constants.expoConfig.extra.serverApi;
  const fatsecretApi = Constants.expoConfig.extra.fatsecretApi;
  const fatsecretApisecretKey = Constants.expoConfig.extra.fatsecretApisecretKey;

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      
      if (galleryStatus.status !== 'granted') {
        Alert.alert(
          '갤러리 접근 권한 필요',
          '갤러리 접근 권한이 없습니다. 설정에서 권한을 허용해 주세요.',
          [
            { text: '취소', style: 'cancel' },
            { text: '설정으로 이동', onPress: () => Linking.openSettings() }
          ]
        );
      }
    })();
  }, []);

  const handleCapture = async () => {
    // 카메라 권한 요청
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('카메라 권한이 필요합니다!', '앱에서 카메라를 사용하려면 권한을 허용해주세요.');
      return;
    }

    // 카메라 실행
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 촬영한 사진을 placeholder에 설정
      convertImageToBase64(result.assets[0].uri); // base64로 인코딩
    } else {
      console.log('User cancelled image picker');
    }
  };

  const handleSelectFromGallery = async () => {
    if (hasGalleryPermission !== true) {
      Alert.alert('권한 없음', '갤러리 접근 권한이 없습니다. 설정에서 권한을 허용해 주세요.');
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        convertImageToBase64(result.assets[0].uri);
      }
    } catch (error) {
      console.error('갤러리 접근 중 오류 발생:', error);
      Alert.alert('오류', '갤러리에서 이미지를 선택하는 중 문제가 발생했습니다.');
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64); // base64로 인코딩된 이미지 설정
    } catch (error) {
      console.log('Error converting image to base64:', error);
    }
  };

  const handleConfirm = async () => {
    if (base64Image) {
      try {

        const path = serverApi + '/modeleval';
        let response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            category: category,
            subcategory: subcategory
          }),
        });
        const grade = await response.json();
        if(grade) console.log('서버 응답 성공')
        if (!grade.results || grade.results.length === 0) {
          Alert.alert(
            '이미지 분석 실패', 
            `이미지에 ${subcategory}가 없어요..`
          );
          // navigation.navigate('PictureUploadFruit', { category: category, subcategory: subcategory });
        }
        else{
          // 결과 처리
          console.log(`grade 타입: ${typeof(grade)}`)
          grade.results.forEach((result, index) => {
            console.log(`결과 ${index + 1}:`);
            console.log(`이미지: ${result.image.toString().slice(0, 10)}`); // base64 인코딩된 이미지
            console.log(`등급: ${result.grade}`);
            
            // 여기서 이미지와 등급을 사용하여 필요한 처리를 수행합니다.
            // 예: 이미지 표시, 등급 텍스트 업데이트 등
          });
          const result = grade
          const foodSearchResult = await searchFood(subcategory);
          
          if (foodSearchResult) {
            const nutrition = await getFoodDetails(foodSearchResult.food_id);
            console.log(`영양정보 타입: ${typeof(nutrition)}`)
            console.log(`영양정보: ${nutrition}`)
            if (nutrition) {
              Alert.alert('이미지 업로드 성공', '이미지가 성공적으로 업로드되었습니다.');
              navigation.navigate('PictureResult', { result:result, nutrition:nutrition });
            } else {
              Alert.alert('이미지 업로드 실패', '이미지 업로드 중 문제가 발생했습니다.');
            }
          } else {
            Alert.alert('음식 정보 검색 실패', '해당 음식의 영양 정보를 찾을 수 없습니다.');
          }
        }
      } catch (error) {
        console.log('Error uploading image:', error);
        Alert.alert('서버 오류', '이미지 업로드 중 서버 오류가 발생했습니다.');
      }
    } else {
      Alert.alert('이미지를 선택하거나 촬영해주세요.');
    }
  };

// FatSecret API를 이용해 음식 검색
const searchFood = async (foodName) => {
  const params = {
    format: 'json',
    method: 'foods.search',
    oauth_consumer_key: fatsecretApi, // 본인의 consumer key로 변경
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: '1.0',
    search_expression: foodName,
  };

  // OAuth 서명 생성
  params.oauth_signature = generateSignature('GET', params);

  const requestUrl = `https://platform.fatsecret.com/rest/server.api?${new URLSearchParams(params).toString()}`;

  try {
    // API 호출
    const response = await fetch(requestUrl);
    const data = await response.json();

    if (data.foods && data.foods.food && data.foods.food.length > 0) {
      const firstFood = data.foods.food[0];
      return firstFood; // 첫 번째 음식 항목 반환
    } else {
      console.log('No foods found for the given search.');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// 상세 영양 정보를 가져오는 함수
const getFoodDetails = async (foodId) => {
  const params = {
    format: 'json',
    method: 'food.get',
    oauth_consumer_key: fatsecretApi, // 본인의 consumer key로 변경
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: '1.0',
    food_id: foodId,
  };

  // OAuth 서명 생성
  params.oauth_signature = generateSignature('GET', params);

  const requestUrl = `https://platform.fatsecret.com/rest/server.api?${new URLSearchParams(params).toString()}`;

  try {
    // API 호출
    const response = await fetch(requestUrl);
    const data = await response.json();
    // console.log('Food Details response:', data);

    if (data.food && data.food.servings && data.food.servings.serving) {
      const serving = Array.isArray(data.food.servings.serving) ? data.food.servings.serving[0] : data.food.servings.serving;
      const details = {
        calories: serving.calories,
        carbohydrate: serving.carbohydrate,
        sugar: serving.sugar,
        protein: serving.protein,
        fat: serving.fat,
      };
      // console.log('Food details:', details); // 상세 영양 정보 출력
      return details;
    } else {
      console.log('No nutrition information available for this food.');
      return {};
    }
  } catch (error) {
    console.error('Error fetching food details:', error);
    throw error;
  }
};

// OAuth 서명 생성 함수
const generateSignature = (httpMethod, params) => {
  const baseUrl = 'https://platform.fatsecret.com/rest/server.api';
  const consumerSecret = fatsecretApisecretKey; // 본인의 consumer secret으로 변경

  // 매개변수 정렬
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // 서명 기본 문자열 생성
  const signatureBaseString = `${httpMethod}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(sortedParams)}`;

  // 서명 키 생성
  const signingKey = `${encodeURIComponent(consumerSecret)}&`;

  // HMAC-SHA1 서명 생성
  const hash = CryptoJS.HmacSHA1(signatureBaseString, signingKey);
  const signature = CryptoJS.enc.Base64.stringify(hash);

  return signature;
};

  return (
    <View style={styles.container}>
      <TopNavigationBar />
      <View style={styles.mainContent}>
        <Text style={styles.blinkingText}>사진을 찍어주세요.</Text>
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.imagePlaceholder} onPress={handleSelectFromGallery}>
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

export default PictureUploadFruitScreen;
