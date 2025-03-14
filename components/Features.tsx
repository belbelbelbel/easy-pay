import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { iconData } from '@/constant/arrays'
import { useRouter } from 'expo-router'

const Features = () => {
    const routes = useRouter()
    return (
        <View className="w-full mt-6 bg-black justify-center flex h-[7rem] px-10 rounded-[0.8rem]">
            <View  className="flex flex-row items-center justify-between w-full h-[6rem]">
                {iconData.map((item: any, index) => (
                    <Pressable  key={index} className="flex gap-[2px] items-center">
                        <Ionicons name={item.name} size={28} color="white" />
                        {item.title && <Text  className="text-white font-bold">{item.title}</Text>}
                    </Pressable>
                ))}
            </View>
        </View>
    )
}

export default Features