// js/common.js
// 共通処理：ナビのアクティブ化・footer.jsの動的ロード
(() => {
  "use strict";

  // ---- 1) ナビのアクティブ表示 ----
  function setActiveNav() {
    try {
      // /path/to/page/index.html → /path/to/page/ に正規化
      const current = location.pathname.replace(/\/index\.html?$/, "/");
      document.querySelectorAll("nav a[href]").forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;
        const abs = new URL(href, location).pathname.replace(/\/index\.html?$/, "/");
        if (abs === current) a.classList.add("active");
      });
    } catch (e) {
      // 何もしない（ナビが無いページにも対応）
    }
  }

  // ---- 2) 外部リンクを新規タブに（任意：安全性向上）----
  function enhanceExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(a => {
      const url = new URL(a.href);
      if (url.origin !== location.origin) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    });
  }

  // ---- 3) footer.js を動的にロード（HTMLは common.js のみでOK）----
  function loadFooterJs() {
    // 階層違いに対応（index.html / steps/stepN/index.html / さらに深い階層）
    const candidates = [
      "./js/footer.js",
      "../js/footer.js",
      "../../js/footer.js",
      "../../../js/footer.js"
    ];
    let i = 0;

    const tryNext = () => {
      if (i >= candidates.length) return; // どれも見つからなければ諦める
      const s = document.createElement("script"); // ★ 試行ごとに新しい <script> を生成
      s.src = candidates[i++];
      s.defer = true;
      s.onerror = tryNext; // 失敗したら次の候補へ
      document.head.appendChild(s);
    };

    tryNext();
  }

  // ---- 初期化 ----
  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    enhanceExternalLinks();
    loadFooterJs();
  });
})();
