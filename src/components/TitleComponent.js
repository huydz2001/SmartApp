import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';

const TitleComponent = (props) => {
  const {text, font, size, color, flex} = props;

  return (
    <TextComponent
      size={size ?? 20}
      color={color}
      text={text}
      flex={flex ?? 1}
    />
  );
};

export default TitleComponent;