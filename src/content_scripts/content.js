// content_scripts/content.js
(() => {
  "use strict";

  // --- DETECÇÃO DE PLATAFORMA ---
  const isMobile = () => {
    return (
      window.location.hostname === "m.youtube.com" ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      window.innerWidth <= 768
    );
  };

  const isYouTubeMobile = window.location.hostname === "m.youtube.com";

  // --- CONFIGURAÇÕES E ESTADO ---
  const GRID_STORAGE_KEY = "youtubeGridItemsPerRow";
  const DATE_FILTER_STORAGE_KEY = "youtubeDateFilter";
  const SHORTS_FILTER_STORAGE_KEY = "youtubeShortsFilter"; // Nova chave
  const GRID_STYLE_ID = "youtube-grid-styler-custom-style";

  let currentGridValue = null;
  let currentDateFilter = "all";
  let currentShortsFilter = false; // Novo estado para o filtro de shorts

  // --- LÓGICA DO GRID (Existente) ---
  function aplicarEstiloGrid(numeroItens) {
    const existingStyleElement = document.getElementById(GRID_STYLE_ID);
    if (existingStyleElement) existingStyleElement.remove();
    document.documentElement.style.removeProperty(
      "--ytd-rich-grid-items-per-row"
    );

    if (numeroItens === null || numeroItens === undefined) {
      console.log("[YT Styler] Estilo de grelha removido.");
      currentGridValue = null;
      return;
    }

    const numItens = parseInt(numeroItens, 10);
    if (isNaN(numItens) || numItens < 1) return;

    currentGridValue = numItens;
    document.documentElement.style.setProperty(
      "--ytd-rich-grid-items-per-row",
      numItens.toString(),
      "important"
    );
    document.documentElement.style.setProperty(
      "--ytd-rich-grid-item-margin",
      0,
      "important"
    );
    const styleElement = document.createElement("style");
    styleElement.id = GRID_STYLE_ID;

    if (isYouTubeMobile) {
      // Estilos específicos para YouTube Mobile (m.youtube.com)
      styleElement.textContent = `
        .rich-shelf-renderer .rich-grid-renderer {
          display: grid !important;
          grid-template-columns: repeat(${numItens}, 1fr) !important;
          gap: 8px !important;
        }
        .rich-grid-renderer .rich-item-renderer {
          width: 100% !important;
          margin: 0 !important;
        }
      `;
    } else {
      // Estilos para YouTube Desktop
      styleElement.textContent = `ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: ${numItens} !important; }`;
    }

    document.head.appendChild(styleElement);
    console.log(
      `[YT Styler] Grelha definida para ${numItens} itens ${
        isYouTubeMobile ? "(mobile)" : "(desktop)"
      }.`
    );
  }

  // --- LÓGICA DO FILTRO DE DATA (Melhorada) ---
  const timeUnitsToDays = {
    now: 0,
    agora: 0,
    minute: 0,
    minutes: 0,
    minuto: 0,
    minutos: 0,
    hour: 0,
    hours: 0,
    hora: 0,
    horas: 0,
    day: 1,
    days: 1,
    dia: 1,
    dias: 1,
    week: 7,
    weeks: 7,
    semana: 7,
    semanas: 7,
    month: 30,
    months: 30,
    mês: 30,
    meses: 30,
    year: 365,
    years: 365,
    ano: 365,
    anos: 365,
  };
  const dateRegex = new RegExp(
    `(\\d+)\\s+(${Object.keys(timeUnitsToDays).join("|")})`
  );

  function parseDateString(text) {
    const lowerText = text.toLowerCase();
    const match = lowerText.match(dateRegex);
    if (match) {
      const quantity = parseInt(match[1], 10);
      const unit = match[2];
      const daysAgo = quantity * timeUnitsToDays[unit];
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date;
    }
    for (const unit in timeUnitsToDays) {
      if (lowerText.includes(unit)) {
        const daysAgo = timeUnitsToDays[unit];
        const date = new Date();
        if (daysAgo > 0) date.setDate(date.getDate() - daysAgo);
        return date;
      }
    }
    return null;
  }

  function getFilterCutoffDate(filterValue) {
    if (!filterValue || filterValue === "all") return null;
    const now = new Date();
    switch (filterValue) {
      case "week":
        now.setDate(now.getDate() - 7);
        break;
      case "month":
        now.setMonth(now.getMonth() - 1);
        break;
      case "3months":
        now.setMonth(now.getMonth() - 3);
        break;
      case "6months":
        now.setMonth(now.getMonth() - 6);
        break;
      case "year":
        now.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return null;
    }
    return now;
  }
  function processVideoForDate(video, cutoffDate) {
    // Suporte para desktop e mobile
    const isDesktopVideo =
      video.matches && video.matches("ytd-rich-item-renderer");
    const isMobileVideo =
      video.classList &&
      (video.classList.contains("rich-item-renderer") ||
        video.classList.contains("video-container"));

    if (!isDesktopVideo && !isMobileVideo) return;

    if (!cutoffDate) {
      if (video.hasAttribute("data-filtered-date")) {
        video.style.display = "";
        video.removeAttribute("data-filtered-date");
      }
      return;
    }

    let metadataSpans;
    if (isYouTubeMobile) {
      // Seletores para YouTube Mobile
      metadataSpans = video.querySelectorAll(
        ".metadata-line span, .video-metadata span, .rich-video-meta span"
      );
    } else {
      // Seletores para YouTube Desktop
      metadataSpans = video.querySelectorAll(
        "#metadata-line span.ytd-video-meta-block"
      );
    }

    let dateText = null;
    metadataSpans.forEach((span) => {
      const text = span.textContent || "";
      if (
        text.includes("há") ||
        text.includes("ago") ||
        text.includes("week") ||
        text.includes("month") ||
        text.includes("year")
      ) {
        dateText = text;
      }
    });
    if (!dateText) {
      video.style.display = "";
      video.removeAttribute("data-filtered-date");
      return;
    }
    const videoDate = parseDateString(dateText);
    if (videoDate) {
      if (videoDate < cutoffDate) {
        video.style.display = "none";
        video.setAttribute("data-filtered-date", "true");
      } else {
        video.style.display = "";
        video.removeAttribute("data-filtered-date");
      }
    }
  }
  function filterAllVisibleVideosByDate() {
    const cutoffDate = getFilterCutoffDate(currentDateFilter);

    if (isYouTubeMobile) {
      // Seletores para YouTube Mobile
      document
        .querySelectorAll(
          ".rich-item-renderer, .video-container, .video-list-item"
        )
        .forEach((video) => processVideoForDate(video, cutoffDate));
    } else {
      // Seletores para YouTube Desktop
      document
        .querySelectorAll("ytd-rich-item-renderer")
        .forEach((video) => processVideoForDate(video, cutoffDate));
    }
  }
  // --- LÓGICA DO FILTRO DE SHORTS (Nova) ---
  function processShorts() {
    const displayStyle = currentShortsFilter ? "none" : "";

    if (isYouTubeMobile) {
      // Processamento para YouTube Mobile
      document
        .querySelectorAll(
          ".rich-section-renderer, .reel-shelf-renderer, .shelf-renderer"
        )
        .forEach((shelf) => {
          const titleElement = shelf.querySelector(
            ".shelf-title, .rich-shelf-header h3, .shelf-header h3"
          );
          if (
            titleElement &&
            titleElement.textContent.trim().toLowerCase() === "shorts"
          ) {
            shelf.style.display = displayStyle;
          }
        });

      // Esconde vídeos de shorts individuais no mobile
      document.querySelectorAll('a[href*="/shorts/"]').forEach((shortLink) => {
        const videoCard = shortLink.closest(
          ".rich-item-renderer, .video-container, .video-list-item"
        );
        if (videoCard) {
          videoCard.style.display = displayStyle;
        }
      });
    } else {
      // Processamento para YouTube Desktop
      document
        .querySelectorAll("ytd-rich-section-renderer, ytd-reel-shelf-renderer")
        .forEach((shelf) => {
          const titleElement = shelf.querySelector(
            "#title-container #title-text, #title"
          );
          if (
            titleElement &&
            titleElement.textContent.trim().toLowerCase() === "shorts"
          ) {
            shelf.style.display = displayStyle;
          }
        });

      // Esconde vídeos de shorts individuais no desktop
      document
        .querySelectorAll(
          'ytd-rich-item-renderer a#thumbnail[href*="/shorts/"]'
        )
        .forEach((shortLink) => {
          const videoCard = shortLink.closest("ytd-rich-item-renderer");
          if (videoCard) {
            videoCard.style.display = displayStyle;
          }
        });
    }
  }

  // --- INICIALIZAÇÃO E OBSERVERS ---
  function applyAllSettings(gridVal, dateFilterVal, shortsFilterVal) {
    currentGridValue = gridVal;
    currentDateFilter = dateFilterVal;
    currentShortsFilter = shortsFilterVal;

    aplicarEstiloGrid(gridVal);
    filterAllVisibleVideosByDate();
    processShorts();
  }

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "applyAllSettings") {
      applyAllSettings(
        request.gridValue,
        request.dateFilterValue,
        request.shortsFilterValue
      );
      sendResponse({ status: "ok" });
    }
    return true;
  });
  browser.storage.local
    .get([GRID_STORAGE_KEY, DATE_FILTER_STORAGE_KEY, SHORTS_FILTER_STORAGE_KEY])
    .then((result) => {
      const gridVal = result[GRID_STORAGE_KEY];
      const dateFilterVal = result[DATE_FILTER_STORAGE_KEY] || "all";
      const shortsFilterVal = result[SHORTS_FILTER_STORAGE_KEY] || false;
      applyAllSettings(gridVal, dateFilterVal, shortsFilterVal);
    })
    .catch((error) => {
      console.error("Erro ao carregar configurações no content script:", error);
    });

  let debounceTimer;
  const debouncedFilter = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log("[YT Styler] DOM alterado, a aplicar filtros...");
      filterAllVisibleVideosByDate();
      processShorts();
    }, 300);
  };

  const observer = new MutationObserver(debouncedFilter);
  let observedNode = null;
  function startObserver() {
    let targetNode;

    if (isYouTubeMobile) {
      // Para YouTube Mobile
      targetNode = document.querySelector("body") || document.documentElement;
    } else {
      // Para YouTube Desktop
      targetNode = document.querySelector("ytd-page-manager");
    }

    if (targetNode && targetNode !== observedNode) {
      if (observer && observedNode) {
        observer.disconnect();
      }
      observer.observe(targetNode, { childList: true, subtree: true });
      observedNode = targetNode;
      console.log(
        `[YT Styler] Observer iniciado em ${
          isYouTubeMobile ? "body (mobile)" : "ytd-page-manager (desktop)"
        }.`
      );
    }
  }

  setInterval(startObserver, 2000);
  document.addEventListener("yt-navigate-finish", () => {
    // Dá um pequeno tempo para o youtube renderizar a nova página
    setTimeout(() => {
      applyAllSettings(
        currentGridValue,
        currentDateFilter,
        currentShortsFilter
      );
      startObserver();
    }, 500);
  });
  console.log(
    `[YT Styler] Script de conteúdo v2.0 (com suporte mobile) carregado - Plataforma: ${
      isYouTubeMobile ? "YouTube Mobile" : "YouTube Desktop"
    }.`
  );
})();
