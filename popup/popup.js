// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.option-button');
    const slider = document.getElementById('itemsPerRowSlider');
    const sliderLabelSpan = document.querySelector('#sliderLabel span');
    const resetButton = document.getElementById('resetButton');
    const applyAndReloadButton = document.getElementById('applyAndReloadButton'); // Novo botão
    const statusMessage = document.getElementById('statusMessage');

    const DEFAULT_ITEMS_PER_ROW_YOUTUBE = null;
    const STORAGE_KEY = 'youtubeGridItemsPerRow';
    let currentSelectedValue = DEFAULT_ITEMS_PER_ROW_YOUTUBE; // Para rastrear o valor antes de aplicar

    function updateUI(value) {
        currentSelectedValue = value; // Atualiza o valor rastreado
        optionButtons.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.value === String(value));
        });

        if (value !== null && value >= parseInt(slider.min) && value <= parseInt(slider.max)) {
            slider.value = value;
            sliderLabelSpan.textContent = value;
        } else if (value === null) {
            slider.value = 5; // Valor padrão para o slider quando é o padrão do YouTube
            sliderLabelSpan.textContent = slider.value;
        }

        if (value !== null && ![...optionButtons].some(btn => btn.dataset.value === String(value))) {
            optionButtons.forEach(btn => btn.classList.remove('selected'));
        }
    }

    browser.storage.local.get([STORAGE_KEY], (result) => {
        const savedValue = result[STORAGE_KEY];
        updateUI(savedValue !== undefined ? savedValue : DEFAULT_ITEMS_PER_ROW_YOUTUBE);
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = parseInt(button.dataset.value, 10);
            updateUI(value); // Apenas atualiza a UI e currentSelectedValue
            // Não envia imediatamente, espera o botão "Aplicar e Recarregar"
        });
    });

    slider.addEventListener('change', () => { // 'change' é disparado ao soltar o slider
        const value = parseInt(slider.value, 10);
        updateUI(value); // Apenas atualiza a UI
    });

    slider.addEventListener('input', () => { // 'input' é disparado enquanto arrasta
        sliderLabelSpan.textContent = slider.value;
        currentSelectedValue = parseInt(slider.value, 10); // Atualiza o valor rastreado em tempo real
        optionButtons.forEach(btn => btn.classList.remove('selected'));
    });

    resetButton.addEventListener('click', () => {
        updateUI(DEFAULT_ITEMS_PER_ROW_YOUTUBE);
        // Para o reset, podemos aplicar imediatamente e recarregar, ou apenas preparar
        // Se quisermos que o reset também use o botão "Aplicar e Recarregar":
        // currentSelectedValue = DEFAULT_ITEMS_PER_ROW_YOUTUBE;
        // updateUI(currentSelectedValue);
        // Se quisermos que o reset seja imediato (como antes):
        sendMessageToContentScript(DEFAULT_ITEMS_PER_ROW_YOUTUBE, true); // true para recarregar
    });

    applyAndReloadButton.addEventListener('click', () => {
        sendMessageToContentScript(currentSelectedValue, false); // true para recarregar
    });

    function sendMessageToContentScript(value, shouldReload = false) {
        browser.storage.local.set({ [STORAGE_KEY]: value }, () => {
            // A UI já foi atualizada por updateUI
            browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTab = tabs[0];
                // Condição da URL corrigida para ser mais genérica para páginas do YouTube
                if (activeTab && activeTab.id && activeTab.url && activeTab.url.includes("youtube.com")) {
                    browser.tabs.sendMessage(activeTab.id, {
                        action: "applyGridStyle",
                        numeroItens: value
                    }, (response) => {
                        if (browser.runtime.lastError) {
                            console.error("Erro ao enviar mensagem:", browser.runtime.lastError.message);
                            setStatusMessage(`Erro: ${browser.runtime.lastError.message}`, true);
                            // Mesmo com erro no envio da mensagem, tenta recarregar se solicitado
                            if (shouldReload) {
                                console.log("Tentando recarregar a aba (após erro na mensagem):", activeTab.id);
                                browser.tabs.reload(activeTab.id);
                            }
                        } else if (response && response.status) {
                            console.log("Resposta do content script:", response);
                            const message = value === DEFAULT_ITEMS_PER_ROW_YOUTUBE ? 'Padrão restaurado!' : `${value} itens aplicados!`;
                            setStatusMessage(message + (shouldReload ? ' A recarregar...' : ''), false);
                            if (shouldReload) {
                                // Adiciona um pequeno delay antes de recarregar para o usuário ver a mensagem
                                setTimeout(() => {
                                    console.log("Tentando recarregar a aba (após sucesso na mensagem):", activeTab.id);
                                    browser.tabs.reload(activeTab.id);
                                }, 1000); // 1 segundo de delay
                            }
                        } else {
                             setStatusMessage('Sem resposta do YouTube. Verifique a aba.', true);
                             if (shouldReload) {
                                setTimeout(() => {
                                    console.log("Tentando recarregar a aba (sem resposta do content script):", activeTab.id);
                                    browser.tabs.reload(activeTab.id);
                                }, 1000);
                            }
                        }
                    });
                } else {
                    setStatusMessage('Abra ou foque numa aba do YouTube.', true);
                     // Se não for uma aba do YouTube, não faz sentido recarregar
                }
            });
        });
    }

    function setStatusMessage(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.style.color = isError ? '#D8000C' : '#007bff';
        // A mensagem de recarregando pode ser mais longa
        if (!message.includes('A recarregar...')) {
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 3000);
        }
    }
});
