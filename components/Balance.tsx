import { View, Text } from 'react-native'
import React from 'react'

const Balance = ({ user }: any) => {
  return (
    <View className="flex flex-row items-center mt-7 justify-between">
      <View>
        <Text className="font-bold text-2xl">Hi, {user} </Text>
        <Text>Your available balance</Text>
      </View>
      <Text className="text-2xl font-bold">Rs. 500.00</Text>
    </View>
  )
}

export default Balance