import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import InputComponent from '@/components/InputComponent'
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from "@env"
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SignIn = () => {
    const [form, setForm] = useState({
        name: '',
        password: ''
    });

    // console.log(API_URL, 'API_URL')

    const [loading, setLoading] = useState(false); // ✅ Added loading state
    const routes = useRouter();

    const handleOnChangeForm = (name: string, value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        const { name, password } = form;

        if (!name || !password) {
            alert('Please fill in all the fields');
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(`${API_URL}/api/v1/auth/login`, {
                phone: name,
                password: password,
            });

            console.log('Response:', result);
            if (result.data.status === 'success') {
                const userData = result.data.data.user;
                const token = result.data.data.token;

                await AsyncStorage.setItem('user', JSON.stringify({
                    name: userData.name,
                    phone: userData.phone,
                    balance: userData.balance || 0,
                    token
                }));

                routes.push('/(tabs)');
                setForm({ name: '', password: '' });
            } else {
                alert('Invalid credentials');
            }
        } catch (error: any) {
            console.log('Login Error:', error.message);
            alert('Something went wrong, please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <ImageBackground
            source={require("../assets/images/bg-img.jpg")}
            style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: 40 }}
            resizeMode="cover"
        >
            <View className='absolute top-48'>
                <Text className='text-white text-6xl font-bold'>EasyPay</Text>
            </View>

            <View className='h-[65%] rounded-t-[2.3rem] flex gap-7 bg-[#F2F2F2] w-full'>
                <View className='w-[85%] flex justify-center mt-10 gap-3 mx-auto'>
                    <Text className='text-3xl font-bold'>Log in to your account</Text>
                    <Text className='text-[1.05rem] font-light w-[90%]'>
                        Please provide your email ID to log in or sign up before you place your order.
                    </Text>
                </View>

                <View className='w-[85%] flex gap-8 mx-auto'>
                    <View className='w-full flex gap-3'>
                        <InputComponent
                            text={form.name}
                            style={styles.input}
                            onChangeText={(value) => handleOnChangeForm('name', value)}
                            Placeholder={'Name'}
                        />
                        <InputComponent
                            text={form.password}
                            style={styles.input}
                            onChangeText={(value) => handleOnChangeForm('password', value)}
                            Placeholder={'Password'}
                            show={true}
                        />
                    </View>

                    <View>
                        <TouchableOpacity
                            // disabled={loading}
                            className={`bg-black w-[100%] h-[4.2rem] px-5 flex items-center justify-between flex-row rounded-[7px] ${loading ? 'opacity-100' : ''}`}
                            onPress={handleLogin}
                        >
                            {loading ? (
                                <View className='w-full flex items-center justify-center'>
                                    <ActivityIndicator size="small" color="#fff" />
                                </View>
                            ) : (
                                <>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>SIGN IN</Text>
                                    <Ionicons name='arrow-forward' size={27} color='white' />
                                </>
                            )}
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, color: 'gray', fontSize: 16 }}>Forgot Password?</Text>
                    </View>
                </View>

                <TouchableOpacity
                    className='w-[85%] border-2 top-[5rem] mx-auto h-[4.2rem] px-5 flex items-center justify-center flex-row rounded-[7px]'
                    onPress={() => alert('Account created')}
                >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default SignIn;

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
    }
});
