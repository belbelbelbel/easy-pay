import { View, Text } from 'react-native'
import React from 'react'
import { onBoardingArrays } from '@/constant/arrays'
const Pagination = ({currentPage}:any) => {
  return (
    <View className='flex gap-4 flex-row items-center justify-center'>
        {
            onBoardingArrays.map((item, index) => (
                <View key={index} style={{ width: 15, height: 15, backgroundColor: index === currentPage? 'black' : 'white', borderRadius: 100, borderWidth: currentPage === index ? 0 : 2, borderColor: 'black' }} />
            ))
        }
    </View>
  )
}

export default Pagination