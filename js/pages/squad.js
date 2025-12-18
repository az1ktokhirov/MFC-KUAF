// Squad Page - FC Barcelona Inspired Dark Theme Design
import { dataService } from '../data.js';

export async function renderSquad() {
    const players = await dataService.getPlayers();
    
    // Group players by position category
    const allPlayers = players;
    const gkPlayers = players.filter(p => p.position === 'GK');
    const defPlayers = players.filter(p => ['LB', 'RB', 'CB'].includes(p.position));
    const midPlayers = players.filter(p => ['DMF', 'CMF', 'AMF'].includes(p.position));
    const attPlayers = players.filter(p => ['LW', 'RW', 'ST'].includes(p.position));

    return `
        <div class="page active squad-page">
            <!-- Hero Section -->
            <section class="squad-hero">
                <div class="squad-hero__content">
                    <div class="squad-hero__logo">
                        <img src="/assets/images/Logo.png" alt="FC KUAF Logo" onerror="this.src='https://via.placeholder.com/200/800020/FFFFFF?text=KUAF'">
                    </div>
                    <h1 class="squad-hero__title">First Team Squad</h1>
                    <p class="squad-hero__subtitle">2025 Season</p>
                </div>
            </section>

            <!-- Filter Bar -->
            <section class="squad-filters">
                <div class="squad-filters__container">
                    <button class="squad-filter squad-filter--active" data-filter="all">
                        <span class="squad-filter__text">ALL</span>
                    </button>
                    <button class="squad-filter" data-filter="gk">
                        <span class="squad-filter__text">GK</span>
                    </button>
                    <button class="squad-filter" data-filter="def">
                        <span class="squad-filter__text">DEF</span>
                    </button>
                    <button class="squad-filter" data-filter="mid">
                        <span class="squad-filter__text">MID</span>
                    </button>
                    <button class="squad-filter" data-filter="att">
                        <span class="squad-filter__text">ATT</span>
                    </button>
                </div>
            </section>

            <!-- Player Grid -->
            <section class="squad-players">
                <div class="squad-players__container">
                    <!-- All Players (Default) -->
                    <div class="squad-players__grid squad-players__grid--all active" data-category="all">
                        ${allPlayers.map(player => `
                            <div class="squad-player-card" data-position="${player.position.toLowerCase()}" onclick="router.navigate('#player/${player.id}')">
                                <div class="squad-player-card__image">
                                    <img src="${player.image || '/assets/images/Player.jpg'}" alt="${player.firstName} ${player.lastName}" onerror="this.src='https://via.placeholder.com/400/1a1a1a/FFD700?text=Player'">
                                    <div class="squad-player-card__number">${player.id}</div>
                                    <div class="squad-player-card__position">${player.position}</div>
                                </div>
                                <div class="squad-player-card__overlay">
                                    <div class="squad-player-card__name">${player.firstName}<br>${player.lastName}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- GK Players -->
                    <div class="squad-players__grid squad-players__grid--gk" data-category="gk">
                        ${gkPlayers.map(player => `
                            <div class="squad-player-card" onclick="router.navigate('#player/${player.id}')">
                                <div class="squad-player-card__image">
                                    <img src="${player.image || '/assets/images/Player.jpg'}" alt="${player.firstName} ${player.lastName}" onerror="this.src='https://via.placeholder.com/400/1a1a1a/FFD700?text=Player'">
                                    <div class="squad-player-card__number">${player.id}</div>
                                    <div class="squad-player-card__position">${player.position}</div>
                                </div>
                                <div class="squad-player-card__overlay">
                                    <div class="squad-player-card__name">${player.firstName}<br>${player.lastName}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- DEF Players -->
                    <div class="squad-players__grid squad-players__grid--def" data-category="def">
                        ${defPlayers.map(player => `
                            <div class="squad-player-card" onclick="router.navigate('#player/${player.id}')">
                                <div class="squad-player-card__image">
                                    <img src="${player.image || '/assets/images/Player.jpg'}" alt="${player.firstName} ${player.lastName}" onerror="this.src='https://via.placeholder.com/400/1a1a1a/FFD700?text=Player'">
                                    <div class="squad-player-card__number">${player.id}</div>
                                    <div class="squad-player-card__position">${player.position}</div>
                                </div>
                                <div class="squad-player-card__overlay">
                                    <div class="squad-player-card__name">${player.firstName}<br>${player.lastName}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- MID Players -->
                    <div class="squad-players__grid squad-players__grid--mid" data-category="mid">
                        ${midPlayers.map(player => `
                            <div class="squad-player-card" onclick="router.navigate('#player/${player.id}')">
                                <div class="squad-player-card__image">
                                    <img src="${player.image || '/assets/images/Player.jpg'}" alt="${player.firstName} ${player.lastName}" onerror="this.src='https://via.placeholder.com/400/1a1a1a/FFD700?text=Player'">
                                    <div class="squad-player-card__number">${player.id}</div>
                                    <div class="squad-player-card__position">${player.position}</div>
                                </div>
                                <div class="squad-player-card__overlay">
                                    <div class="squad-player-card__name">${player.firstName}<br>${player.lastName}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- ATT Players -->
                    <div class="squad-players__grid squad-players__grid--att" data-category="att">
                        ${attPlayers.map(player => `
                            <div class="squad-player-card" onclick="router.navigate('#player/${player.id}')">
                                <div class="squad-player-card__image">
                                    <img src="${player.image || '/assets/images/Player.jpg'}" alt="${player.firstName} ${player.lastName}" onerror="this.src='https://via.placeholder.com/400/1a1a1a/FFD700?text=Player'">
                                    <div class="squad-player-card__number">${player.id}</div>
                                    <div class="squad-player-card__position">${player.position}</div>
                                </div>
                                <div class="squad-player-card__overlay">
                                    <div class="squad-player-card__name">${player.firstName}<br>${player.lastName}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Filter functionality
setTimeout(() => {
    const filters = document.querySelectorAll('.squad-filter');
    const grids = document.querySelectorAll('.squad-players__grid');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.filter;

            // Update active filter
            filters.forEach(f => f.classList.remove('squad-filter--active'));
            filter.classList.add('squad-filter--active');

            // Show/hide grids
            grids.forEach(grid => {
                if (category === 'all') {
                    if (grid.dataset.category === 'all') {
                        grid.classList.add('active');
                    } else {
                        grid.classList.remove('active');
                    }
                } else {
                    if (grid.dataset.category === category) {
                        grid.classList.add('active');
                    } else {
                        grid.classList.remove('active');
                    }
                }
            });
        });
    });
}, 100);
