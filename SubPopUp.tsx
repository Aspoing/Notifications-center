import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';

const SubPopUp = ({ onClose }) => {
  const { height, width } = Dimensions.get('window');
  const popupHeight = height * 0.7;
  const popupWidth = width * 0.8;

  return (
    <View style={styles.container}>
      <View style={[styles.popup, { height: popupHeight, width: popupWidth }]}>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
        <View style={styles.topSection}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <Text style={styles.topText}>Mensual</Text>
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>- No Ads</Text>
          <Text style={styles.bottomText}>- Monthly Cardiac Report</Text>
          <View style={styles.buttonContainer}>
            <ButtonPrimary onPress={onClose} text="Subscribe for 9.99€" />
            <ButtonSecondary onPress={onClose} text="Close" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topSection: {
    height: '35%',
    width: '100%',
    backgroundColor: '#00275B',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  topText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSection: {
    height: '65%',
    width: '100%',
    backgroundColor: '#7AD5F8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bottomText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default SubPopUp;
