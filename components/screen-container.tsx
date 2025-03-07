import type React from "react"
import type { ReactNode } from "react"
import { View, SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useTheme } from "../context/theme-context"
import {Header} from "./header"

type ScreenContainerProps = {
  children: ReactNode
  title: string
  showBackButton?: boolean
  scrollable?: boolean
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  title,
  showBackButton = true,
  scrollable = true,
}) => {
  const { isDarkMode, colorScheme } = useTheme()

  const Content = () => (
    <>
      <Header title={title} showBackButton={showBackButton} />
      {scrollable ? (
        <ScrollView
          className={`flex-1 px-4`}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 px-4">{children}</View>
      )}
    </>
  )

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-background"}`}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#111827" : "#ffffff"}
      />
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Content />
        </KeyboardAvoidingView>
      ) : (
        <Content />
      )}
    </SafeAreaView>
  )
}

export default ScreenContainer

