import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getNotifications, setNotifications } from './storage';

const AfterTrajectScreen = () => {
  const [somnolence, setSomnolence] = useState('10 sec');
  const [distance, setDistance] = useState('2 km');
  const [pause, setPause] = useState('1');
  const [bpm, setBpm] = useState('74');
  const navigation = useNavigation();

  const handleNavigateHome = async () => {
    const newNotification = {
      title: 'Rapport de trajet',
      content: `Tu as fini un trajet ! Tu as somnolé pendant ${somnolence}, parcouru ${distance} et pris ${pause} pauses ! Nous avons relevé une moyenne de BPM à ${bpm}`,
      status: 'non vu'
    };
    const currentNotifications = await getNotifications();
    const updatedNotifications = [...currentNotifications, newNotification];
    await setNotifications(updatedNotifications);

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
        value={bpm}
        onChangeText={setBpm}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleNavigateHome} style={styles.button}>
          <Text style={styles.buttonText}>Back to Home</Text>
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
  input: {
    width: '80%',
    height: 40,
    borderColor: '#841584',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
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

export default AfterTrajectScreen;
