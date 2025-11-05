import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// Assumindo que 'components' está dois níveis acima de (tabs)/
import WeatherCard from '../../components/WeatherCard';

export default function WeatherScreen() {
  // Captura os parâmetros. O Expo Router retorna string | string[]
  const { city, weatherData } = useLocalSearchParams(); 

  // Ajuste para garantir que weatherData seja uma string (Erro TS2345)
  // Se for array, pega o primeiro elemento; se for nulo, usa null.
  const weatherDataString = Array.isArray(weatherData) ? weatherData[0] : weatherData;

  // Requisito 5: Tratamento de erro - verifica se os dados vieram
  if (!weatherDataString) {
    return (
      // Uso do estilo 'errorContainer' que criaremos (Resolve Erro TS2339)
      <View style={styles.errorContainer}> 
        <Text style={styles.errorText}>
          Não foi possível carregar os dados do clima. Volte e tente novamente.
        </Text>
      </View>
    );
  }
  
  // Converte a string JSON de volta para objeto
  const data = JSON.parse(weatherDataString); 

  // Requisito 5: Tratamento de erro - verificação final da estrutura dos dados
  if (!data.main || !data.weather || data.cod === '404') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Erro de Dados: A cidade "{city}" não foi encontrada ou os dados estão incompletos.
        </Text>
      </View>
    );
  }
  
  // Extrai as informações necessárias 
  const mainData = data.main;
  const weatherDescription = data.weather[0].description;
  // NOVO: Extrai o código do ícone (o que estava faltando)
  const iconCode = data.weather[0].icon; 
  const capitalizedCity = String(city).charAt(0).toUpperCase() + String(city).slice(1);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        {/* Usa o componente modularizado */}
        <WeatherCard 
          city={capitalizedCity}
          mainData={mainData}
          weatherDescription={weatherDescription}
          windSpeed={data.wind?.speed} // Usamos '?' para segurança, se wind for undefined
          pressure={data.main?.pressure} // Usamos '?' para segurança
          iconCode={iconCode} // <-- NOVO: PROP PASSADA AQUI
        />
        
        {/* Adicione mais informações se necessário */}
        <Text style={styles.footerText}>
          Última atualização: {new Date().toLocaleTimeString('pt-BR')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    // NOVO ESTILO para containers de erro ou views simples (Resolve Erro TS2339)
    errorContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 40,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
    },
    footerText: {
      marginTop: 20,
      fontSize: 12,
      color: '#888',
    }
});