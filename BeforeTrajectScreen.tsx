import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPrimary from './ButtonPrimary';

const BeforeTrajectScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = React.useState(0);

  React.useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handlePress = async () => {
    let newToken = token - 1;
    if (newToken < 0) newToken = 0;
    setToken(newToken);
    await setTokenInStorage(newToken);
    if (newToken === 0) {
      await createNotification('Fin d\'abonnement token', 'Tu as utilisé ton dernier token !');
    }
    navigation.navigate('AfterTraject');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tokenContainer}>
        <Text style={styles.tokenText}>Token: {token}</Text>
      </View>
      <ButtonPrimary onPress={handlePress} text="Go to After Traject" />
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
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 24,
  },
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token ? parseInt(token) : 0;
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return 0;
  }
};

const setTokenInStorage = async (token) => {
  try {
    await AsyncStorage.setItem('token', token.toString());
  } catch (error) {
    console.error('Error setting token in AsyncStorage:', error);
  }
};

const createNotification = async (title, content) => {
  try {
    const notifications = JSON.parse(await AsyncStorage.getItem('notifications')) || [];
    const newNotification = {
      id: Date.now().toString(),
      title,
      content,
      status: 'non vu',
    };
    notifications.push(newNotification);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export default BeforeTrajectScreen;
