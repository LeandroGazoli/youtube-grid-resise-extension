# 🎬 YouTube Grid Styler

[![Version](https://img.shields.io/badge/version-2.3.0-blue.svg)](https://github.com/LeandroGazoli/youtube-grid-resise-extension)
[![Firefox](https://img.shields.io/badge/Firefox-109%2B-orange.svg)](https://addons.mozilla.org/)
[![Chrome](https://img.shields.io/badge/Chrome-88%2B-green.svg)](https://chrome.google.com/webstore)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Uma extensão **multi-browser** moderna para personalizar completamente sua experiência no YouTube com controle de grid, filtros de conteúdo e suporte mobile.

## ✨ **Funcionalidades Principais**

### 🎛️ **Grid Personalizado**
- **Controle total**: 2-10 colunas de vídeos por linha
- **Interface dupla**: Botões rápidos (3-8) + slider preciso (2-10)
- **Tempo real**: Aplicação instantânea sem recarregar página
- **Adaptativo**: Desktop e mobile com estilos específicos

### 🔍 **Filtros Inteligentes**
- **📅 Filtro por Data**: Oculte vídeos antigos (7 dias, 1 mês, 3 meses, 6 meses, 1 ano)
- **⚡ Filtro de Shorts**: Remova completamente vídeos curtos do YouTube
- **🎯 Parser Avançado**: Detecta datas em português e inglês automaticamente

### 🌐 **Multi-Browser & Multi-Platform**
- **Firefox Desktop** (109+) e **Firefox Mobile** (113+)
- **Chrome Desktop** (88+) e **Chrome Mobile** (via Kiwi Browser)
- **Edge** e outros navegadores baseados em Chromium
- **Localização**: Português brasileiro (padrão) + English (fallback)

### 💾 **Sincronização Cross-Device**
- Configurações salvas automaticamente
- Sincronização entre dispositivos (Firefox Sync, Chrome Sync)
- Persistência inteligente através de navegação

## 🚀 **Instalação**

### 📱 **Firefox (Desktop & Mobile)**
1. Baixe `firefox-youtube-grid-styler-v2.3.0.zip`
2. Vá para `about:debugging` → "Este Firefox"
3. Clique "Carregar Adicional Temporário"
4. Selecione o arquivo `manifest.json`
5. **Mobile**: Funciona perfeitamente no Firefox para Android!

### �️ **Chrome/Edge**
1. Baixe `chrome-youtube-grid-styler-v2.3.0.zip`
2. Vá para `chrome://extensions/`
3. Ative "Modo de desenvolvedor"
4. Clique "Carregar extensão"
5. Selecione a pasta descompactada

### 📲 **Chrome Mobile**
- Use **Kiwi Browser** ou **Firefox Mobile** para melhor experiência

## 🎯 **Como Usar**

### 🖱️ **Interface Desktop**
1. **Clique no ícone** da extensão na barra de ferramentas
2. **Configure o grid**: Use botões rápidos ou slider detalhado
3. **Aplique filtros**: Data e/ou remoção de Shorts
4. **Veja instantaneamente**: Mudanças aplicadas em tempo real
5. **Reset**: Botão "Restaurar Padrões" sempre disponível

### 📱 **Experiência Mobile**
- **Detecção automática**: Reconhece `m.youtube.com`
- **Grid adaptativo**: CSS Grid otimizado para telas pequenas
- **Sincronização**: Configurações aplicadas automaticamente

### ⚙️ **Controles Disponíveis**

#### **🎛️ Grid de Vídeos**
```
[3] [4] [5] [6] [7] [8]  ← Botões rápidos
[━━━━━●━━━━━] 5 itens    ← Slider detalhado (2-10)
```

#### **🔍 Filtros de Conteúdo**
```
📅 Mostrar vídeos: [Sempre ▼]
   • Sempre (padrão)
   • Últimos 7 dias
   • Último 1 mês
   • Últimos 3 meses
   • Últimos 6 meses
   • Último 1 ano

⚡ Remover Shorts: [OFF] ← Toggle on/off
```

## 🛠️ **Desenvolvimento**

### 📋 **Pré-requisitos**
- Node.js 16+
- npm 8+

### 🔧 **Setup do Projeto**
```bash
# Clone o repositório
git clone https://github.com/LeandroGazoli/youtube-grid-resise-extension.git
cd youtube-grid-resise-extension

# Instale dependências
npm install

# Build para desenvolvimento
npm run dev:chrome   # Chrome com watch mode
npm run dev:firefox  # Firefox com watch mode

# Build para produção
npm run build:chrome   # → dist/chrome/ + ZIP
npm run build:firefox  # → dist/firefox/ + ZIP
npm run build          # → Ambos
```

### 🏗️ **Arquitetura**

```
src/
├── manifest.json           # Configurações base
├── icons/                  # Ícones da extensão
├── popup/                  # Interface do usuário
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content_scripts/        # Scripts injetados no YouTube
│   └── content.js
├── polyfills/              # Compatibilidade cross-browser
│   └── browser-polyfill.js
└── _locales/               # Internacionalização
    ├── pt_BR/messages.json
    └── en/messages.json

dist/                       # Builds gerados
├── chrome/                 # Versão Chrome
├── firefox/                # Versão Firefox
├── chrome-*.zip           # Pronto para Chrome Web Store
└── firefox-*.zip          # Pronto para Firefox Add-ons
```

### � **Scripts de Build**
- **`npm run build:chrome`**: Build otimizado para Chrome
- **`npm run build:firefox`**: Build com configurações Firefox
- **`npm run dev:chrome`**: Desenvolvimento com watch mode
- **`npm run dev:firefox`**: Desenvolvimento Firefox com watch mode

## 🌍 **Compatibilidade**

### 🖥️ **Desktop**
| Navegador | Versão Mínima | Status | Funcionalidades |
|-----------|---------------|---------|-----------------|
| **Firefox** | 109.0 | ✅ Completo | Todas |
| **Chrome** | 88+ | ✅ Completo | Todas |
| **Edge** | 88+ | ✅ Completo | Todas |
| **Safari** | - | ❌ | Não suportado |

### 📱 **Mobile**
| Plataforma | Versão Mínima | Status | Observações |
|------------|---------------|---------|-------------|
| **Firefox Android** | 113.0 | ✅ Completo | Suporte nativo |
| **Chrome Mobile** | 88+ | ⚠️ Limitado | Via Kiwi Browser |
| **Safari iOS** | - | ❌ | Extensões não suportadas |

### 🌐 **URLs Suportadas**
- ✅ `https://www.youtube.com/*` (desktop)
- ✅ `https://m.youtube.com/*` (mobile)

## 🎨 **Recursos Técnicos**

### 🔧 **APIs Utilizadas**
- **Manifest V3**: Última versão dos padrões de extensões
- **Storage API**: Sincronização cross-device
- **Scripting API**: Injeção dinâmica de estilos
- **Tabs API**: Controle de abas ativas
- **Webextension Polyfill**: Compatibilidade universal

### 🌍 **Localização**
- **🇧🇷 Português (Brasil)**: Idioma padrão
- **🇺🇸 English**: Fallback automático
- **Detecção**: Baseada no idioma do sistema

### 📱 **Responsividade**
- **Desktop**: CSS Custom Properties
- **Mobile**: CSS Grid Layout adaptativo
- **Detecção**: User agent + viewport + hostname

## 🤝 **Contribuindo**

### � **Reportar Bugs**
1. Verifique se já não foi reportado em [Issues](https://github.com/LeandroGazoli/youtube-grid-resise-extension/issues)
2. Inclua informações detalhadas:
   - Navegador e versão
   - Passos para reproduzir
   - Comportamento esperado vs observado
   - Screenshots/logs se possível

### 💡 **Sugerir Funcionalidades**
1. Abra uma [Issue](https://github.com/LeandroGazoli/youtube-grid-resise-extension/issues) com label `enhancement`
2. Descreva claramente a funcionalidade
3. Explique o caso de uso

### 🔄 **Pull Requests**
1. **Fork** o repositório
2. **Clone** seu fork: `git clone https://github.com/[seu-username]/youtube-grid-resise-extension.git`
3. **Branch**: `git checkout -b feature/minha-funcionalidade`
4. **Desenvolva** seguindo o padrão existente
5. **Teste** em múltiplos navegadores
6. **Commit**: `git commit -m "feat: adiciona nova funcionalidade"`
7. **Push**: `git push origin feature/minha-funcionalidade`
8. **PR**: Abra um Pull Request detalhado

## 📊 **Roadmap**

### 🎯 **v2.4.0** (Próxima)
- [ ] 🎨 Interface mobile nativa otimizada
- [ ] 👆 Controles por gestos (swipe/tap)
- [ ] ⚡ Otimizações de performance
- [ ] 🔄 Configurações avançadas de sincronização

### � **v2.5.0** (Futuro)
- [ ] 🌍 Suporte a mais idiomas (Espanhol, Francês)
- [ ] 📱 PWA integration
- [ ] 🎨 Temas personalizáveis
- [ ] 📊 Estatísticas de uso

### 💭 **Ideias Futuras**
- [ ] 🤖 AI para sugestões de layout
- [ ] 🔗 Integração com YouTube APIs
- [ ] 📂 Perfis de configuração nomeados
- [ ] ⌨️ Atalhos de teclado

## 📄 **Licença**

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 **Agradecimentos**

- **Mozilla** e **Google** pelas excelentes APIs de extensões
- **Comunidade Open Source** por ferramentas incríveis
- **Usuários Beta** por feedback valioso

---

<div align="center">

**Desenvolvido com ❤️ por [Leandro Gazoli](https://github.com/LeandroGazoli)**

[🌟 Star no GitHub](https://github.com/LeandroGazoli/youtube-grid-resise-extension) | [🐛 Reportar Bug](https://github.com/LeandroGazoli/youtube-grid-resise-extension/issues) | [💡 Sugerir Funcionalidade](https://github.com/LeandroGazoli/youtube-grid-resise-extension/issues)

</div>
