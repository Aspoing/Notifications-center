import React from 'react';
import { Pressable, Text, View, StyleSheet, Image, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';

interface ButtonPrimaryProps {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  text: string;
  icon?: ImageSourcePropType;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ onPress, style, textStyle, text, icon }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFDE59',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '80%',
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default ButtonPrimary;
