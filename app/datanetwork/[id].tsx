import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputComponent from '@/components/InputComponent'
import axios from 'axios'
import { Dropdown } from 'react-native-element-dropdown'
import Constants from 'expo-constants'

export default function cellulardata() {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const routes = useRouter();
    const [data, setData] = useState([]);
    const [dataPlans, setDataPlans] = useState([]);
    const [form, setForm] = useState({
        numbers: '',
        plan: '',
    });

const API_URL = Constants.expoConfig?.extra?.API_URL;


    const handleFormChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        const fetchStoredDataPlans = async () => {
            const res = await axios.get(`${API_URL}/api/v1/bill/data/${id}/bundles`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(await AsyncStorage.getItem('user') as any)?.token}`,
                    },
                }
            )
            // console.log('data response', res.data.data)
            setDataPlans(res.data.data);
        };

        fetchStoredDataPlans();
    }, [])

    useEffect(() => {
        const fetchStoredData = async () => {
            const storedData = await AsyncStorage.getItem('dataProviders');
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        };
        fetchStoredData();
    }, []);

    const handleBuyData = async () => {
        if (!form.numbers || !form.plan) {
            alert('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const user = await AsyncStorage.getItem('user');
            const token = user ? JSON.parse(user)?.token : null;

            if (!token) {
                alert('Authentication error, please login again.');
                return;
            }

            const res = await axios.post(`${API_URL}/api/v1/bill/data/buy`,
                {
                    plan: form.plan,
                    number: form.numbers,
                    provider: id,

                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.status === 'success') {
                alert('Data purchased successfully');
                setForm({ numbers: '', plan: '' });
            }
            console.log('Response::', res.data);
        } catch (error) {
            console.error('Error buying data:', error);
            alert('Error buying data');
        } finally {
            setLoading(false);
        }
    };
    console.log("Sending Payload:", {
        plan: form.plan,
        number: form.numbers,
        provider: id,
    });


    console.log(form.numbers)
    return (
        <SafeAreaView className='bg-white flex-1'>
            <View className='w-[90%] mx-auto'>
                <View className="flex flex-row my-8 items-center w-full justify-between">
                    <View className="flex flex-row items-center gap-10">
                        <Ionicons name="chevron-back" size={30} onPress={() => routes.back()} />
                        <Text className="text-2xl font-bold text-black">{id} Service</Text>
                    </View>
                </View>

                <View className='flex items-center'>
                    {data.map((provider: any) => (
                        <View key={provider.provider}>
                            {provider.provider === id && (
                                <View className='w-full h-[16rem] flex justify-center'>
                                    <Image source={provider.image} resizeMode='contain' className='w-[20rem] h-[16rem]' />
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <View className='flex gap-4 mt-10'>
                    <InputComponent
                        style={styles.input}
                        text={form.numbers}
                        onChangeText={(value) => handleFormChange('numbers', value)}
                        Placeholder={`Enter your ${id} Phone number`}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        data={dataPlans}
                        labelField="name"
                        valueField="id"
                        placeholder="Select Data Plan"
                        value={form.plan}
                        onChange={(item) => handleFormChange('plan', String(item.id))}
                    />


                </View>



                <TouchableOpacity
                    className='w-full border-2 top-[5rem] border-black mx-auto h-[4.2rem] px-5 flex bg-black items-center justify-center flex-row rounded-[10px]'
                    onPress={handleBuyData}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="white" />
                    ) : (
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Buy Data</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        color: 'black',
        borderBottomWidth: 2,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        width: '100%',
        height: 58,
    },
    dropdown: {
        borderBottomWidth: 2,
        padding: 10,
        borderRadius: 20,
        fontSize: 16,
        width: '100%',
        height: 58,
        // backgroundColor: '#f9f9f9',
    }
});
