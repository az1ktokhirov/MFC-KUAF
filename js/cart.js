// Store Mini Cart System
import { premiumService } from './premium.js';

class CartService {
    constructor() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:4',message:'CartService constructor called',data:{windowCartExists:!!window.cartService},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        // If already initialized in window, don't re-initialize
        if (window.cartService && window.cartService !== this && window.cartService instanceof CartService) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:9',message:'CartService constructor - instance already exists, skipping init',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            return;
        }
        
        this.cart = this.loadCart();
        this.initialized = false;
        this.init();
    }

    init() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:12',message:'CartService init called',data:{headerActionsExists:!!document.querySelector('.header-actions'),cartIconExists:!!document.getElementById('cart-icon'),alreadyInitialized:this.initialized,domReady:document.readyState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        // Prevent multiple initializations
        if (this.initialized) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:18',message:'CartService init skipped - already initialized',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            return;
        }
        
        // Wait for DOM to be ready if needed
        if (document.readyState === 'loading') {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:25',message:'DOM not ready, waiting for DOMContentLoaded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeCart();
            });
        } else {
            this.initializeCart();
        }
    }
    
    initializeCart() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:35',message:'initializeCart called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        // Create cart UI
        this.createCartUI();
        
        // Update cart display
        this.updateCartDisplay();
        
        // Setup event listeners
        this.setupEventListeners();
        
        this.initialized = true;
    }

    loadCart() {
        try {
            const cartData = localStorage.getItem('fc_kuaf_cart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('fc_kuaf_cart', JSON.stringify(this.cart));
            this.updateCartDisplay();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    createCartUI() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:40',message:'createCartUI called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        const headerActions = document.querySelector('.header-actions');
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:45',message:'Header actions check',data:{headerActionsExists:!!headerActions},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        if (!headerActions) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:48',message:'createCartUI early return - no headerActions',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            return;
        }

        // Check if cart already exists - use more robust check
        const existingCartIcon = document.getElementById('cart-icon');
        const existingCartContainer = document.getElementById('cart-container');
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:54',message:'Cart existence check',data:{cartIconExists:!!existingCartIcon,cartContainerExists:!!existingCartContainer},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        if (existingCartIcon || existingCartContainer) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:58',message:'createCartUI early return - cart already exists',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            // Store reference if it exists
            if (existingCartContainer) {
                this.cartContainer = existingCartContainer;
            }
            return;
        }

        const cartContainer = document.createElement('div');
        cartContainer.id = 'cart-container';
        cartContainer.className = 'cart-container';
        cartContainer.innerHTML = `
            <button id="cart-icon" class="cart-icon" aria-label="Shopping cart">
                🛒
                <span id="cart-badge" class="cart-badge">0</span>
            </button>
            <div id="cart-dropdown" class="cart-dropdown">
                <div class="cart-dropdown-header">
                    <h3>Shopping Cart</h3>
                    <span id="cart-item-count" class="cart-item-count">0 items</span>
                </div>
                <div id="cart-items" class="cart-items">
                    <div class="cart-empty">Your cart is empty</div>
                </div>
                <div class="cart-dropdown-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span id="cart-total-price">$0.00</span>
                    </div>
                    <a href="#store" class="btn btn-primary cart-checkout-btn" onclick="window.cartService.closeDropdown()">
                        View Cart
                    </a>
                </div>
            </div>
        `;

        // Insert before login link
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            headerActions.insertBefore(cartContainer, loginLink);
        } else {
            headerActions.appendChild(cartContainer);
        }
        
        // Store reference for use in setupEventListeners
        this.cartContainer = cartContainer;
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:82',message:'cartContainer created and stored',data:{cartContainerId:cartContainer.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
    }

    setupEventListeners() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'cart.js:84',message:'setupEventListeners called',data:{hasCartContainer:!!this.cartContainer},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        const cartIcon = document.getElementById('cart-icon');
        const cartDropdown = document.getElementById('cart-dropdown');
        const cartContainer = this.cartContainer || document.getElementById('cart-container');

        if (cartIcon) {
            // Toggle dropdown on click
            cartIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                cartDropdown?.classList.toggle('active');
            });

            // Show dropdown on hover (desktop)
            cartIcon.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    cartDropdown?.classList.add('active');
                }
            });

            // Hide dropdown when mouse leaves
            if (cartContainer) {
                cartContainer.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 768) {
                        setTimeout(() => {
                            cartDropdown?.classList.remove('active');
                        }, 200);
                    }
                });
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#cart-container')) {
                cartDropdown?.classList.remove('active');
            }
        });
    }

    addItem(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                category: product.category
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        
        // Show notification
        this.showAddNotification(product.name);
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        try {
            const isPremium = premiumService.isPremium();
            return this.cart.reduce((total, item) => {
                const itemPrice = isPremium ? premiumService.getStorePrice(item.price) : item.price;
                return total + (itemPrice * item.quantity);
            }, 0);
        } catch (error) {
            console.error('Error calculating total price:', error);
            // Fallback to regular prices if premium service fails
            return this.cart.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const badge = document.getElementById('cart-badge');
        const itemCount = document.getElementById('cart-item-count');
        const totalPrice = document.getElementById('cart-total-price');
        const cartItems = document.getElementById('cart-items');

        const totalItems = this.getTotalItems();
        const total = this.getTotalPrice();

        // Update badge
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Update item count
        if (itemCount) {
            itemCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
        }

        // Update total price
        if (totalPrice) {
            totalPrice.textContent = `$${total.toFixed(2)}`;
        }

        // Update cart items list
        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
            } else {
                try {
                    const isPremium = premiumService.isPremium();
                    cartItems.innerHTML = this.cart.map(item => {
                        const itemPrice = isPremium ? premiumService.getStorePrice(item.price) : item.price;
                        const subtotal = itemPrice * item.quantity;
                        const hasDiscount = isPremium && itemPrice < item.price;

                        return `
                            <div class="cart-item">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-image" 
                                     onerror="this.src='https://via.placeholder.com/60'">
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${item.name}</div>
                                    <div class="cart-item-price">
                                        ${hasDiscount ? `
                                            <span class="cart-item-price-original">$${item.price.toFixed(2)}</span>
                                            <span class="cart-item-price-discounted">$${itemPrice.toFixed(2)}</span>
                                        ` : `
                                            <span>$${itemPrice.toFixed(2)}</span>
                                        `}
                                    </div>
                                </div>
                                <div class="cart-item-controls">
                                    <button class="cart-quantity-btn" onclick="window.cartService.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span class="cart-quantity">${item.quantity}</span>
                                    <button class="cart-quantity-btn" onclick="window.cartService.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                    <button class="cart-remove-btn" onclick="window.cartService.removeItem(${item.id})" aria-label="Remove item">×</button>
                                </div>
                            </div>
                        `;
                    }).join('');
                } catch (error) {
                    console.error('Error updating cart display:', error);
                    // Fallback to regular prices if premium service fails
                    cartItems.innerHTML = this.cart.map(item => {
                        const subtotal = item.price * item.quantity;
                        return `
                            <div class="cart-item">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-image" 
                                     onerror="this.src='https://via.placeholder.com/60'">
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${item.name}</div>
                                    <div class="cart-item-price">
                                        <span>$${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div class="cart-item-controls">
                                    <button class="cart-quantity-btn" onclick="window.cartService.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span class="cart-quantity">${item.quantity}</span>
                                    <button class="cart-quantity-btn" onclick="window.cartService.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                    <button class="cart-remove-btn" onclick="window.cartService.removeItem(${item.id})" aria-label="Remove item">×</button>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }
        }
    }

    showAddNotification(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `Added ${productName} to cart!`;
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    closeDropdown() {
        const dropdown = document.getElementById('cart-dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }
}

// Singleton pattern - only create once, check window first
let cartServiceInstance = null;

// Check if already exists in window (survives module re-evaluation)
if (window.cartService && window.cartService instanceof CartService) {
    cartServiceInstance = window.cartService;
} else if (!cartServiceInstance) {
    cartServiceInstance = new CartService();
    window.cartService = cartServiceInstance;
}

export { cartServiceInstance as cartService };

