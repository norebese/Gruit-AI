import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Modal } from 'react-native';
import TopNavigationBar from './TopNavigationBar';
import BottomNavigationBar from './BottomNavigationBar';

const SelectFruitScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [selectedButton, setSelectedButton] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태

  const handleButtonPress = (fruit) => {
    setSelectedButton(fruit);
    if (fruit === 'apple') {
      console.log(`카테고리: ${category}`)
      navigation.navigate('PictureUploadFruit', { category: category, subcategory: fruit });
    } else if (['pear', 'mandarin', 'persimmon'].includes(fruit)) {
      setModalMessage(`${fruit === 'pear' ? '배는' : fruit === 'mandarin' ? '귤은' : '감은'} 개발 중입니다.`);
      setModalVisible(true); // 모달을 표시
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar />
      <View style={styles.mainContent}>
        <Text style={styles.title}>과일</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.button, selectedButton === 'apple' && styles.buttonClicked]}
            onPress={() => handleButtonPress('apple')}
          >
            <Image source={require('../assets/images/apple.png')} style={styles.image} />
            <Text style={styles.buttonText}>사과</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'pear' && styles.buttonClicked]}
            onPress={() => handleButtonPress('pear')}
          >
            <Image source={require('../assets/images/pear.png')} style={styles.image} />
            <Text style={styles.buttonText}>배</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'persimmon' && styles.buttonClicked]}
            onPress={() => handleButtonPress('persimmon')}
          >
            <Image source={require('../assets/images/persimmon.png')} style={styles.image} />
            <Text style={styles.buttonText}>감</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'mandarin' && styles.buttonClicked]}
            onPress={() => handleButtonPress('mandarin')}
          >
            <Image source={require('../assets/images/mandarin.png')} style={styles.image} />
            <Text style={styles.buttonText}>귤</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigationBar />

      {/* 모달 구현 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  mainContent: {
    marginTop: 200,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 18,
    backgroundColor: 'white',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 6 }, // 그림자 위치
    shadowOpacity: 0.3, // 그림자 투명도
    shadowRadius: 8, // 그림자 크기
    elevation: 10, // Android용 그림자
  },
  buttonClicked: {
    backgroundColor: '#5d7c5d',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // 어두운 배경 추가
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#1c2219',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectFruitScreen;
