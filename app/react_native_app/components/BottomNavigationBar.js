import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavigationBar = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleRecentPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={handleRecentPress}>
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

            {/* Modal for "Under Development" message */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>개발 중입니다</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: 5,
    },
    bottomNavImage2: {
        width: 25,
        height: 25,
        left: 13,
        marginBottom: 5,
    },
    homeLogo: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: -6,
        left: -5,
        transform: [{ translateX: -30 }],
    },
    bottomNavText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        color: '#333',
    },
    modalButton: {
        backgroundColor: '#1c2219',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default BottomNavigationBar;