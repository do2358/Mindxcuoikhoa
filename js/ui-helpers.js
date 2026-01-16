// UI helper functions: toast notifications and animations

function toast(options) {
    const { title, message, type = 'info', duration = TOAST_DURATION_MS } = options;

    // Remove existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const iconMap = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${iconMap[type] || iconMap.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    document.body.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });

    // Auto remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function animationCart() {
    const cartIcon = document.querySelector('.cart-icon-menu');
    if (!cartIcon) return;

    cartIcon.classList.add('cart-animate');
    setTimeout(() => {
        cartIcon.classList.remove('cart-animate');
    }, 600);
}

function increasingNumber(button) {
    const inputQty = button.parentElement.querySelector('.input-qty');
    if (!inputQty) return;

    let currentValue = parseInt(inputQty.value) || MIN_QUANTITY;
    if (currentValue < MAX_QUANTITY) {
        inputQty.value = currentValue + 1;

        // Trigger price update if in product detail modal
        const priceElement = document.querySelector('.modal.product-detail .price');
        if (priceElement) {
            updateModalPrice();
        }
    }
}

function decreasingNumber(button) {
    const inputQty = button.parentElement.querySelector('.input-qty');
    if (!inputQty) return;

    let currentValue = parseInt(inputQty.value) || MIN_QUANTITY;
    if (currentValue > MIN_QUANTITY) {
        inputQty.value = currentValue - 1;

        // Trigger price update if in product detail modal
        const priceElement = document.querySelector('.modal.product-detail .price');
        if (priceElement) {
            updateModalPrice();
        }
    }
}

function updateModalPrice() {
    const qty = document.querySelector('.product-control .input-qty');
    const priceText = document.querySelector('.modal.product-detail .price');
    if (!qty || !priceText) return;

    const productId = document.querySelector('.button-dathangngay')?.dataset.product;
    if (!productId) return;

    const products = getProducts();
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const totalPrice = product.price * parseInt(qty.value);
    priceText.innerHTML = vnd(totalPrice);
}
