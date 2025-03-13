import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { CarouselData } from '@/constant/arrays'
import { Image } from 'react-native'
const Carousel = () => {
  return (
    <View className="w-full mt-6">
      <FlatList
        data={CarouselData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: any) => (
          <Pressable style={{ backgroundColor: item.color, width: 370 }} className="rounded-[0.4rem] flex py-5 px-5 flex-row mr-2 items-center">
            <View className="h-full w-[60%] gap-3 flex relative">
              <Text className="font-black text-[1.35rem]">{item.title}</Text>
              <Text className="text-xl">{item.description}</Text>
            </View>
            <View className="w-[50%] right-5 absolute">
              <Image source={item.image} style={{ width: 200, height: 140, resizeMode: 'contain' }} />
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}

export default Carousel