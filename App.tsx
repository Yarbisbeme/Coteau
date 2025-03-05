import { NavigationContainer, ThemeContext } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'react-native'
import HomeScreen from "screens/home-screen";
import WordpresNewsScreen from "screens/wordpress-news-screen";
import { ThemeProvider } from "context/theme-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar />
      </NavigationContainer>
    </ThemeProvider>
  )
}



