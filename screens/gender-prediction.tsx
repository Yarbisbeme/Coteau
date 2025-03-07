"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native"
import { useTheme } from "../context/theme-context"
import ScreenContainer from "../components/screen-container"
import InputField from "../components/input-field"
import LoadingAnimation from "../components/loading-animation"
import { Feather } from "@expo/vector-icons"

const GenderPredictorScreen = () => {
  const { colors } = useTheme()
  const [name, setName] = useState("")
  const [gender, setGender] = useState<string | null>(null)
  const [probability, setProbability] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scaleAnim = new Animated.Value(0)
  const opacityAnim = new Animated.Value(0)

  const predictGender = async () => {
    if (!name.trim()) {
      setError("Please enter a name")
      return
    }

    setLoading(true)
    setError(null)
    setGender(null)
    setProbability(null)

    try {
      const response = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(name.trim())}`)
      const data = await response.json()

      if (data.gender) {
        setGender(data.gender)
        setProbability(data.probability)

        // Start animation
        scaleAnim.setValue(0)
        opacityAnim.setValue(0)

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
        ]).start()
      } else {
        setError("Could not predict gender for this name")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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
      backgroundColor: gender === "male" ? "#1e40af20" : "#be185d20",
      borderRadius: 16,
      padding: 24,
      width: "100%",
      alignItems: "center",
      borderWidth: 1,
      borderColor: gender === "male" ? "#1e40af40" : "#be185d40",
    },
    genderText: {
      fontSize: 28,
      fontWeight: "bold",
      color: gender === "male" ? "#1e40af" : "#be185d",
      marginTop: 16,
      textTransform: "capitalize",
    },
    probabilityText: {
      fontSize: 16,
      color: colors.text + "80",
      marginTop: 8,
    },
    errorText: {
      color: colors.notification,
      marginTop: 16,
      fontSize: 16,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: gender === "male" ? "#1e40af20" : "#be185d20",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    genderImage: {
      width: 60,
      height: 60,
    },
  })

  return (
    <ScreenContainer title="Gender Predictor">
      <View style={styles.container}>
        <Text style={styles.title}>Gender Predictor</Text>
        <Text style={styles.description}>Enter a name and we'll predict the gender associated with it.</Text>

        <InputField
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter a name"
          icon="user"
          autoCapitalize="words"
        />

        <TouchableOpacity style={styles.button} onPress={predictGender} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Predict Gender</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {loading && <LoadingAnimation />}

        {gender && !loading && (
          <View style={styles.resultContainer}>
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
                {gender === "male" ? (
                  <Feather name="user" size={40} color="#1e40af" />
                ) : (
                  <Feather name="user" size={40} color="#be185d" />
                )}
              </View>
              <Text style={styles.genderText}>{gender}</Text>
              {probability !== null && (
                <Text style={styles.probabilityText}>Probability: {Math.round(probability * 100)}%</Text>
              )}
            </Animated.View>
          </View>
        )}
      </View>
    </ScreenContainer>
  )
}

export default GenderPredictorScreen

