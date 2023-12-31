import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon, ClockIcon, HeartIcon as EmptyHeart, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon as FilledHeart, FireIcon, UserGroupIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useMealDB from '../network/useMealDB';
import Loading from '../components/Loading';

const RecipeDetailScreen = (props) => {
    //variables & states
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const [recipeDetail, setRecipeDetail] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [measures, setMeasures] = useState([]);
    const navigation = useNavigation();
    const { getRecipeDetail } = useMealDB();

    useEffect(() => {
        getRecipeDetail(item.idMeal)
            .then(response => {
                setRecipeDetail(response.meals)
                ingredeintsCollector(response.meals);
                measureCollector(response.meals);
            })
    }, [])

    //Data sort functions
    const ingredeintsCollector = (meal) => {
        const data = meal[0]
        const ingredient = [];
        for (let i = 1; i < 21; i++) {
            if (data['strIngredient' + i] !== "") {
                ingredient.push(data['strIngredient' + i])
            }
        }
        setIngredients(ingredient)
    }
    const measureCollector = (meal) => {
        const data = meal[0]
        const measure = [];
        for (let i = 1; i < 21; i++) {
            if (data['strMeasure' + i] !== " ") {
                measure.push(data['strMeasure' + i])
            }
        }
        setMeasures(measure)
    }



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
                    {/* details */}
                    <View className='flex-row justify-around'>
                        <View className='flex rounded-full bg-amber-300 p-2'>
                            <View className="flex items-center justify-center bg-white rounded-full p-1">
                                <ClockIcon size={hp(4)} strokeWidth={2.5} color='black' />
                            </View>
                            <View className='flex items-center py-2 space-y-1'>
                                <Text className='text text-neutral-700 font-semibold' style={{ fontSize: hp(2.5) }}>35</Text>
                                <Text className='text text-neutral-700 font-bold' style={{ fontSize: hp(1.5) }}>Mins</Text>
                            </View>
                        </View>
                        <View className='flex rounded-full bg-amber-300 p-2'>
                            <View className="flex items-center justify-center bg-white rounded-full p-1">
                                <UserGroupIcon size={hp(4)} strokeWidth={2.5} color='black' />
                            </View>
                            <View className='flex items-center py-2 space-y-1'>
                                <Text className='text text-neutral-700 font-semibold' style={{ fontSize: hp(2.5) }}>06</Text>
                                <Text className='text text-neutral-700 font-bold' style={{ fontSize: hp(1.5) }}>Servings</Text>
                            </View>
                        </View>
                        <View className='flex rounded-full bg-amber-300 p-2'>
                            <View className="flex items-center justify-center bg-white rounded-full p-1">
                                <FireIcon size={hp(4)} strokeWidth={2.5} color='black' />
                            </View>
                            <View className='flex items-center py-2 space-y-1'>
                                <Text className='text text-neutral-700 font-semibold' style={{ fontSize: hp(2.5) }}>110</Text>
                                <Text className='text text-neutral-700 font-bold' style={{ fontSize: hp(1.5) }}>Cals</Text>
                            </View>
                        </View>
                        <View className='flex rounded-full bg-amber-300 p-2'>
                            <View className="flex items-center justify-center bg-white rounded-full p-1">
                                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='black' />
                            </View>
                            <View className='flex items-center py-2 space-y-1'>
                                <Text className='text text-neutral-700 font-bold' style={{ fontSize: hp(1.5) }}>Easy</Text>
                            </View>
                        </View>
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
