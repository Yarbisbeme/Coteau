import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "context/theme-context"
import React from "react"
import { View, Text } from "react-native"

// Definir un valor por defecto seguro
const DEFAULT_ICON: keyof typeof MaterialCommunityIcons.glyphMap = "alarm-light"

type SkillComponentType = {
    title: string
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap // Solo permite nombres válidos
    size: number,
    width?: number
}

export const SkillComponent: React.FC<SkillComponentType> = ({ title, iconName = DEFAULT_ICON, size, width }) => {
    const { isDarkMode } = useTheme();

    return (
            <View className={`p-2 ${width}`}>
                <View className={`flex-row gap-x-2 p-3 rounded-xl ${isDarkMode ? "bg-primary-dark/20" : "bg-primary-dark"}`}>
                    <MaterialCommunityIcons name={iconName} size={size} color={isDarkMode ? "#fff" : "#000"} />
                    <Text className={`text-sm ${isDarkMode ? "text-text-dark/80" : "text-text/80"} font-medium`}>
                        {title}
                    </Text>
                </View>
            </View>
    )
}
