import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
const Balance = ({ user }: any) => {
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [show, setShow] = useState(false)
  const API_URL = Constants.expoConfig?.extra?.API_URL
  useEffect(() => {
    fetchData();
  },[])
  const fetchData = async () => {
    setLoading(true);
    setRefreshing(true)
    try {
      const response = await axios.get(`${API_URL}/api/v1/wallet`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBalance(response.data.data.balance);
      // console.log('recieved',response)
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  // const handleRefresh = async () => {
  //   setRefreshing(true)
  //   await fetchData()
  //   setRefreshing(false)
  // }
  return (
    <View className="flex  flex-row items-center mt-7 justify-between">
      <View className='flex w-[50%] gap-2'>
        <Text className="font-bold text-2xl">Hi, {user.name} </Text>
        <Text>Your available balance</Text>
      </View>
      <View  className='flex w-[41%] flex-row items-center gap-0'>
        <Pressable   className='absolute ' onPress={() => setShow(!show)}>
          {/* {show ? <Ionicons name='eye' size={30} /> : <Ionicons name='eye-off' size={30} />} */}
        </Pressable>
        <Text className="text-2xl absolute right-0  font-bold">{!loading ? `$.${Number(balance).toLocaleString()}` : 'loading...'}</Text>
      </View>
    </View>
  )
}

export default Balance