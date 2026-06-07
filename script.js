const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
const introLoader = document.querySelector("#introLoader");

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
