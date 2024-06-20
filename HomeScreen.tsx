import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getToken, setToken, getNotifications } from './storage';
import ModalContent from './ModalContent';

const HomeScreen = () => {
  const [token, setTokenState] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tokenContainer}>
        <Pressable onPress={handleDecreaseToken} style={styles.tokenButton}>
          <Text style={styles.tokenButtonText}>-</Text>
        </Pressable>
        <Text style={styles.tokenText}>{token}</Text>
        <Pressable onPress={handleIncreaseToken} style={styles.tokenButton}>
          <Text style={styles.tokenButtonText}>+</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate('BeforeTraject')} style={styles.button}>
          <Text style={styles.buttonText}>Press me</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setModalVisible(true)} style={styles.notificationButton}>
        <Text style={styles.notificationButtonText}>Show Notifications</Text>
        {hasUnseenNotifications && <View style={styles.unseenIndicator} />}
      </Pressable>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContent onClose={() => setModalVisible(false)} />
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
  tokenButton: {
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 5,
  },
  tokenButtonText: {
    color: 'white',
    fontSize: 20,
  },
  tokenText: {
    fontSize: 24,
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default HomeScreen;
 