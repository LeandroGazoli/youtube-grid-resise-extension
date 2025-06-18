# 🌐 Sistema de Localização - YouTube Grid Styler

## 📍 Configuração Atual

### Idioma Padrão
- **Idioma**: Português Brasileiro (`pt_BR`)
- **Configuração**: `"default_locale": "pt_BR"` no manifest.json

### Idiomas Suportados
- 🇧🇷 **Português (Brasil)** - `pt_BR` (padrão)
- 🇺🇸 **English** - `en` (fallback)

## 📁 Estrutura de Arquivos

```
src/_locales/
├── pt_BR/
│   └── messages.json
└── en/
    └── messages.json
```

### Arquivos Gerados no Build
```
dist/firefox/_locales/
├── pt_BR/messages.json
└── en/messages.json

dist/chrome/_locales/
├── pt_BR/messages.json  
└── en/messages.json
```

## 📝 Strings Localizadas

### pt_BR/messages.json
```json
{
  "extensionName": {
    "message": "YouTube Grid Styler"
  },
  "extensionDescription": {
    "message": "Personalize o YouTube com controlo de grelha e filtros de conteúdo."
  },
  "popupTitle": {
    "message": "YouTube Grid Styler"
  },
  "gridColumns": {
    "message": "Colunas da Grelha"
  },
  "autoColumns": {
    "message": "Automático"
  },
  "version": {
    "message": "Versão"
  }
}
```

### en/messages.json (Fallback)
```json
{
  "extensionName": {
    "message": "YouTube Grid Styler"
  },
  "extensionDescription": {
    "message": "Customize YouTube with grid control and content filters."
  },
  "popupTitle": {
    "message": "YouTube Grid Styler"
  },
  "gridColumns": {
    "message": "Grid Columns"
  },
  "autoColumns": {
    "message": "Auto"
  },
  "version": {
    "message": "Version"
  }
}
```

## 🔧 Implementação no Manifest

### Antes (sem localização)
```json
{
  "name": "YouTube Grid Styler",
  "description": "Personalize o YouTube com controlo de grelha e filtros de conteúdo."
}
```

### Depois (com localização)
```json
{
  "name": "__MSG_extensionName__",
  "description": "__MSG_extensionDescription__",
  "default_locale": "pt_BR"
}
```

## 🌍 Comportamento dos Navegadores

### Firefox
- ✅ Reconhece corretamente como português brasileiro
- ✅ Usa strings do `pt_BR/messages.json`
- ✅ Fallback para inglês se necessário

### Chrome/Edge
- ✅ Reconhece corretamente como português brasileiro
- ✅ Usa strings do `pt_BR/messages.json`
- ✅ Fallback para inglês se necessário

### Sistemas em Português
- ✅ **Windows em português**: Mostra interface em português
- ✅ **Linux em português**: Mostra interface em português
- ✅ **macOS em português**: Mostra interface em português

### Sistemas em Outros Idiomas
- ✅ **Qualquer sistema**: Fallback para inglês se idioma não suportado

## 🛠️ Configuração do Build

### webpack.config.js
```javascript
new CopyPlugin({
  patterns: [
    // ... outros arquivos
    { from: "src/_locales", to: "_locales" }, // ← Copia arquivos de localização
  ],
}),
```

### Scripts NPM
```bash
npm run build:firefox  # ← Inclui _locales/ 
npm run build:chrome   # ← Inclui _locales/
```

## 🧪 Como Testar

### 1. Sistema em Português
```bash
# 1. Definir idioma do sistema como português
# 2. Instalar extensão
# 3. Verificar se aparece "Versão" em vez de "Version"
```

### 2. Sistema em Inglês
```bash
# 1. Definir idioma do sistema como inglês
# 2. Instalar extensão  
# 3. Verificar se aparece "Version" em vez de "Versão"
```

### 3. Validação Web-ext
```bash
web-ext lint --source-dir=dist/firefox
# ✅ Deve passar sem warnings sobre localização
```

## 📊 Resultado Final

### Antes da Correção
- ❌ Firefox/Edge interpretavam como inglês
- ❌ Interface sempre em inglês
- ❌ Não respeitava configuração regional

### Após a Correção
- ✅ Firefox/Edge reconhecem português brasileiro
- ✅ Interface automática baseada no idioma do sistema
- ✅ Fallback inteligente para inglês
- ✅ Compatibilidade total com ambos os navegadores

---
**Status**: ✅ Localização implementada e funcionando  
**Idiomas**: 🇧🇷 Português (padrão) + 🇺🇸 English (fallback)  
**Compatibilidade**: Firefox, Chrome, Edge
