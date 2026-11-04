const menuButton = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const mobileMenu = window.matchMedia("(max-width: 768px)");
const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];
const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(formData.get("subject"));
    const body = encodeURIComponent(
        `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
    );

    formStatus.textContent = "Opening your email app with this message ready to send.";
    window.location.href = `mailto:jgonzales@gmail.com?subject=${subject}&body=${body}`;
});


function setMenuOpen(isOpen) {
    menu.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

menuButton.addEventListener("click", () => {
    setMenuOpen(!menu.classList.contains("active"));
});

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (mobileMenu.matches) setMenuOpen(false);
    });
});

function updateActiveNav() {
    // Pick the last section whose top has reached the upper part of the viewport.
    const marker = window.scrollY + window.innerHeight * 0.35;
    let activeSection = navSections[0];

    for (const section of navSections) {
        if (section.offsetTop <= marker) activeSection = section;
    }

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeSection.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
window.addEventListener("hashchange", updateActiveNav);
updateActiveNav();

mobileMenu.addEventListener("change", (event) => {
    setMenuOpen(!event.matches);
});

setMenuOpen(!mobileMenu.matches);
