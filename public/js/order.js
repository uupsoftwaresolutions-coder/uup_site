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
/* --- FUNÇÃO DE TRANSMISSÃO DE FORMULÁRIO (UUP ENGINEERING) --- */

dynamicForm.addEventListener('submit', function(e) {
    // 1. IMPEDE O RECARREGAMENTO DA PÁGINA (Fundamental para o modal não travar)
    e.preventDefault();

    // 2. VALIDAÇÃO DE CAMPOS (Assumindo que sua lógica de validação defina allValid)
    // Se você não tiver uma variável allValid, pode remover o 'if' e deixar o código correr
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    if (nameInput.value && emailInput.value) {
        
        // 3. CAPTURA DOS DADOS DO DOM
        const formData = {
            tipo: modalTitle.innerText.includes("Briefing") ? "projeto" : "trainee",
            nome: nameInput.value,
            email: emailInput.value,
            contato: document.getElementById('contact')?.value || document.getElementById('portfolio')?.value || "Não informado",
            mensagem: document.getElementById('idea')?.value || document.getElementById('motivation')?.value || "Sem mensagem"
        };

        // 4. FEEDBACK VISUAL NO BOTÃO
        const submitBtn = dynamicForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "TRANSMITTING...";
        submitBtn.disabled = true;

        // 5. DISPARO PARA A API (VERCEL SERVERLESS)
        fetch('/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // SUCESSO NA TRANSMISSÃO
                alert('TRANSMISSION SUCCESSFUL. DATA LOGGED.');
                
                // LIMPA O FORMULÁRIO
                dynamicForm.reset(); 
                
                // FECHA O MODAL (Certifique-se que o ID coincida com seu HTML)
                closeModal(); 
            } else {
                // ERRO DE SERVIDOR (Ex: API fora do ar ou erro no Resend)
                throw new Error('SERVER_RESPONSE_ERROR');
            }
        })
        .catch(error => {
            // ERRO DE REDE OU EXECUÇÃO
            console.error('Critical Error:', error);
            alert('TRANSMISSION FAILED. CHECK CONNECTION.');
        })
        .finally(() => {
            // RESTAURA O BOTÃO PARA O ESTADO ORIGINAL
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    } else {
        alert('PLEASE FILL ALL MANDATORY FIELDS.');
    }
});

/* --- FUNÇÃO AUXILIAR PARA FECHAR O MODAL --- */
function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
        modalContainer.classList.add('hidden'); // Esconde o modal
        document.body.style.overflow = 'auto';  // Libera o scroll do site
        
        // Se você usa o efeito de desfoque no fundo:
        if (typeof mainWrapper !== 'undefined') {
            mainWrapper.classList.remove('blur-active');
        }
    }
}

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

const wppButton = document.getElementById("draggable-wpp");

let isDragging = false;
let offsetX, offsetY;

wppButton.addEventListener("mousedown", (e) => {
    isDragging = true;
    // Calcula a distância do clique em relação à borda do botão
    offsetX = e.clientX - wppButton.getBoundingClientRect().left;
    offsetY = e.clientY - wppButton.getBoundingClientRect().top;
    wppButton.style.transition = "none"; // Remove transição durante o arraste
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Define a nova posição baseada no mouse
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Aplica a posição
    wppButton.style.left = `${x}px`;
    wppButton.style.top = `${y}px`;
    wppButton.style.bottom = "auto";
    wppButton.style.right = "auto";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    wppButton.style.transition = "all 0.3s ease"; // Devolve a suavidade
});

// Suporte para Touch (Mobile)
wppButton.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - wppButton.getBoundingClientRect().left;
    offsetY = touch.clientY - wppButton.getBoundingClientRect().top;
});

document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    let x = touch.clientX - offsetX;
    let y = touch.clientY - offsetY;

    wppButton.style.left = `${x}px`;
    wppButton.style.top = `${y}px`;
});

document.addEventListener("touchend", () => {
    isDragging = false;
});