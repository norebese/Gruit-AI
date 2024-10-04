import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelectMeatScreen = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (meat) => {
    setSelectedButton(meat);
    // Example: You might want to navigate to a picture upload screen for the selected meat
    // navigation.navigate('PictureUploadMeat', { meat });
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.navigate('SelectMaterial')} style={styles.backButton}>
          <Image source={require('../assets/images/backbutton.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Image source={require('../assets/images/GRUIT_text.png')} style={styles.logo} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>육류</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.button, selectedButton === 'Option1' && styles.buttonClicked]}
            onPress={() => handleButtonPress('Option1')}
          >
            <Text style={styles.buttonText}>돼지고기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'Option2' && styles.buttonClicked]}
            onPress={() => handleButtonPress('Option2')}
          >
            <Text style={styles.buttonText}>소고기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'Option3' && styles.buttonClicked]}
            onPress={() => handleButtonPress('Option3')}
          >
            <Text style={styles.buttonText}>닭고기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'Option4' && styles.buttonClicked]}
            onPress={() => handleButtonPress('Option4')}
          >
            <Text style={styles.buttonText}>양고기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Recent')}>
          <Image source={require('../assets/images/recent.png')} style={styles.bottomNavImage} />
          <Text style={styles.bottomNavText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SelectMaterial')}>
          <Image source={require('../assets/images/LOGO.png')} style={styles.homeLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
          <Image source={require('../assets/images/aboutus.png')} style={styles.bottomNavImage2} />
          <Text style={styles.bottomNavText}>About us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1000,
  },
  backButton: {
    padding: 10,
  },
  backImage: {
    width: 15,
    height: 15,
    top: 15
  },
  logo: {
    height: 10,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: 20
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
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
  },
  buttonClicked: {
    backgroundColor: '#5d7c5d',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    height: '8%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomNavImage: {
    width: 25,
    height: 25,
    left: 6,
    marginBottom: 5
  },
  bottomNavImage2: {
    width: 25,
    height: 25,
    left: 13,
    marginBottom: 5
  },
  homeLogo: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: -6,
    left: -10,
    transform: [{ translateX: -30 }],
  },
  bottomNavText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default SelectMeatScreen;
