document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".content-section");

  function showSection(sectionId) {
    sections.forEach((section) => {
      section.style.display = "none";
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.style.display = "block";
    } else {
      console.error(`Seção ${sectionId} não encontrada`);
    }
  }

  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });

      this.classList.add("active");

      const sectionId = this.getAttribute("data-section");
      showSection(sectionId);

      history.pushState(null, null, "#" + sectionId);
    });
  });

  let initialSection = "home";
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    initialSection = hash;
  }

  showSection(initialSection);

  const initialLink = document.querySelector(
    `[data-section="${initialSection}"]`
  );
  if (initialLink) {
    initialLink.classList.add("active");
  }

  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    const sectionToShow = hash || "home";

    showSection(sectionToShow);

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === sectionToShow) {
        link.classList.add("active");
      }
    });
  });

  const playNowBtn = document.getElementById("playNowBtn");
  const closeGameBtn = document.getElementById("closeGameBtn");
  const gameFrame = document.getElementById("gameFrame");

  if (playNowBtn && closeGameBtn && gameFrame) {
    playNowBtn.addEventListener("click", function (e) {
      e.preventDefault();
      gameFrame.style.display = "block";
    });

    closeGameBtn.addEventListener("click", function () {
      gameFrame.style.display = "none";
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Formulário enviado com sucesso! Em breve entraremos em contato.");
      this.reset();
    });
  }
});
