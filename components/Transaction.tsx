import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { transactions } from '@/constant/arrays'
import { Ionicons } from '@expo/vector-icons'

const Transaction = () => {

    if (!transactions || transactions.length === 0) {
        return (
            <View className="mt-5 flex-1 items-center justify-center">
                <Text className="text-gray-500 text-lg">No transactions available</Text>
            </View>
        );
    }
    
    return (
        <View className="mt-5 flex-1">
            <FlatList
                data={transactions}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                ListFooterComponent={<View className="h-20" />}
                ListHeaderComponent={<View className="h-5" />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({ item }:any) => (
                    <View className="flex-row items-center bg-white p-4 py-7 rounded-lg mb-4 shadow-sm">
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
    );
};

export default Transaction;
