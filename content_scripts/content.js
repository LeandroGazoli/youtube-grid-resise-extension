// content_scripts/content.js
(() => {
    'use strict';

    const NOME_VARIAVEL_CSS = '--ytd-rich-grid-items-per-row';
    const STYLE_ID = 'youtube-grid-styler-custom-style';
    const STORAGE_KEY = 'youtubeGridItemsPerRow';
    const DEFAULT_ITEMS_YOUTUBE = null; // Representa o padrão do YouTube

    let currentItemsPerRow = DEFAULT_ITEMS_YOUTUBE; // Mantém o valor atual aplicado

    function removeExistingStyle() {
        const existingStyleElement = document.getElementById(STYLE_ID);
        if (existingStyleElement) {
            existingStyleElement.remove();
        }
        // Também remove a propriedade diretamente do root, se existir
        document.documentElement.style.removeProperty(NOME_VARIAVEL_CSS);
        // Tenta remover de seletores específicos caso o YouTube os defina diretamente
        const gridRenderers = document.querySelectorAll('ytd-rich-grid-renderer, #contents.ytd-rich-grid-renderer, ytd-rich-grid-row, .ytd-rich-grid-row, ytd-rich-grid-media, .ytd-rich-grid-media');
        gridRenderers.forEach(el => el.style.removeProperty(NOME_VARIAVEL_CSS));
    }

    function aplicarEstilo(numeroItens) {
        removeExistingStyle(); 

        if (numeroItens === DEFAULT_ITEMS_YOUTUBE || numeroItens === null || numeroItens === undefined) {
            console.log('[YouTube Grid Styler] Estilo personalizado removido. Usando padrão do YouTube.');
            currentItemsPerRow = DEFAULT_ITEMS_YOUTUBE;
            return;
        }

        const numItens = parseInt(numeroItens, 10);
        if (isNaN(numItens) || numItens < 1) {
            console.error('[YouTube Grid Styler] Número de itens inválido:', numeroItens);
            return;
        }

        currentItemsPerRow = numItens;

        document.documentElement.style.setProperty(NOME_VARIAVEL_CSS, numItens.toString(), 'important');

        const estiloCSS = `
            ytd-rich-grid-renderer {
                ${NOME_VARIAVEL_CSS}: ${numItens} !important;
            }
            #contents.ytd-rich-grid-renderer {
                ${NOME_VARIAVEL_CSS}: ${numItens} !important;
            }
            ytd-rich-grid-row, .ytd-rich-grid-row {
                 --ytd-rich-grid-items-per-row: ${numItens} !important;
            }
            ytd-rich-grid-media, .ytd-rich-grid-media {
                 --ytd-rich-grid-items-per-row: ${numItens} !important;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = STYLE_ID;
        styleElement.textContent = estiloCSS;
        document.head.appendChild(styleElement);

        console.log(`[YouTube Grid Styler] Variável ${NOME_VARIAVEL_CSS} definida para ${numItens}.`);
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "applyGridStyle") {
            console.log('[YouTube Grid Styler] Mensagem recebida:', request);
            aplicarEstilo(request.numeroItens);
            sendResponse({ status: "Estilo aplicado pelo content script", items: request.numeroItens });
        }
        return true; // Necessário para sendResponse assíncrono
    });

    // Aplicar o estilo salvo ao carregar a página
    chrome.storage.local.get([STORAGE_KEY], (result) => {
        const savedValue = result[STORAGE_KEY];
        console.log('[YouTube Grid Styler] Valor carregado do storage:', savedValue);
        if (savedValue !== undefined) {
            aplicarEstilo(savedValue);
        } else {
            aplicarEstilo(DEFAULT_ITEMS_YOUTUBE); 
        }
    });

    const observer = new MutationObserver((mutationsList) => {
        // Se o utilizador quer o comportamento padrão do YouTube, o nosso script não deve interferir.
        if (currentItemsPerRow === DEFAULT_ITEMS_YOUTUBE) {
            // Garante que a nossa tag de estilo personalizada é removida se, por algum motivo, persistir.
            // Isto é normalmente tratado por aplicarEstilo(DEFAULT_ITEMS_YOUTUBE).
            const existingStyleElement = document.getElementById(STYLE_ID);
            if (existingStyleElement) {
                console.log("[YouTube Grid Styler] Observer: Modo padrão, a remover tag de estilo personalizada persistente.");
                existingStyleElement.remove();
            }
            return;
        }

        // Se um estilo personalizado é esperado:
        let needsReapply = false;

        // 1. Verifica se a nossa tag de estilo principal está presente. Se não, precisa ser reaplicada.
        if (!document.getElementById(STYLE_ID)) {
            needsReapply = true;
            console.log(`[YouTube Grid Styler] Observer: Tag de estilo personalizada #${STYLE_ID} está em falta.`);
        } else {
            // Apenas se a tag de estilo existir, verifica os valores computados.
            // Se a tag estiver em falta, aplicar irá corrigir tudo.

            // 2. Verifica a variável CSS do elemento root.
            const rootStyleValue = getComputedStyle(document.documentElement).getPropertyValue(NOME_VARIAVEL_CSS).trim();
            const valorNumericoRoot = parseInt(rootStyleValue, 10);
            if (rootStyleValue === '' || isNaN(valorNumericoRoot) || valorNumericoRoot !== currentItemsPerRow) {
                needsReapply = true;
                console.log(`[YouTube Grid Styler] Observer: Discrepância no root. Esperado: ${currentItemsPerRow}, Atual: '${rootStyleValue}'.`);
            }

            // 3. Verifica a variável CSS do renderizador da grelha, se o elemento existir.
            const gridRenderer = document.querySelector('ytd-rich-grid-renderer');
            if (gridRenderer) {
                const valorGridAtual = getComputedStyle(gridRenderer).getPropertyValue(NOME_VARIAVEL_CSS).trim();
                const valorNumericoGrid = parseInt(valorGridAtual, 10);
                if (valorGridAtual === '' || isNaN(valorNumericoGrid) || valorNumericoGrid !== currentItemsPerRow) {
                    needsReapply = true;
                    console.log(`[YouTube Grid Styler] Observer: Discrepância no ytd-rich-grid-renderer. Esperado: ${currentItemsPerRow}, Atual: '${valorGridAtual}'.`);
                }
            }
            // Se gridRenderer não existir numa página onde o esperamos,
            // aplicarEstilo ainda definirá a variável root e a tag de estilo.
            // A tag de estilo contém regras para quando gridRenderer *aparecer*.
            // Portanto, não encontrar gridRenderer não significa necessariamente uma reaplicação imediata,
            // se a tag de estilo e a variável root estiverem corretas.
        }

        if (needsReapply) {
            console.log(`[YouTube Grid Styler] Observer: Reaplicando estilo para ${currentItemsPerRow}.`);
            aplicarEstilo(currentItemsPerRow);
        }
    });

    // Observa o body para uma gama mais ampla de mudanças que o YouTube pode fazer.
    // O YouTube manipula intensamente o DOM, então uma observação mais ampla é necessária.
    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class'] // Foca em atributos que podem mudar o layout ou CSS vars.
    });

    // Lida com a navegação SPA do YouTube
    document.addEventListener('yt-navigate-finish', () => {
        console.log('[YouTube Grid Styler] Navegação yt-navigate-finish. Reaplicando estilo se necessário.');
        // Pequeno atraso para garantir que o DOM esteja pronto
        setTimeout(() => {
            chrome.storage.local.get([STORAGE_KEY], (result) => {
                const savedValueOnNav = result[STORAGE_KEY];
                if (savedValueOnNav !== undefined) {
                    aplicarEstilo(savedValueOnNav);
                } else {
                    aplicarEstilo(DEFAULT_ITEMS_YOUTUBE);
                }
            });
        }, 500); 
    });

    console.log('[YouTube Grid Styler] Script de conteúdo carregado e ativo (v3 - observador melhorado).');
})();
