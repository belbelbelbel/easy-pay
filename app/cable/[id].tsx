import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DataType = {
    _id: string;
    name: string;
    price: string;
}[];
const tvcables = () => {
    const { id } = useLocalSearchParams();
    const [packages, setPackages] = useState<DataType>([]);
    const [loading, setLoading] = useState(false);
    const routes = useRouter();

    useEffect(() => {
        const handleGetPackages = async () => {
            setLoading(true);
            const token = JSON.parse(await AsyncStorage.getItem('user') as any)?.token;
            if (!token) return;

            try {
                const res = await axios.get(`${API_URL}/api/v1/bill/tv/${id}/packages`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setPackages(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        handleGetPackages();
    }, []);

    return (
        <SafeAreaView className='flex-1'>
            <View className="w-[90%] h-full mx-auto my-8">
                <View className="flex flex-row mb-8 items-center w-full justify-between">
                    <View className="flex flex-row items-center gap-10">
                        <Ionicons name="chevron-back" size={30} onPress={() => routes.back()} />
                        <Text className="text-2xl font-bold text-black">{id} - PACKAGES</Text>
                    </View>
                    <Ionicons name="search" size={30} />
                </View>

                {loading ? (
                    <Text className='flex items-center h-full w-full justify-center'>
                        <ActivityIndicator size="large" color="#000" />
                    </Text>
                ) : (
                    <FlatList
                        data={packages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className="py-8 px-4 border-b border-gray-300">
                                <Text className="text-lg font-semibold">{item.name}</Text>
                                {/* <Text className="text-gray-500">Price: {item.price}</Text> */}
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default tvcables;
