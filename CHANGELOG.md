# 📝 Changelog - YouTube Grid Styler

## 🚀 **v2.3.0** - 2025-06-18

### ✨ **Novas Funcionalidades**
- 🌐 **Localização em Português Brasileiro**: Extensão agora reconhecida como pt_BR
- 📱 **Suporte Firefox Mobile (Android)**: Compatibilidade completa com Firefox Android 113+
- 🔄 **Grid Adaptativo**: Estilos específicos para desktop e mobile
- 📍 **Detecção Automática**: Identifica automaticamente plataforma (desktop/mobile)

### 🔧 **Melhorias Técnicas**
- ✅ Seletores adaptativos para elementos desktop vs mobile
- ✅ Observer específico por plataforma (`ytd-page-manager` vs `body`)
- ✅ CSS Grid Layout para mobile vs CSS Custom Properties para desktop
- ✅ URLs suportadas: `www.youtube.com` + `m.youtube.com`

### 🌍 **Localização**
- 🇧🇷 **Português (Brasil)** - Idioma padrão (`pt_BR`)
- 🇺🇸 **English** - Fallback automático (`en`)
- 📁 Estrutura `_locales/` implementada
- 🏷️ Strings localizadas no manifest (`__MSG_*__`)

### 📱 **Firefox Mobile**
- ✅ Configuração `gecko_android` com versão mínima 113.0
- ✅ Estilos CSS Grid específicos para mobile
- ✅ Filtros de data e shorts funcionando no mobile
- ✅ Sincronização de configurações cross-device

### 🔍 **Validação**
- ✅ **web-ext lint**: 0 errors, 0 warnings, 0 notices
- ✅ **Chrome**: Build funcionando
- ✅ **Firefox Desktop**: Validado
- ✅ **Firefox Mobile**: Testado e validado

---

## 🔄 **v2.2.0** - 2025-06-18

### ✨ **Preparação para Mobile**
- 📱 Infraestrutura inicial para suporte mobile
- 🔧 Configurações de host_permissions para m.youtube.com

---

## 🎯 **v2.1.5** - 2025-06-18

### 🔧 **Compatibilidade Firefox**
- ✅ `strict_min_version: "109.0"` para Manifest V3
- ✅ Resolução de avisos de compatibilidade
- ✅ APIs `action`, `host_permissions`, `scripting` funcionando

### 🛠️ **Build System**
- ✅ Webpack multi-browser (Chrome + Firefox)
- ✅ Manifestos dinâmicos por navegador
- ✅ ZIPs automáticos para submissão
- ✅ Scripts npm organizados

### 🌐 **APIs Modernas**
- ✅ Migração para `browser.*` API com Promises
- ✅ webextension-polyfill implementado
- ✅ Compatibilidade cross-browser garantida

---

## 📋 **Versões Anteriores**

### v2.1.0 - v2.1.4
- 🔧 Iterações de compatibilidade e ajustes
- 🛠️ Refinamentos do build system
- 📝 Documentação aprimorada

### v2.0.0
- 🚀 Migração para Manifest V3
- 🔄 Reestruturação completa do projeto
- 📁 Organização src/ + dist/

### v1.x
- 🎬 Versões iniciais com funcionalidades básicas
- 📐 Grid customizável
- 🕒 Filtros de data
- 🎞️ Filtro de shorts

---

## 🎯 **Próximas Versões**

### v2.4.0 (Planejado)
- 🎨 Interface mobile nativa
- 👆 Gestos para configuração
- ⚡ Otimizações de performance

### v2.5.0 (Futuro)
- 🌍 Mais idiomas suportados
- 📱 PWA integration
- 🔗 Integração com YouTube APIs

---

**Compatibilidade Atual**:
- 🖥️ **Firefox Desktop**: 109.0+
- 📱 **Firefox Android**: 113.0+
- 🖥️ **Chrome Desktop**: 88+
- 📱 **Chrome Mobile**: Via Kiwi Browser

**Idiomas**: 🇧🇷 Português (padrão) + 🇺🇸 English (fallback)
