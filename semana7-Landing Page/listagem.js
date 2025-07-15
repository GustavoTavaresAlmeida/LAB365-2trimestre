document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('user-email').textContent = userEmail;

    const btnLogout = document.getElementById('btn-logout');
    const searchInput = document.getElementById('search-input');
    const btnSearch = document.getElementById('btn-search');
    const parceiroContainer = document.getElementById('parceiros-container');
    const loading = document.getElementById('loading');

    let allParceiros = [];

    btnLogout.addEventListener('click', function() {
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    });

    function getAvatarClass(tipo) {
        switch(tipo) {
            case 'ECO': return 'eco';
            case 'COO': return 'coo';
            case 'PEV': return 'pev';
            default: return 'eco';
        }
    }

    function getTipoDescricao(tipo) {
        switch(tipo) {
            case 'ECO': return 'Ecoponto';
            case 'COO': return 'Cooperativa';
            case 'PEV': return 'Ponto de Entrega Voluntária';
            default: return tipo;
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    function createParceiroCard(parceiro) {
        const card = document.createElement('div');
        card.className = 'parceiro-card';
        card.onclick = () => {
            window.location.href = `detalhes.html?id=${parceiro.id}`;
        };

        card.innerHTML = `
            <div class="card-header">
                <div class="avatar ${getAvatarClass(parceiro.tipoParceiro)}">
                    ${parceiro.tipoParceiro}
                </div>
                <div class="card-content">
                    <h3>${parceiro.nomeParceiro}</h3>
                    <p><strong>Tipo:</strong> ${getTipoDescricao(parceiro.tipoParceiro)}</p>
                    <p><strong>Bairro:</strong> ${parceiro.bairro}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="date-info">
                    Cadastrado em: ${formatDate(parceiro.createdAt)}
                </div>
            </div>
        `;

        return card;
    }

    function displayParceiros(parceiros) {
        parceiroContainer.innerHTML = '';
        
        if (parceiros.length === 0) {
            parceiroContainer.innerHTML = `
                <div class="no-results">
                    <img src="https://via.placeholder.com/100x100/ccc/999?text=?" alt="Nenhum resultado">
                    <p>Nenhum parceiro encontrado.</p>
                </div>
            `;
            return;
        }

        parceiros.forEach(parceiro => {
            const card = createParceiroCard(parceiro);
            parceiroContainer.appendChild(card);
        });
    }

    function filterParceiros(searchTerm) {
        const filtered = allParceiros.filter(parceiro => {
            const nome = parceiro.nomeParceiro.toLowerCase();
            const bairro = parceiro.bairro.toLowerCase();
            const term = searchTerm.toLowerCase();
            
            return nome.includes(term) || bairro.includes(term);
        });
        
        displayParceiros(filtered);
    }

    btnSearch.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        filterParceiros(searchTerm);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            filterParceiros(searchTerm);
        }
    });

    searchInput.addEventListener('input', function() {
        if (searchInput.value.trim() === '') {
            displayParceiros(allParceiros);
        }
    });

    async function loadParceiros() {
        try {
            loading.style.display = 'block';
            
            const response = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros');
            
            if (!response.ok) {
                throw new Error('Erro ao carregar parceiros');
            }
            
            allParceiros = await response.json();
            displayParceiros(allParceiros);
            
        } catch (error) {
            console.error('Erro:', error);
            parceiroContainer.innerHTML = `
                <div class="no-results">
                    <p>Erro ao carregar parceiros. Tente novamente mais tarde.</p>
                </div>
            `;
        } finally {
            loading.style.display = 'none';
        }
    }

    loadParceiros();
});