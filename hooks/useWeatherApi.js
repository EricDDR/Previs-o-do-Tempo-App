import { useCallback, useState } from 'react';
import { API_KEY, WEATHER_API_URL } from '../constants/config';

/**
 * Hook customizado para buscar dados do clima.
 * Suporta busca por nome da cidade (string) ou por coordenadas (objeto {lat, lon}).
 */
export const useWeatherApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Constrói a URL da API baseada no tipo de entrada.
   * @param {string | {latitude: number, longitude: number}} input - Nome da cidade ou coordenadas.
   * @returns {string} URL de busca completa.
   */
  const buildApiUrl = (input) => {
    let url = `${WEATHER_API_URL}?appid=${API_KEY}&units=metric&lang=pt_br`;

    if (typeof input === 'string') {
      // Busca por nome da cidade
      url += `&q=${encodeURIComponent(input)}`;
    } else if (input && typeof input.latitude === 'number' && typeof input.longitude === 'number') {
      // Busca por coordenadas
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
      // 1. Constrói a URL dinamicamente
      const url = buildApiUrl(input);

      // 2. Chamada à API
      const response = await fetch(url);
      
      // 3. Tratamento de Erro de Status (Requisito 5)
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
      // Garante que a mensagem de erro seja passada para a UI
      const errorMessage = err.message || 'Erro de conexão ou servidor.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeather };
};