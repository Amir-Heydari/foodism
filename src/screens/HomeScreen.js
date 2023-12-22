import { StatusBar } from "expo-status-bar"
import react, { useEffect, useState } from "react"
import { Image, ScrollView, Text, TextInput, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useSelector } from 'react-redux'
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

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className='space-y-6 pt-14'
            >
                {/* header */}
                <View className='mx-4 flex-row justify-between items-center'>
                    <Image source={require('../../assets/images/avatar.png')} style={{ width: hp(5), height: hp(5.5) }} />
                    <BellIcon size={hp(4)} color='gray' />
                </View>

                {/* greeting */}
                <View className='mx-4 space-y-2 mb-2'>
                    <Text className='text-neutral-600' style={{ fontSize: hp(2) }}>Hello Amir</Text>
                    <View>
                        <Text style={{ fontSize: hp(3.6) }} className='font-semibold text-neutral-600'>Make your own food,</Text>
                    </View>
                    <Text style={{ fontSize: hp(3.6) }} className='font-semibold text-neutral-600'>At <Text className='text-amber-500'>HOME</Text></Text>
                </View>

                {/* search part */}
                <View className='mx-4 flex-row rounded-full items-center p-2 bg-black/5 '>
                    <TextInput
                        placeholder="Search for food"
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(2) }}
                        className='flex-1 text-base pl-3 tracking-wide'
                    />
                    <View className='bg-white rounded-full p-2'>
                        <MagnifyingGlassIcon size={hp(3)} strokeWidth={3} color={'gray'} />
                    </View>
                </View>

                {/* categories */}
                <View>
                    <Categories categoryData={categoryData} activeCategory={activeCategory} />
                </View>

                {/* Recipes */}
                <View>
                    {recipesByCatData.length > 0 ? (<Recipes recipesByCatData={recipesByCatData} />) : (<Loading size='large' />)}
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen
