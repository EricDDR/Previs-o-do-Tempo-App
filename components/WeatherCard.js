import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'; 


const WeatherCard = ({ city, mainData, weatherDescription, windSpeed, pressure, iconCode }) => {
  
  if (!mainData || !weatherDescription) return null;

  const temp = Math.round(mainData.temp);
  const tempMax = Math.round(mainData.temp_max);
  const tempMin = Math.round(mainData.temp_min);
  const feelsLike = Math.round(mainData.feels_like);
  
  const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@4x.png` : null;

  return (
    <View style={styles.card}>
      
      <Text style={styles.cityText}>{city}</Text>
      
      {/* Exibição do Ícone */}
      {iconUrl && (
        <Image
          style={styles.weatherIcon}
          source={{ uri: iconUrl }
          accessibilityLabel={weatherDescription} 
        />
      )}
      
      <Text style={styles.descriptionText}>{weatherDescription.toUpperCase()}</Text>
      
      <Text style={styles.temperatureText}>{temp}°C</Text>
      <Text style={styles.feelsLikeText}>Sensação: {feelsLike}°C</Text>
      
      {/* Detalhes de Temperatura */}
      <View style={styles.section}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>Máx: {tempMax}°C</Text>
          <Text style={styles.detailText}>Mín: {tempMin}°C</Text>
        </View>
      </View>

      {/* Detalhes Adicionais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DETALHES</Text>
        <View style={styles.detailItem}>
            <Text style={styles.label}>Umidade</Text>
            <Text style={styles.value}>{mainData.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
            <Text style={styles.label}>Vento</Text>
            <Text style={styles.value}>{windSpeed ? `${windSpeed} m/s` : 'N/D'}</Text>
        </View>
        <View style={styles.detailItem}>
            <Text style={styles.label}>Pressão</Text>
            <Text style={styles.value}>{pressure ? `${pressure} hPa` : 'N/D'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    width: '100%',
    maxWidth: 400,
  },
 
  weatherIcon: { 
    width: 120, 
    height: 120, 
    marginBottom: -10, 
  },
  cityText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  descriptionText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  temperatureText: {
    fontSize: 80,
    fontWeight: '200',
    color: '#FF7043', 
  },
  feelsLikeText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  section: {
    width: '100%',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 10,
    textAlign: 'left',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }
});


export default WeatherCard;
