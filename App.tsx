import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'react-native'
import { ThemeProvider } from "context/theme-context";
import Screens from './screens/_index'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#ffffff"}/>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="Home" component={Screens.HomeScreen}/>
          <Stack.Screen name="About" component={Screens.AboutScreen}/>
          <Stack.Screen name="Weather" component={Screens.WeatherScreen}/>
          <Stack.Screen name="University" component={Screens.UniversitiesScreen}/>
          <Stack.Screen name="News" component={Screens.WordpresNewsScreen}/>
          <Stack.Screen name="Age" component={Screens.AgePredictorScreen}/>
          <Stack.Screen name="Gender" component={Screens.GenderPrediction}/>
          <Stack.Screen name="Pokemon" component={Screens.PokemonScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}



