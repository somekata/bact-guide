// js/footer.js
(async function insertFooter() {
  // version.json を階層に応じて探索
  const versionPaths = [
    "./data/version.json",
    "../data/version.json",
    "../../data/version.json",
    "../../../data/version.json",
  ];

  async function loadVersion() {
    for (const p of versionPaths) {
      try {
        const r = await fetch(p, { cache: "no-cache" });
        if (!r.ok) continue;
        const json = await r.json();
        // ファイルが配列の場合は最新(最後)を採用、オブジェクトならそのまま
        return Array.isArray(json) ? json[json.length - 1] : json;
      } catch (_) {}
    }
    return null;
  }

  const ver = await loadVersion();
  const year = new Date().getFullYear();

  // 既存の<footer>があれば上書き、なければ作成
  let footer = document.querySelector("footer");
  if (!footer) {
    footer = document.createElement("footer");
    footer.id = "site-footer";
    document.body.appendChild(footer);
  }

  footer.innerHTML = `
    <p>© ${year} Bacteriology Lab Guide / Osaka Metropolitan University</p>
    <p>Version: ${ver ? `${ver.version} (${ver.date})` : "unavailable"}</p>
    <p class="muted">This educational site was developed with the assistance of <strong>ChatGPT</strong>.</p>
  `;
})();
