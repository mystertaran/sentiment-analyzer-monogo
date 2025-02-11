# Analiza Sentymentu Tekstu

Aplikacja webowa do analizy sentymentu tekstu wykorzystująca HuggingFace API i GraphQL.

# Uruchomienie projektu

## Instrukcja instalacji i uruchomienia


### Frontend

```bash
npm install
```

### Backend

```bash
cd server && npm install
```

#### Zmienne środowiskowe

W głównym katalogu projektu stwórz plik `.env` i dodaj:

```bash
REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
```

W katalogu `server` stwórz plik `.env` i dodaj:

```bash
PORT=4000
HUGGING_FACE_API_KEY=your_api_key_here
```

## Uruchamianie aplikacji

### Terminal 1 - Frontend

```bash
npm run dev
```

### Terminal 2 - Backend

```bash
npm run server:dev
```

## Skróty komend

Komendy uruchamiane w katalogu głównym projektu.

### Frontend

```bash
npm run dev       # Development
npm run build     # Produkcja
npm run lint      # ESLint
npm run lint:fix  # Naprawa ESLint
```

### Backend

```bash
npm run server:dev   # Development
npm run server:build # Kompilacja TS
npm run server:lint  # ESLint
npm run server:lint:fix # Naprawa ESLint
```

## Statyczna analiza kodu

Projekt wykorzystuje następujące narzędzia do statycznej analizy kodu:

- ESLint v5.62.0 (@typescript-eslint/eslint-plugin) - linter JavaScript/TypeScript
- eslint-plugin-react-hooks - reguły dla React Hooks
- Prettier v2.8.8 - formatowanie kodu
- Husky v8.0.3 - git hooks
- lint-staged v15.2.0 - uruchamianie lintera tylko na zmienionych plikach

### Konfiguracja zawiera:

- Airbnb style guide
- Reguły TypeScript
- Automatyczne sortowanie importów
- Wykrywanie nieużywanych importów i zmiennych
- Automatyczne formatowanie kodu przed każdym commitem

## Napotkane wyzwania

1. **Integracja z HuggingFace API**

   - Implementacja GraphQL jako warstwy pośredniej
   - Obsługa różnych formatów odpowiedzi

2. **Architektura aplikacji**

   - Podział na frontend i backend
   - Zarządzanie stanem aplikacji

3. **Responsywność**
   - Dostosowanie interfejsu do różnych urządzeń
   - Zachowanie spójności wizualnej
