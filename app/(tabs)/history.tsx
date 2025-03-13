import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function history() {
  const routes = useRouter()
  return (
    <SafeAreaView>
      <View className='w-[90%] mx-auto mt-5'>
        <View className='flex flex-row items-center w-full justify-between'>
          <View className='flex flex-row items-center gap-10'>
            <Ionicons name='chevron-back' size={30} onPress={() => routes.back()}/>
            <Text className='text-2xl font-bold'>Transaction History</Text>
          </View>
          <View>
              <Ionicons name='search' size={30} />
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}