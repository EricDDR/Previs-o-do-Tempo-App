# ☀️ Projeto Final: Aplicativo de Previsão do Tempo (React Native c/ API)

Este projeto consiste em um aplicativo móvel de previsão do tempo, desenvolvido em **React Native (Expo)**, que atende a todos os requisitos do Projeto Final, com foco em modularização e consumo de uma API REST pública.

## ✨ Requisitos do Projeto (Atendidos)

| Requisito | Status | Implementação |
| :--- | :--- | :--- |
| **R1:** Desenvolvido em React Native (Expo) | ✅ | Utilização da plataforma Expo para desenvolvimento. |
| **R2:** Consumir ao menos uma API REST (GET) | ✅ | Uso da API **OpenWeatherMap** (método `GET`) centralizado no `hooks/useWeatherApi.js`. |
| **R3:** Possuir duas ou mais telas | ✅ | Estrutura com **Tela de Busca (`index.tsx`)** e **Tela de Resultados (`[city].tsx`)**, utilizando **Expo Router**. |
| **R4:** Exibir dados reais/simulados | ✅ | Exibição de temperatura, umidade, vento, pressão e ícone de clima. |
| **R5:** Tratamento básico de erro | ✅ | Lógica de `try/catch` no *hook* para falha na requisição e validação de dados inválidos (cidade não encontrada). |
| **R6:** Código organizado, legível e comentado | ✅ | Implementação de **Modularização** em pastas `hooks`, `components` e `constants`. |
| **R7:** Interface funcional e clara | ✅ | Estilização das telas e do componente `<WeatherCard />`, incluindo a funcionalidade extra de **busca por localização GPS**. |

## 🛠️ Tecnologias Principais

* **Front-end:** React Native (com funcionalidade de localização via `expo-location`).
* **Navegação:** Expo Router (para gerenciar as duas telas).
* **API:** OpenWeatherMap.

## ⚙️ Instalação e Execução

### 1. Pré-requisitos

Certifique-se de ter o Node.js e o Expo CLI instalados.

### 2. Configuração da API Key

Você deve obter sua chave na plataforma OpenWeatherMap e inseri-la no arquivo **`constants/config.js`**:

```javascript
// constants/config.js
export const API_KEY = "SUA_CHAVE_REAL_AQUI"; 
export const WEATHER_API_URL = "[https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)";
