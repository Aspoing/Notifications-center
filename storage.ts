import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token ? parseInt(token, 10) : 0;
};

export const setToken = async (token) => {
  await AsyncStorage.setItem('token', token.toString());
};

export const getNotifications = async () => {
  const notifications = await AsyncStorage.getItem('notifications');
  return notifications ? JSON.parse(notifications) : [];
};

export const setNotifications = async (notifications) => {
  await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
};
