import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Animated, Easing } from 'react-native';
import TopNavigationBar from './TopNavigationBar';
import BottomNavigationBar from './BottomNavigationBar';

const { width, height } = Dimensions.get('window');

const PictureResultScreen = ({ route }) => {
  const { result, nutrition  } = route.params;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 5,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [slideAnim]);

  const getStatusText = (grade) => {
    switch (grade) {
      case 'best':
      case 'good':
        return (
          <Text style={styles.statusLabel}>
            이 식자재는{' '}
            <Text style={[styles.highlight, { backgroundColor: '#28A745' }]}>좋은</Text>
            {' '}식자재예요
          </Text>
        );
      case 'normal':
        return (
          <Text style={styles.statusLabel}>
            이 식자재는{' '}
            <Text style={[styles.highlight, { backgroundColor: '#FFC107' }]}>보통</Text>
            {' '}식자재예요
          </Text>
        );
      case 'rotten':
        return (
          <Text style={styles.statusLabel}>
            식자재에{' '}
            <Text style={[styles.highlight, { backgroundColor: '#DC3545' }]}>이상</Text>
            {' '}이 있어요
          </Text>
        );
      default:
        return '식자재 상태를 확인할 수 없습니다';
    }
  };

  const getGradeText = (grade) => {
    switch (grade) {
      case 'best': return '특상';
      case 'good': return '상';
      case 'normal': return '보통';
      case 'rotten': return '문제';
      default: return '알 수 없음';
    }
  };

  if (!result) {
    return (
      <View style={styles.container}>
        <TopNavigationBar />
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>결과를 불러올 수 없습니다.</Text>
        </View>
        <BottomNavigationBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavigationBar />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {Object.values(result.results).map((item, index) => (
          <View key={index} style={[styles.contentContainer, { width }]}>
            <ScrollView
              vertical
              pagingEnabled
              showsVerticalScrollIndicator={false}
            >
              <View style={[styles.contentContainer, { height }]}>
                <View style={styles.mainContent}>
                  <View style={styles.uploadSection}>
                    <Image 
                      source={{ uri: `data:image/jpeg;base64,${item.image}` }} 
                      style={styles.imagePlaceholder} 
                    />
                    <View style={styles.statusSection}>
                      <Text style={styles.statusLabel}>{getStatusText(item.grade)}</Text>
                    </View>
                    <Text style={styles.MoreInformation}>더 자세한 정보를 보려면 아래로 스크롤</Text>
                    <Animated.Image
                      source={require('../assets/images/downdown.png')}
                      style={[styles.downdown, { transform: [{ translateY: slideAnim }] }]}
                    />
                  </View>
                </View>
              </View>

              <View style={[styles.contentContainer, { height }]}>
                <View style={styles.subContent}>
                  <View style={styles.qualityInfo}>
                    <Text style={styles.sectionTitle}>품질정보</Text>
                    <View style={styles.separator}></View>
                    <View style={styles.sectionDetailContainer}>
                      <Text style={styles.sectionDetail}>품질 등급</Text>
                      <Text style={styles.value2}>{getGradeText(item.grade)}</Text>
                    </View>
                  </View>
                  <View style={styles.nutritionInfo}>
                    <Text style={styles.sectionTitle}>영양정보</Text>
                    <View style={styles.separator}></View>
                    <View style={styles.sectionDetailContainer}>
                      <Text style={styles.sectionDetail}>칼로리</Text>
                      <Text style={styles.value}>{nutrition.calories}kcal</Text>
                    </View>
                    <View style={styles.sectionDetailContainer}>
                      <Text style={styles.sectionDetail}>탄수화물</Text>
                      <Text style={styles.value}>{nutrition.carbohydrate}g</Text>
                    </View>
                    <View style={styles.sectionDetailContainer}>
                      <Text style={styles.sectionDetail}>당</Text>
                      <Text style={styles.value}>{nutrition.sugar}g</Text>
                    </View>
                    <View style={styles.sectionDetailContainer}>
                      <Text style={styles.sectionDetail}>단백질</Text>
                      <Text style={styles.value}>{nutrition.protein}g</Text>
                    </View>
                    <View style={styles.sectionDetailContainer}>
                      <Text style={styles.sectionDetail}>지방</Text>
                      <Text style={styles.value}>{nutrition.fat}g</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        ))}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,  // 스크롤 하단에 여백을 추가하여 버튼이 가려지지 않도록 함
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,  // 위쪽 마진 조정
  },
  uploadSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: 300,
    height: 200,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#000',
    borderWidth: 2,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c2219',
    marginBottom: 10,  // 마진 조정
    textAlign: 'center',  // 중앙 정렬
  },
  highlight: {
    color: 'white',
    paddingHorizontal: 5,
  },
  MoreInformation: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  subContent: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    elevation: 3,
  },
  qualityInfo: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  sectionDetail: {
    fontSize: 20,
    color: '#555',
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-end',
    marginRight: 10
  },
  value2: {
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-end',
    marginRight: 10,
    fontSize: 20
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
    width: '100%',
  },
  nutritionInfo: {
    width: '100%',
  },
  downdown: {
    width: 20,
    height: 20
  },
  navigationButtons: {
    position: 'absolute',  // 버튼을 고정된 위치에 배치
    bottom: 80,  // 하단에서 80px 위로 위치
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: '#1c2219',
    borderRadius: 10,
  },
  arrowButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PictureResultScreen;
