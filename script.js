// =======================
// Données projets
// =======================

const projects = [
  // ---- projet affichés par défaut ----
  {
    title: "Reconnaissance de Langage des Signes",
    image: "assets/langageSigne.png",
    description: "Un programme qui traduit l'alphabet du langage des signes en lettres, en temps réel.",
    technologies: ["Python", "OpenCV", "Mediapipe", , "Computer Vision"],
    link: "https://github.com/lindoushmim/Sign-Language-Recognition",
    featured: true
  },
  {
    title: "XAI - IA Explicable",
    image: "assets/xai.png",
    description: "Une interface d’expérimentation : charger un modèle, simuler, et explorer les explications visuelles.",
    technologies: ["Python", "Streamlit", "XAI", "SHAP", "LIME"],
    link: "https://github.com/lindoushmim/Deep-Learning-Model-Interpretability-App",
    featured: true
  },
  {
    title: "NLP — Détection d’émotions (RNN)",
    image: "assets/emotion.png", 
    description: "Détection d’émotions dans des textes à l’aide d’un RNN (NLP).",
    technologies: ["Python", "NLP", "RNN"],
    featured: true,
    imageFit: "contain"  
  },
  {
    title: "Itinéraires & Émissions CO₂",
    image: "assets/app_co2.png", 
    description: "Planificateur multi-modes (voiture, vélo, marche) avec durée, distance et estimation des émissions de CO₂.",
    technologies: ["GraphQL", "Java", "Spring Boot", "Web App"],
    link: "https://github.com/linda-chouati/Application-web-de-calcul-d-itin-raires-et-d-missions-de-CO-", 
    featured: true
  },
  {
    title: "Admissibilty ",
    image: "assets/hc_categorizer.png",
    description: "Une application Python pour visualiser l’espace d’acceptabilité d’un cadre argumentatif.",
    technologies: ["Python", "Streamlit", "Argumentation", "Visualization"],
    link: "https://github.com/linda-chouati/acceptability-degree",
    featured: true
  },
  {
    title: "Détection de Contours",
    image: "assets/edge.png",
    description: "Application détectant les contours d'une image avec des options de seuillage et filtrage.",
    technologies: ["C++", "OpenCV", "wxWidgets", "Computer Vision"],
    link: "https://github.com/lindoushmim/Image-Contour-Detection-Application",
    featured: true
  },

  // ---- Le reste des projets : ceux pas affichés des le depart ----
  {
    title: "Labyrinthe du Trésor",
    image: "assets/jeuLabyrinthe.png",
    description: "Un jeu où l'aventurier doit explorer un labyrinthe et atteindre le trésor tout en évitant les pièges et gardiens.",
    technologies: ["C", "C++", "SDL"],
    link: "https://github.com/lindoushmim/LABYRINTHE-DU-TRESOR",
    imageFit: "contain"  
  },
  {
    title: "Framework ABA — Génération d’arguments",
    image: "assets/aba.png",
    description: "Une application web qui génère automatiquement les arguments et attaques d’un cadre ABA à partir d’un langage et de règles définies par l’utilisateur.",
    technologies: ["Python", "Web App", "ABA", "Argumentation"],
    link: "https://github.com/linda-chouati/aba_app",
    featured: false
  },
  {
    title: "Application de Filtrage d'Image",
    image: "assets/analyseImage.png",
    description: "Application permettant d'appliquer divers filtres (médian, gaussien, etc.) et de manipuler des histogrammes.",
    technologies: ["C++", "OpenCV", "wxWidgets", "Computer Vision"],
    link: "https://github.com/lindoushmim/Image-Filtering-and-Histogram-Analysis-Tool"
  },
  {
    title: "Site de Danse",
    image: "assets/siteDanse.png",
    description: "Un page web pour une école de danse avec gestion des inscriptions.",
    technologies: ["HTML", "CSS", "PHP", "MySQL"],
    link: "https://github.com/lindoushmim/siteDanse"
  },
  {
    title: "Sokoban",
    image: "assets/sokoban.png",
    description: "Un jeu de réflexion, où le joueur pousse des caisses pour atteindre les objectifs.",
    technologies: ["Java"],
    link: "https://github.com/linda-chouati/sukoban"
  }

];


// =======================
// Rendu dynamique & filtres
// =======================

(() => {
  const data = projects;

  const grid        = document.getElementById('projectsGrid');
  const filtersWrap = document.getElementById('projFilters'); 
  const searchInput = document.getElementById('projSearch');
  const showAllBtn  = document.getElementById('showAllBtn');

  // --- 1) Compter les tags et trier par fréquence ---
  const counts = {};
  data.forEach(p => (p.technologies || []).forEach(t => {
    counts[t] = (counts[t] || 0) + 1;
  }));
  const tagsSorted = Object.entries(counts)
    .sort((a,b) => b[1] - a[1])
    .map(([t]) => t);

  // tags à garder toujours visibles par défaut
  const fixedPrimary = ["Python", "C++", "Java", "PyTorch"];

  // séparer les tags en deux listes
  const primaryTags = fixedPrimary.filter(t => tagsSorted.includes(t));
  const extraTags = tagsSorted.filter(t => !fixedPrimary.includes(t));

  // --- 2) État (aucun tag sélectionné au chargement) ---
  const active = { tag: null, q: '', showAll: false };

  // --- 3) Construire la ligne de pills + le bouton Plus/Moins séparé ---
  //    -> on transforme #projFilters en barre de pills
  filtersWrap.classList.add('pill-bar');

  // conteneur pour le bouton "Plus/Moins" sur une ligne séparée
  const moreBar = document.createElement('div');
  moreBar.className = 'more-bar';
  filtersWrap.insertAdjacentElement('afterend', moreBar);

  // zone cachée qui contiendra les tags "extra"
  const extrasWrap = document.createElement('div');
  extrasWrap.className = 'pill-bar';
  extrasWrap.style.display = 'none';
  moreBar.insertAdjacentElement('afterend', extrasWrap);

  // fabrique un pill
  const makePill = (label) => {
    const b = document.createElement('button');
    b.className = 'pill' + (label === active.tag ? ' is-active' : '');
    b.textContent = label;
    b.addEventListener('click', () => {
      active.tag = (active.tag === label) ? null : label; // désélection
      document.querySelectorAll('.pill').forEach(x => x.classList.remove('is-active'));
      if (active.tag) b.classList.add('is-active');
      render();
    });
    return b;
  };

  // injecter les tags fréquents
  primaryTags.forEach(t => filtersWrap.appendChild(makePill(t)));

  // bouton Plus / Moins (séparé des pills)
  if (extraTags.length) {
    const moreBtn = document.createElement('button');
    moreBtn.className = 'more-btn';
    moreBtn.textContent = 'Plus';
    moreBtn.setAttribute('aria-expanded', 'false');
    moreBar.appendChild(moreBtn);

    extraTags.forEach(t => extrasWrap.appendChild(makePill(t)));

    moreBtn.addEventListener('click', () => {
      const open = extrasWrap.style.display === 'flex' || extrasWrap.style.display === 'inline-flex';
      extrasWrap.style.display = open ? 'none' : 'flex';
      moreBtn.textContent = open ? 'Plus' : 'Moins';
      moreBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // --- 4) Recherche ---
  searchInput.addEventListener('input', (e) => {
      active.q = e.target.value.trim().toLowerCase();
      render();
    });

    showAllBtn.addEventListener('click', () => {
      active.showAll = !active.showAll;
      render();
    });


  // --- 5) Filtrage & rendu ---
  function passFilters(p){
    const byTag = !active.tag || (p.technologies || []).includes(active.tag);
    const q = active.q;
    const bySearch = !q || (
      p.title.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.technologies || []).join(' ').toLowerCase().includes(q)
    );
    return byTag && bySearch;
  }

  function card(p, idx){
    const li = document.createElement('article');
    li.className = 'project-card pro';

    const cover = document.createElement(p.link ? 'a' : 'div');
    cover.className = 'cover';
    if (p.link) { cover.href = p.link; cover.target = '_blank'; cover.rel = 'noreferrer'; }
    const fit = (p.imageFit === 'contain') ? 'contain' : 'cover';
    cover.innerHTML = `<img src="${p.image}" alt="${p.title}" style="object-fit:${fit};background:#f9f9f9;">`;

    li.appendChild(cover);

    const body = document.createElement('div');
    body.className = 'body';
    body.innerHTML = `<h3>${p.title}</h3><p>${p.description || ''}</p>`;

    const chips = document.createElement('div');
    chips.className = 'chips';
    (p.technologies || []).forEach(t => {
      const s = document.createElement('span'); s.className = 'chip'; s.textContent = t; chips.appendChild(s);
    });
    body.appendChild(chips);

    const act = document.createElement('div'); act.className = 'actions';
    if (p.link) {
      const code = document.createElement('a');
      code.className = 'btn-sm';
      code.textContent = 'Code';
      code.href = p.link; code.target = '_blank'; code.rel = 'noreferrer';
      act.appendChild(code);
    }
    body.appendChild(act);

    li.appendChild(body);
    return li;
  }

  function render(){
    grid.innerHTML = '';
    const oldTip = grid.parentElement.querySelector('.projects-tip');
    if (oldTip) oldTip.remove();

    const filtered = data.filter(passFilters);

    const showFeaturedOnly = (!active.tag && !active.q && !active.showAll);
    const toShow = showFeaturedOnly ? filtered.filter(p => p.featured) : filtered;

    showAllBtn.textContent = active.showAll ? 'Réduire (6 projets)' : 'Afficher tous les projets';

    toShow.forEach((p,i)=> grid.appendChild(card(p,i)));
  }

  render();
})();



// =======================
// Burger menu responsive
// =======================
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }
});
