import { View, Text } from 'react-native'
import React from 'react'

const BtnBottomComponent = props =>{
    const {children, localStyles} = props
    return (
        <View style={localStyles} className="flex-row p-2 rounded-3xl items-center">
            {children}
        </View>
    )
}

export default BtnBottomComponent;