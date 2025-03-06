"use client"

import type React from "react"
import { useEffect } from "react"
import { View, Animated, Easing } from "react-native"
import { useTheme } from "../context/theme-context"

const LoadingAnimation: React.FC = () => {
  const { isDarkMode } = useTheme()
  const spinValue = new Animated.Value(0)
  const scaleValue1 = new Animated.Value(0)
  const scaleValue2 = new Animated.Value(0)
  const scaleValue3 = new Animated.Value(0)

  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    // Pulsing animations with different delays
    const pulseAnimation = (value: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }

    pulseAnimation(scaleValue1, 0)
    pulseAnimation(scaleValue2, 200)
    pulseAnimation(scaleValue3, 400)
  }, [spinValue, scaleValue1, scaleValue2, scaleValue3])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View className="flex-1 justify-center items-center">
      <Animated.View
        style={[
          {
            width: 80,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: isDarkMode ? "#818cf8" : "#6366f1",
              transform: [
                { translateX: 30 },
                {
                  scale: scaleValue1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: isDarkMode ? "#fb7185" : "#f43f5e",
              transform: [
                { translateY: 30 },
                {
                  scale: scaleValue2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: isDarkMode ? "#34d399" : "#10b981",
              transform: [
                { translateX: -30 },
                {
                  scale: scaleValue3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </View>
  )
}

export default LoadingAnimation
