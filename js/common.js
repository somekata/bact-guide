// 共通スクリプト（将来の拡張に対応）
document.addEventListener("DOMContentLoaded", () => {
  // --- 1) ナビのアクティブ表示 ---
  const current = location.pathname.replace(/\/index\.html$/, "/"); // /x/ に正規化
  document.querySelectorAll("nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    // 相対→絶対にして比較
    const abs = new URL(href, location).pathname.replace(/\/index\.html$/, "/");
    if (abs === current) a.classList.add("active");
  });

  // --- 2) フッター自動挿入（ChatGPTクレジット） ---
  // ページ側で <body data-no-auto-footer> を付けると無効化できます
  if (!document.body.hasAttribute("data-no-auto-footer")) {
    const year = new Date().getFullYear();
    const footerHTML = `
      <p>
        © ${year} Bacteriology Lab Guide / Osaka Metropolitan University<br>
        このページは <strong>ChatGPT（OpenAI）</strong> の協力により作成されました。<br>
        Created with the assistance of <strong>ChatGPT (OpenAI)</strong>.
      </p>
    `;

    // 既存の <footer> があれば上書き、なければ作成して末尾に追加
    let footer = document.querySelector("footer");
    if (!footer) {
      footer = document.createElement("footer");
      footer.id = "site-footer";
      document.body.appendChild(footer);
    }
    footer.innerHTML = footerHTML;
  }
});
