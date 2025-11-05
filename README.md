Previsão do Tempo App

Aplicativo móvel desenvolvido em React Native (Expo) para consumir e exibir dados de previsão do tempo em tempo real, utilizando a API do OpenWeatherMap. Este projeto foi estruturado com forte modularização, seguindo o padrão de navegação do Expo Router.

 Funcionalidades

Busca por Nome: Pesquisa de previsão do tempo em qualquer cidade do mundo.

Busca por Localização (GPS): Utilização das coordenadas do usuário (expo-location) para obter a previsão imediata.

Interface Clara: Exibição de temperatura, umidade, pressão, velocidade do vento e ícone visual do clima.

Tratamento de Erro: Lógica robusta para lidar com falhas de API (ex: cidade não encontrada) e erros de conexão.

Modularização: Separação da lógica de UI, API e navegação em módulos reutilizáveis.

 Tecnologias Utilizadas

Framework: React Native

Ambiente: Expo

Navegação: Expo Router

API: OpenWeatherMap

Localização: expo-location

 Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

Pré-requisitos

Certifique-se de ter o Node.js, npm/yarn e o Expo CLI instalados:

npm install -g expo-cli # Caso ainda use a versão global



(Recomendado: Use npx expo <comando> para a versão local.)

1. Clonar o Repositório

git clone [URL_DO_SEU_REPOSITORIO]
cd PrevisaoDoTempoApp



2. Instalar Dependências

npm install
# ou
yarn install



3. Configurar a Chave da API

O projeto utiliza o OpenWeatherMap. É necessário obter sua chave e configurá-la no arquivo de constantes.

Crie uma conta no OpenWeatherMap.

Obtenha sua API Key.

Crie o arquivo constants/config.js na raiz do projeto e insira sua chave:

// constants/config.js
export const API_KEY = "SUA_CHAVE_OBTIDA_AQUI"; 
export const WEATHER_API_URL = "[https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)";



4. Rodar o Aplicativo

Use o comando recomendado do Expo para iniciar o servidor:

npx expo start



Para testar em um dispositivo móvel (via túnel):

npx expo start --tunnel



Estrutura do Código (Modularização)

O código foi dividido em módulos para facilitar a manutenção e a clareza (Requisito 6):

.
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx         # Tela de Busca (UI e lógica de navegação)
│   │   └── [city].tsx        # Tela de Resultados (Recebe e exibe dados)
├── components/
│   └── WeatherCard.js        # Componente de Apresentação de Dados do Clima (Reutilizável)
├── hooks/
│   └── useWeatherApi.js      # Lógica de Chamada HTTP e Tratamento de Erro (Requisito 2 e 5)
└── constants/
    └── config.js             # API Key e URLs base

