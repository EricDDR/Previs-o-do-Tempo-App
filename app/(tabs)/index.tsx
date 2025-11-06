import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert, 
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useWeatherApi } from '../../hooks/useWeatherApi'; 

export default function SearchScreen() {
  const [cityInput, setCityInput] = useState('');
  const router = useRouter(); 
  

  const { loading, error, fetchWeather } = useWeatherApi();

  const handleSearch = async () => {
    
    if (!cityInput.trim()) {
      Alert.alert('Atenção', 'Por favor, digite o nome da cidade.'); 
      return;
    }

    try {
      
      const data = await fetchWeather(cityInput.trim());
      
      if (data) {
      
        router.push({
          pathname: `/[city]`, 
          params: { 
            weatherData: JSON.stringify(data), 
            city: cityInput.trim()
          }
        });
      }
      
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
      console.error("Erro na busca de UI:", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima Agora</Text>
      <Text style={styles.subtitle}>Consulte a previsão do tempo de qualquer cidade.</Text>
      
      {/* Input estilizado (Requisito 7: Interface funcional e clara) */}
      <TextInput
        style={styles.input}
        placeholder="Ex: São Paulo, Rio de Janeiro"
        placeholderTextColor="#888"
        value={cityInput}
        onChangeText={setCityInput}
        autoCapitalize="words"
      />
      
      {/* Botão estilizado */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSearch} 
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Buscar Clima</Text>
        )}
      </TouchableOpacity>

      {/* Mensagem de Erro (Requisito 5: Feedback de erro) */}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#E6E6FA',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4B0082', 
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 50,
    textAlign: 'center',
    color: '#6A5ACD', 
  },
  input: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    height: 50,
    backgroundColor: '#FF7043', 
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#FF9800',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFCDD2', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D32F2F', 
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    fontWeight: '600',
  }
});
