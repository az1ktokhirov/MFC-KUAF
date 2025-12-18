// Data fetching utility
class DataService {
    constructor() {
        this.cache = {};
    }

    async fetchJSON(path) {
        if (this.cache[path]) {
            return this.cache[path];
        }
        
        try {
            const response = await fetch(`data/${path}`);
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            const data = await response.json();
            this.cache[path] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return null;
        }
    }

    async getPlayers() {
        return await this.fetchJSON('players.json');
    }

    async getMatches() {
        return await this.fetchJSON('matches.json');
    }

    async getNews() {
        return await this.fetchJSON('news.json');
    }

    async getStoreProducts() {
        return await this.fetchJSON('store.json');
    }

    async getTickets() {
        return await this.fetchJSON('tickets.json');
    }

    async getUsers() {
        return await this.fetchJSON('users.json');
    }

    async getDonatePackages() {
        return await this.fetchJSON('donate_packages.json');
    }

    async getLeaderboard() {
        return await this.fetchJSON('leaderboard.json');
    }

    async getKUAFTV() {
        return await this.fetchJSON('kuaf_tv.json');
    }

    clearCache() {
        this.cache = {};
    }
}

const dataService = new DataService();
export { dataService };

