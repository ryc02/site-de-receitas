// Dados das receitas
const receitas = {
    "Bolo de Chocolate": {
        categoria: "sobremesas",
        tempo: "45 min",
        porcoes: "8",
        dificuldade: "Fácil",
        ingredientes: [
            "2 xícaras de farinha de trigo",
            "1 xícara de açúcar",
            "1 xícara de chocolate em pó",
            "1 colher de sopa de fermento em pó",
            "3 ovos",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "1 colher de chá de essência de baunilha"
        ],
        modoPreparo: [
            "Pré-aqueça o forno a 180°C",
            "Em uma tigela, misture a farinha, o açúcar, o chocolate em pó e o fermento",
            "Adicione os ovos, o leite, o óleo e a baunilha, misturando bem",
            "Despeje a massa em uma forma untada e enfarinhada",
            "Asse por 30-35 minutos ou até que um palito saia limpo",
            "Deixe esfriar antes de servir"
        ]
    },
    "Lasanha à Bolonhesa": {
        categoria: "massas",
        tempo: "1h 30min",
        porcoes: "6",
        dificuldade: "Médio",
        ingredientes: [
            "500g de massa para lasanha",
            "500g de carne moída",
            "1 cebola picada",
            "2 dentes de alho picados",
            "1 lata de molho de tomate",
            "200g de queijo mussarela ralado",
            "100g de queijo parmesão ralado",
            "Sal e pimenta a gosto",
            "Azeite para refogar"
        ],
        modoPreparo: [
            "Refogue a cebola e o alho no azeite",
            "Adicione a carne moída e cozinhe até dourar",
            "Acrescente o molho de tomate, sal e pimenta",
            "Em uma forma, faça camadas alternadas de massa, molho e queijo",
            "Finalize com queijo por cima",
            "Asse em forno preaquecido a 180°C por 30 minutos"
        ]
    },
    "Salada Caesar": {
        categoria: "vegetariano",
        tempo: "20 min",
        porcoes: "4",
        dificuldade: "Fácil",
        ingredientes: [
            "1 alface romana",
            "100g de queijo parmesão ralado",
            "100g de croutons",
            "2 colheres de sopa de suco de limão",
            "1 colher de chá de mostarda",
            "1 dente de alho picado",
            "1/2 xícara de azeite",
            "Sal e pimenta a gosto"
        ],
        modoPreparo: [
            "Lave e rasgue as folhas de alface",
            "Em uma tigela pequena, misture o suco de limão, mostarda e alho",
            "Adicione o azeite aos poucos, mexendo sempre",
            "Tempere com sal e pimenta",
            "Misture a alface com o molho",
            "Polvilhe com queijo parmesão e croutons"
        ]
    }
};

// Função para filtrar receitas
function filtrarReceitas(termo) {
    const cards = document.querySelectorAll('.recipe-card');
    const termoLower = termo.toLowerCase();

    cards.forEach(card => {
        const titulo = card.querySelector('h3').textContent.toLowerCase();
        const descricao = card.querySelector('p').textContent.toLowerCase();
        
        if (titulo.includes(termoLower) || descricao.includes(termoLower)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para mostrar detalhes da receita
function mostrarDetalhesReceita(card) {
    const titulo = card.querySelector('h3').textContent;
    const receita = receitas[titulo];
    
    // Criar modal com detalhes da receita
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${titulo}</h2>
            <div class="modal-meta">
                <span><i class="fas fa-clock"></i> ${receita.tempo}</span>
                <span><i class="fas fa-utensils"></i> ${receita.porcoes} porções</span>
                <span class="difficulty ${receita.dificuldade.toLowerCase()}">${receita.dificuldade}</span>
            </div>
            <div class="ingredientes">
                <h3>Ingredientes</h3>
                <ul>
                    ${receita.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                </ul>
            </div>
            <div class="modo-preparo">
                <h3>Modo de Preparo</h3>
                <ol>
                    ${receita.modoPreparo.map(passo => `<li>${passo}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Fechar modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
        modal.remove();
    }

    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    }
}

// Função para filtrar por categoria
function filtrarPorCategoria(categoria) {
    const cards = document.querySelectorAll('.recipe-card');
    
    cards.forEach(card => {
        if (categoria === 'todos' || card.dataset.categoria === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Barra de busca
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('input', function() {
        filtrarReceitas(this.value);
    });

    // Botões "Ver Receita"
    const viewButtons = document.querySelectorAll('.view-recipe');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.recipe-card');
            mostrarDetalhesReceita(card);
        });
    });

    // Cards de categoria
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoria = this.dataset.categoria;
            filtrarPorCategoria(categoria);
        });
    });

    // Adicionar animação de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 