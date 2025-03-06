import { useNavigation } from "@react-navigation/native"
import { useTheme } from "context/theme-context";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

type headerProps = {
    title: string,
    showBackButton?: boolean,
}

export const Header: React.FC<headerProps> = ({title, showBackButton = true}) => {
    const navigation = useNavigation();
    const { isDarkMode, toggleSide } = useTheme();

    return (
        <View
            className={`flex-row items-center px-4 py-3 border-b ${isDarkMode ? "border-border-darK" : "border-border"}`}
        >
            {showBackButton ? (
                <TouchableOpacity
                    className="w-10 h-10 justify-center items-center" 
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={24} color={isDarkMode ? "#f9fafb" : "#1f2937"}/>
                </TouchableOpacity>
            )
            : 
            (
                <View className="w-10" />
            )
            }
        <Text
            className={`text-xl font-bold flex-1 text-center ${isDarkMode ? "text-text-dark" : "text-text"}`}
        >
            {title}
        </Text>
        <TouchableOpacity
            className="w-10 h-10 justify-center items-center"
            onPress={() => toggleSide()}
        >
            <Feather name={`${isDarkMode? "sun": "moon"}`} size={24} color={`${isDarkMode? "#f9fafb" : "#1f2937"}`}/>
        </TouchableOpacity>
        </View>
    )
}
