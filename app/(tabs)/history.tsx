import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Transaction from '@/components/Transaction'

export default function History() {
    const routes = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="flex-1 w-[90%] mx-auto mt-5">
                {/* Header */}
                <View className="flex flex-row items-center w-full justify-between">
                    <View className="flex flex-row items-center gap-10">
                        <Ionicons name="chevron-back" size={30} onPress={() => routes.back()} />
                        <Text className="text-2xl font-bold">Transaction History</Text>
                    </View>
                    <Ionicons name="search" size={30} />
                </View>

                {/* Transactions List */}
                <Transaction />

                {/* Footer */}
                <View className="flex justify-end mt-10">
                    <Text className="text-gray-600 text-sm">View all transactions</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
