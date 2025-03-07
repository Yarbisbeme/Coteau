"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Image } from "react-native"
import { useTheme } from "../context/theme-context"
import ScreenContainer from "../components/screen-container"
import InputField from "../components/input-field"
import LoadingAnimation from "../components/loading-animation"

const AgePredictorScreen = () => {
  const { colors } = useTheme()
  const [name, setName] = useState("")
  const [age, setAge] = useState<number | null>(null)
  const [ageCategory, setAgeCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Usar useRef para que las animaciones persistan entre renderizados
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  // Log cuando cambia el nombre
  useEffect(() => {
    console.log("Nombre actual:", name);
  }, [name]);

  // Log para ver los estados actuales
  useEffect(() => {
    console.log("Estado actual:", {
      name,
      age,
      ageCategory,
      loading,
      error
    });
  }, [name, age, ageCategory, loading, error]);

  const getAgeCategory = (age: number): string => {
    if (age < 18) return "young"
    if (age < 60) return "adult"
    return "elderly"
  }

  const getImageForCategory = (category: string): string => {
    switch (category) {
      case "young":
        return "https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
      case "adult":
        return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      case "elderly":
        return "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
      default:
        return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
  }

  const getCategoryMessage = (category: string): string => {
    switch (category) {
      case "young":
        return "You are young! Enjoy your youth and learn as much as you can."
      case "adult":
        return "You are an adult! This is the prime time to build your life and career."
      case "elderly":
        return "You are elderly! Time to enjoy the wisdom that comes with age."
      default:
        return ""
    }
  }

  // Función para reiniciar animaciones
  const resetAnimations = (): void => {
    console.log("Reiniciando animaciones");
    scaleAnim.setValue(0)
    opacityAnim.setValue(0)
  }

  // Función para iniciar animaciones
  const startAnimations = (): void => {
    console.log("Iniciando animaciones");
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log("Animaciones completadas");
    })
  }

  const predictAge = async (): Promise<void> => {
    console.log("Botón presionado - predictAge iniciado con nombre:", name);
    
    if (!name.trim()) {
      console.log("Error: Nombre vacío");
      setError("Please enter a name")
      return
    }

    setLoading(true)
    setError(null)
    setAge(null)
    setAgeCategory(null)
    resetAnimations()

    const url = `https://api.agify.io/?name=${encodeURIComponent(name.trim())}`;
    console.log("URL de la API:", url);

    try {
      console.log("Iniciando fetch a la API...");
      const response = await fetch(url);
      console.log("Respuesta de la API recibida, status:", response.status);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }
      
      const data = await response.json();
      console.log("Datos recibidos de la API:", JSON.stringify(data));

      if (data && data.age !== null) {
        console.log(`Edad predicha: ${data.age}`);
        const category = getAgeCategory(data.age);
        console.log(`Categoría calculada: ${category}`);
        
        setAge(data.age);
        setAgeCategory(category);
        
        console.log("Estados actualizados, preparando animaciones...");
        
        // Las animaciones se iniciarán después de que el estado se actualice
        setTimeout(() => {
          console.log("Timeout completado, iniciando animaciones");
          startAnimations();
        }, 100);
      } else {
        console.log("La API no devolvió una edad válida");
        setError("Could not predict age for this name");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("An error occurred. Please try again.");
    } finally {
      console.log("Completando proceso, estableciendo loading a false");
      setLoading(false);
    }
  }

  console.log("Renderizando componente con age:", age, "ageCategory:", ageCategory, "loading:", loading);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      color: colors.text + "80",
      marginBottom: 24,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      marginTop: 16,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
    resultContainer: {
      marginTop: 32,
      alignItems: "center",
    },
    resultCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      width: "100%",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    imageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      marginBottom: 16,
    },
    categoryImage: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },
    ageText: {
      fontSize: 36,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 8,
    },
    categoryText: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 16,
      textTransform: "capitalize",
    },
    messageText: {
      fontSize: 16,
      color: colors.text + "80",
      textAlign: "center",
    },
    errorText: {
      color: colors.notification,
      marginTop: 16,
      fontSize: 16,
    },
  })

  return (
    <ScreenContainer title="Age Predictor">
      <View style={styles.container}>
        <Text style={styles.title}>Age Predictor</Text>
        <Text style={styles.description}>Enter a name and we'll predict the age associated with it.</Text>

        <InputField
          label="Name"
          value={name}
          onChangeText={(text) => {
            console.log("Input cambió a:", text);
            setName(text);
          }}
          placeholder="Enter a name"
          icon="user"
          autoCapitalize="words"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            console.log("Botón tocado");
            predictAge();
          }} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Predict Age</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {loading && (
          <>
            <Text>Loading...</Text>
            <LoadingAnimation />
          </>
        )}

        {age !== null && ageCategory && !loading && (
          <View style={styles.resultContainer}>
            <Text>Mostrando resultado para: {name} - {age} años ({ageCategory})</Text>
            <Animated.View
              style={[
                styles.resultCard,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim,
                },
              ]}
            >
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: getImageForCategory(ageCategory) }} 
                  style={styles.categoryImage} 
                  onError={(e) => console.error("Error cargando imagen:", e.nativeEvent.error)}
                  onLoad={() => console.log("Imagen cargada correctamente")}
                />
              </View>
              <Text style={styles.ageText}>{age} years</Text>
              <Text style={styles.categoryText}>{ageCategory}</Text>
              <Text style={styles.messageText}>{getCategoryMessage(ageCategory)}</Text>
            </Animated.View>
          </View>
        )}
      </View>
    </ScreenContainer>
  )
}

export default AgePredictorScreen