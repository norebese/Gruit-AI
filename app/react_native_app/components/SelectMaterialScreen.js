import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import TopNavigationBar from './TopNavigationBar_first';
import BottomNavigationBar from './BottomNavigationBar';

const SelectMaterialScreen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
    if (button === 'Fruits') {
      console.log(`버튼: ${button}`)
      navigation.navigate('SelectFruit', { category: button });
    }
    //  else if (button === 'Vegetables') {
    //   navigation.navigate('SelectVegetable');
    // } else if (button === 'Meats') {
    //   setModalVisible(true);
    // }
    else{
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar showBackButton={false} />
      <View style={styles.mainContent}>
        <Text style={styles.title}>식자재를 선택하세요</Text>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'Fruits' && styles.buttonClicked]}
          onPress={() => handleButtonPress('Fruits')}
        >
          <Image source={require('../assets/images/fruits.png')} style={styles.image} />
          <Text style={styles.buttonText}>과일{'\n'}<Text style={styles.subtitle}>Fruits</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedButton === 'Vegetables' && styles.buttonClicked]}
          onPress={() => handleButtonPress('Vegetables')}
        >
          <Image source={require('../assets/images/vegetable.png')} style={styles.image} />
          <Text style={styles.buttonText2}>채소{'\n'}<Text style={styles.subtitle}>Vegetables</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedButton === 'Meats' && styles.buttonClicked]}
          onPress={() => handleButtonPress('Meats')}
        >
          <Image source={require('../assets/images/meat.png')} style={styles.image} />
          <Text style={styles.buttonText}>육류{'\n'}<Text style={styles.subtitle}>Meats</Text></Text>
        </TouchableOpacity>
      </View>
      <BottomNavigationBar />

      {/* 모달 구현 */}
      <Modal
        animationType="none"  // 애니메이션 없이 모달을 표시
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>개발 중입니다.</Text>
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
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    width: 300,
    borderRadius: 18,
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 6 }, // 그림자 위치
    shadowOpacity: 0.3, // 그림자 투명도
    shadowRadius: 8, // 그림자 크기
    elevation: 10, // Android용 그림자
    justifyContent: 'flex-start',
  },
  buttonClicked: {
    backgroundColor: '#5d7c5d',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 50,
    textAlign: 'center'
  },
  buttonText2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 35,
    textAlign: 'center'
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  subtitle: {
    color: 'gray',
    fontSize: 15,
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

export default SelectMaterialScreen;
