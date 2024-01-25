import { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { Image, ScrollView, Text, TextInput, View, BackHandler, Alert } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux'

import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import Categories from "../components/Categories";
import useMealDB from "../network/useMealDB";
import Recipes from "../components/Recipes";
import Loading from "../components/Loading";

function HomeScreen() {
    const categoryData = useSelector((state) => state.data.categories)
    const activeCategory = useSelector((state) => state.tools.activeCategory)
    const [recipesByCatData, setRecipesByCatData] = useState([])
    const { getRecepiesByCategory } = useMealDB()


    useEffect(() => {
        setRecipesByCatData([]);
        getRecepiesByCategory(activeCategory)
            .then((response) => {
                setRecipesByCatData(response.meals)
            })
    }, [activeCategory])

    //back handler
    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert('Warning!', 'Are you sure you want to exit?', [
    //             {
    //                 text: 'Cancel',
    //                 onPress: () => null,
    //                 style: 'cancel',
    //             },
    //             { text: 'YES', onPress: () => BackHandler.exitApp() },
    //         ]);
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction,
    //     );

    //     return () => backHandler.remove();
    // }, []);

    return (
        <View className="flex-1 bg-[#010101]">
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className='space-y-6 pt-14'
            >
                {/* header */}
                <View className='mx-4 flex-row justify-between items-center'>
                    <Image source={require('../../assets/images/avatar.png')} style={{ width: hp(5), height: hp(5.5) }} />
                    <BellIcon size={hp(4)} color='#ABABAB' />
                </View>

                {/* greeting */}
                <View className='mx-4 space-y-2 mb-2'>
                    <Text className='text-[#FEFEFE]' style={{ fontSize: hp(2) }}>Hello Amir</Text>
                    <View>
                        <Text style={{ fontSize: hp(3.6) }} className='font-semibold text-[#FEFEFE]'>Make your own food,</Text>
                    </View>
                    <Text style={{ fontSize: hp(3.6) }} className='font-semibold text-[#FEFEFE]'>At <Text className='text-[#ca8100]'>HOME</Text></Text>
                </View>

                {/* search part */}
                <View className='mx-4 flex-row rounded-full items-center p-2 bg-white/10'>
                    <TextInput
                        placeholder="Search for food"
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(2) }}
                        className='flex-1 text-base pl-3 tracking-wide placeholder:text-[#ABABAB]'
                    />
                    <View className='bg-[#ABABAB] rounded-full p-2'>
                        <MagnifyingGlassIcon size={hp(3)} strokeWidth={3} color={'#010101'} />
                    </View>
                </View>

                {/* categories */}
                <View>
                    <Categories categoryData={categoryData} activeCategory={activeCategory} />
                </View>

                {/* Recipes */}
                <Text style={{ fontSize: hp(3) }} className="mx-4 space-y-3 font-semibold text-[#ABABAB]">Recipes</Text>
                <View>
                    {recipesByCatData.length > 0 ? (<Recipes recipesByCatData={recipesByCatData} />) : (<Loading size='large' />)}
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen
