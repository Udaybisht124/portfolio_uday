const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// --- Theme Toggle Logic ---
function setTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.textContent = "🌞";
  } else {
    document.body.classList.remove("light-theme");
    themeIcon.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}

// On load: set theme based on localStorage or system preference
(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? "dark" : "light");
  }
})();







themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light-theme");
  setTheme(isLight ? "dark" : "light");
});

// --- Hamburger Menu ---
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});








// ...existing code...
// Animated underline for navbar links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
// ...existing code...











// --- Back to Top Button ---
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
    backToTop.classList.add("visible");
  } else {
    backToTop.style.display = "none";
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Form Validation ---
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
  } else {
    alert("Message sent successfully!");
    form.reset();
  }
});

// --- Intersection Observer for Animations ---
const animateElements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.classList.contains("hero")) {
          const h1 = entry.target.querySelector("h1");
          const btn = entry.target.querySelector(".btn");
          const img = entry.target.querySelector(".hero-image img");
          h1.style.animation = "bounceIn 1s ease-out";
          btn.style.animation = "bounceIn 1s ease-out 0.2s backwards";
          img.style.animation = "fadeInUp 1s ease-out 0.4s backwards";
        }

        if (entry.target.classList.contains("about-section")) {
          const bio = entry.target.querySelector(".about-bio");
          const details = entry.target.querySelector(".about-details");
          bio.style.animation = "fadeInUp 1s ease-out";
          details.style.animation = "fadeInUp 1s ease-out 0.2s backwards";
        }

        if (entry.target.classList.contains("section")) {
          const skills = entry.target.querySelectorAll(".skill");
          const projects = entry.target.querySelectorAll(".project-card");
          const blogCards = entry.target.querySelectorAll(".blog-card");
          const timelineItems = entry.target.querySelectorAll(".timeline-item");

          skills.forEach((skill, i) => {
            skill.style.animation = `fadeInUp 0.8s ease-out ${i * 0.1}s backwards`;
            const progress = skill.querySelector(".progress");
            const width = progress.getAttribute("data-width");
            progress.style.setProperty("--target-width", `${width}%`);
            progress.style.animation = `growWidth 1s ease-out ${i * 0.1 + 0.5}s forwards`;
          });

          projects.forEach((project, i) => {
            project.style.animation = `fadeInUp 0.8s ease-out ${i * 0.1}s backwards`;
          });

          blogCards.forEach((card, i) => {
            card.style.animation = `fadeInUp 0.8s ease-out ${i * 0.1}s backwards`;
          });

          timelineItems.forEach((item, i) => {
            item.style.animation = `slideInLeft 0.8s ease-out ${i * 0.1}s backwards`;
          });
        }

        if (entry.target.tagName === "FOOTER") {
          entry.target.style.animation = "fadeInUp 1s ease-out";
        }

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animateElements.forEach((el) => observer.observe(el));

// --- Pulse for Back to Top ---
backToTop.addEventListener("animationend", () => {
  backToTop.style.animation = "pulse 1.5s infinite";
});