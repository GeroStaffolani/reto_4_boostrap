document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, ''); // Remove spaces
        const securityCode = document.getElementById('security-code').value;
        const expirationDate = document.getElementById('expiration-date').value;

        let valid = true;
        let errorMessage = '';

        //Valida numero de tarjeta
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            valid = false;
            errorMessage += 'Número de tarjeta debe tener 16 dígitos.\n';
        }

        //Valida el codigo de seguridad
        if (securityCode.length !== 3 || isNaN(securityCode)) {
            valid = false;
            errorMessage += 'Código de seguridad debe tener 3 dígitos.\n';
        }

        //Valida la fecha de expiración
        const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expirationDatePattern.test(expirationDate)) {
            valid = false;
            errorMessage += 'Fecha de expiración debe estar en el formato MM/AA.\n';
        }

        if (valid) {
            alert('Pago realizado con éxito!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert(errorMessage);
        }
    });
});
