import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { transactions } from '@/constant/arrays'
import { Ionicons } from '@expo/vector-icons'

const Transaction = () => {
    return (
        <View className="mt-5 flex-1 ">
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                ListFooterComponent={<View className="h-20" />}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }:any) => (
                    <View className="flex-row items-center bg-white p-4 py-6 rounded-lg mb-4 shadow-sm">
                        <View className="p-2 bg-gray-200 rounded-full">
                            <Ionicons name={item.icon} size={24} color="#333" />
                        </View>
                        <View className="ml-4 flex-1">
                            <Text className="text-base font-semibold">{item.name}</Text>
                            <Text className="text-gray-500 text-sm">{item.date}</Text>
                        </View>
                        <Text className="text-black font-bold">{item.amount}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default Transaction