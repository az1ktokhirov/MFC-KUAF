// Theme Toggle System
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('kuaf-theme') || 'dark';
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        // Attach button handler
        this.attachToggleHandler();
    }

    applyTheme(theme) {
        try {
            const html = document.documentElement;
            if (!html) {
                console.error('document.documentElement not available');
                return;
            }

            html.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            localStorage.setItem('kuaf-theme', theme);
            
            // Update button
            this.updateToggleButton();
            
            // Update favicon
            this.updateFavicon(theme);
            
            console.log('Theme applied:', theme);
        } catch (error) {
            console.error('Error applying theme:', error);
        }
    }

    updateFavicon(theme) {
        // Remove existing favicon links
        const existingFavicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
        existingFavicons.forEach(link => link.remove());

        // Create new favicon link
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        
        // Use theme-appropriate favicon
        // For dark theme, use a darker version; for light theme, use a lighter version
        // Since we're using Logo.png, we'll use it for both but could create separate files
        if (theme === 'dark') {
            favicon.href = '/assets/images/Logo.png';
        } else {
            favicon.href = '/assets/images/Logo.png';
        }
        
        // Add to head
        document.head.appendChild(favicon);
        
        // Also update apple-touch-icon for iOS
        const appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (appleIcon) {
            appleIcon.href = '/assets/images/Logo.png';
        } else {
            const newAppleIcon = document.createElement('link');
            newAppleIcon.rel = 'apple-touch-icon';
            newAppleIcon.href = '/assets/images/Logo.png';
            document.head.appendChild(newAppleIcon);
        }
    }

    updateToggleButton() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            const isDark = this.currentTheme === 'dark';
            toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
            toggle.innerHTML = isDark ? '☀️' : '🌙';
            toggle.setAttribute('data-theme', this.currentTheme);
        }
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        console.log('Toggling theme:', this.currentTheme, '→', newTheme);
        this.applyTheme(newTheme);
    }

    attachToggleHandler() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            // Remove any existing listeners by cloning
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            // Add click listener
            newToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });
        } else {
            // If button doesn't exist yet, use event delegation
            document.addEventListener('click', (e) => {
                if (e.target && (e.target.id === 'theme-toggle' || e.target.closest('#theme-toggle'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggle();
                }
            }, { once: false });
        }
    }
}

// Create instance immediately
const themeManager = new ThemeManager();

// Apply theme immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager.init();
    });
} else {
    // DOM already ready
    themeManager.init();
}

export { themeManager };
