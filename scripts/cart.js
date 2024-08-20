document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    //Verifica si hay productos en el carrito
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    //Actualiza Carrito
    const updateCartDisplay = () => {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <div>
                    <h5>${item.name}</h5>
                    <p>Precio: $${item.price.toFixed(2)}</p>
                    <p>Talle: ${item.size}</p>
                </div>
                <div>
                    <img src="${item.image}" style="height: 50px; margin-right: 10px;">
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">&times;</button>
                </div>
            `;
            cartList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    };

    //Eliminar producto del carrito
    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // Botón de proceder al pago
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        } else {
            alert('El carrito está vacío.');
        }
    });

    // Inicializa la visualización del carrito
    updateCartDisplay();
});
