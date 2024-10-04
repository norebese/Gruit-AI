import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecentScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.navigate('SelectMaterial')} style={styles.backButton}>
          <Image source={require('../assets/images/backbutton.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Image source={require('../assets/images/GRUIT_text.png')} style={styles.logo} />
      </View>

      {/* Recent Records Section */}
      <ScrollView contentContainerStyle={styles.recordList}>
        <Text style={styles.title}>최근기록</Text>

        {/** 예시 데이터 */}
        <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PictureResult')}>
          <Text style={styles.recordDate}>8.26(월)</Text>
          <View style={styles.recordContent}>
            <View style={styles.recordThumbnail}></View>
            <View style={styles.recordDescription}>
              <Text>품명: 사과</Text>
              <Text>상태: <Text style={styles.statusGood}>좋음</Text></Text>
              <Text>품질 등급: 상</Text>
            </View>
          </View>
          <Image source={require('../assets/images/godetail.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PictureResult')}>
          <Text style={styles.recordDate}>8.27(화)</Text>
          <View style={styles.recordContent}>
            <View style={styles.recordThumbnail}></View>
            <View style={styles.recordDescription}>
              <Text>품명: 감자</Text>
              <Text>상태: <Text style={styles.statusNormal}>보통</Text></Text>
              <Text>품질 등급: 중</Text>
            </View>
          </View>
          <Image source={require('../assets/images/godetail.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PictureResult')}>
          <Text style={styles.recordDate}>8.28(수)</Text>
          <View style={styles.recordContent}>
            <View style={styles.recordThumbnail}></View>
            <View style={styles.recordDescription}>
              <Text>품명: 감</Text>
              <Text>상태: <Text style={styles.statusBad}>나쁨</Text></Text>
              <Text>품질 등급: 하</Text>
            </View>
          </View>
          <Image source={require('../assets/images/godetail.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PictureResult')}>
          <Text style={styles.recordDate}>8.29(목)</Text>
          <View style={styles.recordContent}>
            <View style={styles.recordThumbnail}></View>
            <View style={styles.recordDescription}>
              <Text>품명: 배</Text>
              <Text>상태: <Text style={styles.statusNormal}>보통</Text></Text>
              <Text>품질 등급: 중</Text>
            </View>
          </View>
          <Image source={require('../assets/images/godetail.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PictureResult')}>
          <Text style={styles.recordDate}>8.30(금)</Text>
          <View style={styles.recordContent}>
            <View style={styles.recordThumbnail}></View>
            <View style={styles.recordDescription}>
              <Text>품명: 귤</Text>
              <Text>상태: <Text style={styles.statusBad}>나쁨</Text></Text>
              <Text>품질 등급: 하</Text>
            </View>
          </View>
          <Image source={require('../assets/images/godetail.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PictureResult')}>
          <Text style={styles.recordDate}>8.31(토)</Text>
          <View style={styles.recordContent}>
            <View style={styles.recordThumbnail}></View>
            <View style={styles.recordDescription}>
              <Text>품명: 배추</Text>
              <Text>상태: <Text style={styles.statusGood}>좋음</Text></Text>
              <Text>품질 등급: 중</Text>
            </View>
          </View>
          <Image source={require('../assets/images/godetail.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PictureResult')}>
          <Text style={styles.recordDate}>9.6(수)</Text>
          <View style={styles.recordContent}>
            <View style={styles.recordThumbnail}></View>
            <View style={styles.recordDescription}>
              <Text>품명: 양배추</Text>
              <Text>상태: <Text style={styles.statusGood}>좋음</Text></Text>
              <Text>품질 등급: 상</Text>
            </View>
          </View>
          <Image source={require('../assets/images/godetail.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* 추가 항목들을 필요에 따라 추가 */}
      </ScrollView>

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
    backgroundColor: '#d9d9d9',
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
  title: {
    fontSize: 16,
    color: '#333',
    margin: 20,
    fontWeight: 'bold',
  },
  recordList: {
    paddingVertical: 70,
    paddingBottom: 70,
  },
  recordItem: {
    backgroundColor: '#f3f3f3',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  recordDate: {
    fontSize: 18,
    marginBottom: 10,
  },
  recordContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordThumbnail: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 20,
  },
  recordDescription: {
    flex: 1,
    marginLeft: 30,
  },
  statusGood: {
    backgroundColor: '#28A745',
    color: 'white',
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  statusNormal: {
    backgroundColor: '#FFC107',
    color: 'white',
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  statusBad: {
    backgroundColor: '#DC3545',
    color: 'white',
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
    marginLeft: 'auto',
    bottom: 50
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

export default RecentScreen;
