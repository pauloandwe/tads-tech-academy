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

document.addEventListener("DOMContentLoaded", function () {
  function setupCharacterCards() {
    const characterCards = document.querySelectorAll(".character-card");
    const characterDescriptions = document.querySelectorAll(
      ".character-description"
    );

    function showCharacterDescription(characterId) {
      characterDescriptions.forEach((desc) => {
        desc.classList.remove("active");
      });

      const targetDescription = document.getElementById(characterId);
      if (targetDescription) {
        targetDescription.classList.add("active");

        targetDescription.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    characterCards.forEach((card) => {
      card.addEventListener("click", function () {
        const characterId = this.getAttribute("data-character");
        showCharacterDescription(characterId);

        characterCards.forEach((c) => c.classList.remove("active-card"));
        this.classList.add("active-card");
      });
    });

    if (characterCards.length > 0 && characterDescriptions.length > 0) {
      const firstCharacterId = characterCards[0].getAttribute("data-character");
      showCharacterDescription(firstCharacterId);
      characterCards[0].classList.add("active-card");
    }
  }

  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    setupCharacterCards();
  }

  const aboutLink = document.querySelector('a[data-section="about"]');
  if (aboutLink) {
    aboutLink.addEventListener("click", function () {
      setTimeout(setupCharacterCards, 100);
    });
  }
});
