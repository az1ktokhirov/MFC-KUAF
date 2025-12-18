// Premium Features and Discounts
import { authService } from './auth.js';

class PremiumService {
    constructor() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'premium.js:6',message:'PremiumService constructor',data:{authServiceExists:typeof authService !== 'undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        this.monthlyPrice = 4.99;
        this.yearlyPrice = 50;
    }

    isPremium() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'premium.js:15',message:'isPremium called',data:{authServiceExists:typeof authService !== 'undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        try {
            if (typeof authService === 'undefined' || !authService) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'premium.js:19',message:'authService undefined, returning false',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                return false;
            }
            return authService.isPremium();
        } catch (error) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'premium.js:25',message:'Error in isPremium',data:{errorMessage:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            console.error('Error checking premium status:', error);
            return false;
        }
    }

    getStoreDiscount(originalPrice) {
        if (this.isPremium()) {
            return originalPrice * 0.1; // 10% discount
        }
        return 0;
    }

    getStorePrice(originalPrice) {
        if (this.isPremium()) {
            return originalPrice * 0.9; // 10% discount
        }
        return originalPrice;
    }

    getTicketDiscount(originalPrice) {
        if (this.isPremium()) {
            return originalPrice * 0.5; // 50% discount
        }
        return 0;
    }

    getTicketPrice(originalPrice) {
        if (this.isPremium()) {
            return originalPrice * 0.5; // 50% discount
        }
        return originalPrice;
    }

    canAccessKUAFTV() {
        return this.isPremium();
    }

    formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    formatDiscountPrice(originalPrice, discountedPrice) {
        if (this.isPremium() && discountedPrice < originalPrice) {
            return `
                <span class="product-price-discount">${this.formatPrice(originalPrice)}</span>
                <span class="product-price">${this.formatPrice(discountedPrice)}</span>
                <span class="premium-badge">Premium</span>
            `;
        }
        return `<span class="product-price">${this.formatPrice(originalPrice)}</span>`;
    }
}

const premiumService = new PremiumService();
export { premiumService };

