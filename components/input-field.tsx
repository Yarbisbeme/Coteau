import { Feather } from "@expo/vector-icons"
import { useTheme } from "context/theme-context"
import { useState } from "react"
import { Animated, Easing, View } from "react-native"

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
    const animatedValue = new Animated.Value(value? 1 : 0);

    const handleFocused = () => {
        setIsFocused(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }

    return (
        <View>
            
        </View>
    )
}