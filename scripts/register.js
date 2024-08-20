document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (existingUsers.some(user => user.username === username)) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }

    existingUsers.push({ username, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registro exitoso.');
    window.location.href = '/login.html';
});
