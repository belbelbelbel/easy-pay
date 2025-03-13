import { View, Text, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function profile() {
  const routes = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className='w-[90%] mx-auto mt-6'>
        <View className="flex flex-row  items-center w-full justify-between">
          <View className="flex flex-row items-center gap-10">
            <Ionicons name="chevron-back" size={30} onPress={() => routes.back()} />
            <Text className="text-2xl font-bold">My Profile</Text>
          </View>
          <Ionicons name="settings-outline" size={30} />
        </View>
        <View className='w-full h-[14rem] flex  px-3 border-t-2 flex-row items-center mt-10 gap-3 rounded-[1rem] '>
          <View className='w-40 h-40 bg-white flex items-center justify-center  border-2 border-black rounded-full bg-whitqe'>
            <Image source={require('../../assets/images/profileimg1.png')}/>
          </View>
           <View className="flex  flex-col gap-5">
            <Text className="text-3xl text-whitse  font-bold">Bendee</Text>
            <Text className=" text-whitse text-lg">Gronaldchia@gmail.com</Text>
          </View>
  
        </View>
      </View>
    </SafeAreaView>
  )
}