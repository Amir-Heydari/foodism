import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon, HeartIcon as EmptyHeart } from 'react-native-heroicons/outline';
import { HeartIcon as FilledHeart } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useMealDB from '../network/useMealDB';
import Loading from '../components/Loading';

const RecipeDetailScreen = (props) => {
    let item = props.route.params
    const [isFavourite, setIsFavourite] = useState(false)
    const [recipeDetail, setRecipeDetail] = useState([])
    const navigation = useNavigation()
    const { getRecipeDetail } = useMealDB()

    useEffect(() => {
        getRecipeDetail(item.idMeal).then(response => setRecipeDetail(response.meals))
    }, [])
    return (
        recipeDetail.length > 0 ? (
            <ScrollView
                className='bg-white flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <StatusBar hidden={true} />
                <View className="flex-row justify-center bg-amber-400 pb-1">
                    <Image source={{ uri: item.strMealThumb }} style={{ width: '100%', height: hp(48), borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }} />
                </View>
                {/* back and favourite botton */}
                <View className="flex-row w-full absolute justify-between items-start" style={{ paddingTop: hp(3), paddingLeft: hp(2.5), paddingRight: hp(2.5) }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="p-2 bg-white rounded-full">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setIsFavourite(!isFavourite) }}
                        className="p-2 bg-white rounded-full">
                        {
                            isFavourite ?
                                <FilledHeart size={hp(3.5)} strokeWidth={4.5} color='#fbbf24' />
                                :
                                <EmptyHeart size={hp(3.5)} strokeWidth={2.5} color='#fbbf24' />
                        }
                    </TouchableOpacity>
                </View>
                {/* recipe and name */}
                <View className='flex justify-center space-y-2 pt-4'>
                    {/* name */}
                    <View className='px-6 space-y-1'>
                        <Text
                            className="font-bold tracking-wider text-neutral-700"
                            style={{ fontSize: hp(4) }}>
                            {recipeDetail[0]?.strMeal}
                        </Text>
                        <Text
                            className="font-bold tracking-wider text-neutral-500"
                            style={{ fontSize: hp(2) }}>
                            {recipeDetail[0]?.strArea}
                        </Text>
                    </View>
                    <View className='px-4 space-y-2'>
                        <Text
                            className="font-medium text-neutral-600"
                            style={{ fontSize: hp(3) }}>
                            {recipeDetail[0]?.strInstructions}
                        </Text>
                    </View>

                </View>
            </ScrollView>
        ) : (
            <Loading size='large' />
        )
    );
}

export default RecipeDetailScreen;
