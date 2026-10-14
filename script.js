// Fade in any element with class="fade" when it scrolls into view.
const fadeEls = document.querySelectorAll(".fade");

if ("IntersectionObserver" in window) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target); // fade once, then stay visible
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeEls.forEach((el) => fadeObserver.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add("visible"));
}

// Highlight the sidebar link for the section currently in view.
const navLinks = document.querySelectorAll(".nav a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) =>
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-35% 0px -60% 0px" } // a section is "current" near the upper-middle of the screen
  );
  sections.forEach((section) => navObserver.observe(section));
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
