// Player Detail Page - FC Barcelona Inspired Dark Theme Design
import { dataService } from '../data.js';

export async function renderPlayerDetail(playerId) {
    const players = await dataService.getPlayers();
    const player = players.find(p => p.id === parseInt(playerId));

    if (!player) {
        return `<div class="page active"><h1>Player not found</h1></div>`;
    }

    // Map position to category
    const getPositionCategory = (pos) => {
        if (pos === 'GK') return 'gk';
        if (['LB', 'RB', 'CB'].includes(pos)) return 'def';
        if (['DMF', 'CMF', 'AMF'].includes(pos)) return 'mid';
        if (['LW', 'RW', 'ST'].includes(pos)) return 'att';
        return 'mid';
    };

    return `
        <div class="page active player-page">
            <!-- Hero Header -->
            <section class="player-hero">
                <div class="player-hero__background">
                    <img src="${player.image || '/assets/images/Player.jpg'}" alt="${player.firstName} ${player.lastName}" onerror="this.src='https://via.placeholder.com/1920x600/1a1a1a/FFD700?text=Player'">
                    <div class="player-hero__overlay"></div>
                </div>
                <div class="player-hero__content">
                    <div class="player-hero__number">${player.id}</div>
                    <h1 class="player-hero__name">${player.firstName} ${player.lastName}</h1>
                    <div class="player-hero__position">${player.position}</div>
                </div>
            </section>

            <!-- Action Buttons -->
            <section class="player-actions">
                <div class="player-actions__container">
                    <a href="#squad" class="player-action-btn player-action-btn--back">
                        <span class="player-action-btn__icon">←</span>
                        <span class="player-action-btn__text">Back to Squad</span>
                    </a>
                    <button class="player-action-btn player-action-btn--share" onclick="sharePlayer()">
                        <span class="player-action-btn__icon">🔗</span>
                        <span class="player-action-btn__text">Share</span>
                    </button>
                    <a href="#store" class="player-action-btn player-action-btn--jersey">
                        <span class="player-action-btn__icon">👕</span>
                        <span class="player-action-btn__text">Buy Jersey</span>
                    </a>
                </div>
            </section>

            <!-- Player Info Section -->
            <section class="player-info">
                <div class="player-info__container">
                    <div class="player-info__grid">
                        <!-- Left Column -->
                        <div class="player-info__left">
                            <div class="player-info__section">
                                <h2 class="player-info__title">Player Information</h2>
                                <div class="player-info__details">
                                    <div class="player-info__detail">
                                        <span class="player-info__label">Age</span>
                                        <span class="player-info__value">${player.age} years</span>
                                    </div>
                                    <div class="player-info__detail">
                                        <span class="player-info__label">Height</span>
                                        <span class="player-info__value">${player.height}</span>
                                    </div>
                                    <div class="player-info__detail">
                                        <span class="player-info__label">Weight</span>
                                        <span class="player-info__value">${player.weight}</span>
                                    </div>
                                    <div class="player-info__detail">
                                        <span class="player-info__label">Nationality</span>
                                        <span class="player-info__value">${player.country || player.nationality || 'Uzbekistan'}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="player-info__section">
                                <h2 class="player-info__title">Statistics</h2>
                                <div class="player-stats">
                                    <div class="player-stat">
                                        <div class="player-stat__value">${player.appearances || 0}</div>
                                        <div class="player-stat__label">Appearances</div>
                                    </div>
                                    <div class="player-stat">
                                        <div class="player-stat__value">${player.goals || 0}</div>
                                        <div class="player-stat__label">Goals</div>
                                    </div>
                                    <div class="player-stat">
                                        <div class="player-stat__value">${player.assists || 0}</div>
                                        <div class="player-stat__label">Assists</div>
                                    </div>
                                    ${player.cleanSheets ? `
                                    <div class="player-stat">
                                        <div class="player-stat__value">${player.cleanSheets}</div>
                                        <div class="player-stat__label">Clean Sheets</div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="player-info__right">
                            <div class="player-info__section">
                                <h2 class="player-info__title">Biography</h2>
                                <p class="player-info__bio">${player.bio || player.description || 'A talented player with exceptional skills and dedication to the game.'}</p>
                            </div>

                            <!-- Stats Bars -->
                            <div class="player-info__section">
                                <h2 class="player-info__title">Player Attributes</h2>
                                <div class="player-attributes">
                                    <div class="player-attribute">
                                        <div class="player-attribute__header">
                                            <span class="player-attribute__name">Power</span>
                                            <span class="player-attribute__value">80</span>
                                        </div>
                                        <div class="player-attribute__bar">
                                            <div class="player-attribute__fill" style="width: 80%"></div>
                                        </div>
                                    </div>
                                    <div class="player-attribute">
                                        <div class="player-attribute__header">
                                            <span class="player-attribute__name">Speed</span>
                                            <span class="player-attribute__value">80</span>
                                        </div>
                                        <div class="player-attribute__bar">
                                            <div class="player-attribute__fill" style="width: 80%"></div>
                                        </div>
                                    </div>
                                    <div class="player-attribute">
                                        <div class="player-attribute__header">
                                            <span class="player-attribute__name">Technique</span>
                                            <span class="player-attribute__value">80</span>
                                        </div>
                                        <div class="player-attribute__bar">
                                            <div class="player-attribute__fill" style="width: 80%"></div>
                                        </div>
                                    </div>
                                    <div class="player-attribute">
                                        <div class="player-attribute__header">
                                            <span class="player-attribute__name">Stamina</span>
                                            <span class="player-attribute__value">80</span>
                                        </div>
                                        <div class="player-attribute__bar">
                                            <div class="player-attribute__fill" style="width: 80%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Share function
window.sharePlayer = function() {
    if (navigator.share) {
        navigator.share({
            title: document.querySelector('.player-hero__name').textContent,
            text: `Check out this FC KUAF player profile!`,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
};
