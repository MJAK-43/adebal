// Données de contenu pour la page projet dynamique.
const projectData = {
  "pont-nkong": {
    title: "Travaux du Pont de Nkong",
    category: "Infrastructure",
    description: "Ce projet vise à améliorer l’accès, la sécurité de passage et la continuité des déplacements autour du Pont de Nkong.",
    budget: "Budget estimatif : 12 000 000 FCFA",
    progress: 72,
    status: "En cours",
    heroImage: "assets/images/projects/pont-nkong/pont-nkong-4.jpeg",
    objectives: [
      "Sécuriser le passage pour les usagers",
      "Renforcer la mobilité locale et l’accès aux activités",
      "Réduire les risques liés à la dégradation de l’ouvrage"
    ],
    gallery: Array.from({ length: 8 }, (_, index) => `assets/images/projects/pont-nkong/pont-nkong-${index + 1}.jpeg`),
    videos: ["assets/videos/video-1.mp4", "assets/videos/video-2.mp4"]
  },
  "cooperative-chefferie": {
    title: "Rénovation de la coopérative à la chefferie",
    category: "Communauté",
    description: "La réhabilitation de la coopérative doit redonner au village un espace fonctionnel pour les réunions, les échanges et certaines activités collectives.",
    budget: "Budget estimatif : 6 500 000 FCFA",
    progress: 54,
    status: "En cours",
    heroImage: "assets/images/projects/cooperative-chefferie/cooperative-1.jpeg",
    objectives: [
      "Rénover le bâtiment et ses accès",
      "Améliorer les conditions d’accueil des activités",
      "Renforcer un lieu de rassemblement utile au village"
    ],
    gallery: Array.from({ length: 4 }, (_, index) => `assets/images/projects/cooperative-chefferie/cooperative-${index + 1}.jpeg`),
    videos: ["assets/videos/video-5.mp4"]
  },
  "tribune-chefferie": {
    title: "Construction de la tribune à la chefferie",
    category: "Communauté",
    description: "La tribune offrira un cadre plus structuré pour les cérémonies, les réunions publiques et les temps forts de la vie communautaire.",
    budget: "Budget estimatif : 8 000 000 FCFA",
    progress: 38,
    status: "En cours",
    heroImage: "assets/images/projects/tribune-chefferie/tribune-3.jpeg",
    objectives: [
      "Créer un espace d’accueil pour les rassemblements",
      "Améliorer l’organisation des événements communautaires",
      "Valoriser la chefferie comme lieu central"
    ],
    gallery: Array.from({ length: 3 }, (_, index) => `assets/images/projects/tribune-chefferie/tribune-${index + 1}.jpeg`),
    videos: ["assets/videos/video-6.mp4"]
  },
  fomenlepe: {
    title: "Construction du lieu sacré Fomenlepe",
    category: "Patrimoine",
    description: "Ce projet accompagne la mise en valeur d’un espace sacré important pour l’identité, la mémoire et la transmission culturelle du village.",
    budget: "Budget estimatif : 9 200 000 FCFA",
    progress: 81,
    status: "En cours",
    heroImage: "assets/images/projects/fomenlepe/fomenlepe-8.jpeg",
    objectives: [
      "Préserver un site symbolique majeur",
      "Aménager un espace durable et respectueux de sa valeur culturelle",
      "Renforcer la transmission du patrimoine local"
    ],
    gallery: Array.from({ length: 8 }, (_, index) => `assets/images/projects/fomenlepe/fomenlepe-${index + 1}.jpeg`),
    videos: ["assets/videos/video-3.mp4", "assets/videos/video-7.mp4"]
  }
};

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const modal = document.getElementById("image-modal");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (siteNav?.classList.contains("open")) {
      siteNav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

function setCurrentYear() {
  document.querySelectorAll("#current-year").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

// Filtre simple côté client pour la liste des projets.
function initProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("#project-list .project-card");

  if (!buttons.length || !cards.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      cards.forEach((card) => {
        const matches = selected === "all" || card.dataset.category === selected;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

// Anime les barres de progression quand elles entrent dans le viewport.
function initProgressBars() {
  const bars = document.querySelectorAll(".progress-value");
  if (!bars.length) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const target = entry.target;
      const progress = Number(target.dataset.progress || 0);
      target.style.width = `${progress}%`;
      observer.unobserve(target);
    });
  }, { threshold: 0.4 });

  bars.forEach((bar) => observer.observe(bar));
}

// Ouvre toutes les images marquées pour affichage plein écran.
function initModalGallery() {
  if (!modal) {
    return;
  }

  const modalImage = modal.querySelector("img");
  const closeButton = modal.querySelector(".modal-close");

  document.querySelectorAll("[data-modal-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-modal-image");
      const image = button.querySelector("img");
      modalImage.src = src || "";
      modalImage.alt = image?.alt || "Image agrandie";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
  }

  closeButton?.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

function showFeedback(form, message, type) {
  const feedback = form.querySelector(".form-feedback");
  if (!feedback) {
    return;
  }
  feedback.textContent = message;
  feedback.classList.remove("error", "success");
  feedback.classList.add(type);
}

// Validation HTML native + retour visuel simple pour les formulaires statiques.
function initFormValidation() {
  const forms = document.querySelectorAll("form[data-validate]");
  if (!forms.length) {
    return;
  }

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        showFeedback(form, "Veuillez compléter correctement le formulaire.", "error");
        return;
      }

      const amountInput = form.querySelector('input[name="amount"]');
      if (amountInput && Number(amountInput.value) <= 0) {
        showFeedback(form, "Le montant doit être supérieur à zéro.", "error");
        return;
      }

      showFeedback(form, "Validation réussie. Cette interface est une simulation statique.", "success");
      form.reset();
    });
  });
}

// Remplit project-detail.html à partir du paramètre ?project=slug.
function renderProjectDetail() {
  if (document.body.dataset.page !== "project-detail") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("project") || "pont-nkong";
  const project = projectData[slug] || projectData["pont-nkong"];

  const titleNode = document.getElementById("project-title");
  const descNode = document.getElementById("project-description");
  const categoryNode = document.getElementById("project-category");
  const budgetNode = document.getElementById("project-budget");
  const statusNode = document.getElementById("project-status");
  const statusTextNode = document.getElementById("project-status-text");
  const heroImageNode = document.getElementById("project-hero-image");
  const objectivesNode = document.getElementById("project-objectives");
  const progressLabel = document.getElementById("project-progress-label");
  const progressBar = document.getElementById("project-progress-bar");
  const galleryNode = document.getElementById("project-gallery");
  const videosNode = document.getElementById("project-videos");

  document.title = `ADEBAL | ${project.title}`;
  titleNode.textContent = project.title;
  descNode.textContent = project.description;
  categoryNode.textContent = project.category;
  budgetNode.textContent = project.budget;
  statusNode.textContent = project.status;
  statusTextNode.textContent = project.status;
  heroImageNode.src = project.heroImage;
  heroImageNode.alt = project.title;
  progressLabel.textContent = `${project.progress}%`;
  progressBar.dataset.progress = String(project.progress);

  objectivesNode.innerHTML = "";
  project.objectives.forEach((objective) => {
    const item = document.createElement("li");
    item.textContent = objective;
    objectivesNode.appendChild(item);
  });

  galleryNode.innerHTML = "";
  project.gallery.forEach((imageSrc, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-modal-image", imageSrc);

    const image = document.createElement("img");
    image.src = imageSrc;
    image.alt = `${project.title} - vue ${index + 1}`;
    button.appendChild(image);
    galleryNode.appendChild(button);
  });

  videosNode.innerHTML = "";
  project.videos.forEach((videoSrc) => {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    const source = document.createElement("source");
    source.src = videoSrc;
    source.type = "video/mp4";
    video.appendChild(source);
    videosNode.appendChild(video);
  });

  initModalGallery();
  initProgressBars();
}

setCurrentYear();
initProjectFilter();
renderProjectDetail();
initProgressBars();
initModalGallery();
initFormValidation();
