import { Feather } from "@expo/vector-icons"
import { useTheme } from "context/theme-context"
import { useState } from "react"
import { Animated, Easing, Platform, TextInput, TouchableOpacity, View } from "react-native"

type InputFieldProps = {
    label: string, 
    value: string, 
    placeholder: string,
    onChangeText: (text: string) => void,
    icon?: keyof typeof Feather.glyphMap,
    onIconPress?: () => void,
    autoCapitalize: "none" | "sentences" | "words" | "characters",
    keybordType: "default" | "email-address" | "numeric" | "phone-pad"
    secureTextEntry?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
    label, 
    value, 
    placeholder, 
    onChangeText, 
    icon, 
    onIconPress, 
    autoCapitalize = "none", 
    keybordType = "default", 
    secureTextEntry = false, 
}) => {

    const { isDarkMode } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const animatedValue = new Animated.Value(value ? 1 : 0);

    const handleFocused = () => {
        setIsFocused(true),
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false
        }).start()
    }

    const handleBlur = () => {
        setIsFocused(false),
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start()
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
                        style={{marginRight: 8}}
                    />
                )}
                <TextInput
                    className={`flex-1 text-base 
                    ${isDarkMode ? "text-text-dark": "text-text" }
                    ${Platform.OS === "ios" ? "pt-3 pb-2" : "pt-4 pb-2"} 
                    ${icon ? "pl-2": "pl-0" }
                    `}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={handleBlur}
                    onFocus={handleFocused}
                    placeholder={placeholder}
                    placeholderTextColor={isDarkMode ? "#f9fafb60" : "#1f293760"}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keybordType}
                    secureTextEntry={secureTextEntry}
                />
                { onIconPress && (
                    <TouchableOpacity onPress={onIconPress}>
                        <Feather name="search" size={20} color={isDarkMode ? "#818cf8" : "#6366f1"}/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}