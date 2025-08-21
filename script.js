const projects = [
    {
        title: "Reconnaissance de Langage des Signes",
        image: "assets/langageSigne.png",
        description: "Développement d'un programme Deep Learning afin de traduire les lettres du langage des signes.",
        technologies: ["Python", "OpenCV", "Mediapipe"],
        link: "https://github.com/lindoushmim/Sign-Language-Recognition"
    },
    {
        title: "XAI - IA Explicable",
        image: "assets/xai.png",
        description: "Interface interactive pour visualiser et interpréter les réseaux de neurones grâce aux méthodes post-hoc de l'IA explicable.",
        technologies: ["Python", "Streamlit", "SHAP", "LIME"],
        link: "https://github.com/lindoushmim/Deep-Learning-Model-Interpretability-App"
    },
    {
        title: "Machine Learning",
        image: "assets/analyseDonnees.png",
        description: ".",
        technologies: ["Python", "Pandas", "Matplotlib"],
        link: "https://github.com/lindoushmim/donneePollution"
    },
    {
        title: "Labyrinthe du Trésor",
        image: "assets/jeuLabyrinthe.png",
        description: "Un jeu où l'aventurier doit explorer un labyrinthe et atteindre le trésor tout en évitant les pièges et gardiens.",
        technologies: ["C", "C++", "SDL"],
        link: "https://github.com/lindoushmim/LABYRINTHE-DU-TRESOR"
    },
    {
        title: "Application de Filtrage d'Image",
        image: "assets/analyseImage.png",
        description: "Application permettant d'appliquer divers filtres (médian, gaussien, etc.) et de manipuler des histogrammes.",
        technologies: ["C++", "wxWidgets", "OpenCV"],
        link: "https://github.com/lindoushmim/Image-Filtering-and-Histogram-Analysis-Tool"
    },
    {
        title: "Détection de Contours",
        image: "assets/edge.png",
        description: "Application détectant les contours d'une image avec des options de seuillage et filtrage.",
        technologies: ["C++", "OpenCV", "wxWidgets"],
        link: "https://github.com/lindoushmim/Image-Contour-Detection-Application"
    }, 
    {
        title: "Site de Danse",
        image: "assets/siteDanse.png",
        description: "Un site de gestion pour une école de danse avec gestion des inscriptions.",
        technologies: ["HTML", "CSS", "PHP", "MySQL"],
        link: "https://github.com/lindoushmim/siteDanse"
    },
    {
        title: "Sokoban",
        image: "assets/sokoban.png",
        description: "Un jeu de réflexion, où le joueur pousse des caisses pour atteindre les objectifs.",
        technologies: ["Java"],
        link: "https://github.com/lindoushmim/sokoban"
    }
];
// ------- rendering dynamique & filtres -------
(() => {
  const data = projects; // ton tableau existant

  const grid = document.getElementById('projectsGrid');
  const filtersWrap = document.getElementById('projFilters');
  const searchInput = document.getElementById('projSearch');

  // tags uniques (à partir des technologies)
  const tags = Array.from(new Set(data.flatMap(p => p.technologies))).sort();
  const active = { tag: 'Tous', q: '' };

  // UI filtres
  const makePill = (label) => {
    const b = document.createElement('button');
    b.className = 'pill' + (label==='Tous' ? ' is-active' : '');
    b.textContent = label;
    b.addEventListener('click', () => {
      active.tag = label;
      document.querySelectorAll('.pill').forEach(x=>x.classList.remove('is-active'));
      b.classList.add('is-active');
      render();
    });
    return b;
  };

  filtersWrap.appendChild(makePill('Tous'));
  tags.forEach(t => filtersWrap.appendChild(makePill(t)));

  searchInput.addEventListener('input', (e) => { active.q = e.target.value.trim().toLowerCase(); render(); });

  function passFilters(p){
    const byTag = (active.tag==='Tous') || p.technologies.includes(active.tag);
    const q = active.q;
    const bySearch = !q || (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.join(' ').toLowerCase().includes(q));
    return byTag && bySearch;
  }

  function card(p, idx){
    const li = document.createElement('article');
    li.className = 'project-card pro' + (idx===0 ? ' featured' : '');

    // cover
    const a = document.createElement('a');
    a.className = 'cover';
    a.href = p.link; a.target = '_blank'; a.rel = 'noreferrer';
    a.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <span class="cover-badge">Open source</span>
    `;
    li.appendChild(a);

    // body
    const body = document.createElement('div');
    body.className = 'body';
    body.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description || ''}</p>
    `;
    // chips
    const chips = document.createElement('div');
    chips.className = 'chips';
    (p.technologies||[]).forEach(t=>{
      const s = document.createElement('span'); s.className='chip'; s.textContent=t; chips.appendChild(s);
    });
    body.appendChild(chips);

    // actions
    const act = document.createElement('div'); act.className='actions';
    const code = document.createElement('a'); code.className='btn-sm'; code.textContent='Code'; code.href=p.link; code.target='_blank'; code.rel='noreferrer';
    act.appendChild(code);
    body.appendChild(act);

    li.appendChild(body);
    return li;
  }

  function render(){
    grid.innerHTML = '';
    data.filter(passFilters).forEach((p,i)=> grid.appendChild(card(p,i)));
  }

  render();
})();