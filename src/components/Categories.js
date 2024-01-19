import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux'
import Animated, { FadeIn, FadeOut, FadeInDown } from 'react-native-reanimated'

import { setActiveCategory } from '../slices/toolsSlice'

const Categories = ({ activeCategory, categoryData }) => {

    const dispatch = useDispatch()

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className='space-x-4'
            >
                {
                    categoryData.categories.map((v) => {
                        let isActive = v.strCategory == activeCategory
                        let activeCategoryBackground = isActive ? 'bg-[#ca8100]' : 'bg-white/20';
                        return (
                            <TouchableOpacity
                                onPress={() => dispatch(setActiveCategory(v.strCategory))}
                                key={v.idCategory}
                                className='flex justify-center items-center'>
                                <View
                                    className={`rounded-full p-[8px] ${activeCategoryBackground}`}>
                                    <Image
                                        source={{ uri: v.strCategoryThumb }}
                                        style={{ width: hp(7.5), height: hp(7.5) }}
                                        className="rounded-full"
                                    />
                                </View>
                                <Text className="text-[#ABABAB]" style={{ fontSize: hp(2) }}>{v.strCategory}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
        // <Animated.View entering={FadeInDown.duration(600).springify()}>
        //     <ScrollView
        //         horizontal
        //         showsHorizontalScrollIndicator={false}
        //         contentContainerStyle={{ paddingHorizontal: 15 }}
        //         className='space-x-4'
        //     >
        //         {
        //             categoryData.categories.map((v) => {
        //                 let isActive = v.strCategory == activeCategory
        //                 let activeCategoryBackground = isActive ? 'bg-amber-400' : 'bg-black/10';
        //                 return (
        //                     <TouchableOpacity
        //                         onPress={() => dispatch(setActiveCategory(v.strCategory))}
        //                         key={v.idCategory}
        //                         className='flex justify-center items-center'>
        //                         <View
        //                             className={`rounded-full p-[6px] ${activeCategoryBackground}`}>
        //                             <Image
        //                                 source={{ uri: v.strCategoryThumb }}
        //                                 style={{ width: hp(7), height: hp(7) }}
        //                                 className="rounded-full"
        //                             />
        //                         </View>
        //                         <Text className="text-neutral-600" style={{ fontSize: hp(2) }}>{v.strCategory}</Text>
        //                     </TouchableOpacity>
        //                 )
        //             })
        //         }
        //     </ScrollView>
        // </Animated.View>
    );
}

export default Categories;
