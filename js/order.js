// Inicializar Ícones Lucide
lucide.createIcons();

const modalContainer = document.getElementById('modal-container');
const mainWrapper = document.getElementById('main-wrapper');
const formFields = document.getElementById('form-fields');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const dynamicForm = document.getElementById('dynamic-form');

// Configurações Dinâmicas dos Formulários
const configs = {
    projeto: {
        title: "Briefing",
        subtitle: "Project Initialization Protocol",
        fields: [
            { id: 'name', type: 'text', placeholder: 'Full Name' },
            { id: 'contact', type: 'text', placeholder: 'WhatsApp / Telegram' },
            { id: 'email', type: 'email', placeholder: 'Institutional Email ou Pessoal' },
            { id: 'idea', type: 'textarea', placeholder: 'Project Vision / Core Objectives' }
        ]
    },
    trainee: {
        title: "Trainee",
        subtitle: "Partnership & Growth Protocol",
        fields: [
            { id: 'name', type: 'text', placeholder: 'Full Name' },
            { id: 'portfolio', type: 'url', placeholder: 'Portfolio / GitHub Link' },
            { id: 'expertise', type: 'text', placeholder: 'Core Stack (Ex: Java, React, UX)' },
            { id: 'motivation', type: 'textarea', placeholder: 'Personal Objectives & Vision' }
        ]
    }
};

// Abrir Modal
function openModal(type) {
    const config = configs[type];
    modalTitle.innerText = config.title;
    modalSubtitle.innerText = config.subtitle;
    formFields.innerHTML = '';

    config.fields.forEach(f => {
        const input = f.type === 'textarea' 
            ? `<textarea id="${f.id}" placeholder="${f.placeholder}" class="input-bw" style="min-height: 120px;"></textarea>`
            : `<input type="${f.type}" id="${f.id}" placeholder="${f.placeholder}" class="input-bw">`;
        formFields.innerHTML += input;
    });

    modalContainer.classList.remove('hidden');
    mainWrapper.classList.add('blur-active');
    document.body.style.overflow = 'hidden';
}

// Fechar Modal
function closeModal() {
    modalContainer.classList.add('hidden');
    mainWrapper.classList.remove('blur-active');
    document.body.style.overflow = 'auto';
}

// Lógica de Scroll do Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('bg-black/90', 'backdrop-blur-md', 'h-16');
    } else {
        header.classList.remove('bg-black/90', 'backdrop-blur-md', 'h-16');
    }
});

// Validação e Envio (Exemplo de Sucesso)
dynamicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = dynamicForm.querySelectorAll('.input-bw');
    let valid = true;

    inputs.forEach(i => {
        if (i.value.trim() === "") {
            i.style.borderColor = "#7f1d1d"; // Dark red para erro no P&B
            valid = false;
        } else {
            i.style.borderColor = "";
        }
    });

    if (valid) {
        alert('DATA TRANSMITTED SUCCESSFULLY.');
        closeModal();
        dynamicForm.reset();
    }
});

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80; // Quantidade de partículas

// Ajusta o tamanho do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Objeto Partícula
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebater nas bordas
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inicializar
function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Desenhar linhas entre partículas próximas
function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connect();
    requestAnimationFrame(animate);
}

init();
animate();

/* --- LÓGICA DO MODAL DE VISÃO (UUP ENGINEERING) --- */

const visionModal = document.getElementById('vision-modal');

// Função para Abrir a Visão
function openVision() {
    if (visionModal) {
        visionModal.classList.remove('hidden');
        mainWrapper.classList.add('blur-active'); // Ativa o desfoque de fundo
        document.body.style.overflow = 'hidden'; // Trava o scroll do site
    }
}

// Função para Fechar a Visão
function closeVision() {
    if (visionModal) {
        visionModal.classList.add('hidden');
        mainWrapper.classList.remove('blur-active'); // Remove o desfoque
        document.body.style.overflow = 'auto'; // Libera o scroll
    }
}

// Atalho: Fechar se o usuário apertar a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVision();
});

// Atalho: Fechar se o usuário clicar no fundo escuro (fora da caixa)
visionModal.addEventListener('click', (e) => {
    if (e.target === visionModal) closeVision();
});
