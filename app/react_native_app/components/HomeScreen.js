import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // 애니메이션을 위한 Animated 객체 생성
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 페이지 이동 타이머 설정
    const timer = setTimeout(() => {
      navigation.navigate('SelectMaterial');
    }, 5000);

    // 애니메이션 설정
    const startShakeAnimation = () => {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => startShakeAnimation());
    };

    startShakeAnimation();

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigation, shakeAnimation]);

  const shake = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-12deg', '12deg'],
  });

  // leaf 스타일을 쉽게 변경할 수 있도록 스타일 객체를 분리
  const leafStyle = [
    styles.leaf,
    { transform: [{ rotate: shake }] },
    { width: 30, height: 30 } // 크기를 수정할 수 있습니다.
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Image source={require('../assets/images/G.png')} style={styles.G_LOGO} />
          <Animated.Image
            source={require('../assets/images/leaf.png')}
            style={leafStyle}
          />
        </View>
        <Text style={styles.gruitText}>GRUIT</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    position: 'relative',
  },
  G_LOGO: {
    width: 300,
    height: 100,
    marginLeft: -15,
  },
  leaf: {
    position: 'absolute',
    top: -10,
    left: 90,
    resizeMode: 'contain',
  },
  gruitText: {
    fontFamily: 'WantedSans',
    color: '#1D2B24',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 10,
  },
});

export default HomeScreen;

