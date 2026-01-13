// Project gallery data; swap the image placeholders with real work samples
const projectData = {
  branding: {
    title: "Logo and Branding Design",
    description:
      "A collection of logo marks, color palettes, and brand assets crafted for clients.",
    items: [
        { title: "Project 01", src: "photo/logo1.png" },
        { title: "Project 02", src: "photo/logo2.png" },
        { title: "Project 03", src: "photo/logo3.png" },
    ],
  },
  esports: {
    title: "E-Sports Jersey Design",
    description:
      "Competitive jersey mockups and sponsor-ready layouts tailored for teams.",
    items: [
      { title: "Project 01", src: "photo/esports1.jpg" },
      { title: "Project 02", src: "photo/esports2.jpg" },
      { title: "Project 03", src: "photo/esports3.jpg" },
    ],
  },
  oversized: {
    title: "Oversized Shirt Design",
    description:
      "Streetwear-inspired oversized tees featuring typography and graphic mashups.",
    items: [
      { title: "Project 01", src: "photo/oversized1.png" },
      { title: "Project 02", src: "photo/oversized2.png" },
      { title: "Project 03", src: "photo/oversized3.png" },
    ],
  },
};

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalGallery = document.getElementById("modal-gallery");
const closeBtn = document.querySelector(".modal-close");

document.querySelectorAll(".project-card").forEach((card) => {
  const projectKey = card.getAttribute("data-project");
  card.addEventListener("click", () => openModal(projectKey));
  card.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(projectKey);
    }
  });
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

function openModal(key) {
  const project = projectData[key];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalGallery.innerHTML = "";

  if (!project.items || project.items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "modal-empty";
    empty.textContent = "Add your designs here.";
    modalGallery.appendChild(empty);
  } else {
    project.items.forEach((item) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const caption = document.createElement("figcaption");

      img.src = item.src;
      img.alt = `${project.title} - ${item.title}`;
      caption.textContent = item.title;

      figure.appendChild(img);
      figure.appendChild(caption);
      modalGallery.appendChild(figure);
    });
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

// Generates a simple SVG placeholder so the gallery shows content even
// without uploaded assets. Replace these src values with your actual images.
function placeholder(label, color) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
    <defs>
      <style>
        .bg { fill: ${color}; }
        .txt { fill: #ffffff; font-size: 40px; font-family: "Segoe UI", Arial, sans-serif; font-weight: 700; }
      </style>
    </defs>
    <rect class='bg' width='800' height='600' rx='16' />
    <text class='txt' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
