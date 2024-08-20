document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito desde localStorage
    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    };

    //Guarda carrito
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    //Actualiza la visualización del carrito
    const updateCartDisplay = () => {
        const cart = loadCart();
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const totalPriceElement = document.getElementById('total-price');
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'dropdown-item d-flex justify-content-between align-items-center';
            itemElement.innerHTML = `
                <img src="${item.image}" style="height: 50px; width: auto;">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="btn btn-sm btn-danger ml-2" onclick="removeFromCart(${index})">Eliminar</button>
                <div class="dropdown-divider"></div>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price;
        });
        cartCount.textContent = cart.length;
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    };

    //Manejar la acción de añadir al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            const size = document.getElementById("size").value;
            const cart = loadCart();
            const product = { name, price, image, size };
            cart.push(product);
            saveCart(cart);
            updateCartDisplay();
        });
    });
    window.removeFromCart = (index) => {
        let cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        updateCartDisplay();
    };
    updateCartDisplay();
    const updateCartCount = () => {
        const cart = loadCart();
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    };
    updateCartCount();
});

function initializeUsers() {
    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Inicio de sesión exitoso');
        //Redirigir al usuario
        window.location.href = '/index.html';
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
}


if (!localStorage.getItem('users')) {
    initializeUsers();
}
document.getElementById('login-form').addEventListener('submit', handleLogin);
