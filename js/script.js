document.addEventListener("DOMContentLoaded", function () {
  const contentContainer = document.getElementById("content-container");

  function loadPage(page) {
    contentContainer.innerHTML = '<div class="loading">Carregando...</div>';

    fetch(page)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar a página");
        }
        return response.text();
      })
      .then((html) => {
        contentContainer.innerHTML = html;

        const scripts = contentContainer.querySelectorAll("script");
        scripts.forEach((script) => {
          const newScript = document.createElement("script");
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          document.body.appendChild(newScript);
          script.remove();
        });
      })
      .catch((error) => {
        contentContainer.innerHTML = `<div class="error">Erro ao carregar a página: ${error.message}</div>`;
        console.error("Erro ao carregar a página:", error);
      });
  }

  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });

      this.classList.add("active");

      const page = this.getAttribute("data-page");
      loadPage(page);

      history.pushState(null, null, "#" + page.replace(".html", ""));
    });
  });

  const initialPage = "home.html";
  loadPage(initialPage);

  const homeLink = document.querySelector('[data-page="home.html"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }

  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    let pageToLoad = hash ? hash + ".html" : "home.html";

    loadPage(pageToLoad);

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-page") === pageToLoad) {
        link.classList.add("active");
      }
    });
  });
});
