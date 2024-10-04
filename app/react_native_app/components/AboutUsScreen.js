import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import TopNavigationBar from './TopNavigationBar';
import BottomNavigationBar from './BottomNavigationBar';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <TopNavigationBar />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Image source={require('../assets/images/LOGO_add.png')} style={styles.logoImage} />
          <Text style={styles.font2}>"좋은 식자재, GRUIT과 함께"</Text>
          <Text style={styles.font3}>
            Good + Fruit의 합성어인 GRUIT은 {'\n'}
            AI 기술을 활용하여 식자재 중 좋은 품질과 {'\n'}
            맛있는 식자재를 판단하고 {'\n'}
            찾아주는 서비스를 제안합니다.
          </Text>
          <Image source={require('../assets/images/arrow-down.png')} style={styles.arrowDown} />
        </View>
        <View style={styles.extraContent}>
          <Text style={styles.font4}>사용설명서</Text>
          <Image source={require('../assets/images/1.png')} style={styles.informationImage} />
          <Text style={styles.font5}>1. 과일, 채소, 육류 중 품질을 확인하고 싶은 {'\n'}식자재를 선택해주세요.</Text>
        </View>
        <View style={styles.extraContent2}>
          <Image source={require('../assets/images/2.png')} style={styles.informationImage} />
          <Text style={styles.font6}>2. 선택한 식자재의 세부항목을 선택해주세요.</Text>
        </View>
        <View style={styles.extraContent3}>
          <Image source={require('../assets/images/4.png')} style={styles.informationImage} />
          <Text style={styles.font5}>3. 사진 촬영/앨범에서 식자재의 사진을 업로드 후{'\n'}확인 버튼을 눌러주세요.</Text>
        </View>
        <View style={styles.extraContent2}>
          <Image source={require('../assets/images/5.png')} style={styles.informationImage} />
          <Text style={styles.font6}>4. 결과 페이지에서 판별 정보를 확인할 수 있습니다.{'\n'}아래로 스크롤하면 더 자세한 정보를 볼 수 있습니다.</Text>
        </View>
        <View style={styles.extraContent3}>
          <Image source={require('../assets/images/6.png')} style={styles.informationImage} />
          <Text style={styles.font5}>5. 식자재에 대한 품질정보, 영양정보를 확인할 수 있습니다.</Text>
        </View>
        <View style={styles.extraContent2}>
          <Image source={require('../assets/images/7.png')} style={styles.informationImage} />
          <Text style={styles.font6}>6. Recent 버튼을 누르면 최근기록을 확인할 수 있습니다.{'\n'}로고버튼을 누르면 식자재 선택화면으로 이동합니다.</Text>
        </View>

      </ScrollView>
      <BottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 70,
  },
  content: {
    alignItems: 'center',
    textAlign: 'center',
    top: 50,
  },
  logoImage: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -20,
  },
  font2: {
    color: '#313A31',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  font3: {
    color: '#1D2B24',
    textAlign: 'center',
  },
  font4: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    fontSize: 20
  },
  font5: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  font6: {
    color: '#313A31',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  arrowDown: {
    marginTop: 30,
    width: 20,
    height: 20,
    aspectRatio: 1,
    marginBottom: 20,
  },
  extraContent: {
    backgroundColor: '#5E7C5D',
    padding: 20,
    textAlign: 'center',
    alignItems: 'center', // Center items horizontally
    marginTop: 40,
  },
  extraContent2: {
    backgroundColor: 'white',
    padding: 20,
    textAlign: 'center',
    alignItems: 'center', // Center items horizontally
    marginTop: 0,
  },
  extraContent3: {
    backgroundColor: '#5E7C5D',
    padding: 20,
    textAlign: 'center',
    alignItems: 'center', // Center items horizontally
    marginTop: 0,
  },
  informationImage: {
    width: 250,
    height: 450,
    marginBottom: 10,
  }
});

export default AboutUsScreen;
