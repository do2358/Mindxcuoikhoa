document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".home-slider .slide");
    let currentIndex = 0;

    if (slides.length === 0) return;

    setInterval(() => {
        // Ẩn slide hiện tại
        slides[currentIndex].classList.remove("active");

        // Tăng index
        currentIndex = (currentIndex + 1) % slides.length;

        // Hiện slide mới
        slides[currentIndex].classList.add("active");
    }, 5000); // 5000ms = 5 giây
});

// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

//Xem chi tiet san pham
function detailProduct(index) {
    let modal = document.querySelector('.modal.product-detail');
    let products = getProducts();
    event.preventDefault();
    let infoProduct = products.find(sp => {
        return sp.id === index;
    })
    let modalHtml = `<div class="modal-header">
    <img class="product-image" src="${infoProduct.img}" alt="">
    </div>
    <div class="modal-body">
        <h2 class="product-title">${infoProduct.title}</h2>
        <div class="product-control">
            <div class="priceBox">
                <span class="current-price">${vnd(infoProduct.price)}</span>
            </div>
            <div class="buttons_added">
                <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this)">
                <input class="input-qty" max="100" min="1" name="" type="number" value="1">
                <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this)">
            </div>
        </div>
        <p class="product-description">${infoProduct.desc}</p>
    </div>
    <div class="notebox">
            <p class="notebox-title">Ghi chú</p>
            <textarea class="text-note" id="popup-detail-note" placeholder="Nhập thông tin cần lưu ý..."></textarea>
    </div>
    <div class="modal-footer">
        <div class="price-total">
            <span class="thanhtien">Thành tiền</span>
            <span class="price">${vnd(infoProduct.price)}</span>
        </div>
        <div class="modal-footer-control">
            <button class="button-dathangngay" data-product="${infoProduct.id}">Đặt hàng ngay</button>
            <button class="button-dat" id="add-cart" onclick="animationCart()"><i class="fa-light fa-basket-shopping"></i></button>
        </div>
    </div>`;
    document.querySelector('#product-detail-content').innerHTML = modalHtml;
    modal.classList.add('open');
    document.body.style.overflow = "hidden";
    //Cap nhat gia tien khi tang so luong san pham
    let tgbtn = document.querySelectorAll('.is-form');
    let qty = document.querySelector('.product-control .input-qty');
    let priceText = document.querySelector('.price');
    tgbtn.forEach(element => {
        element.addEventListener('click', () => {
            let price = infoProduct.price * parseInt(qty.value);
            priceText.innerHTML = vnd(price);
        });
    });
    // Them san pham vao gio hang
    let productbtn = document.querySelector('.button-dat');
    productbtn.addEventListener('click', (e) => {
        if (localStorage.getItem('currentuser')) {
            addCart(infoProduct.id);
        } else {
            toast({ title: 'Warning', message: 'Chưa đăng nhập tài khoản !', type: 'warning', duration: 3000 });
        }

    })
    // Mua ngay san pham
    dathangngay();

    // Dong modal khi click nut dong
    setupProductModalClose();
}
function renderProducts(showProduct) {
    let productHtml = '';
    if(showProduct.length == 0) {
        document.getElementById("home-title").style.display = "none";
        productHtml = `<div class="no-result"><div class="no-result-h">Tìm kiếm không có kết quả</div><div class="no-result-p">Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</div><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div></div>`;
    } else {
        document.getElementById("home-title").style.display = "block";
        showProduct.forEach((product) => {
            productHtml += `<div class="col-product">
            <article class="card-product" >
                <div class="card-header">
                    <a href="#" class="card-image-link" onclick="detailProduct(${product.id})">
                    <img class="card-image" src="${product.img}" alt="${product.title}">
                    </a>
                </div>
                <div class="food-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="#" class="card-title-link" onclick="detailProduct(${product.id})">${product.title}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                            <span class="current-price">${vnd(product.price)}</span>
                        </div>
                    <div class="product-buy">
                        <button onclick="detailProduct(${product.id})" class="card-button order-item"><i class="fa-regular fa-cart-shopping-fast"></i> Đặt món</button>
                    </div> 
                </div>
                </div>
            </article>
        </div>`;
        });
    }
    document.getElementById('home-products').innerHTML = productHtml;
}
document.addEventListener("DOMContentLoaded", function () {
    let products = getProducts();
    console.log("Load trang chủ, số sản phẩm:", products.length);
    renderProducts(products);
});
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];

function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    renderProducts(productShow);
}

function showHomeProduct(products) {
    let productAll = products.filter(item => item.status == 1)
    displayList(productAll, perPage, currentPage);
    setupPagination(productAll, perPage, currentPage);
}

window.onload = function () {
    let products = getProducts();
    showHomeProduct(products);
};


function setupPagination(productAll, perPage) {
    document.querySelector('.page-nav-list').innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}

function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="javascript:;">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
        document.getElementById("home-service").scrollIntoView();
    })
    return node;
}

// lọc
var productAll = getProducts().filter(item => item.status == 1);
function searchProducts(mode) {
    let valeSearchInput = document.querySelector('.form-search-input').value;
    let valueCategory = document.getElementById("advanced-search-category-select").value;
    let minPrice = document.getElementById("min-price").value;
    let maxPrice = document.getElementById("max-price").value;
    if(parseInt(minPrice) > parseInt(maxPrice) && minPrice != "" && maxPrice != "") {
        alert("Giá đã nhập sai !");
    }

    let result = valueCategory == "Tất cả" ? productAll : productAll.filter((item) => {
        return item.category == valueCategory;
    });

    result = valeSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valeSearchInput.toString().toUpperCase());
    })

    if(minPrice == "" && maxPrice != "") {
        result = result.filter((item) => item.price <= maxPrice);
    } else if (minPrice != "" && maxPrice == "") {
        result = result.filter((item) => item.price >= minPrice);
    } else if(minPrice != "" && maxPrice != "") {
        result = result.filter((item) => item.price <= maxPrice && item.price >= minPrice);
    }

    document.getElementById("home-service").scrollIntoView();
    switch (mode){
        case 0:
            result = getProducts();
            document.querySelector('.form-search-input').value = "";
            document.getElementById("advanced-search-category-select").value = "Tất cả";
            document.getElementById("min-price").value = "";
            document.getElementById("max-price").value = "";
            break;
        case 1:
            result.sort((a,b) => a.price - b.price)
            break;
        case 2:
            result.sort((a,b) => b.price - a.price)
            break;
    }
    showHomeProduct(result)
}
function openCart() {
    const modal = document.querySelector('.modal-cart');
    if (!modal) {
        console.error('Cart modal not found');
        return;
    }
    showCart();
    modal.classList.add('open');
    document.body.style.overflow = "hidden";
}

function closeCart() {
    const modal = document.querySelector('.modal-cart');
    if (!modal) {
        console.error('Cart modal not found');
        return;
    }
    modal.classList.remove('open');
    document.body.style.overflow = "auto";
    updateAmount();
}

// Open Search Advanced
document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.querySelector(".filter-btn");
    const advancedSearch = document.querySelector(".advanced-search");
    const homeService = document.getElementById("home-service");

    if (filterBtn && advancedSearch) {
        filterBtn.addEventListener("click", function (e) {
            e.preventDefault();
            advancedSearch.classList.toggle("open");
            homeService?.scrollIntoView({ behavior: "smooth" });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    // ===== CLICK INPUT SEARCH =====
    const formSearchInput = document.querySelector(".form-search-input");
    const homeService = document.getElementById("home-service");
    const advancedSearch = document.querySelector(".advanced-search");

    if (formSearchInput && homeService) {
        formSearchInput.addEventListener("click", function (e) {
            e.preventDefault();
            homeService.scrollIntoView({ behavior: "smooth" });
        });
    }

    // ===== ĐÓNG / MỞ ADVANCED SEARCH =====
    window.closeSearchAdvanced = function () {
        if (advancedSearch) {
            advancedSearch.classList.toggle("open");
        }
    };

    // ===== OPEN SEARCH MOBILE =====
    window.openSearchMb = function () {
        const left = document.querySelector(".header-middle-left");
        const center = document.querySelector(".header-middle-center");
        const closeBtn = document.querySelector(".header-middle-right-item.close");
        const openItems = document.querySelectorAll(".header-middle-right-item.open");

        if (left) left.style.display = "none";
        if (center) center.style.display = "block";
        if (closeBtn) closeBtn.style.display = "block";

        openItems.forEach(item => {
            item.style.setProperty("display", "none", "important");
        });
    };

    // ===== CLOSE SEARCH MOBILE =====
    window.closeSearchMb = function () {
        const left = document.querySelector(".header-middle-left");
        const center = document.querySelector(".header-middle-center");
        const closeBtn = document.querySelector(".header-middle-right-item.close");
        const openItems = document.querySelectorAll(".header-middle-right-item.open");

        if (left) left.style.display = "block";
        if (center) center.style.display = "none";
        if (closeBtn) closeBtn.style.display = "none";

        openItems.forEach(item => {
            item.style.setProperty("display", "block", "important");
        });
    };

});
function showCategory(categoryName) {
    // Lấy toàn bộ sản phẩm
    let products = getProducts();

    // Chỉ lấy sản phẩm đang bán
    products = products.filter(item => item.status == 1);

    // Lọc theo danh mục
    let result = products.filter(item => item.category === categoryName);

    // Scroll tới danh sách món
    document.getElementById("home-service").scrollIntoView();

    // Hiển thị
    showHomeProduct(result);
}
document.addEventListener("DOMContentLoaded", function () {

    const authModal = document.getElementById("authModal");
    const authBox = document.getElementById("authBox");

    const btnLogin = document.getElementById("login");
    const btnSignup = document.getElementById("signup");

    const closeModal = document.querySelector(".close-btn");
    const switchToSignup = document.getElementById("switchToSignup");
    const switchToLogin = document.getElementById("switchToLogin");

    // ===== KIỂM TRA TỒN TẠI =====
    if (!authModal || !authBox) {
        console.warn("❌ Không tìm thấy authModal hoặc authBox");
        return;
    }

    // ===== MỞ LOGIN =====
    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            authModal.classList.add("active");
            authBox.classList.remove("active");
            document.body.style.overflow = "hidden";
        });
    }

    // ===== MỞ SIGNUP =====
    if (btnSignup) {
        btnSignup.addEventListener("click", () => {
            authModal.classList.add("active");
            authBox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    // ===== ĐÓNG MODAL =====
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            authModal.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    authModal.addEventListener("click", (e) => {
        if (e.target === authModal) {
            authModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // ===== CHUYỂN FORM =====
    if (switchToSignup) {
        switchToSignup.addEventListener("click", (e) => {
            e.preventDefault();
            authBox.classList.add("active");
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener("click", (e) => {
            e.preventDefault();
            authBox.classList.remove("active");
        });
    }

});
document.addEventListener("DOMContentLoaded", function () {

    const authBox = document.getElementById("authBox");
    const goSignup = document.getElementById("goSignup");
    const goLogin = document.getElementById("goLogin");

    // Click "Đăng ký ngay"
    if (goSignup) {
        goSignup.addEventListener("click", function (e) {
            e.preventDefault();
            authBox.classList.add("active");
        });
    }

    // Click "Đăng nhập"
    if (goLogin) {
        goLogin.addEventListener("click", function (e) {
            e.preventDefault();
            authBox.classList.remove("active");
        });
    }

});

// Setup product detail modal close button
function setupProductModalClose() {
    const modal = document.querySelector('.modal.product-detail');
    const closeBtn = modal?.querySelector('.close-popup');

    if (closeBtn && modal) {
        // Remove old listener if exists
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

        // Add new listener
        newCloseBtn.addEventListener('click', function() {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Setup cart modal close button
document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.querySelector('.modal-cart');
    const cartCloseBtn = cartModal?.querySelector('.close-popup');

    if (cartCloseBtn && cartModal) {
        cartCloseBtn.addEventListener('click', function() {
            closeCart();
        });
    }

    // Close cart modal when clicking outside
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCart();
            }
        });
    }
});
