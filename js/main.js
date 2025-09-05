document.addEventListener("DOMContentLoaded", () => {
  const GITHUB_USERNAME = "lucasonline0";

  function initMobileMenu() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const closeMenuButton = document.getElementById("close-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".nav-link-mobile");

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
      });
    }

    if (closeMenuButton && mobileMenu) {
      closeMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
      });
    }

    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (mobileMenu) {
          mobileMenu.classList.add("translate-x-full");
        }
      });
    });
  }

  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("navbar-scrolled");
        } else {
          navbar.classList.remove("navbar-scrolled");
        }
      });
    }
  }

  function initScrollReveal() {
    if (typeof ScrollReveal !== "undefined") {
      ScrollReveal().reveal(".reveal", {
        delay: 200,
        distance: "40px",
        origin: "bottom",
        duration: 800,
        easing: "ease-in-out",
        reset: false,
      });
    }
  }

  async function fetchGitHubProfile(username) {
    const nameElement = document.getElementById("github-name");
    const bioElement = document.getElementById("github-bio");
    const profilePicElement = document.getElementById("profile-pic");

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Não foi possível buscar os dados do GitHub.");
      }
      const data = await response.json();

      if (nameElement && data.name) {
        nameElement.textContent = data.name;
      }
      if (bioElement && data.bio) {
        bioElement.textContent = data.bio;
      }
      if (profilePicElement && data.avatar_url) {
        profilePicElement.src = data.avatar_url;
      }
    } catch (error) {
      console.error("Erro ao buscar perfil do GitHub:", error);
      if (bioElement) {
        bioElement.textContent = "Não foi possível carregar a biografia do GitHub. Por favor, tente novamente mais tarde.";
      }
    }
  }

  function setCurrentYear() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  function initNavHighlighting() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a.nav-link");
    const navbarHeight = document.getElementById("navbar")?.offsetHeight || 70;

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navbarHeight - 20;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("text-primary");
        link.classList.add("text-text-secondary");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("text-primary");
          link.classList.remove("text-text-secondary");
        }
      });
    });
  }

  function initSocialAndBackToTop() {
    const socialBar = document.getElementById("social-bar");
    const backToTopButton = document.getElementById("back-to-top-button");
    const scrollThreshold = document.getElementById("home")?.offsetHeight || window.innerHeight;

    if (!socialBar || !backToTopButton) {
      return;
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold * 0.8) {
        socialBar.classList.add("opacity-0", "translate-y-8");
        backToTopButton.classList.remove("opacity-0", "-translate-y-8");
      } else {
        socialBar.classList.remove("opacity-0", "translate-y-8");
        backToTopButton.classList.add("opacity-0", "-translate-y-8");
      }
    });
  }

  initMobileMenu();
  initNavbarScroll();
  initScrollReveal();
  fetchGitHubProfile(GITHUB_USERNAME);
  setCurrentYear();
  initNavHighlighting();
  initSocialAndBackToTop();
});