const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
const introLoader = document.querySelector("#introLoader");

const searchItems = [
  ...(window.morillionProducts || []).map((product) => ({
    type: "商品",
    category: product.category,
    title: product.name,
    detail: product.price,
    href: `products.html#product-${product.url.split("/dp/")[1]}`
  })),
  ...Object.entries(window.morillionArticles || {}).map(([id, article]) => ({
    type: "コラム",
    category: article.category,
    title: article.title,
    detail: article.lead,
    href: `article.html?id=${id}`
  }))
];

const searchDialog = document.createElement("div");
searchDialog.className = "search-dialog";
searchDialog.hidden = true;
searchDialog.innerHTML = `
  <div class="search-backdrop" data-search-close></div>
  <section class="search-panel" role="dialog" aria-modal="true" aria-labelledby="searchTitle">
    <div class="search-panel-head">
      <div>
        <p class="section-kicker">Site search</p>
        <h2 id="searchTitle">商品・コラムを検索</h2>
      </div>
      <button class="search-close" type="button" aria-label="検索を閉じる" data-search-close>×</button>
    </div>
    <label class="search-field">
      <span class="sr-only">検索キーワード</span>
      <input type="search" placeholder="例：防犯ブザー、夜道、窓" autocomplete="off">
    </label>
    <p class="search-status" aria-live="polite">キーワードを入力してください</p>
    <div class="search-results"></div>
  </section>`;
document.body.appendChild(searchDialog);

const searchInput = searchDialog.querySelector("input");
const searchStatus = searchDialog.querySelector(".search-status");
const searchResults = searchDialog.querySelector(".search-results");

const normalizeSearchText = (value) => value.toLowerCase().normalize("NFKC").replace(/\s+/g, "");

const renderSearchResults = () => {
  if (!(searchInput instanceof HTMLInputElement) || !searchStatus || !searchResults) return;
  const query = normalizeSearchText(searchInput.value.trim());

  if (!query) {
    searchStatus.textContent = "キーワードを入力してください";
    searchResults.innerHTML = "";
    return;
  }

  const matches = searchItems.filter((item) =>
    normalizeSearchText(`${item.title} ${item.category} ${item.detail}`).includes(query)
  );

  searchStatus.textContent = matches.length ? `${matches.length}件見つかりました` : "該当する商品・コラムはありません";
  searchResults.innerHTML = matches.slice(0, 20).map((item) => `
    <a class="search-result" href="${item.href}">
      <span class="search-result-type">${item.type}・${item.category}</span>
      <strong>${item.title}</strong>
      <small>${item.detail}</small>
    </a>`).join("");
};

const openSearch = () => {
  searchDialog.hidden = false;
  document.body.classList.add("search-open");
  requestAnimationFrame(() => searchInput?.focus());
};

const closeSearch = () => {
  searchDialog.hidden = true;
  document.body.classList.remove("search-open");
};

searchDialog.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("[data-search-close]")) closeSearch();
});
searchInput?.addEventListener("input", renderSearchResults);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !searchDialog.hidden) closeSearch();
});

document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("[data-search-open]")) {
    openSearch();
  }
});

const productSearchInput = document.querySelector("#productSearch");
const productSearchStatus = document.querySelector("#productSearchStatus");

productSearchInput?.addEventListener("input", () => {
  if (!(productSearchInput instanceof HTMLInputElement)) return;
  const query = normalizeSearchText(productSearchInput.value.trim());
  const cards = [...document.querySelectorAll("#productCatalog .catalog-card")];
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = !query || normalizeSearchText(card.textContent || "").includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  if (productSearchStatus) {
    productSearchStatus.textContent = query ? `${visibleCount}件の商品が見つかりました` : `${cards.length}件の商品を掲載しています`;
  }
});

const columnFilterButtons = [...document.querySelectorAll("[data-column-filter]")];
const columnCards = [...document.querySelectorAll("[data-column-category]")];
const columnFilterStatus = document.querySelector(".column-filter-status");

columnFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-column-filter") || "all";
    let visibleCount = 0;

    columnFilterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    columnCards.forEach((card) => {
      const matches = category === "all" || card.getAttribute("data-column-category") === category;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (columnFilterStatus) {
      const label = button.textContent?.trim() || "すべて";
      columnFilterStatus.textContent = category === "all"
        ? "すべての記事を表示しています"
        : `${label}の記事を${visibleCount}件表示しています`;
    }
  });
});

introLoader?.addEventListener("animationend", (event) => {
  if (event.animationName === "introSlideOut") {
    introLoader.remove();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const clickable = target.closest(
    ".button, .mini-cart, .site-nav a, .category-grid a, .product-card a, .ranking-list a, .header-actions button, .menu-button"
  );

  if (!(clickable instanceof HTMLElement)) return;

  const rect = clickable.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const ripple = document.createElement("span");

  ripple.className = "click-ripple";
  ripple.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
  ripple.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
  ripple.style.setProperty("--ripple-size", `${size}px`);

  clickable.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
});

menuButton?.addEventListener("click", () => {
  const nextState = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(nextState));
  nav?.classList.toggle("is-open", nextState);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});

document.querySelector("#newsletterForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;
  const button = form.querySelector("button");
  if (button) button.textContent = "登録済み";
  form.reset();
});
