window.products = {
    "9": { title: "Red NY Snapback Cap", category: "FITTED CAPS", price: "192.00", oldPrice: "450.00", description: "Stand out with this classic red NY snapback cap.", images: ["WP/red.png"], tag: "Sourced", isTrending: true },
    "11": { title: "Blue LA Fitted Cap", category: "FITTED CAPS", price: "192.00", oldPrice: "450.00", description: "Premium blue LA fitted cap with classic baseball heart detail.", images: ["WP/1.png", "WP/1.1.png", "WP/1.2.png"], tag: "Sourced", isTrending: true },
    "12": { title: "Navy LA Snapback Cap", category: "FITTED CAPS", price: "192.00", oldPrice: "550.00", description: "Classic navy blue LA snapback with adjustable snapback closure.", images: ["WP/2.png", "WP/2.1.png", "WP/2.3.png", "WP/2.4.png"], tag: "Sourced", isTrending: true },
    "13": { title: "Red Streetwear Cap", category: "STREETWEAR", price: "192.00", oldPrice: "400.00", description: "A bold red streetwear cap with custom front logo patch.", images: ["WP/3.jpg", "WP/3.1.jpg", "WP/3.2.jpg"], tag: "Sourced", isTrending: true }
};

const siteInfo = {
    brandName: "WOW Fashion",
    email: "nexodigitalagencyza@gmail.com",
    phone: "+27 81 721 7316",
    whatsappNumber: "27817217316",
    copyrightDate: "2026",
    location: "Bethlehem & Johannesburg, South Africa"
};

const categories = [
    { name: "T-Shirts", image: "WP/Q1.jpeg", link: "shop.html?category=T-SHIRTS" },
    { name: "Jackets", image: "WP/Q2.jpeg", link: "shop.html?category=JACKETS" },
    { name: "Streetwear", image: "WP/Q3.jpeg", link: "shop.html?category=STREETWEAR" },
    { name: "Beanies", image: "WP/3.1.jpg", link: "shop.html?category=BEANIES" },
    { name: "Fitted Caps", image: "WP/2.png", link: "shop.html?category=FITTED CAPS" }
];

// ==========================================
// ROBUST FAVOURITES LOGIC (Won't break on updates)
// ==========================================
function getFavourites() {
    try {
        let favs = JSON.parse(localStorage.getItem('gigoFavourites'));
        return Array.isArray(favs) ? favs : [];
    } catch (e) {
        return []; // Fallback if storage is corrupted
    }
}

function toggleFavourite(id) {
    id = String(id); // Ensure it matches the product ID string
    let favs = getFavourites();
    
    if (favs.includes(id)) {
        favs = favs.filter(favId => favId !== id); // Remove from favourites
    } else {
        favs.push(id); // Add to favourites
    }
    
    localStorage.setItem('gigoFavourites', JSON.stringify(favs));
    updateHeartIcons();
}

function updateHeartIcons() {
    let favs = getFavourites();
    const hearts = document.querySelectorAll('.heart-btn');
    
    hearts.forEach(btn => {
        const id = String(btn.getAttribute('data-id'));
        if (favs.includes(id)) {
            btn.innerHTML = '&#9829;'; // Filled heart
            btn.style.color = '#ff3b3b'; // Red
        } else {
            btn.innerHTML = '&#9825;'; // Empty heart
            btn.style.color = '#fff'; // White
        }
    });
    
    // Update Header Counters
    const favCount = document.getElementById('fav-count');
    if (favCount) favCount.innerText = favs.length;

    // Update Product Page Heart Button if it exists
    const prodHeartBtn = document.getElementById('product-fav-btn');
    if (prodHeartBtn) {
        const prodId = String(prodHeartBtn.getAttribute('data-id'));
        if (favs.includes(prodId)) {
            prodHeartBtn.innerHTML = '&#9829;';
            prodHeartBtn.style.color = '#ff3b3b';
            prodHeartBtn.style.borderColor = '#ff3b3b';
        } else {
            prodHeartBtn.innerHTML = '&#9825;';
            prodHeartBtn.style.color = '#fff';
            prodHeartBtn.style.borderColor = '#334155';
        }
    }
}

// Listen for changes if user has multiple tabs open
window.addEventListener('storage', function(e) {
    if (e.key === 'gigoFavourites') {
        updateHeartIcons();
    }
});

// ==========================================
// MAIN APP LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <div class="header sticky-header">
                <div class="container"> 
                    <div class="navbar">
                        <div class="logo">
                            <a href="index.html">W<span>O</span>W <i class="fa-solid fa-bag-shopping"></i></a>
                        </div>
                        <nav>
                            <ul>
                                <li><a href="index.html"><i class="fa-solid fa-house"></i> Home</a></li>
                                <li><a href="shop.html"><i class="fa-solid fa-store"></i> Shop</a></li>
                                <li><a href="index.html#about-section"><i class="fa-solid fa-circle-info"></i> About</a></li>
                                <li><a href="https://wa.me/${siteInfo.whatsappNumber}" target="_blank"><i class="fa-solid fa-envelope"></i> Contact</a></li>
                                <li><a href="login.html"><i class="fa-solid fa-user"></i> Login</a></li>
                                <li class="nav-cart">
                                    <a href="favourites.html"><i class="fa-solid fa-heart" style="color:#ff3b3b;"></i> Favourites</a>
                                    <span class="cart-badge" id="fav-count">0</span>
                                </li>
                                <li class="nav-cart">
                                    <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i> Cart</a>
                                    <span class="cart-badge" id="cart-count">0</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        `;
    }

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="footer" id="about-section">
                <div class="small-container">
                    <div class="footer-top">
                        <h2>${siteInfo.brandName}</h2>
                        <p>Your local digital store. Bringing you premium clothing and headwear at unbeatable prices.</p>
                        <p class="cipc">CIPC Registration: 2026 / 408417 / 07</p>
                        <div class="social-icons">
                            <a href="https://www.facebook.com/share/14tsp3K3VAZ/" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="https://wa.me/${siteInfo.whatsappNumber}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                            <a href="tel:${siteInfo.phone}"><i class="fa-solid fa-phone"></i></a>
                        </div>
                    </div>
                    <div class="footer-links">
                        <div class="footer-col">
                            <h4>CATEGORIES</h4>
                            <ul><li><a href="shop.html?category=T-SHIRTS">T-Shirts</a></li><li><a href="shop.html?category=JACKETS">Jackets</a></li><li><a href="shop.html?category=FITTED CAPS">Fitted Caps</a></li><li><a href="shop.html?category=STREETWEAR">Streetwear</a></li></ul>
                        </div>
                        <div class="footer-col">
                            <h4>COMPANY</h4>
                            <ul class="dropdown-list">
                                <li><details id="about-details"><summary>About Us</summary><div class="dropdown-content">
                                    <p>WOW Fashion is a proudly South African digital retail store. We are headquartered in Bethlehem with a secondary operational base in Johannesburg. Our mission is to provide our customers with high-quality, curated fashion at unbeatable prices, bridging the gap between local convenience and global e-commerce trends.</p>
                                    <p style="margin-top: 10px; font-size: 12px; color: #888;">&copy; ${siteInfo.copyrightDate} ${siteInfo.brandName}. All rights reserved. Designed and developed by Maduna Kamohelo Joseph.</p>
                                </div></details></li>
                                <li><details><summary>Contact</summary><div class="dropdown-content"><p>Reach us directly via WhatsApp or call us at ${siteInfo.phone}. Email: ${siteInfo.email}</p></div></details></li>
                                <li><details><summary>Terms & Conditions</summary><div class="dropdown-content"><p>By placing an order with WOW Fashion, you agree to our standard retail terms.</p></div></details></li>
                                <li><details><summary>Returns & Refunds</summary><div class="dropdown-content"><p>We maintain a strict no-returns policy. Damaged items must be reported within a strict 8-hour window of delivery.</p></div></details></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>CONTACT</h4>
                            <ul>
                                <li><a href="mailto:${siteInfo.email}">${siteInfo.email}</a></li>
                                <li><a href="tel:${siteInfo.phone}">${siteInfo.phone}</a></li>
                                <li><p style="font-size:12px; color:#64748b; margin-top:10px;">${siteInfo.location}</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function createProductCard(id, product) {
        let tagHTML = product.isTrending ? `<span class="tag-black">NEW ARRIVAL</span>` : `<span class="tag-black">NEW</span>`;
        return `
            <div class="col-4 card fade-element appear"> 
                <a href="product.html?id=${id}" style="display: block; text-decoration: none; color: inherit;">
                    <div class="card-img-wrapper">
                        ${tagHTML}
                        <button class="heart-btn" data-id="${id}" onclick="event.preventDefault(); toggleFavourite('${id}');">&#9825;</button>
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                    <div class="card-details">
                        <p class="card-category">${product.category}</p>
                        <h4>${product.title}</h4>
                        <p class="old-price">Was R${product.oldPrice}</p>
                        <p class="new-price">R${product.price} <span>/ unit</span></p>
                        <span class="view-deal-btn">&#9889; View Deal</span>
                    </div>
                </a>
            </div>
        `;
    }

    const trendingContainer = document.getElementById('trending-products-container');
    if (trendingContainer) {
        let html = '';
        for (let id in products) {
            if (products[id].isTrending) html += createProductCard(id, products[id]);
        }
        trendingContainer.innerHTML = html;
    }

    const shopContainer = document.getElementById('shop-products-container');
    if (shopContainer) {
        let html = '';
        const urlParams = new URLSearchParams(window.location.search);
        const filterCategory = urlParams.get('category');
        
        for (let id in products) {
            if (filterCategory) {
                if (products[id].category === filterCategory) {
                    html += createProductCard(id, products[id]);
                }
            } else {
                html += createProductCard(id, products[id]);
            }
        }
        
        if (html === '') {
            html = `<div style="width:100%; text-align:center; padding: 50px 0;">
                        <h2 style="color:#fff;">No products found in this category yet.</h2>
                        <a href="shop.html" class="btn" style="margin-top:20px;">View All Products</a>
                    </div>`;
        }
        shopContainer.innerHTML = html;
    }

    const favContainer = document.getElementById('favourites-container');
    if (favContainer) {
        let html = '';
        let favs = getFavourites();
        
        if (favs.length === 0) {
            html = `<div style="width:100%; text-align:center; padding: 50px 0;">
                        <i class="fa-regular fa-heart" style="font-size: 50px; color: #475569; margin-bottom: 20px;"></i>
                        <h2 style="color:#fff; margin-bottom: 10px;">No favourites yet</h2>
                        <p style="color:#94a3b8; margin-bottom: 20px;">Tap the heart on any product to save it here.</p>
                        <a href="shop.html" class="btn">Browse Products</a>
                    </div>`;
        } else {
            favs.forEach(id => {
                if (products[id]) {
                    html += createProductCard(id, products[id]);
                }
            });
        }
        favContainer.innerHTML = html;
    }

    const categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer) {
        let html = '';
        categories.forEach(cat => {
            html += `
                <a href="${cat.link}" class="category-card">
                    <img src="${cat.image}" alt="${cat.name}">
                    <p>${cat.name}</p>
                </a>
            `;
        });
        categoriesContainer.innerHTML = html;
    }

    const testimonialImages = document.querySelectorAll('.testimonial .user-img');
    if(testimonialImages.length > 0) {
        testimonialImages[0].src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productTitle = document.getElementById('product-title');

    if (productId && products[productId] && productTitle) {
        const product = products[productId];
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-category').innerText = product.category;
        document.getElementById('product-desc').innerText = product.description;
        document.getElementById('product-old-price').innerText = "Was R" + product.oldPrice;
        document.getElementById('product-new-price').innerHTML = "R" + product.price + " <span>/ unit</span>";

        const tagElement = document.getElementById('product-tag');
        tagElement.innerText = product.tag;
        tagElement.style.background = (product.tag === "Local Stock") ? "#27ae60" : "#2980b9";

        document.getElementById('mainImage').src = product.images[0];

        const thumbContainer = document.getElementById('thumbnail-container');
        thumbContainer.innerHTML = ''; 
        product.images.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.width = "30%";
            img.style.borderRadius = "8px";
            img.style.cursor = "pointer";
            img.style.border = index === 0 ? "2px solid #ff7b00" : "none";
            
            img.onclick = function() {
                document.getElementById('mainImage').src = this.src;
                Array.from(thumbContainer.children).forEach(c => c.style.border = 'none');
                this.style.border = "2px solid #ff7b00";
            };
            thumbContainer.appendChild(img);
        });

        const prodHeartBtn = document.getElementById('product-fav-btn');
        if (prodHeartBtn) {
            prodHeartBtn.setAttribute('data-id', productId);
            prodHeartBtn.onclick = function(e) {
                e.preventDefault();
                toggleFavourite(productId);
            };
        }
    }

    let cartCount = localStorage.getItem('gigoCartCount') || 0;
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) { cartBadge.innerText = cartCount; }
    
    // Initialize all hearts and counters on page load
    updateHeartIcons(); 

    const refInput = document.getElementById('ref-number');
    if (refInput && !localStorage.getItem('gigoRef')) {
        const randomNum = Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
        const refNumber = `#WFWO${randomNum}`;
        localStorage.setItem('gigoRef', refNumber);
        refInput.value = refNumber;
    } else if (refInput) {
        refInput.value = localStorage.getItem('gigoRef');
    }
});