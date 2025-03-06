import type React from "react"
import { useEffect } from "react"
import { TouchableOpacity, Text, Animated, Easing, View } from "react-native"
import { useTheme } from "../context/theme-context"
import { Feather,  } from "@expo/vector-icons"

type ToolCardProps = {
    title: string
    icon: keyof typeof Feather.glyphMap
    onPress: () => void
    delay?: number
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon, onPress, delay = 0 }) => {
    const { isDarkMode } = useTheme()
    const scaleAnim = new Animated.Value(0)
    const opacityAnim = new Animated.Value(0)

    useEffect(() => {
        Animated.parallel([
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)),
        }),
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
        }),
        ]).start()
    }, [delay, scaleAnim, opacityAnim])

    return (
        <Animated.View
        style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
        }}
        >
        <TouchableOpacity
            className={`${isDarkMode ? "bg-card-dark" : "bg-card"} rounded-2xl p-5 my-2 mx-4 shadow-sm flex-row items-center`}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View
            className={`w-[50px] h-[50px] rounded-full ${isDarkMode ? "bg-primary-dark" : "bg-primary-dark"} justify-center items-center mr-4`}
            >
                <Feather name={icon} size={24} color="#ffffff" />
            </View>
            <Text className={`text-lg font-semibold ${isDarkMode ? "text-text-dark" : "text-text"} flex-1`}>
            {title}
            </Text>
            <Feather name="chevron-right" size={24} color={isDarkMode ? "#818cf8" : "#6366f1"} />
        </TouchableOpacity>
        </Animated.View>
    )
}

export default ToolCard

