import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';


const RowComponent = (props) => {
    const { children, justify, onPress, styles } = props;

    const localStyle = [
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: justify ?? 'center',
        },
        styles,
    ];

    return onPress ? (
        <TouchableOpacity
            style={localStyle}
            onPress={onPress ? () => onPress() : undefined}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyle}>{children}</View>
    );
};

export default RowComponent;