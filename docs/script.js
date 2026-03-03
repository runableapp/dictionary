(function () {
  const initDesktopScreenshotSlider = () => {
    const sliders = Array.from(document.querySelectorAll(".image-slider[data-slider-images]"));
    sliders.forEach((slider) => {
      const imageEl = slider.querySelector(".slider-image");
      const leftBtn = slider.querySelector(".slider-arrow-left");
      const rightBtn = slider.querySelector(".slider-arrow-right");
      if (!imageEl || !leftBtn || !rightBtn) return;

      const files = (slider.getAttribute("data-slider-images") || "")
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);
      if (files.length <= 1) {
        leftBtn.hidden = true;
        rightBtn.hidden = true;
        return;
      }

      let index = Math.max(0, files.indexOf(imageEl.getAttribute("src") || ""));
      const render = () => {
        imageEl.setAttribute("src", files[index]);
      };

      leftBtn.addEventListener("click", () => {
        index = (index - 1 + files.length) % files.length;
        render();
      });

      rightBtn.addEventListener("click", () => {
        index = (index + 1) % files.length;
        render();
      });
    });
  };

  const initDonateCelebration = () => {
    const donateLinks = Array.from(document.querySelectorAll(".donation-cta a[href]"));
    if (!donateLinks.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const emojis = ["🎉", "✨", "🎊", "💖", "🌟", "🥳"];
    const burstCount = 18;
    const navDelayMs = prefersReducedMotion ? 50 : 760;

    const randomFrom = (min, max) => Math.random() * (max - min) + min;

    donateLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const href = link.href;
        if (!href) return;
        event.preventDefault();

        const rect = link.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const burst = document.createElement("div");
        burst.className = "emoji-burst";
        burst.style.left = `${centerX}px`;
        burst.style.top = `${centerY}px`;

        for (let i = 0; i < burstCount; i += 1) {
          const item = document.createElement("span");
          item.className = "emoji-burst-item";
          item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          item.style.setProperty("--dx", `${randomFrom(-140, 140)}px`);
          item.style.setProperty("--dy", `${randomFrom(-170, -40)}px`);
          item.style.setProperty("--dr", `${randomFrom(-140, 140)}deg`);
          item.style.setProperty("--dur", `${randomFrom(520, 860)}ms`);
          item.style.setProperty("--delay", `${randomFrom(0, 120)}ms`);
          burst.appendChild(item);
        }

        document.body.appendChild(burst);
        window.setTimeout(() => {
          burst.remove();
        }, navDelayMs + 180);

        const target = link.getAttribute("target");
        window.setTimeout(() => {
          if (target && target !== "_self") {
            window.open(href, target, "noopener,noreferrer");
          } else {
            window.location.href = href;
          }
        }, navDelayMs);
      });
    });
  };

  initDesktopScreenshotSlider();
  initDonateCelebration();

  const languageSelectors = Array.from(document.querySelectorAll("select[data-lang-picker]"));
  if (!languageSelectors.length) return;

  const pageFiles = {
    index: {
      ko: "index.html",
      en: "index.en.html",
      ja: "index.ja.html",
      zh: "index.zh.html",
      id: "index.id.html",
      es: "index.es.html",
      eo: "index.eo.html",
    },
    "dict-cli": {
      ko: "dict-cli.html",
      en: "dict-cli.en.html",
      ja: "dict-cli.ja.html",
      zh: "dict-cli.zh.html",
      id: "dict-cli.id.html",
      es: "dict-cli.es.html",
      eo: "dict-cli.eo.html",
    },
    "report-issues": {
      ko: "report-issues.html",
      en: "report-issues.en.html",
      ja: "report-issues.ja.html",
      zh: "report-issues.zh.html",
      id: "report-issues.id.html",
      es: "report-issues.es.html",
      eo: "report-issues.eo.html",
    },
    "download-cli": {
      ko: "download-cli.html",
      en: "download-cli.en.html",
      ja: "download-cli.ja.html",
      zh: "download-cli.zh.html",
      id: "download-cli.id.html",
      es: "download-cli.es.html",
      eo: "download-cli.eo.html",
    },
    "download-desktop": {
      ko: "download-desktop.html",
      en: "download-desktop.en.html",
      ja: "download-desktop.ja.html",
      zh: "download-desktop.zh.html",
      id: "download-desktop.id.html",
      es: "download-desktop.es.html",
      eo: "download-desktop.eo.html",
    },
  };

  const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const fileToLang = {
    "index.html": "ko",
    "index.en.html": "en",
    "index.ja.html": "ja",
    "index.zh.html": "zh",
    "index.id.html": "id",
    "index.es.html": "es",
    "index.eo.html": "eo",
    "dict-cli.html": "ko",
    "dict-cli.en.html": "en",
    "dict-cli.ja.html": "ja",
    "dict-cli.zh.html": "zh",
    "dict-cli.id.html": "id",
    "dict-cli.es.html": "es",
    "dict-cli.eo.html": "eo",
    "report-issues.html": "ko",
    "report-issues.en.html": "en",
    "report-issues.ja.html": "ja",
    "report-issues.zh.html": "zh",
    "report-issues.id.html": "id",
    "report-issues.es.html": "es",
    "report-issues.eo.html": "eo",
    "download-cli.html": "ko",
    "download-cli.en.html": "en",
    "download-cli.ja.html": "ja",
    "download-cli.zh.html": "zh",
    "download-cli.id.html": "id",
    "download-cli.es.html": "es",
    "download-cli.eo.html": "eo",
    "download-desktop.html": "ko",
    "download-desktop.en.html": "en",
    "download-desktop.ja.html": "ja",
    "download-desktop.zh.html": "zh",
    "download-desktop.id.html": "id",
    "download-desktop.es.html": "es",
    "download-desktop.eo.html": "eo",
  };

  let currentPage = "index";
  if (currentFile.startsWith("dict-cli")) currentPage = "dict-cli";
  if (currentFile.startsWith("report-issues")) currentPage = "report-issues";
  if (currentFile.startsWith("download-cli")) currentPage = "download-cli";
  if (currentFile.startsWith("download-desktop")) currentPage = "download-desktop";

  const currentLang = fileToLang[currentFile] || "en";
  const storedLang = localStorage.getItem("preferredLang");
  const selectedLang = storedLang || currentLang;

  languageSelectors.forEach((select) => {
    if (select.querySelector(`option[value="${selectedLang}"]`)) {
      select.value = selectedLang;
    } else {
      select.value = currentLang;
    }
  });

  const pageLinks = Array.from(document.querySelectorAll("a[data-page-link]"));
  pageLinks.forEach((link) => {
    const pageKey = link.getAttribute("data-page-link");
    if (!pageKey || !pageFiles[pageKey]) return;
    link.href = pageFiles[pageKey][selectedLang] || pageFiles[pageKey].en;
  });

  languageSelectors.forEach((select) => {
    select.addEventListener("change", () => {
      const lang = select.value;
      localStorage.setItem("preferredLang", lang);
      const target = pageFiles[currentPage][lang] || pageFiles[currentPage].en;
      window.location.href = target;
    });
  });
})();
