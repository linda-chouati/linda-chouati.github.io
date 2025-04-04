
//// partie projets 

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

const container = document.getElementById('projects-container');

projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
            </div>
            <div class="card-back">
                <p>${project.description}</p>
                <div class="tech-badges">
                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank">Voir le projet</a>
            </div>
        </div>
    `;
    container.appendChild(card);
});


/// partie compétences 

const skills = [
    { title: "Langages de Programmation", details: ["C/C++", "Java", "Python", "Netlogo"] },
    { title: "Machine Learning & Data Science", details: ["TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-Learn"] },
    { title: "Bases de Données", details: ["SQL", "MySQL", "Datalog", "Doctrine"] },
    { title: "Développement Web", details: ["JavaScript", "HTML", "CSS", "PHP", "Symfony", "Bootstrap"] },
    { title: "Développement Collaboratif", details: ["GitHub", "GitLab"] },
    { title: "Gestion de Projet", details: ["Méthodes Agiles", "Scrum"] },
    { title: "Qualités Personnelles", details: ["Curiosité", "Esprit d'équipe", "Autonomie", "Organisation"] },
    { title: "Langues", details: ["Français", "Anglais", "Allemand"] }
];

const timelineContainer = document.getElementById('skills-timeline');

skills.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    
    skillCard.innerHTML = `
        <div class="skill-content">
            <h3>${skill.title}</h3>
            <div class="skill-tags">
                ${skill.details.map(detail => `<span class="tag">${detail}</span>`).join('')}
            </div>
        </div>
    `;
    
    timelineContainer.appendChild(skillCard);
});

