
const chatBox = document.getElementById('chat-box');
const chatbot = document.querySelector('.chatbot-floating');
const minimizeBtn = document.querySelector('.minimize-btn');

const info = {
    "nom": "Salim Athimni",
    "poste": "Étudiant en 3ème année Licence Sciences Informatiques, spécialisé Génie Logiciel",
    "formation": "Licence en Sciences Informatiques – Génie Logiciel à l’Université de Gabès, Institut Supérieur d’Informatique de Médenine. Baccalauréat en Sciences Informatiques au Lycée de Bardo.",
    "email": "salim.athimni@gmail.com",
    "téléphone": "+216 90 335 581",
    "adresse": "Tunis, Tunisie",
    "front-end": "HTML5, CSS3, JavaScript, React, Angular, TypeScript",
    "back-end": "Python, Java, PHP/Laravel, C#/.NET Core, Node.js, SQL Server, MongoDB",
    "devops": "Git, GitHub, Docker, Agile/Scrum, Azure",
    "ai": "Data Science, Deep Learning, Machine Learning, Cloud AI, Analyse de données",
    "education": "Licence Sciences Informatiques - Génie Logiciel, Développement Web & Applications, Data Science, Linux, DevOps",
    "languages": "Arabe (langue maternelle), Français (courant), Anglais (intermédiaire), Allemand (débutant)",
    "projects": "Application de gestion de Transport (React/Node.js),............",
    "permis": "Permis de conduire Catégorie B, Scrum Foundation, .............................",
    "experience": "..............................",
    "skills": "Front-end (HTML5, CSS3, JS, React, Angular), Back-end (Python, Java, PHP, .NET), DevOps (Git, Docker, Cloud), AI (Data Science, Machine Learning)"
};

const keywords = {
    "nom": ["nom","qui","toi","présente","salim","personne"],
    "poste": ["poste","travail","métier","profession","occupation"],
    "formation": ["formation","études","université","licence","diplôme","bac"],
    "email": ["email","mail","courriel","contact","adresse mail"],
    "téléphone": ["téléphone","numéro","contact","tél","portable"],
    "adresse": ["adresse","habite","localisation","ville","tunis"],
    "front-end": ["front","html","css","javascript","react","angular","tailwind","typescript","interface"],
    "back-end": ["back","python","java","php","node","sql","mongodb","net","base de données","serveur"],
    "devops": ["devops","git","docker","cloud","scrum","agile","aws","azure","déploiement"],
    "ai": ["ai","data","machine","learning","deep","cloud","intelligence","artificielle","analyse"],
    "education": ["formation","éducation","cours","certification","diplôme"],
    "languages": ["langue","arabic","français","anglais","allemand","bilingue","parle"],
    "projects": ["projet","portfolio","photos","github","drive","réalisations"],
    "permis": ["permis","driver","conduire","certification","certificat"],
    "experience": ["expérience","stage","freelance","travail","professionnel","emploi"],
    "skills": ["compétence","skills","savoir","capacité","aptitude","technique"]
};

function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    // Afficher message utilisateur
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    const textLower = text.toLowerCase();
    let response = "Désolé, je n'ai pas cette information. Vous pouvez me poser des questions sur le parcours, les compétences ou l'expérience de Salim.";

    // Chercher correspondance dans keywords
    let found = false;
    for (let key in keywords) {
    if (keywords[key].some(word => textLower.includes(word))) {
        if (info[key]) {
        response = info[key];
        found = true;
        break;
        }
    }
    }

    // Réponses personnalisées pour certaines questions
    if (!found) {
    if (textLower.includes("bonjour") || textLower.includes("salut") || textLower.includes("hello")) {
        response = "Bonjour ! Je suis l'assistant de Salim. Comment puis-je vous aider ?";
    } else if (textLower.includes("merci")) {
        response = "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    } else if (textLower.includes("âge") || textLower.includes("vie")) {
        response = "Salim a 21 ans et est né en Tunisie.";
    } else if (textLower.includes("disponible") || textLower.includes("embauche")) {
        response = "Salim est disponible pour des stages ou opportunités en développement Full Stack ou IA. Vous pouvez le contacter par email ou téléphone.";
    }
    }

    // Afficher réponse bot avec un léger délai pour un effet plus naturel
    setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.textContent = response;
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = '';
}

// Permettre d'envoyer un message avec la touche Entrée
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
    sendMessage();
    }
});

// Minimiser/déminimiser le chatbot
minimizeBtn.addEventListener('click', function() {
    chatbot.classList.toggle('minimized');
    if (chatbot.classList.contains('minimized')) {
    minimizeBtn.className = 'fas fa-plus minimize-btn';
    } else {
    minimizeBtn.className = 'fas fa-minus minimize-btn';
    }
});

// Animation des barres de compétences au défilement
function animateSkills() {
    const skills = document.querySelectorAll('.skill-bar div');
    skills.forEach(skill => {
    const width = skill.style.width;
    skill.style.width = '0';
    setTimeout(() => {
        skill.style.width = width;
    }, 100);
    });
}

// Observer pour animer les compétences lorsqu'elles deviennent visibles
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.skills'));
