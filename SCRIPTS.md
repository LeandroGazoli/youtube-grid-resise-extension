# Scripts NPM - YouTube Grid Styler

## 📋 Comandos Disponíveis

### Build para Produção
- `npm run build:chrome` - Gera build otimizado para Chrome
- `npm run build:firefox` - Gera build otimizado para Firefox  
- `npm run build` - Gera builds para ambos os browsers

### Desenvolvimento
- `npm run dev:chrome` - Modo watch para Chrome (rebuild automático)
- `npm run dev:firefox` - Modo watch para Firefox (rebuild automático)

## 🎯 O que cada comando faz

### Build Produção (`npm run build`)
1. Limpa a pasta `dist/`
2. Processa arquivos JS com minificação
3. Copia assets estáticos (HTML, CSS, icons)
4. Gera manifests específicos para cada browser
5. Cria arquivos .zip prontos para publicação

### Desenvolvimento (`npm run dev:*`)
1. Modo watch ativo (rebuild ao salvar arquivos)
2. Source maps para debugging
3. Sem minificação para facilitar debug

## 📁 Saídas dos Builds

### Pasta `dist/chrome/`
- Extensão pronta para Chrome
- Manifest padrão sem configurações específicas

### Pasta `dist/firefox/`
- Extensão pronta para Firefox
- Manifest com `browser_specific_settings` 

### Arquivos ZIP
- `chrome-youtube-grid-styler-v2.0.0.zip` - Para Chrome Web Store
- `firefox-youtube-grid-styler-v2.0.0.zip` - Para Firefox Add-ons

## 🔄 Fluxo de Trabalho

### Para Desenvolver
1. `npm run dev:chrome` (ou firefox)
2. Faça alterações em `src/`
3. Build automático detecta mudanças
4. Teste no browser

### Para Publicar
1. `npm run build`
2. Teste ambas as versões em `dist/`
3. Use os arquivos .zip para submeter às lojas

## 🛠️ Tecnologias do Build

- **Webpack 5**: Bundler principal
- **copy-webpack-plugin**: Cópia de assets
- **webextension-polyfill**: Compatibilidade multi-browser
- **zip-webpack-plugin**: Geração automática de ZIPs
