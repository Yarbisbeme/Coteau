import { useEffect, useRef } from "react"
import { View, Text, Image, TouchableOpacity, Linking, Animated, Easing } from "react-native"
import { useTheme } from "../context/theme-context"
import ScreenContainer from "../components/screen-container"
import { Feather, Ionicons } from "@expo/vector-icons"
import { SkillComponent } from "components/skill"

const AboutScreen = () => {
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

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error("Error opening URL:", err)
    })
  }

  return (
    <ScreenContainer title="About Me">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        }}
        className="flex-1 px-6 py-6 items-center"
      >
        <View className="items-center mb-8">
          <View
            className={`w-[200px] h-[200px] rounded-full p-2 mb-4 ${isDarkMode ? "bg-primary-dark/20" : "bg-primary-dark"}`}
          >
            <Image source={require("../assets/img/yarbis.jpg")} className="w-full h-full rounded-full" />
          </View>
          <Text className={`text-2xl font-bold ${isDarkMode ? "text-primary-dark" : "text-text"} mb-1`}>
            Yarbis Beltre Mercedes
          </Text>
          <Text className={`text-lg font-medium ${isDarkMode ? "text-text-dark" : "text-text/80"} mb-4`}>
            Mobile App Developer
          </Text>
          <Text
            className={`text-base ${isDarkMode ? "text-text-dark/70" : "text-text/70"} text-center mb-6 px-4`}
          >
            Passionate mobile developer with expertise in React Native, creating beautiful and functional cross-platform
            applications.
          </Text>

          <View className="flex-row flex-wrap mt-2 mb-6 w-full">
            {/* Tarjeta 1 */}
            <TouchableOpacity
              className="w-1/2"
            >
              <SkillComponent title="React" size={24} iconName="react"/>
            </TouchableOpacity>

            {/* Tarjeta 2 */}
            <SkillComponent title="React Native" size={24} iconName="cellphone"/>

            {/* Tarjeta 3 */}
            <SkillComponent title="C#" size={24} iconName="code-braces"/>
          
            {/* Tarjeta 4 */}
            <SkillComponent title="Javascript" size={24} iconName="language-javascript"/>

            {/* Tarjeta 5 */}
            <SkillComponent title="SQL server" size={24} iconName="server"/>

        </View>
        </View>


        <View className="w-full">
          <Text className={`text-xl font-semibold ${isDarkMode ? "text-text-dark/80" : "text-text/80"} mb-4`}>
            Contact Information
          </Text>

          <View className={`bg-text-text-dark/80 rounded-xl p-6 w-full mb-6 border-1 ${isDarkMode ? "border-primary-dark/20" : "border-primary-dark"}`}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }} onPress={() => openLink("mailto:john.doe@example.com")}>
              <View
                className={`w-10 h-10 rounded-full bg-primary-dark/20 justify-center items-center mr-3`}
              >
                <Feather name="mail" size={20} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
              </View>
              <Text className={`text-base ${isDarkMode ? "text-text-dark/80" : "text-text/80"} flex-1`}>
                john.doe@example.com
              </Text>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "text-text-dark" : "text-text/60"} />
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }} onPress={() => openLink("tel:+1234567890")}>
              <View
                className={`w-10 h-10 rounded-full bg-primary-dark/20 justify-center items-center mr-3`}
              >
                <Feather name="phone" size={20} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
              </View>
              <Text className={`text-base ${isDarkMode ? "text-text-dark/80" : "text-text/80"} flex-1`}>
                +1 (234) 567-890
              </Text>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "text-text-dark" : "text-text/60"} />
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }} onPress={() => openLink("https://github.com")}>
              <View
                className={`w-10 h-10 rounded-full bg-primary-dark/20 justify-center items-center mr-3`}
              >
                <Feather name="github" size={20} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
              </View>
              <Text className={`text-base ${isDarkMode ? "text-text-dark/80" : "text-text/80"} flex-1`}>
                github.com/johndoe
              </Text>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "text-text-dark" : "text-text/60"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 0 }}
              onPress={() => openLink("https://linkedin.com")}
            >
              <View
                className={`w-10 h-10 rounded-full bg-primary-dark/20 justify-center items-center mr-3`}
              >
                <Feather name="linkedin" size={20} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
              </View>
              <Text className={`text-base ${isDarkMode ? "text-text-dark/80" : "text-text/80"} flex-1`}>
                linkedin.com/in/johndoe
              </Text>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "text-text-dark" : "text-text/60"} />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-4">
            <TouchableOpacity className="w-12 h-12 rounded-full bg-card-dark justify-center items-center mx-3" onPress={() => openLink("https://twitter.com")}>
              <Feather name="twitter" size={24} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-card-dark justify-center items-center mx-3" onPress={() => openLink("https://instagram.com")}>
              <Feather name="instagram" size={24} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-card-dark justify-center items-center mx-3" onPress={() => openLink("https://facebook.com")}>
              <Feather name="facebook" size={24} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-card-dark justify-center items-center mx-3" onPress={() => openLink("https://dribbble.com")}>
              <Feather name="dribbble" size={24} color={isDarkMode ? "bg-card-dark" : "bg-card"} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScreenContainer>
  )
}

export default AboutScreen
