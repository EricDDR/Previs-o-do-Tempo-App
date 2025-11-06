import { useCallback, useState } from 'react';
import { API_KEY, WEATHER_API_URL } from '../constants/config';

export const useWeatherApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildApiUrl = (input) => {
    let url = `${WEATHER_API_URL}?appid=${API_KEY}&units=metric&lang=pt_br`;

    if (typeof input === 'string') {
      url += `&q=${encodeURIComponent(input)}`;
    } else if (input && typeof input.latitude === 'number' && typeof input.longitude === 'number') {
      
      url += `&lat=${input.latitude}&lon=${input.longitude}`;
    } else {
      throw new Error('Formato de busca inválido. Use nome da cidade ou {latitude, longitude}.');
    }

    return url;
  };

  const fetchWeather = useCallback(async (input) => {
    if (!input) return;
    
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const url = buildApiUrl(input);

      
      const response = await fetch(url);
      
    
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Cidade ou localização não encontrada. Verifique o nome.');
        }
        throw new Error(`Erro ao buscar dados climáticos. Código: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result; 
      
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = err.message || 'Erro de conexão ou servidor.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeather };

};
