import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import InputComponent from '@/components/InputComponent'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const Contact = () => {
  const routes = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)

  const API_URL = Constants.expoConfig?.extra?.API_URL ;


  const handleOnChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  }


  const isValidForm = () => {
    return Object.values(form).every(field => field.trim() !== '');
  }

  const handleContact = async () => {
    if (!isValidForm()) {
      Alert.alert('Error', 'All fields are required!')
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user') as string);
      const token = user?.token;

      const res = await axios.post(`${API_URL}/api/v1/contact-us`,
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log('Response:', res.data);
      Alert.alert('Success', 'Message sent successfully!');
      setForm({ firstName: '', lastName: '', email: '', message: '', phone: '' }); // Reset form
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  // console.log(form)

  return (
    <SafeAreaView className='flex-1'>
      <View className='w-[90%] mx-auto'>
        <View className="flex flex-row my-8 items-center w-full justify-between">
          <View className="flex flex-row items-center gap-10">
            <Ionicons name="chevron-back" size={30} onPress={() => routes.back()} />
            <Text className="text-2xl font-bold text-black">Contact Us</Text>
          </View>
        </View>

        <View className='w-full h-[74%] flex justify-center'>
          <InputComponent text={form.firstName} style={styles.input} onChangeText={(value) => handleOnChange('firstName', value)} Placeholder={'Enter Your First Name'} />
          <InputComponent text={form.lastName} style={styles.input} onChangeText={(value) => handleOnChange('lastName', value)} Placeholder={'Enter Your Last Name'} />
          <InputComponent text={form.email} style={styles.input} onChangeText={(value) => handleOnChange('email', value)} Placeholder={'Enter Your Email'} />
          <InputComponent text={form.message} style={styles.input} onChangeText={(value) => handleOnChange('message', value)} Placeholder={'Enter Message'} />
          <InputComponent text={form.phone} style={styles.input} onChangeText={(value) => handleOnChange('phone', value)} Placeholder={'Enter Your Phone Number'} />

          <TouchableOpacity
            className='w-full border-2 top-[5rem] border-black mx-auto h-[4.2rem] px-5 flex bg-black items-center justify-center flex-row rounded-[7px]'
            onPress={handleContact}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Contact Us</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Contact;

const styles = StyleSheet.create({
  input: {
    color: 'black',
    borderBottomWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    width: '102%',
    height: 58,
  }
});
