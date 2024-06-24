import React from 'react';
import { Pressable, Text, View, StyleSheet, Image, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';

interface ButtonTertiaryProps {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  text: string;
  icon?: ImageSourcePropType;
}

const ButtonTertiary: React.FC<ButtonTertiaryProps> = ({ onPress, style, textStyle, text, icon }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  text: {
    color: 'black',
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

export default ButtonTertiary;
