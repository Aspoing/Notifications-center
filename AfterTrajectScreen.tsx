import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPrimary from './ButtonPrimary';

const AfterTrajectScreen = () => {
  const navigation = useNavigation();
  const [somnolence, setSomnolence] = useState('10 sec');
  const [distance, setDistance] = useState('2 km');
  const [pause, setPause] = useState('1');
  const [moyenneBpm, setMoyenneBpm] = useState('74');

  const handlePress = async () => {
    await createNotification(
      'Rapport de trajet',
      `Tu as fini un trajet ! Tu as somnolé pendant ${somnolence}, parcouru ${distance} et pris ${pause} pauses ! Nous avons relevé une moyenne de BPM à ${moyenneBpm}`
    );
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Somnolence"
        value={somnolence}
        onChangeText={setSomnolence}
      />
      <TextInput
        style={styles.input}
        placeholder="Distance"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Pause"
        value={pause}
        onChangeText={setPause}
      />
      <TextInput
        style={styles.input}
        placeholder="Moyenne BPM"
        value={moyenneBpm}
        onChangeText={setMoyenneBpm}
      />
      <ButtonPrimary onPress={handlePress} text="Back to Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

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

export default AfterTrajectScreen;
