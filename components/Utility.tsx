import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { menuData } from '@/constant/arrays'
import { Ionicons } from '@expo/vector-icons'

const Utility = () => {
    return (
        <View className="mt-8 bg-white h-[12rem] justify-center rounded-lg  px-4">
            <View className="flex flex-wrap flex-row items-center justify-between">
                {menuData.map((item: any, index) => (
                    <Pressable key={index} className="w-[22%] flex py-7 items-center">
                        <Ionicons name={item.name} size={28} color={item.color} />
                        <Text className="text-gray-800 font-semibold text-[0.8rem] text-center">{item.title}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}

export default Utility