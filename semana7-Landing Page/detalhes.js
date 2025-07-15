document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        window.location.href = 'login.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const parceiroId = urlParams.get('id');

    if (!parceiroId) {
        window.location.href = 'listagem.html';
        return;
    }

    const btnVoltar = document.getElementById('btn-voltar');
    const btnLogout = document.getElementById('btn-logout');
    const loading = document.getElementById('loading');
    const detalhesContainer = document.getElementById('parceiro-detalhes');

    btnVoltar.addEventListener('click', function() {
        window.location.href = 'listagem.html';
    });

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

    function getResiduosAceitos(parceiro) {
        const residuos = [
            { key: 'papel', name: 'Papel', icon: '📄' },
            { key: 'plastico', name: 'Plástico', icon: '🥤' },
            { key: 'vidro', name: 'Vidro', icon: '🍶' },
            { key: 'metal', name: 'Metal', icon: '🥫' },
            { key: 'oleoCozinha', name: 'Óleo de Cozinha', icon: '🛢️' },
            { key: 'pilhaBateria', name: 'Pilhas e Baterias', icon: '🔋' },
            { key: 'eletronico', name: 'Eletrônicos', icon: '📱' },
            { key: 'roupa', name: 'Roupas', icon: '👕' },
            { key: 'outros', name: 'Outros', icon: '📦' }
        ];

        return residuos.map(residuo => ({
            ...residuo,
            aceito: parceiro[residuo.key] === true
        }));
    }

    function createParceiroDetails(parceiro) {
        const residuos = getResiduosAceitos(parceiro);
        const residuosHtml = residuos.map(residuo => `
            <div class="residuo-item ${residuo.aceito ? 'aceito' : 'nao-aceito'}">
                <span>${residuo.icon}</span>
                <p>${residuo.name}</p>
            </div>
        `).join('');

        return `
            <div class="header-section">
                <div class="avatar-large ${getAvatarClass(parceiro.tipoParceiro)}">
                    ${parceiro.tipoParceiro}
                </div>
                <h2>${parceiro.nomeParceiro}</h2>
                <p>${getTipoDescricao(parceiro.tipoParceiro)}</p>
            </div>
            
            <div class="details-section">
                <div class="detail-row">
                    <div class="detail-item">
                        <h3>Data de Cadastro</h3>
                        <p class="value">${formatDate(parceiro.createdAt)}</p>
                    </div>
                    <div class="detail-item">
                        <h3>Responsável</h3>
                        <p class="value">${parceiro.responsavelParceiro}</p>
                    </div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-item">
                        <h3>Telefone</h3>
                        <p class="value">${parceiro.telResponsavel}</p>
                    </div>
                    <div class="detail-item">
                        <h3>E-mail</h3>
                        <p class="value">${parceiro.emailResponsavel}</p>
                    </div>
                </div>
                
                <div class="address-section">
                    <h3>Endereço</h3>
                    <div class="address-grid">
                        <div class="address-item">
                            <h4>Rua</h4>
                            <p>${parceiro.rua}</p>
                        </div>
                        <div class="address-item">
                            <h4>Número</h4>
                            <p>${parceiro.numero}</p>
                        </div>
                        <div class="address-item">
                            <h4>Bairro</h4>
                            <p>${parceiro.bairro}</p>
                        </div>
                    </div>
                </div>
                
                <div class="residuos-section">
                    <h3>Tipos de Resíduos Aceitos</h3>
                    <div class="residuos-grid">
                        ${residuosHtml}
                    </div>
                </div>
            </div>
        `;
    }

    async function loadParceiroDetails() {
        try {
            loading.style.display = 'block';
            
            const response = await fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${parceiroId}`);
            
            if (!response.ok) {
                throw new Error('Parceiro não encontrado');
            }
            
            const parceiro = await response.json();
            detalhesContainer.innerHTML = createParceiroDetails(parceiro);
            
        } catch (error) {
            console.error('Erro:', error);
            detalhesContainer.innerHTML = `
                <div class="error-message">
                    <img src="https://via.placeholder.com/100x100/ccc/999?text=!" alt="Erro">
                    <p>Erro ao carregar detalhes do parceiro.</p>
                    <button onclick="window.location.href='listagem.html'" class="btn-secondary">Voltar à listagem</button>
                </div>
            `;
        } finally {
            loading.style.display = 'none';
        }
    }

    loadParceiroDetails();
});