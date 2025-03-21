import { onBoardingArrays } from "@/constant/arrays";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Image } from "react-native";
import '../global.css'
import { useRef, useState } from "react";
import Pagination from "@/components/Pagination";
import { useRouter } from "expo-router";
import React from "react";
export default function Home() {
  // console.log(API_URL)
  const { width } = useWindowDimensions()
  const routes = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const ref = useRef<any>(null)

  const updatedSlidEvent = (e: any) => {
    setCurrentPage(Math.round(e.nativeEvent.contentOffset.x / width))
  }

  const handleLastSlide = () => {
    const lastslide = onBoardingArrays.length - 1
    if (lastslide > 0) {
      const offset = lastslide * width
      ref?.current?.scrollToOffset({ offset })
      setCurrentPage(lastslide)
    }
  }

  const handleNextSlide = () => {
    const nextSlide = currentPage + 1
    if (nextSlide < onBoardingArrays.length) {
      const offset = nextSlide * width
      ref?.current?.scrollToOffset({ offset })
      setCurrentPage(nextSlide)
    } else {
      handleLastSlide()
    }
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: '#F2F2F2',
      }}
    >
      <View className="flex justify-center items-center">
        <Image source={require('../assets/images/logo.png')} className="w-[15rem] h-[2.6rem] z-50 absolute top-28" />
      </View>
      <View className="rounded-b-[2rem]" style={{ width: width, height: '100%', }}>
        <FlatList ref={ref} data={onBoardingArrays} onMomentumScrollEnd={updatedSlidEvent} showsHorizontalScrollIndicator={false} style={{ width: '100%', height: '100%' }} horizontal pagingEnabled renderItem={({ item, index }) => (
          <View className="h-full   ">
            <View className="h-[55%] bg- pb-5  justify-end flex ">
              <Image className="" style={{ height: '49%', width: width, objectFit: 'contain' }} source={item.img} />
            </View>
            <View className=" h-[20%] flex  relative items-center bg-whiste">
              <View className="w-full flex top-10  relative items-center">
                <Text className="w-[100%] absolute font-bold text-[2.65rem] text-center">{item.text}</Text>
                <Text className="w-[87%]  font-normal top-16  absolute text-lg text-center text-gray-600">{item.subText}</Text>
              </View>
            </View>
          </View>
        )} keyExtractor={(item) => item.text} />

        <View>
          <View className="absolute bottom-60 w-full">
            <Pagination currentPage={currentPage} />
          </View>
          <View className="absolute w-full bottom-20  " style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center', gap: 8 }}>
            <TouchableOpacity onPress={currentPage === onBoardingArrays.length - 1 ? () => routes.push('/login') : handleNextSlide} style={styles.button2} >
              <Text style={styles.text2}>{currentPage === onBoardingArrays.length - 1 ? ' Login' : 'Next'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={currentPage === onBoardingArrays.length - 1 ? () => routes.push('/') : handleLastSlide} style={styles.button3}>
              <Text style={styles.text}>{currentPage === onBoardingArrays.length - 1 ? ' Create Account' : 'Skip'}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: '80%',
    backgroundColor: 'black',
  },
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: '80%',
    backgroundColor: '#F2F2F2',
    borderWidth: 1
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textTransform: 'uppercase',
  },
  text2: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
  },
})
