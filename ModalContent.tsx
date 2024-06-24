import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPrimary from './ButtonPrimary';

const ModalContent = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const storedNotifications = await getNotifications();
      setNotifications(storedNotifications);
    };
    fetchNotifications();
  }, []);

  const handlePressNotification = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, status: 'vu' } : notification
    );
    setNotifications(updatedNotifications);
    updateNotifications(updatedNotifications);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <ButtonPrimary onPress={onClose} text="Close" />
      </View>
      <ScrollView>
        {notifications.map((notification) => (
          <Pressable
            key={notification.id}
            onPress={() => handlePressNotification(notification.id)}
            style={[styles.notification, notification.status === 'vu' && styles.seenNotification]}
          >
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationContent}>{notification.content}</Text>
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteNotification(notification.id)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notification: {
    backgroundColor: '#FFDE59',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  seenNotification: {
    backgroundColor: '#D3D3D3',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationContent: {
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 16,
    color: 'red',
  },
});

const getNotifications = async () => {
  try {
    const notifications = await AsyncStorage.getItem('notifications');
    return notifications ? JSON.parse(notifications) : [];
  } catch (error) {
    console.error('Error getting notifications from AsyncStorage:', error);
    return [];
  }
};

const updateNotifications = async (notifications) => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error updating notifications in AsyncStorage:', error);
  }
};

const deleteNotification = async (id) => {
  try {
    const notifications = await getNotifications();
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  } catch (error) {
    console.error('Error deleting notification from AsyncStorage:', error);
  }
};

export default ModalContent;
