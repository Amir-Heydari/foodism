import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loading = (props) => {
    return (
        <View className='flex flex-1 justify-center items-center mt-20'>
            <ActivityIndicator {...props} />
        </View>
    );
}

export default Loading;
