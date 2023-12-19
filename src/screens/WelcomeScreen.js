import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const WelcomeScreen = () => {
    const ring1padding = useSharedValue(0)
    const ring2padding = useSharedValue(0)

    useEffect(() => {
        setTimeout(() => {
            ring1padding.value = withSpring(ring1padding.value + hp(5))
        }, 100)
    }, [])

    return (
        <View className='flex-1 justify-center items-center space-y-6 bg-amber-700' >
            <StatusBar style='light' />
            {/* logo and ring */}
            <Animated.View className='bg-white/20 rounded-full' style={{ padding: ring1padding }}>
                <Animated.View className='bg-white/20 rounded-full' style={{ padding: ring2padding }}>
                    <Image source={require('../../assets/icon.png')} style={{ width: hp(20), height: hp(20) }} />
                </Animated.View>
            </Animated.View>
            <View className='flex items-center space-y-2'>
                <Text className='font-extrabold text-white tracking-wider ' style={{ fontSize: hp(6) }}>
                    FOODISM
                </Text>
                <Text className='font-medium text-white tracking-wide' style={{ fontSize: hp(3) }}>
                    Cook everything,anytime,anywhere
                </Text>
            </View>
        </View>
    );
}

export default WelcomeScreen;
