import { View, Text, SafeAreaView, Image, Pressable, FlatList, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router/build/exports';
import { Ionicons } from '@expo/vector-icons';
import { menuData, iconData, transactions } from '@/constant/arrays';
import Carousel from '@/components/Carousel';
import Utility from '@/components/Utility';
import Balance from '@/components/Balance';
import SelectedTransaction from '@/components/SelectedTransaction';
import Features from '@/components/Features';
const index = () => {
    const routes = useRouter()
    const [user, setUser] = useState('')
    const { width } = useWindowDimensions()
    const selectedTransaction: any = transactions.slice(1, 3)
    useEffect(() => {
        const checkUser = async () => {
            try {
                const userStored = await AsyncStorage.getItem("user");
                if (!userStored) {
                    routes.push("/");
                } else {
                    setUser(JSON.parse(userStored).name)
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        checkUser()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="w-[90%] mx-auto flex-1">
                <Pressable onPress={() => routes.push('/')}>
                    <Image source={require('../../assets/images/logo.png')} className="w-[11rem] mt-7 h-[2rem] z-50 " />
                </Pressable>
                <Balance user={user} />
                <Features />
                <Utility />
                <Carousel />
                <SelectedTransaction selectedTransaction={selectedTransaction}/>
            </View>
        </SafeAreaView>
    )
}

export default index;
