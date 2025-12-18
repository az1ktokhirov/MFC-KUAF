// Smart Global Search System
import { dataService } from './data.js';

class GlobalSearch {
    constructor() {
        this.isOpen = false;
        this.searchData = {
            players: [],
            news: [],
            matches: [],
            products: []
        };
        this.init();
    }

    async init() {
        // Preload search data
        await this.loadSearchData();
        
        // Create search modal HTML
        this.createSearchModal();
        
        // Add search icon to header
        this.addSearchIcon();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    async loadSearchData() {
        try {
            this.searchData.players = await dataService.getPlayers() || [];
            this.searchData.news = await dataService.getNews() || [];
            this.searchData.matches = await dataService.getMatches() || [];
            this.searchData.products = await dataService.getStoreProducts() || [];
        } catch (error) {
            console.error('Error loading search data:', error);
        }
    }

    createSearchModal() {
        const modal = document.createElement('div');
        modal.id = 'global-search-modal';
        modal.className = 'global-search-modal';
        modal.innerHTML = `
            <div class="global-search-overlay"></div>
            <div class="global-search-container">
                <div class="global-search-header">
                    <input 
                        type="text" 
                        id="global-search-input" 
                        class="global-search-input" 
                        placeholder="Search players, news, matches, products..."
                        autocomplete="off"
                    >
                    <button class="global-search-close" id="global-search-close" aria-label="Close search">
                        <span>✕</span>
                    </button>
                </div>
                <div class="global-search-results" id="global-search-results">
                    <div class="global-search-empty">
                        <p>Start typing to search...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    addSearchIcon() {
        const navContent = document.querySelector('.nav-content');
        if (navContent) {
            const searchIcon = document.createElement('button');
            searchIcon.id = 'global-search-trigger';
            searchIcon.className = 'global-search-trigger';
            searchIcon.innerHTML = '🔍';
            searchIcon.setAttribute('aria-label', 'Open search');
            searchIcon.title = 'Search (Ctrl+K)';
            
            // Insert before mobile menu toggle
            const mobileToggle = document.getElementById('mobile-menu-toggle');
            if (mobileToggle) {
                navContent.insertBefore(searchIcon, mobileToggle);
            } else {
                navContent.appendChild(searchIcon);
            }
        }
    }

    setupEventListeners() {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/81bb555f-7f80-490a-9e3e-910f552edadf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'search.js:90',message:'setupEventListeners called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        
        // Open search
        document.addEventListener('click', (e) => {
            if (e.target.closest('#global-search-trigger')) {
                this.open();
            }
        });

        // Close search
        document.addEventListener('click', (e) => {
            if (e.target.closest('#global-search-close') || 
                e.target.closest('.global-search-overlay')) {
                this.close();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K to open
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            // Escape to close
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Search input - use event delegation since modal might not exist yet
        document.addEventListener('input', (e) => {
            if (e.target.id === 'global-search-input') {
                this.performSearch(e.target.value);
            }
        });

        // Focus input when modal opens
        this.observeModal();
    }

    observeModal() {
        const modal = document.getElementById('global-search-modal');
        if (!modal) return;

        const observer = new MutationObserver(() => {
            if (this.isOpen) {
                const input = document.getElementById('global-search-input');
                if (input) {
                    setTimeout(() => input.focus(), 100);
                }
            }
        });

        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }

    open() {
        this.isOpen = true;
        const modal = document.getElementById('global-search-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus input
            setTimeout(() => {
                const input = document.getElementById('global-search-input');
                if (input) input.focus();
            }, 100);
        }
    }

    close() {
        this.isOpen = false;
        const modal = document.getElementById('global-search-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Clear search
            const input = document.getElementById('global-search-input');
            if (input) {
                input.value = '';
                this.performSearch('');
            }
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    performSearch(query) {
        const resultsContainer = document.getElementById('global-search-results');
        if (!resultsContainer) return;

        const trimmedQuery = query.trim().toLowerCase();
        
        if (!trimmedQuery) {
            resultsContainer.innerHTML = `
                <div class="global-search-empty">
                    <p>Start typing to search...</p>
                </div>
            `;
            return;
        }

        const results = {
            players: this.searchPlayers(trimmedQuery),
            news: this.searchNews(trimmedQuery),
            matches: this.searchMatches(trimmedQuery),
            products: this.searchProducts(trimmedQuery)
        };

        const totalResults = results.players.length + results.news.length + 
                           results.matches.length + results.products.length;

        if (totalResults === 0) {
            resultsContainer.innerHTML = `
                <div class="global-search-empty">
                    <p>No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = this.renderResults(results);
    }

    searchPlayers(query) {
        return this.searchData.players
            .filter(player => {
                const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
                const position = (player.position || '').toLowerCase();
                return fullName.includes(query) || position.includes(query);
            })
            .slice(0, 5);
    }

    searchNews(query) {
        return this.searchData.news
            .filter(item => {
                const title = (item.title || '').toLowerCase();
                const excerpt = (item.excerpt || '').toLowerCase();
                const category = (item.category || '').toLowerCase();
                return title.includes(query) || excerpt.includes(query) || category.includes(query);
            })
            .slice(0, 5);
    }

    searchMatches(query) {
        return this.searchData.matches
            .filter(match => {
                const homeTeam = (match.homeTeam || '').toLowerCase();
                const awayTeam = (match.awayTeam || '').toLowerCase();
                const competition = (match.competition || '').toLowerCase();
                const venue = (match.venue || '').toLowerCase();
                return homeTeam.includes(query) || awayTeam.includes(query) || 
                       competition.includes(query) || venue.includes(query);
            })
            .slice(0, 5);
    }

    searchProducts(query) {
        return this.searchData.products
            .filter(product => {
                const name = (product.name || '').toLowerCase();
                const description = (product.description || '').toLowerCase();
                const category = (product.category || '').toLowerCase();
                return name.includes(query) || description.includes(query) || category.includes(query);
            })
            .slice(0, 5);
    }

    renderResults(results) {
        let html = '';

        // Players
        if (results.players.length > 0) {
            html += `
                <div class="global-search-section">
                    <h3 class="global-search-section-title">Players</h3>
                    <div class="global-search-items">
                        ${results.players.map(player => `
                            <a href="#player/${player.id}" class="global-search-item" onclick="window.globalSearch.close()">
                                <div class="global-search-item-icon">👤</div>
                                <div class="global-search-item-content">
                                    <div class="global-search-item-title">${player.firstName} ${player.lastName}</div>
                                    <div class="global-search-item-subtitle">${player.position || 'Player'}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // News
        if (results.news.length > 0) {
            html += `
                <div class="global-search-section">
                    <h3 class="global-search-section-title">News</h3>
                    <div class="global-search-items">
                        ${results.news.map(item => `
                            <a href="#news" class="global-search-item" onclick="window.globalSearch.close()">
                                <div class="global-search-item-icon">📰</div>
                                <div class="global-search-item-content">
                                    <div class="global-search-item-title">${item.title}</div>
                                    <div class="global-search-item-subtitle">${item.category || 'News'}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Matches
        if (results.matches.length > 0) {
            html += `
                <div class="global-search-section">
                    <h3 class="global-search-section-title">Matches</h3>
                    <div class="global-search-items">
                        ${results.matches.map(match => `
                            <a href="#matches" class="global-search-item" onclick="window.globalSearch.close()">
                                <div class="global-search-item-icon">⚽</div>
                                <div class="global-search-item-content">
                                    <div class="global-search-item-title">${match.homeTeam} vs ${match.awayTeam}</div>
                                    <div class="global-search-item-subtitle">${match.competition || 'Match'} • ${match.date || ''}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Products
        if (results.products.length > 0) {
            html += `
                <div class="global-search-section">
                    <h3 class="global-search-section-title">Store</h3>
                    <div class="global-search-items">
                        ${results.products.map(product => `
                            <a href="#store" class="global-search-item" onclick="window.globalSearch.close()">
                                <div class="global-search-item-icon">🛍️</div>
                                <div class="global-search-item-content">
                                    <div class="global-search-item-title">${product.name}</div>
                                    <div class="global-search-item-subtitle">$${product.price?.toFixed(2) || '0.00'}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        return html;
    }
}

const globalSearch = new GlobalSearch();
window.globalSearch = globalSearch;
export { globalSearch };

