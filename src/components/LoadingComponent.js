import { View, Text , Image} from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'

const LoadingComponent = () => {
  return (
    <View className="w-full h-full bg-white">
        <Modal transparent={false} visible={true}>
            <View className="w-full h-full items-center justify-center">
                <Image 
                
                   source={{uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Floading-gif-loading-discover-share-gifs--713187290996991234%2F&psig=AOvVaw1kExJPk5KZXBP72TNzLlX2&ust=1703435174929000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjDttf8pYMDFQAAAAAdAAAAABAZ"}}
                />
            </View>
        </Modal>
      
    </View>
  )
}

export default LoadingComponent