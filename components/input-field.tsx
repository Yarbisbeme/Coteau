"use client"

import type React from "react"
import { useState } from "react"
import { View, TextInput, TouchableOpacity, Animated, Easing, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../context/theme-context"

type InputFieldProps = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  icon?: keyof typeof Feather.glyphMap
  onIconPress?: () => void
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  secureTextEntry?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  onIconPress,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  const { isDarkMode } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const animatedValue = new Animated.Value(value ? 1 : 0)

  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    }
  }

  const labelStyle = {
    position: "absolute",
    left: icon ? 46 : 16,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 6],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [isDarkMode ? "#f9fafb80" : "#1f293780", isDarkMode ? "#818cf8" : "#6366f1"],
    }),
    zIndex: 1,
  }

  return (
    <View className="mb-4">
      <Animated.Text style={labelStyle as any}>{label}</Animated.Text>
      <View
        className={`flex-row items-center border rounded-xl ${
          isFocused
            ? isDarkMode
              ? "border-primary-dark"
              : "border-primary"
            : isDarkMode
              ? "border-border-dark"
              : "border-border"
        } ${isDarkMode ? "bg-card-dark" : "bg-card"} px-4 h-14`}
      >
        {icon && (
          <Feather
            name={icon}
            size={20}
            color={isFocused ? (isDarkMode ? "#818cf8" : "#6366f1") : isDarkMode ? "#f9fafb80" : "#1f293780"}
            style={{ marginRight: 8 }}
          />
        )}
        <TextInput
          className={`flex-1 ${isDarkMode ? "text-text-dark" : "text-text"} text-base ${Platform.OS === "ios" ? "pt-3 pb-2" : "pt-4 pb-2"} ${icon ? "pl-2" : "pl-0"}`}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        {onIconPress && (
          <TouchableOpacity onPress={onIconPress}>
            <Feather name="search" size={20} color={isDarkMode ? "#818cf8" : "#6366f1"} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default InputField

