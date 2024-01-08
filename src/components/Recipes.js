import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux'
import MasonryList from '@react-native-seoul/masonry-list'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
const Recipes = ({ recipesByCatData }) => {
    // const recipesByCatData = useSelector((state) => state.data.recipesByCat.meals)
    const navigation = useNavigation()
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipes</Text>
            <View>
                {/* {
                    recipesByCatData.map((v, i) => {
                        return (
                            <View>
                                <Text>i</Text>
                            </View>
                        )
                    })
                } */}
                {<MasonryList
                    data={recipesByCatData}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    // refreshing={isLoadingNext}
                    // onRefresh={() => refetch({ first: ITEM_CNT })}
                    onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
                />}
            </View>
        </View>
    );
}


const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0;
    return (
        <View>
            <Pressable
                onPress={() => navigation.navigate('RecipeDetail', { ...item })}
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className='flex justify-center space-y-2 mb-2'
            >
                <Image
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    source={{ uri: item.strMealThumb }}
                    className="bg-black/5"
                />
                <Text style={{ fontSize: hp(2) }} className="ml-2 font-semibold text-neutral-600">
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </View>
        // <Animated.View entering={FadeInDown.delay(index * 100).duration(800).springify().damping(12)}>
        //     <Pressable
        //         onPress={() => navigation.navigate('RecipeDetail', { ...item })}
        //         style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        //         className='flex justify-center space-y-2 mb-2'
        //     >
        //         <Image
        //             style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
        //             source={{ uri: item.strMealThumb }}
        //             className="bg-black/5"
        //         />
        //         <Text style={{ fontSize: hp(2) }} className="ml-2 font-semibold text-neutral-600">
        //             {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
        //         </Text>
        //     </Pressable>
        // </Animated.View>
    )
}

export default Recipes;
