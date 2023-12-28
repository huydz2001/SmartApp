import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import { colors } from '../constants/color';


const TextComponent = (props) => {
  const {text, font, size, color, flex, styles} = props;

  return (
    <Text
      style={[
        {
          flex: flex ?? 1,
          fontSize: size ?? 14,
          color: color ?? colors.desc,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;