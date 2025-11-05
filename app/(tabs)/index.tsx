import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert, // Usaremos TouchableOpacity para um botão personalizado
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useWeatherApi } from '../../hooks/useWeatherApi'; // Importa o hook

export default function SearchScreen() {
  const [cityInput, setCityInput] = useState('');
  const router = useRouter(); 
  
  // O hook agora retorna o estado de erro, que usaremos para feedback
  const { loading, error, fetchWeather } = useWeatherApi();

  const handleSearch = async () => {
    // 1. Validação básica
    if (!cityInput.trim()) {
      Alert.alert('Atenção', 'Por favor, digite o nome da cidade.'); 
      return;
    }

    try {
      // 2. Chama a função de busca modularizada
      const data = await fetchWeather(cityInput.trim());
      
      // Se a busca for bem-sucedida, navega.
      if (data) {
        // 3. Navegação (passando os dados)
        router.push({
          pathname: `/[city]`, 
          params: { 
            weatherData: JSON.stringify(data), 
            city: cityInput.trim()
          }
        });
      }
      
    } catch (e) {
      // O erro é tratado no hook e exibido abaixo, não precisa de Alert aqui
      // Apenas garantimos que o bloco de erro seja executado
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
    backgroundColor: '#E6E6FA', // Fundo lavanda suave
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4B0082', // Índigo
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 50,
    textAlign: 'center',
    color: '#6A5ACD', // Slate Blue
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
    backgroundColor: '#FF7043', // Laranja vibrante
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
    backgroundColor: '#FFCDD2', // Fundo vermelho claro para erro
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D32F2F', // Borda vermelha escura
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    fontWeight: '600',
  }
});