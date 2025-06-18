# YouTube Grid Styler

Uma extensão do Chrome para personalizar o número de vídeos exibidos por linha na grelha do YouTube, permitindo uma experiência de navegação mais adaptada às suas preferências.

## 📚 Índice

- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Instalação (para Desenvolvimento/Teste)](#instalação-para-desenvolvimentoteste)
- [Como Contribuir](#como-contribuir)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Planos Futuros (Opcional)](#planos-futuros-opcional)
- [Licença](#licença)

## 📝 Descrição

A extensão **YouTube Grid Styler** permite que os utilizadores ajustem dinamicamente o número de colunas de vídeos na página inicial, página de inscrições e outras grelhas de vídeo do YouTube.  
Cansado do layout padrão? Quer ver mais (ou menos) vídeos de uma vez? Esta extensão dá-lhe o controlo!

## ⚙️ Funcionalidades

- **Seleção de Número de Itens**: Escolha entre 2 a 10 vídeos por linha através de botões de seleção rápida ou um slider preciso.
- **Interface Intuitiva**: Um popup simples e moderno para fácil configuração.
- **Persistência**: As suas preferências são guardadas e aplicadas automaticamente sempre que visita o YouTube.
- **Botão de Reset**: Restaure facilmente o layout padrão do YouTube com um clique.
- **Botão Aplicar e Recarregar**: Aplique as suas configurações e atualize a página do YouTube instantaneamente.
- **Atualização Dinâmica (Tentativa)**: A extensão tenta manter o seu layout preferido mesmo quando o YouTube atualiza o conteúdo da página dinamicamente (sem recarregamento completo).

## 🚀 Como Usar

1. Instale a extensão. (Veja as instruções de instalação abaixo ou, futuramente, instale a partir da Chrome Web Store).
2. Abra o YouTube no seu navegador Chrome.
3. Clique no ícone da extensão (geralmente um ícone de quebra-cabeça na barra de ferramentas do Chrome e depois no ícone do YouTube Grid Styler).
4. No popup, selecione o número desejado de vídeos por linha usando os botões ou o slider.
5. Clique no botão **"Aplicar e Recarregar Página"**. A página do YouTube será atualizada com o novo layout.
6. Para voltar ao layout padrão do YouTube, clique em **"Restaurar Padrão (YouTube)"**.

## 🛠️ Instalação (para Desenvolvimento/Teste)

Se deseja instalar esta extensão a partir do código-fonte (por exemplo, para testar ou contribuir):

1. **Clone ou Descarregue o Repositório:**
   - Clone: `git clone https://github.com/LeandroGazoli/youtube-grid-resise-extension.git`
   - Ou descarregue o ZIP e extraia-o.

2. **Abra o Google Chrome.**
3. **Aceda a Extensões:** Digite `chrome://extensions` na barra de endereços e pressione Enter.
4. **Ative o Modo de Programador:** No canto superior direito, ative o interruptor **"Modo de programador"**.
5. **Carregue a Extensão:**
   - Clique no botão **"Carregar sem compactação"**.
   - Navegue até à pasta onde clonou ou extraiu os ficheiros da extensão (a pasta que contém o `manifest.json`) e selecione-a.

> A extensão deverá agora estar instalada e ativa!

*(Quando a extensão estiver publicada na Chrome Web Store, adicione aqui o link para a loja).*

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Se tem ideias para novas funcionalidades, encontrou um bug ou quer melhorar o código, siga estes passos:

1. **Crie um Fork do Repositório:** Clique no botão **"Fork"** no canto superior direito desta página.
2. **Clone o Seu Fork:**  
   `git clone https://github.com/LeandroGazoli/youtube-grid-resise-extension.git`
3. **Crie uma Nova Branch:**  
   `git checkout -b minha-nova-funcionalidade`  
   (ex: `feature/adicionar-tema-escuro` ou `fix/corrigir-bug-layout`)
4. **Faça as Suas Alterações:**  
   - Implemente a sua funcionalidade ou correção de bug.  
   - Siga as convenções de código existentes.  
   - Comente o seu código quando necessário.
5. **Teste as Suas Alterações:**  
   Certifique-se de que tudo funciona como esperado.
6. **Faça Commit das Suas Alterações:**  
   `git commit -m "Adiciona nova funcionalidade X"`  
   ou  
   `git commit -m "Corrige bug Y"`
7. **Faça Push para a Sua Branch:**  
   `git push origin minha-nova-funcionalidade`
8. **Abra um Pull Request (PR):**
   - Vá para o repositório original no GitHub.
   - Clique na aba **"Pull requests"** e depois em **"New pull request"**.
   - Selecione a sua branch do fork para comparar com a branch `main` (ou `master`) do repositório original.
   - Descreva claramente as alterações que fez no seu PR.
   - Se o seu PR resolve uma "Issue" existente, mencione-a (ex: `Closes #123`).

### 🐞 Reportar Bugs

- Verifique se o bug já não foi reportado na secção **Issues**.
- Se não, crie uma nova **Issue** detalhando:
  - Passos para reproduzir o bug.
  - O que esperava que acontecesse.
  - O que realmente aconteceu (incluindo mensagens de erro, se houver).
  - A sua versão do Chrome e do sistema operativo.

### 💡 Sugerir Funcionalidades

- Verifique se a funcionalidade já não foi sugerida na secção **Issues**.
- Se não, crie uma nova **Issue** com a etiqueta `enhancement` ou `feature request`, descrevendo a funcionalidade e por que acha que seria útil.

## 🧪 Tecnologias Utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Chrome Extension APIs (Manifest V3)

## 🔮 Planos Futuros (Opcional)

- [ ] Adicionar opção para tema escuro no popup.  
- [ ] Permitir guardar diferentes perfis de layout.  
- [ ] Melhorar a deteção de alterações dinâmicas do YouTube para uma aplicação de estilo ainda mais robusta.

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.  
Veja o ficheiro `LICENSE` para mais detalhes (se decidir adicionar um).

---

Desenvolvido com ❤️ por **LeandroGazoli**.
