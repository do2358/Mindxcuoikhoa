// Cart management functions

function addCart(productId) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        toast({
            title: 'Cảnh báo',
            message: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!',
            type: 'warning',
            duration: 3000
        });
        return;
    }

    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        toast({
            title: 'Lỗi',
            message: 'Không tìm thấy sản phẩm!',
            type: 'error',
            duration: 3000
        });
        return;
    }

    // Get quantity and note from modal
    const qtyInput = document.querySelector('.product-control .input-qty');
    const noteInput = document.querySelector('#popup-detail-note');

    const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
    const note = noteInput ? noteInput.value.trim() : '';

    // Check if product already in cart
    if (!currentUser.cart) {
        currentUser.cart = [];
    }

    const existingItemIndex = currentUser.cart.findIndex(item => item.productId === productId && item.note === note);

    if (existingItemIndex !== -1) {
        // Update quantity
        currentUser.cart[existingItemIndex].quantity += quantity;
        currentUser.cart[existingItemIndex].total = currentUser.cart[existingItemIndex].quantity * product.price;
    } else {
        // Add new item
        currentUser.cart.push({
            productId: productId,
            quantity: quantity,
            note: note,
            unitPrice: product.price,
            total: quantity * product.price,
            title: product.title,
            img: product.img
        });
    }

    // Update localStorage
    setCurrentUser(currentUser);
    updateAccountInStorage(currentUser);

    // Update cart badge
    updateCartBadge();

    // Show success toast
    toast({
        title: 'Thành công',
        message: `Đã thêm "${product.title}" vào giỏ hàng!`,
        type: 'success',
        duration: 3000
    });

    // Trigger cart animation
    animationCart();
}

function showCart() {
    const currentUser = getCurrentUser();
    const cartModal = document.querySelector('.modal-cart');

    if (!cartModal) {
        console.error('Cart modal not found');
        return;
    }

    const cartContent = cartModal.querySelector('.modal-cart-content') || cartModal.querySelector('.modal-container');

    if (!currentUser) {
        // Show login prompt if not logged in
        if (cartContent) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-light fa-basket-shopping" style="font-size: 80px; color: #999; margin-bottom: 20px;"></i>
                    <h3>Bạn chưa đăng nhập</h3>
                    <p>Vui lòng đăng nhập để xem giỏ hàng và đặt món!</p>
                    <button onclick="closeCart(); document.getElementById('login').click();" style="padding: 12px 24px; background: var(--red); color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
                        Đăng nhập ngay
                    </button>
                </div>
            `;
        }
        return;
    }

    const cart = currentUser.cart || [];

    if (cart.length === 0) {
        if (cartContent) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <img src="./img/empty-order.jpg" alt="Giỏ hàng trống" onerror="this.style.display='none'">
                    <i class="fa-light fa-basket-shopping" style="font-size: 80px; color: #999; margin-bottom: 20px;"></i>
                    <p>Giỏ hàng của bạn đang trống</p>
                    <button onclick="closeCart();" style="padding: 12px 24px; background: var(--red); color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
                        Tiếp tục mua sắm
                    </button>
                </div>
            `;
        }
        return;
    }

    // Generate cart HTML
    let cartHTML = '<div class="cart-items">';

    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    ${item.note ? `<p class="cart-item-note">Ghi chú: ${item.note}</p>` : ''}
                    <div class="cart-item-controls">
                        <button onclick="decreaseCartQuantity(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseCartQuantity(${index})">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span>${vnd(item.total)}</span>
                    <button onclick="removeCartItem(${index})" class="remove-item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartHTML += '</div>';

    // Calculate totals
    const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartHTML += `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Tổng sản phẩm:</span>
                <span>${totalItems} món</span>
            </div>
            <div class="cart-summary-row total">
                <span>Tổng tiền:</span>
                <span class="total-amount">${vnd(totalAmount)}</span>
            </div>
            <button class="btn-checkout" onclick="proceedToCheckout()">Đặt hàng</button>
        </div>
    `;

    if (cartContent) {
        cartContent.innerHTML = cartHTML;
    }
}

function updateAmount() {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.cart) return;

    const cart = currentUser.cart;
    const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update total in modal if visible
    const totalAmountElement = document.querySelector('.total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = vnd(totalAmount);
    }

    // Update cart badge
    updateCartBadge();
}

function updateCartBadge() {
    const currentUser = getCurrentUser();
    const badge = document.querySelector('.count-product-cart');

    if (!badge) return;

    if (!currentUser || !currentUser.cart) {
        badge.textContent = '0';
        return;
    }

    const totalItems = currentUser.cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

function increaseCartQuantity(index) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.cart || !currentUser.cart[index]) return;

    if (currentUser.cart[index].quantity < MAX_QUANTITY) {
        currentUser.cart[index].quantity++;
        currentUser.cart[index].total = currentUser.cart[index].quantity * currentUser.cart[index].unitPrice;

        setCurrentUser(currentUser);
        updateAccountInStorage(currentUser);
        showCart();
        updateAmount();
    }
}

function decreaseCartQuantity(index) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.cart || !currentUser.cart[index]) return;

    if (currentUser.cart[index].quantity > MIN_QUANTITY) {
        currentUser.cart[index].quantity--;
        currentUser.cart[index].total = currentUser.cart[index].quantity * currentUser.cart[index].unitPrice;

        setCurrentUser(currentUser);
        updateAccountInStorage(currentUser);
        showCart();
        updateAmount();
    }
}

function removeCartItem(index) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.cart || !currentUser.cart[index]) return;

    const removedItem = currentUser.cart[index];
    currentUser.cart.splice(index, 1);

    setCurrentUser(currentUser);
    updateAccountInStorage(currentUser);
    showCart();
    updateAmount();

    toast({
        title: 'Đã xóa',
        message: `Đã xóa "${removedItem.title}" khỏi giỏ hàng`,
        type: 'info',
        duration: 2000
    });
}

function dathangngay() {
    const dathangBtn = document.querySelector('.button-dathangngay');
    if (!dathangBtn) return;

    // Remove old listener if exists (prevent duplicate listeners)
    const newBtn = dathangBtn.cloneNode(true);
    dathangBtn.parentNode.replaceChild(newBtn, dathangBtn);

    newBtn.addEventListener('click', function() {
        const productId = parseInt(this.dataset.product);

        // Add to cart first
        addCart(productId);

        // Close product detail modal
        const modal = document.querySelector('.modal.product-detail');
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }

        // Open cart modal
        setTimeout(() => {
            openCart();
        }, 500);
    });
}

function proceedToCheckout() {
    const currentUser = getCurrentUser();

    if (!currentUser || !currentUser.cart || currentUser.cart.length === 0) {
        toast({
            title: 'Thông báo',
            message: 'Giỏ hàng trống!',
            type: 'warning',
            duration: 3000
        });
        return;
    }

    // Since there's no backend, show a message
    toast({
        title: 'Thông báo',
        message: 'Chức năng đặt hàng đang được phát triển. Vui lòng liên hệ: 0123 456 789',
        type: 'info',
        duration: 5000
    });

    // TODO: Implement actual checkout process when backend is ready
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
});
