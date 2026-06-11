const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
const introLoader = document.querySelector("#introLoader");
const introSeenKey = "morillionIntroSeen";

if (introLoader) {
  try {
    if (sessionStorage.getItem(introSeenKey)) {
      introLoader.classList.add("is-hidden");
      introLoader.remove();
    } else {
      sessionStorage.setItem(introSeenKey, "1");
    }
  } catch {
    introLoader.classList.remove("is-hidden");
  }
}

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

const headerSearchWrap = document.querySelector(".header-search");
const headerSearchForm = document.querySelector("[data-header-search]");
const searchInput = document.querySelector("[data-search-input]");
const headerSearchResults = document.querySelector("[data-header-search-results]");

const normalizeSearchText = (value) => value.toLowerCase().normalize("NFKC").replace(/\s+/g, "");

const renderSearchResults = () => {
  if (!(searchInput instanceof HTMLInputElement) || !headerSearchResults) return;
  const query = normalizeSearchText(searchInput.value.trim());

  if (!query) {
    headerSearchResults.hidden = true;
    headerSearchResults.innerHTML = "";
    return;
  }

  const matches = searchItems.filter((item) =>
    normalizeSearchText(`${item.title} ${item.category} ${item.detail}`).includes(query)
  );

  headerSearchResults.hidden = false;
  headerSearchResults.innerHTML = `
    <p class="search-status" aria-live="polite">${matches.length ? `${matches.length}件見つかりました` : "該当する商品・コラムはありません"}</p>
    <div class="search-results">
      ${matches.slice(0, 20).map((item) => `
        <a class="search-result" href="${item.href}">
          <span class="search-result-type">${item.type}・${item.category}</span>
          <strong>${item.title}</strong>
          <small>${item.detail}</small>
        </a>`).join("")}
    </div>`;
};

searchInput?.addEventListener("input", renderSearchResults);
searchInput?.addEventListener("focus", renderSearchResults);
headerSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!(searchInput instanceof HTMLInputElement)) return;
  const query = normalizeSearchText(searchInput.value.trim());
  if (!query) return;
  const firstMatch = searchItems.find((item) =>
    normalizeSearchText(`${item.title} ${item.category} ${item.detail}`).includes(query)
  );
  if (firstMatch) {
    window.location.href = firstMatch.href;
  }
});
headerSearchWrap?.addEventListener("focusout", (event) => {
  if (!(event.currentTarget instanceof HTMLElement)) return;
  const nextTarget = event.relatedTarget;
  if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
    if (headerSearchResults) headerSearchResults.hidden = true;
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && headerSearchResults && !headerSearchResults.hidden) {
    headerSearchResults.hidden = true;
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
