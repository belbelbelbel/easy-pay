import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from "@env"
const Balance = ({ user }: any) => {
  const [balance, setBalance] = useState('')
useEffect (() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/wallet`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBalance(response.data.data.balance);
      console.log('recieved',response)
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();

  return () => {
    // cleanup
  };
})
  return (
    <View className="flex flex-row items-center mt-7 justify-between">
      <View className='flex gap-2'>
        <Text className="font-bold text-2xl">Hi, {user.name} </Text>
        <Text>Your available balance</Text>
      </View>
      <Text className="text-2xl font-bold">Rs.{Number(balance).toLocaleString()}</Text>
    </View>
  )
}

export default Balance