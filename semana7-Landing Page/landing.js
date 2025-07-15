document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-cadastro');
    const btnCadastrar = document.getElementById('cadastrar-parceiro');
    const closeModal = document.querySelector('.close');
    const form = document.getElementById('form-parceiro');

    btnCadastrar.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            nomeParceiro: formData.get('nomeParceiro'),
            tipoParceiro: formData.get('tipoParceiro'),
            responsavelParceiro: formData.get('responsavelParceiro'),
            telResponsavel: formData.get('telResponsavel'),
            emailResponsavel: formData.get('emailResponsavel'),
            rua: formData.get('rua'),
            numero: parseInt(formData.get('numero')),
            bairro: formData.get('bairro'),
            papel: formData.get('papel') === 'on',
            plastico: formData.get('plastico') === 'on',
            vidro: formData.get('vidro') === 'on',
            metal: formData.get('metal') === 'on',
            oleoCozinha: formData.get('oleoCozinha') === 'on',
            pilhaBateria: formData.get('pilhaBateria') === 'on',
            eletronico: formData.get('eletronico') === 'on',
            roupa: formData.get('roupa') === 'on',
            outros: formData.get('outros') === 'on'
        };

        fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            window.alert('Dados enviados com sucesso!');
            form.reset();
            modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Erro:', error);
            window.alert('Erro ao enviar dados. Tente novamente.');
        });
    });
});