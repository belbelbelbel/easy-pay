import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const providerImages: { [key: string]: any } = {
  DSTV: require('../assets/images/bills/dstv.jpeg'),
  GOTV: require('../assets/images/bills/gotv.png'),
  STARTIMES: require('../assets/images/bills/startimes.jpeg'),
  SHOWMAX: require('../assets/images/bills/showmax.png'),
}

const television = () => {
  const [airtime, setAirtime] = useState([])
  const [loading, setLoading] = useState(false)
  const routes = useRouter()

  useEffect(() => {
    const handleAirtimeProviders = async () => {
      setLoading(true)
      const token = JSON.parse(await AsyncStorage.getItem('user') as any)?.token
      if (!token) return;

      try {
        const res = await axios.get(`${API_URL}/api/v1/bill/tv/providers`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })

        const dataWithImages = res.data.data.map((provider: any) => ({
          ...provider,
          image: providerImages[provider.provider] || require('../assets/images/bills/dstv.jpeg'),
        }))

        setAirtime(dataWithImages)

        await AsyncStorage.setItem('cableProviders', JSON.stringify(dataWithImages))
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
            <Text className="text-2xl font-bold text-black">Television Providers</Text>
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
                  <TouchableOpacity className="bg-white w-full gap-10 rounded-[1rem] p-4 mb-4 flex-row items-center shadow-sm">
                    <Image
                      source={providerImages[item.provider] || require('../assets/images/bills/dstv.jpeg')}
                      className="w-28 h-20 mr-4 rounded-md "
                      resizeMode="contain"
                    />
                    <View>
                      <Text className="text-lg font-black text-gray-900">{item.provider}</Text>
                    </View>
                    <TouchableOpacity  onPress={() => routes.push(`/cable/${item.provider}`)} className='absolute px-4 py-2  rounded-[0.7rem] bg-black right-4'>
                        {/* <Ionicons name="ellipsis-vertical" size={24} color="#000" />  */}
                        <Text className='font-semibold text-white'>
                            more
                        </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
            )
        }
      </View>
    </SafeAreaView>
  )
}

export default television
