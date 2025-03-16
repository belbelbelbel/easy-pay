import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InputComponent from '@/components/InputComponent'
import axios from 'axios'
import { API_URL } from '@env'

export default function networkProvider() {
  const { id } = useLocalSearchParams();
  const routes = useRouter();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    numbers: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const fetchStoredAirtime = async () => {
      const storedData = await AsyncStorage.getItem('airtimeProviders');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };
    fetchStoredAirtime();
  }, []);

  const handleBuyAirtime = async () => {
    if (!form.numbers || !form.amount) {
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

      const res = await axios.post(
        `${API_URL}/api/v1/bill/airtime/buy`,
        {
          amount: form.amount,
          number: form.numbers,
          provider: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if(res.data.status === 'success'){
        alert('Airtime purchased successfully');
        setForm({ numbers: '', amount: '' }); // Reset form
      }
      console.log('Response::', res.data);
    } catch (error) {
      console.error('Error buying airtime:', error);
      alert('Error buying airtime');
    } finally {
      setLoading(false);
    }
  };

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
                  <Image source={provider.image} className='w-[20rem] h-[16rem]' />
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
          <InputComponent 
            style={styles.input} 
            text={form.amount} 
            onChangeText={(value) => handleFormChange('amount', value)} 
            Placeholder={'Enter the Amount'} 
          />
        </View>

        <TouchableOpacity
          className='w-full border-2 top-[5rem] border-black mx-auto h-[4.2rem] px-5 flex bg-black items-center justify-center flex-row rounded-[10px]'
          onPress={handleBuyAirtime}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Buy Airtime</Text>
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
  }
});
