import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { getNotifications, setNotifications } from './storage';

const ModalContent = ({ onClose }) => {
  const [notifications, setNotificationsState] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const storedNotifications = await getNotifications();
      setNotificationsState(storedNotifications);
    };
    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (index) => {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotificationsState(newNotifications);
    await setNotifications(newNotifications);
  };

  const handleSelectNotification = async (notification, index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].status = 'vu';
    setNotificationsState(updatedNotifications);
    await setNotifications(updatedNotifications);
    setSelectedNotification(notification);
  };

  const handleBackToList = () => {
    setSelectedNotification(null);
  };

  const renderNotification = ({ item, index }) => (
    <View style={[styles.notification, item.status === 'vu' && styles.notificationSeen]}>
      <Text style={styles.notificationText}>{item.title}</Text>
      <Pressable onPress={() => handleSelectNotification(item, index)} style={styles.notificationDetailButton}>
        <Text style={styles.notificationDetailButtonText}>View</Text>
      </Pressable>
      <Pressable onPress={() => handleDeleteNotification(index)} style={styles.notificationDeleteButton}>
        <Text style={styles.notificationDeleteButtonText}>X</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.modalContent}>
      {selectedNotification ? (
        <View style={styles.notificationDetail}>
          <Text style={styles.notificationTitle}>{selectedNotification.title}</Text>
          <Text style={styles.notificationContent}>{selectedNotification.content}</Text>
          <Pressable onPress={handleBackToList} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Notifications</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.topBar}>
            <Text style={styles.topBarTitle}>Notifications</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNotification}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  notificationSeen: {
    backgroundColor: '#e0e0e0',
  },
  notificationText: {
    flex: 1,
  },
  notificationDetailButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#841584',
    borderRadius: 5,
  },
  notificationDetailButtonText: {
    color: 'white',
  },
  notificationDeleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#841584',
    borderRadius: 5,
  },
  notificationDeleteButtonText: {
    color: 'white',
  },
  notificationDetail: {
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationContent: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalContent;
