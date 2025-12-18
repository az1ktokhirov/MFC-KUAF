// Store Page
import { dataService } from '../data.js';
import { premiumService } from '../premium.js';
import { authService } from '../auth.js';
import { cartService } from '../cart.js';

export async function renderStore() {
    const products = await dataService.getStoreProducts();
    const isPremium = premiumService.isPremium();

    const categories = [...new Set(products.map(p => p.category))];

    return `
        <div class="page active">
            <section class="section">
                <div class="container">
                    <h1 class="section-title">FC KUAF Store</h1>
                    ${isPremium ? '<p style="text-align: center; color: #800020; font-weight: 600; margin-bottom: 30px;">🎉 Premium Members Get 10% Discount!</p>' : ''}
                    
                    <div style="margin: 30px 0; text-align: center;">
                        ${categories.map(cat => `
                            <button class="btn btn-outline" onclick="filterStore('${cat}')" style="margin: 5px;">
                                ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        `).join('')}
                        <button class="btn btn-outline" onclick="filterStore('all')" style="margin: 5px;">All Products</button>
                    </div>

                    <div class="card-grid" id="store-products">
                        ${products.map(product => {
                            const originalPrice = product.price;
                            const discountedPrice = premiumService.getStorePrice(originalPrice);
                            
                            return `
                                <div class="card product-card" data-category="${product.category}">
                                    ${isPremium && discountedPrice < originalPrice ? '<span class="premium-badge">Premium</span>' : ''}
                                    <img src="${product.image}" alt="${product.name}" class="product-image"
                                         onerror="this.src='https://via.placeholder.com/400x300/800020/FFFFFF?text=Product'">
                                    <div class="card-content">
                                        <div class="card-title">${product.name}</div>
                                        <p class="card-text">${product.description}</p>
                                    </div>
                                    <div class="card-footer">
                                        <div>
                                            ${premiumService.formatDiscountPrice(originalPrice, discountedPrice)}
                                        </div>
                                        ${product.purchasableWithCoins ? `
                                            <div style="font-size: 0.875rem; color: #666; margin-top: 5px;">
                                                or ${product.coinPrice} coins
                                            </div>
                                        ` : ''}
                                    </div>
                                    <div style="padding: 0 20px 20px;">
                                        <button class="btn btn-primary" onclick="addToCart(${product.id})" style="width: 100%;">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </section>
        </div>
    `;
}

window.filterStore = function(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

window.addToCart = async function(productId) {
    if (!authService.isAuthenticated()) {
        alert('Please login to add items to cart');
        router.navigate('#login');
        return;
    }

    // Get product from data
    const products = await dataService.getStoreProducts();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cartService.addItem(product, 1);
    }
};

