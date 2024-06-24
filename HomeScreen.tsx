import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getToken, setToken, getNotifications } from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalContent from './ModalContent';
import SubPopUp from './SubPopUp';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import ButtonTertiary from './ButtonTertiary';

const HomeScreen = () => {
  const [token, setTokenState] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSubPopUpVisible, setSubPopUpVisible] = useState(false);
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setTokenState(storedToken);
    };
    if (isFocused) {
      fetchToken();
      checkNotifications();
    }
  }, [isFocused]);

  const checkNotifications = async () => {
    const notifications = await getNotifications();
    const unseen = notifications.some(notification => notification.status === 'non vu');
    setHasUnseenNotifications(unseen);
  };

  const handleIncreaseToken = async () => {
    const newToken = token + 1;
    setTokenState(newToken);
    await setToken(newToken);
  };

  const handleDecreaseToken = async () => {
    const newToken = token > 0 ? token - 1 : 0;
    setTokenState(newToken);
    await setToken(newToken);
  };

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setTokenState(0);
      setHasUnseenNotifications(false);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tokenContainer}>
        <ButtonPrimary onPress={handleDecreaseToken} text="-" />
        <Text style={styles.tokenText}>{token}</Text>
        <ButtonPrimary onPress={handleIncreaseToken} text="+" />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonPrimary onPress={() => navigation.navigate('BeforeTraject')} text="Press me" />
        <ButtonPrimary onPress={handleClearStorage} text="Clear Storage" style={styles.clearButton} />
      </View>
      <Pressable onPress={() => setModalVisible(true)} style={styles.notificationButton}>
        <Text style={styles.notificationButtonText}>Show Notifications</Text>
        {hasUnseenNotifications && <View style={styles.unseenIndicator} />}
      </Pressable>
      <ButtonTertiary onPress={() => setSubPopUpVisible(true)} text="Open SubPopUp" style={styles.subPopUpButton} />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContent onClose={() => setModalVisible(false)} />
      </Modal>
      <Modal
        visible={isSubPopUpVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSubPopUpVisible(false)}
      >
        <SubPopUp onClose={() => setSubPopUpVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 24,
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  notificationButton: {
    marginTop: 20,
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'relative',
  },
  notificationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unseenIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  subPopUpButton: {
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ff5733',
  },
});

export default HomeScreen;
