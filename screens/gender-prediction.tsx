
import { View, Text, Animated } from 'react-native'
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
      }

    } catch (error) {

    }
  }

  
  return (
    <View>
      <Text></Text>
    </View>
  )
}