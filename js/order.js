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
