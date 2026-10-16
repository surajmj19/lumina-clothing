/* Mobile navigation */
const navList = document.querySelector(".nav-list");
const toggleBtn = document.querySelector(".toggle-btn");
const mainCont = document.querySelector(".main");

function closeMenu() {
  if (!navList || !toggleBtn) return;

  navList.classList.remove("active");

  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-label", "Open navigation menu");

  if (mainCont) {
    mainCont.classList.remove("blur");
  }
}

if (navList && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("active");

    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    if (mainCont) {
      mainCont.classList.toggle("blur", isOpen);
    }
  });

  /* Close the menu after selecting a navigation link */
  navList.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* Close the menu with the Escape key */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* Close the mobile menu when switching to desktop layout */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
}

/* Scroll animation */
const revealElements = document.querySelectorAll(
  ".section-title, .card, .banner-content, .grid-content, .newsletter-content",
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

/* Loading screen */
const loader = document.querySelector(".loader");

function hideLoader() {
  if (loader) {
    loader.classList.add("hide");
  }
}

if (document.readyState === "complete") {
  window.setTimeout(hideLoader, 1000);
} else {
  window.addEventListener(
    "load",
    () => {
      window.setTimeout(hideLoader, 1000);
    },
    { once: true },
  );
}
