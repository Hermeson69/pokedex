# Pokedex 📱

Uma aplicação mobile desenvolvida em React Native com Expo para explorar e buscar informações sobre Pokémons. Este é um projeto de aprendizagem para praticar conceitos de desenvolvimento mobile.

## 🎯 Objetivo

Este projeto foi desenvolvido com o propósito de aprender e praticar:

- React Native e Expo
- Consumo de APIs (PokéAPI)
- Gerenciamento de estado com hooks (useState, useEffect)
- Navegação entre telas com Expo Router
- Estilização e layout responsivo
- TypeScript em aplicações mobile

## 🚀 Funcionalidades

- **Listagem de Pokémons**: Visualize os primeiros 50 Pokémons em uma grid 2x2
- **Busca**: Pesquise Pokémons pelo nome ou número da Pokédex
- **Detalhes**: Clique em um Pokémon para ver mais informações (em desenvolvimento)
- **Cores por tipo**: Cada Pokémon é colorido de acordo com seu tipo

## 📋 Pré-requisitos

- Node.js (v14+)
- npm ou yarn
- Expo CLI (opcional)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <seu-repositorio>
cd pokedex
```

2. Instale as dependências:

```bash
npm install
```

## ▶️ Como executar

1. Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

2. Escolha uma opção para visualizar:

- Pressione **i** para abrir no iOS Simulator
- Pressione **a** para abrir no Android Emulator
- Escaneie o QR code com o [Expo Go](https://expo.dev/go) no seu dispositivo

## 📁 Estrutura do Projeto

```
pokedex/
src/

app/
 ├── navigation/
 │   ├── root.navigator.tsx
 │   └── auth.navigator.tsx
 │
 ├── providers/
 │   └── app.provider.tsx
 │
 └── theme/

features/

 ├── auth/
 │   ├── screens/
 │   ├── components/
 │   ├── hooks/
 │   ├── services/
 │   ├── store/
 │   └── types/
 │
 ├── profile/
 ├── chat/
 └── payments/

shared/

 ├── components/
 │   ├── Button.tsx
 │   ├── Input.tsx
 │   └── Modal.tsx
 │
 ├── hooks/
 ├── utils/
 └── types/

core/

 ├── api/
 │   ├── client.ts
 │   └── interceptors.ts
 │
 ├── storage/
 │   └── secureStorage.ts
 │
 ├── config/
 │   └── env.ts
 │
 └── constants/

assets/

 ├── images/
 └── fonts/
```

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para apps mobile
- **Expo** - Plataforma para desenvolvimento com React Native
- **Expo Router** - Roteamento de tela (file-based routing)
- **TypeScript** - Tipagem estática
- **PokéAPI** - API pública de dados de Pokémons

## 📚 API Utilizada

A aplicação consome dados da [PokéAPI](https://pokeapi.co/), uma API pública gratuita com informações sobre todos os Pokémons.

## 📞 Suporte

Para dúvidas sobre Expo e React Native:

- [Documentação Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [PokéAPI Docs](https://pokeapi.co/docs/v2)
