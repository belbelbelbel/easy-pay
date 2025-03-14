import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router/build/exports';
import { Ionicons } from '@expo/vector-icons';
import { iconData } from '@/constant/arrays';

const dashboard = () => {
  const routes = useRouter()
  const [user, setUser] = useState<any>('')
  const [balance, setBalance] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userStored = await AsyncStorage.getItem("user");
        if (!userStored) {
          routes.push("/");
        }
        else (
          setUser(JSON.parse(userStored))
        )
        console.log("eyoo",user)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    checkUser()
  },[user])
  return (
    <SafeAreaView className='flex'>
      <View className='w-[90%] mx-auto'>
        <Image source={require('../assets/images/logo.png')} className="w-[13rem] mt-7 h-[2.5rem] z-50 " />
        <View className='flex flex-row items-center mt-5 justify-between'>
          <View className='flex '>
            <Text className='font-bold text-2xl'>Hi,{user.name} smantha </Text>
            <Text>Your available balance</Text>
          </View>
          <View>
            <Text className='text-2xl font-bold'>{user.balance}</Text>
          </View>
        </View>
        <View className='w-full mt-6 bg-black justify-center flex h-[7rem] px-7 rounded-[0.8rem]'>
          <View className="flex flex-row items-center justify-between w-full h-[6rem] ">
            <Pressable className="flex justify-between w-full flex-row">
              {iconData.map((item:any, index) => (
                <View key={index} className="flex gap-[2px] items-center">
                  <Ionicons name={item.name} size={25} color="white" />
                  {item.title && <Text className="text-white font-bold">{item.title}</Text>}
                </View>
              ))}
            </Pressable>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default dashboard


