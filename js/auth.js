// Authentication and Session Management
import { dataService } from './data.js';

class AuthService {
    constructor() {
        this.currentUser = null;
        this.loadSession();
    }

    loadSession() {
        const userStr = localStorage.getItem('kuaf_user');
        if (userStr) {
            this.currentUser = JSON.parse(userStr);
            this.updateUI();
        }
    }

    async login(username, password) {
        const users = await dataService.getUsers();
        const user = users.find(u => 
            (u.username === username || u.email === username) && u.password === password
        );

        if (user) {
            // Don't store password in session
            const sessionUser = { ...user };
            delete sessionUser.password;
            
            this.currentUser = sessionUser;
            localStorage.setItem('kuaf_user', JSON.stringify(sessionUser));
            this.updateUI();
            return { success: true, user: sessionUser };
        }

        return { success: false, message: 'Invalid username or password' };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('kuaf_user');
        this.updateUI();
        window.location.hash = '#home';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isPremium() {
        return this.currentUser && this.currentUser.premium === true;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateCoins(coins) {
        if (this.currentUser) {
            this.currentUser.coins = coins;
            localStorage.setItem('kuaf_user', JSON.stringify(this.currentUser));
            this.updateUI();
        }
    }

    addCoins(amount) {
        if (this.currentUser) {
            this.currentUser.coins = (this.currentUser.coins || 0) + amount;
            localStorage.setItem('kuaf_user', JSON.stringify(this.currentUser));
            this.updateUI();
        }
    }

    updateSupportScore(score) {
        if (this.currentUser) {
            this.currentUser.supportScore = (this.currentUser.supportScore || 0) + score;
            localStorage.setItem('kuaf_user', JSON.stringify(this.currentUser));
            this.updateUI();
        }
    }

    addBadge(badge) {
        if (this.currentUser && !this.currentUser.badges.includes(badge)) {
            this.currentUser.badges.push(badge);
            localStorage.setItem('kuaf_user', JSON.stringify(this.currentUser));
            this.updateUI();
        }
    }

    addDonation(donation) {
        if (this.currentUser) {
            if (!this.currentUser.donationHistory) {
                this.currentUser.donationHistory = [];
            }
            this.currentUser.donationHistory.push(donation);
            localStorage.setItem('kuaf_user', JSON.stringify(this.currentUser));
            this.updateUI();
        }
    }

    updateUI() {
        const loginLink = document.getElementById('login-link');
        const profileLink = document.getElementById('profile-link');
        const coinsDisplay = document.getElementById('coins-display');
        const coinsAmount = document.getElementById('coins-amount');

        if (this.currentUser) {
            if (loginLink) loginLink.style.display = 'none';
            if (profileLink) profileLink.style.display = 'block';
            if (coinsDisplay) coinsDisplay.style.display = 'inline-block';
            if (coinsAmount) coinsAmount.textContent = this.currentUser.coins || 0;
        } else {
            if (loginLink) loginLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'none';
            if (coinsDisplay) coinsDisplay.style.display = 'none';
        }
    }
}

const authService = new AuthService();
export { authService };

