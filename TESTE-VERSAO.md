# 🧪 Como Testar a Versão Dinâmica

## ❗ IMPORTANTE
A versão dinâmica **só funciona quando a extensão está carregada no navegador**, não quando você abre o HTML diretamente como arquivo.

## 📋 Passos para Testar

### 1. **Fazer Build da Extensão**
```bash
npm run build:chrome
```

### 2. **Carregar no Chrome**
1. Abra o Chrome
2. Vá para `chrome://extensions/`
3. Ative o "Modo de desenvolvedor" (canto superior direito)
4. Clique em "Carregar extensão"
5. Selecione a pasta `dist/chrome/`

### 3. **Testar o Popup**
1. Clique no ícone da extensão na barra de ferramentas
2. Verifique o footer - deve mostrar "Versão 2.0.0"

### 4. **Testar Mudança de Versão**
1. Edite `src/manifest.json`:
   ```json
   "version": "2.1.0"
   ```
2. Execute `npm run build:chrome`
3. Vá para `chrome://extensions/`
4. Clique no botão de reload da extensão
5. Abra o popup novamente
6. **Deve mostrar "Versão 2.1.0"**

## 🔧 Por que não funciona como arquivo HTML?

Quando você abre o `popup.html` diretamente no navegador:
- ❌ Não há contexto de extensão
- ❌ APIs `browser.runtime` não estão disponíveis
- ❌ Polyfill não funciona sem contexto de extensão
- ✅ Usa o fallback "2.0.0"

## ✅ Funcionamento Correto

**Na extensão carregada:**
1. JavaScript executa `browser.runtime.getManifest()`
2. Obtém a versão real do manifest.json
3. Atualiza o elemento `<span id="extensionVersion">`
4. Mostra a versão dinâmica correta

**Como arquivo HTML:**
1. APIs da extensão não estão disponíveis
2. Entra no bloco `catch`
3. Usa fallback "2.0.0"
4. Funcionalidade básica mantida

## 🎯 Teste Rápido

Para um teste rápido da funcionalidade:

```bash
# 1. Altere a versão
# src/manifest.json: "version": "3.0.0"

# 2. Build
npm run build:chrome

# 3. Reload da extensão no Chrome

# 4. Abra popup - deve mostrar "Versão 3.0.0"
```
