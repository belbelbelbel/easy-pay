import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Constants from 'expo-constants'

const providerImages: { [key: string]: any } = {
  AIRTEL: require('../assets/images/bills/Airtel-Airtime.png'),
  MTN: require('../assets/images/bills/MTN-Airtime.png'),
  GLO: require('../assets/images/bills/GLO-Airtime.jpg'),
  '9MOBILE': require('../assets/images/bills/9mobile-Airtime.png'),
  SMILE4G: require('../assets/images/bills/Smile-airtime.jpeg'),
}

const rechargedata = () => {
  const [airtime, setAirtime] = useState([])
  const [loading, setLoading] = useState(false)
  const routes = useRouter()
const API_URL = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const handleAirtimeProviders = async () => {
      setLoading(true)
      const token = JSON.parse(await AsyncStorage.getItem('user') as any)?.token
      if (!token) return;

      try {
        const res = await axios.get(`${API_URL}/api/v1/bill/data/providers`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })

        const dataWithImages = res.data.data.map((provider: any) => ({
          ...provider,
          image: providerImages[provider.provider] || require('../assets/images/bills/GLO-Airtime.jpg'),
        }))

        setAirtime(dataWithImages)

        await AsyncStorage.setItem('dataProviders', JSON.stringify(dataWithImages))
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    handleAirtimeProviders()
  }, [])


  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-6">
      <View className="w-[90%] mx-auto mt-8">
        <View className="flex flex-row mb-8 items-center w-full justify-between">
          <View className="flex flex-row items-center gap-10">
            <Ionicons name="chevron-back" size={30} onPress={() => routes.back()} />
            <Text className="text-2xl font-bold text-black">Data Providers</Text>
          </View>
          <Ionicons name="search" size={30} />
        </View>

        {
          loading ? (
            <View className="flex justify-center items-center h-[80%]">
              <ActivityIndicator size="large" color="#000" />
            </View>
          )
            :
            (
              <FlatList
                data={airtime}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: any) => (
                  <TouchableOpacity onPress={() => routes.push(`/datanetwork/${item.provider}`)} className="bg-white rounded-[1rem] p-4 mb-4 flex-row items-center shadow-sm">
                    <Image
                      source={providerImages[item.provider] || require('../assets/images/bills/GLO-Airtime.jpg')}
                      className="w-16 h-16 rounded-md mr-4"
                      resizeMode="contain"
                    />
                    <View>
                      <Text className="text-lg font-semibold text-gray-900">{item.provider}</Text>
                      <Text className="text-gray-500 text-sm">Min: Rs. {item.minAmount}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )
        }
      </View>
    </SafeAreaView>
  )
}

export default rechargedata
