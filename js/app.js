// Main Application Entry Point
import { router } from './router.js';
import { authService } from './auth.js';
import { premiumService } from './premium.js';
import { dataService } from './data.js';
import { themeManager } from './theme.js';
import { globalSearch } from './search.js';
import { cartService } from './cart.js';
import { renderHome } from './pages/home.js';
import { renderSquad } from './pages/squad.js';
import { renderPlayerDetail } from './pages/player-detail.js';
import { renderMatches } from './pages/matches.js';
import { renderTickets } from './pages/tickets.js';
import { renderKUAFTV, renderVideoPlayer } from './pages/kuaf-tv.js';
import { renderStore } from './pages/store.js';
import { renderDonate } from './pages/donate.js';
import { renderLeaderboard } from './pages/leaderboard.js';
import { renderLogin } from './pages/login.js';
import { renderProfile } from './pages/profile.js';

// Make services globally accessible
window.router = router;
window.authService = authService;
window.premiumService = premiumService;
window.dataService = dataService;
window.themeManager = themeManager;
// Theme manager initializes itself in theme.js

// Register routes
router.register('home', renderHome);
router.register('squad', renderSquad);
router.register('matches', renderMatches);
router.register('tickets', renderTickets);
router.register('kuaf-tv', renderKUAFTV);
router.register('store', renderStore);
router.register('donate', renderDonate);
router.register('leaderboard', renderLeaderboard);
router.register('login', renderLogin);
router.register('profile', renderProfile);

// Dynamic routes
router.register('player', async () => {
    const hash = window.location.hash;
    const match = hash.match(/player\/(\d+)/);
    if (match) {
        return await renderPlayerDetail(match[1]);
    }
    return await renderSquad();
});

router.register('tv', async () => {
    const hash = window.location.hash;
    const match = hash.match(/tv\/(\d+)/);
    if (match) {
        // Navigate to KUAF TV page first, then open overlay
        router.navigate('#kuaf-tv');
        setTimeout(async () => {
            await renderVideoPlayer(match[1]);
        }, 300);
        return await renderKUAFTV();
    }
    return await renderKUAFTV();
});

// Event delegation for dynamically loaded content
document.addEventListener('submit', async (e) => {
    // Handle login form
    if (e.target.id === 'login-form') {
        e.preventDefault();
        const username = document.getElementById('username')?.value;
        const password = document.getElementById('password')?.value;
        const errorDiv = document.getElementById('login-error');

        if (!username || !password) {
            if (errorDiv) {
                errorDiv.textContent = 'Please fill in all fields';
                errorDiv.style.display = 'block';
            }
            return;
        }

        try {
            const result = await authService.login(username, password);
            if (result.success) {
                router.navigate('#profile');
            } else {
                if (errorDiv) {
                    errorDiv.textContent = result.message || 'Login failed';
                    errorDiv.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            if (errorDiv) {
                errorDiv.textContent = 'An error occurred. Please try again.';
                errorDiv.style.display = 'block';
            }
        }
    }

    // Handle newsletter form
    if (e.target.id === 'newsletter-form') {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput?.value.trim();
        
        if (!email) {
            showNewsletterMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNewsletterMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Load existing subscribers
        let subscribers = [];
        try {
            const stored = localStorage.getItem('fc_kuaf_newsletter');
            subscribers = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading newsletter subscribers:', error);
        }
        
        // Check for duplicates
        if (subscribers.includes(email.toLowerCase())) {
            showNewsletterMessage('You are already subscribed to our newsletter!', 'info');
            e.target.reset();
            return;
        }
        
        // Add email to subscribers
        subscribers.push(email.toLowerCase());
        try {
            localStorage.setItem('fc_kuaf_newsletter', JSON.stringify(subscribers));
            showNewsletterMessage('Thank you for subscribing to our newsletter!', 'success');
            e.target.reset();
        } catch (error) {
            console.error('Error saving newsletter subscription:', error);
            showNewsletterMessage('An error occurred. Please try again.', 'error');
        }
    }
});

// Newsletter message function
function showNewsletterMessage(message, type = 'success') {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:150',message:'showNewsletterMessage called',data:{message,type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Remove existing message
    const existing = document.querySelector('.newsletter-message');
    if (existing) {
        existing.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `newsletter-message newsletter-message--${type}`;
    messageEl.textContent = message;
    
    // Find newsletter form and insert message
    const form = document.getElementById('newsletter-form');
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:165',message:'Newsletter form lookup',data:{formFound:!!form},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    if (form) {
        form.parentNode.insertBefore(messageEl, form.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 5000);
    } else {
        // Fallback to alert
        alert(message);
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Initialize auth UI
authService.updateUI();

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    const button = e.target.closest('button, .btn, a.btn');
    if (button && !button.disabled) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

