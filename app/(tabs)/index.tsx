import { View, Text, SafeAreaView, Image, Pressable, FlatList, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router/build/exports';
import { Ionicons } from '@expo/vector-icons';
import { menuData } from '@/constant/arrays';
import { iconData } from '@/constant/arrays';
import { CarouselData } from '@/constant/arrays';
const index = () => {
    const routes = useRouter()
    const [user, setUser] = useState('')
    const { width } = useWindowDimensions()
    useEffect(() => {
        const checkUser = async () => {
            try {
                const userStored = await AsyncStorage.getItem("user");
                if (!userStored) {
                    routes.push("/");
                }
                else (
                    setUser(JSON.parse(userStored).email)
                )
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        checkUser()
    })
    return (
        <SafeAreaView className='flex'>
            <View className='w-[90%] mx-auto'>
                <Pressable onPress={() => routes.push('/')}>
                    <Image source={require('../../assets/images/logo.png')} className="w-[11rem] mt-7 h-[2rem] z-50 " />
                </Pressable>
                <View className='flex flex-row items-center mt-7 justify-between'>
                    <View className='flex '>
                        <Text className='font-bold text-2xl'>Hi, {user} smantha </Text>
                        <Text>Your available balance</Text>
                    </View>
                    <View>
                        <Text className='text-2xl font-bold'>Rs. 500.00</Text>
                    </View>
                </View>
                <View className='w-full mt-6 bg-black justify-center flex h-[7rem] px-10 rounded-[0.8rem]'>
                    <View className="flex flex-row items-center justify-between w-full h-[6rem] ">
                        <Pressable className="flex justify-between w-full flex-row">
                            {iconData.map((item: any, index) => (
                                <Pressable key={index} className="flex gap-[2px] items-center">
                                    <Ionicons name={item.name} size={28} color="white" />
                                    {item.title && <Text className="text-white font-bold">{item.title}</Text>}
                                </Pressable>
                            ))}
                        </Pressable>
                    </View>
                </View>

                <View className=" mt-8">
                    <View className="bg-white h-[12rem] justify-center rounded-lg shadowa px-4">
                        <View className="flex flex-wrap flex-row items-center justify-between">
                            {menuData.map((item: any, index) => (
                                <Pressable key={index} className="w-[22%] flex py-5 items-center  ">
                                    <Ionicons name={item.name} size={28} color={item.color} />
                                    <Text className="text-gray-800 font-semibold text-[0.8rem] text-center">{item.title}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
                <View>
                    <View className="w-full overflow-y-auto ">
                        <FlatList data={CarouselData}
                            className='w-full'
                            horizontal
                            // pagingEnabled
                            style={{ marginTop: 29 }}
                            scrollEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => (
                                <Pressable key={index} style={{ backgroundColor: item.color, width: 370 }} className="rounded-[0.4rem] flex py-5 px-5  flex-row mr-2 items-center">
                                    <View className='h-full w-[60%] gap-3 flex relative'>
                                        <Text className='font-black   text-[1.35rem]'>{item.title}</Text>
                                        <Text className='  text-xl'>{item.description}</Text>
                                    </View>
                                    <View className='w-[50%] right-5 absolute'>
                                        <Image source={item.image} style={{ width: 200, height: 140, resizeMode: 'contain' }} />
                                    </View>
                                </Pressable>
                            )} />
                    </View>
                </View>
                <View className='mt-5 w-full'>
                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className='font-bold text-[1.8rem]'>Recent Transation</Text>
                        <Text className='font-bold text-[1.1rem]'>See All</Text>
                    </View>
                    <ScrollView>
                        
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default index
