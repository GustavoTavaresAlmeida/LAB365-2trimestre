document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnEntrar = document.getElementById('btn-entrar');

    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (email && password) {
            btnEntrar.disabled = false;
        } else {
            btnEntrar.disabled = true;
        }
    }

    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        localStorage.setItem('userEmail', email);
        
        window.location.href = 'listagem.html';
    });
});