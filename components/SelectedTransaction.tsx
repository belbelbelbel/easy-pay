import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const SelectedTransaction = ({ selectedTransaction }: any) => {
    const routes = useRouter()
    return (
        <View className="mt-5 flex-1 ">
            <View className="flex flex-row items-center justify-between w-full my-4">
                <Text className="font-bold text-[1.8rem]">Recent Transactions</Text>
                <TouchableOpacity onPress={() => routes.push('/(tabs)/history')}>
                    <Text className="font-bold text-[1.1rem]">See All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={selectedTransaction}
                keyExtractor={(item) => item.id}
                ListFooterComponent={<View className="h-20" />}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
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

export default SelectedTransaction