// popup.js
document.addEventListener("DOMContentLoaded", () => {
  // Seletores de elementos da UI
  const optionButtons = document.querySelectorAll(".option-button");
  const slider = document.getElementById("itemsPerRowSlider");
  const sliderLabelSpan = document.querySelector("#sliderLabel span");
  const dateFilterSelect = document.getElementById("dateFilterSelect");
  const shortsFilterToggle = document.getElementById("shortsFilterToggle"); // Novo
  const resetButton = document.getElementById("resetButton");
  const applyAndReloadButton = document.getElementById("applyAndReloadButton");
  const statusMessage = document.getElementById("statusMessage");

  // Chaves e valores padrão para o storage
  const GRID_STORAGE_KEY = "youtubeGridItemsPerRow";
  const DATE_FILTER_STORAGE_KEY = "youtubeDateFilter";
  const SHORTS_FILTER_STORAGE_KEY = "youtubeShortsFilter"; // Novo
  const DEFAULT_GRID_VALUE = null;
  const DEFAULT_DATE_FILTER_VALUE = "all";
  const DEFAULT_SHORTS_FILTER_VALUE = false; // Novo
  // Variáveis para rastrear a seleção atual
  let currentGridValue = DEFAULT_GRID_VALUE;
  let currentDateFilterValue = DEFAULT_DATE_FILTER_VALUE;
  let currentShortsFilter = DEFAULT_SHORTS_FILTER_VALUE; // Novo  // --- Função para carregar versão da extensão ---
  function loadExtensionVersion() {
    const versionElement = document.getElementById("extensionVersion");
    if (!versionElement) return;

    try {
      // Tenta usar a API da extensão
      if (
        typeof browser !== "undefined" &&
        browser.runtime &&
        browser.runtime.getManifest
      ) {
        const manifest = browser.runtime.getManifest();
        if (manifest && manifest.version) {
          versionElement.textContent = manifest.version;
          return;
        }
      }

      // Fallback para chrome API
      if (
        typeof chrome !== "undefined" &&
        chrome.runtime &&
        chrome.runtime.getManifest
      ) {
        const manifest = chrome.runtime.getManifest();
        if (manifest && manifest.version) {
          versionElement.textContent = manifest.version;
          return;
        }
      }

      // Fallback final
      versionElement.textContent = "2.0.0";
    } catch (error) {
      console.log("Não foi possível obter versão do manifest:", error);
      versionElement.textContent = "2.0.0";
    }
  }

  // --- Funções de atualização da UI ---
  function updateGridUI(value) {
    currentGridValue = value;
    optionButtons.forEach((btn) =>
      btn.classList.toggle("selected", btn.dataset.value === String(value))
    );
    if (value !== null) {
      slider.value = value;
      sliderLabelSpan.textContent = value;
    } else {
      slider.value = 5;
      sliderLabelSpan.textContent = slider.value;
    }
  }

  function updateDateFilterUI(value) {
    currentDateFilterValue = value;
    dateFilterSelect.value = value;
  }

  function updateShortsFilterUI(value) {
    // Novo
    currentShortsFilter = value;
    shortsFilterToggle.checked = value;
  } // --- Carregamento inicial ---
  browser.storage.local
    .get([GRID_STORAGE_KEY, DATE_FILTER_STORAGE_KEY, SHORTS_FILTER_STORAGE_KEY])
    .then((result) => {
      updateGridUI(
        result[GRID_STORAGE_KEY] !== undefined
          ? result[GRID_STORAGE_KEY]
          : DEFAULT_GRID_VALUE
      );
      updateDateFilterUI(
        result[DATE_FILTER_STORAGE_KEY] || DEFAULT_DATE_FILTER_VALUE
      );
      updateShortsFilterUI(
        result[SHORTS_FILTER_STORAGE_KEY] || DEFAULT_SHORTS_FILTER_VALUE
      ); // Novo
    })
    .catch((error) => {
      console.error("Erro ao carregar configurações:", error);
    });

  // --- Event Listeners ---
  optionButtons.forEach((button) => {
    button.addEventListener("click", () =>
      updateGridUI(parseInt(button.dataset.value, 10))
    );
  });

  slider.addEventListener("input", () => {
    currentGridValue = parseInt(slider.value, 10);
    sliderLabelSpan.textContent = slider.value;
    optionButtons.forEach((btn) => btn.classList.remove("selected"));
  });

  dateFilterSelect.addEventListener("change", () => {
    currentDateFilterValue = dateFilterSelect.value;
  });
  shortsFilterToggle.addEventListener("change", () => {
    // Novo
    currentShortsFilter = shortsFilterToggle.checked;

    // Adicionar feedback visual
    const shortsRow = document.querySelector(".shorts-filter-row");
    shortsRow.classList.add("active");
    setTimeout(() => {
      shortsRow.classList.remove("active");
    }, 600);

    // Feedback de status
    if (currentShortsFilter) {
      setStatusMessage("Filtro de Shorts ativado! 🎬", false);
    } else {
      setStatusMessage("Filtro de Shorts desativado", false);
    }
  });

  resetButton.addEventListener("click", () => {
    updateGridUI(DEFAULT_GRID_VALUE);
    updateDateFilterUI(DEFAULT_DATE_FILTER_VALUE);
    updateShortsFilterUI(DEFAULT_SHORTS_FILTER_VALUE); // Novo
    setStatusMessage(
      "Padrões selecionados. Clique em Aplicar para efetivar.",
      false
    );
  });

  applyAndReloadButton.addEventListener("click", () => {
    saveAndApplySettings(true);
  });
  // --- Função principal para guardar e aplicar ---
  function saveAndApplySettings(shouldReload = false) {
    browser.storage.local
      .set({
        [GRID_STORAGE_KEY]: currentGridValue,
        [DATE_FILTER_STORAGE_KEY]: currentDateFilterValue,
        [SHORTS_FILTER_STORAGE_KEY]: currentShortsFilter, // Novo
      })
      .then(() => {
        return browser.tabs.query({ active: true, currentWindow: true });
      })
      .then((tabs) => {
        const activeTab = tabs[0];
        if (
          activeTab &&
          activeTab.id &&
          activeTab.url &&
          activeTab.url.includes("youtube.com")
        ) {
          return browser.tabs
            .sendMessage(activeTab.id, {
              action: "applyAllSettings",
              gridValue: currentGridValue,
              dateFilterValue: currentDateFilterValue,
              shortsFilterValue: currentShortsFilter, // Novo
            })
            .then((response) => {
              handleContentScriptResponse(response, shouldReload, activeTab.id);
            });
        } else {
          setStatusMessage("Abra ou foque numa aba do YouTube.", true);
        }
      })
      .catch((error) => {
        console.error("Erro ao salvar configurações:", error);
        setStatusMessage("Erro ao salvar configurações.", true);
      });
  }
  function handleContentScriptResponse(response, shouldReload, tabId) {
    if (browser.runtime.lastError) {
      console.error(
        "Erro ao enviar mensagem:",
        browser.runtime.lastError.message
      );
      setStatusMessage(`Erro: ${browser.runtime.lastError.message}`, true);
    } else if (response && response.status === "ok") {
      setStatusMessage("Configurações aplicadas!", false);
      if (shouldReload) {
        // setTimeout(() => browser.tabs.reload(tabId), 1000);
      }
    } else {
      setStatusMessage(
        "Sem resposta do YouTube. Tente recarregar a página.",
        true
      );
    }
  }

  function setStatusMessage(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? "#D8000C" : "#007bff";
    if (!message.includes("A recarregar...")) {
      setTimeout(() => {
        statusMessage.textContent = "";
      }, 3000);
    }
  }

  // Carregar versão da extensão após tudo estar configurado
  setTimeout(() => {
    loadExtensionVersion();
  }, 100);
});
