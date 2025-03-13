import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const notification = () => {
  return (
    <SafeAreaView className='flex items-center justify-center' style={{flex:1}}>
      <Text className='text-bold font-bold text-2xl'>No Notification Found</Text>
    </SafeAreaView>
  )
}

export default notification