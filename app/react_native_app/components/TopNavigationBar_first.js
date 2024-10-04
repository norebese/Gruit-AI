import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopNavigationBar = ({ backAction, showBackButton = true }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.topNav}>
            {showBackButton && (
                <TouchableOpacity onPress={backAction || (() => navigation.goBack())} style={styles.backButton}>
                    <Image source={require('../assets/images/backbutton.png')} style={styles.backImage} />
                </TouchableOpacity>
            )}
            <Image source={require('../assets/images/GRUIT_text.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: 5,
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
        marginLeft: 55
    },
});

export default TopNavigationBar;
