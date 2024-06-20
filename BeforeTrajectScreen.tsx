import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getToken, setToken, getNotifications, setNotifications } from './storage';

const BeforeTrajectScreen = () => {
  const [token, setTokenState] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setTokenState(storedToken);
    };
    if (isFocused) {
      fetchToken();
    }
  }, [isFocused]);

  const handleNavigate = async () => {
    let newToken = token - 1;
    setTokenState(newToken);
    await setToken(newToken);

    if (newToken === 0) {
      const newNotification = {
        title: 'Fin d\'abonnement token',
        content: 'Tu as utilisé ton dernier token !',
        status: 'non vu'
      };
      const currentNotifications = await getNotifications();
      const updatedNotifications = [...currentNotifications, newNotification];
      await setNotifications(updatedNotifications);
    }

    navigation.navigate('AfterTraject');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.tokenText}>Token: {token}</Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleNavigate} style={styles.button}>
          <Text style={styles.buttonText}>Go to After Traject</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BeforeTrajectScreen;
