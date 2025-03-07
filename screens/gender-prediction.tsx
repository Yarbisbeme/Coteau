
import { View, Text, Animated, Easing } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'context/theme-context'

type gendertype = {
  gender: string,
  probability: number,
}

export const GenderPrediction: React.FC<gendertype> = () => {
  
  //colores para el tema
  const { colors } = useTheme();

  // usestates para la app
  const [gender, setGender] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [probability, setProbability] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Animaciones
  const scaleAnime = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  //Funcion para consumir la api
  const predictGender = async () => {
    if (!name.trim()){
      setError("Por favor ingrese un nombre");
      return;
    }

    setLoading(true);
    setProbability(null);
    setGender(null);
    setError(null);

    try {

      const response = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(name.trim())}`)
      const data = await response.json()

      if (data.gender) {
        setGender(data.gender);
        setProbability(data.probability);

        scaleAnime.setValue(0);
        opacityAnim.setValue(0);

        Animated.parallel([
          Animated.timing(scaleAnime, {
            toValue: 1,
            useNativeDriver: true,
            duration: 500,
            easing: Easing.in(Easing.ease),
          }),
          Animated.timing(opacityAnim, {
            useNativeDriver: true, 
            duration: 500,
            toValue: 1,
          })
        ]).start()
      }else {
        setError("Could not predict gender fpor this name")
      }
    } catch (error) {
      setError("An error ocurred, please try again")
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <View>
      <Text></Text>
    </View>
  )
}