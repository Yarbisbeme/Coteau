
import { useEffect, useRef } from "react"
import { View, Text, Image, Animated, Easing } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/theme-context"
import ScreenContainer from "../components/screen-container"
import ToolCard from "../components/tool-card"

const HomeScreen = () => {
  const navigation = useNavigation()
  const { isDarkMode } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, translateYAnim])

  return (
    <ScreenContainer title="Toolbox" showBackButton={false}>
      <Animated.View
        style={[
          {
            alignItems: "center",
            marginVertical: 24,
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <View
          className={`w-[150px] h-[150px] rounded-full ${isDarkMode ? "bg-primary-dark/20" : "bg-primary/20"} justify-center items-center mb-4 shadow-md`}
        >
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1057/1057072.png" }}
            className="w-[100px] h-[100px]"
          />
        </View>
        <Text className={`text-2xl font-bold ${isDarkMode ? "text-text-dark" : "text-text"} text-center`}>
          Multi-Tool App
        </Text>
        <Text
          className={`text-base ${isDarkMode ? "text-text-dark/80" : "text-text/80"} text-center mt-2 mb-6 px-8`}
        >
          A collection of useful tools and utilities at your fingertips
        </Text>
      </Animated.View>

      <View className="mb-6">
        <ToolCard
          title="Gender Predictor"
          icon="user"
          onPress={() => navigation.navigate("GenderPredictor" as never)}
          delay={100}
        />
        <ToolCard
          title="Age Predictor"
          icon="calendar"
          onPress={() => navigation.navigate("AgePredictor" as never)}
          delay={200}
        />
        <ToolCard
          title="Universities Finder"
          icon="book"
          onPress={() => navigation.navigate("Universities" as never)}
          delay={300}
        />
        <ToolCard
          title="Weather in DR"
          icon="cloud"
          onPress={() => navigation.navigate("Weather" as never)}
          delay={400}
        />
        <ToolCard title="Pokemon Info" icon="zap" onPress={() => navigation.navigate("Pokemon" as never)} delay={500} />
        <ToolCard
          title="WordPress News"
          icon="rss"
          onPress={() => navigation.navigate("WordpressNews" as never)}
          delay={600}
        />
        <ToolCard title="About" icon="info" onPress={() => navigation.navigate("About" as never)} delay={700} />
      </View>
    </ScreenContainer>
  )
}

export default HomeScreen

