// Tickets Page
import { dataService } from '../data.js';
import { premiumService } from '../premium.js';
import { authService } from '../auth.js';

export async function renderTickets() {
    const tickets = await dataService.getTickets();
    const matches = await dataService.getMatches();
    
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const matchId = urlParams.get('match');

    const ticketsToShow = matchId 
        ? tickets.filter(t => t.matchId === parseInt(matchId))
        : tickets.filter(t => {
            const match = matches.find(m => m.id === t.matchId);
            return match && match.status === 'upcoming';
        });

    const isPremium = premiumService.isPremium();

    // Helper function to format date
    const formatDate = (dateString, timeString) => {
        const date = new Date(dateString);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year} – ${timeString}`;
    };

    const ticketCards = ticketsToShow.map(ticket => {
        const match = matches.find(m => m.id === ticket.matchId);
        if (!match) return '';

        const originalPrice = ticket.basePrice;
        const discountedPrice = premiumService.getTicketPrice(originalPrice);
        const hasDiscount = isPremium && discountedPrice < originalPrice;

        // Generate match image URL (using football stadium image)
        const matchImage = `https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop`;

        return `
            <div class="ticket-card">
                <div class="ticket-card-image">
                    <img src="${matchImage}" alt="${match.homeTeam} vs ${match.awayTeam}" onerror="this.src='https://via.placeholder.com/600x400/800020/FFFFFF?text=FC+KUAF+Match'">
                    ${hasDiscount ? '<span class="ticket-premium-badge">Premium -50%</span>' : ''}
                </div>
                <div class="ticket-card-content">
                    <h3 class="ticket-card-title">${match.homeTeam} vs ${match.awayTeam}</h3>
                    <div class="ticket-card-info">
                        <div class="ticket-info-item">
                            <span class="ticket-info-icon">📅</span>
                            <span>${formatDate(match.date, match.time)}</span>
                        </div>
                        <div class="ticket-info-item">
                            <span class="ticket-info-icon">📍</span>
                            <span>${match.venue}</span>
                        </div>
                        <div class="ticket-info-item">
                            <span class="ticket-info-icon">🎫</span>
                            <span>${ticket.category} Ticket</span>
                        </div>
                        <div class="ticket-info-item">
                            <span class="ticket-info-icon">🪑</span>
                            <span>${ticket.available} available</span>
                        </div>
                    </div>
                    <div class="ticket-card-price">
                        ${hasDiscount ? `
                            <div class="ticket-price-original">$${originalPrice.toFixed(2)}</div>
                            <div class="ticket-price-discounted">$${discountedPrice.toFixed(2)}</div>
                        ` : `
                            <div class="ticket-price-normal">$${originalPrice.toFixed(2)}</div>
                        `}
                    </div>
                    <button class="btn btn-ticket-buy" onclick="purchaseTicket(${ticket.id}, ${discountedPrice}, '${match.homeTeam} vs ${match.awayTeam}')">
                        BUY NOW
                    </button>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="page active">
            <section class="section">
                <div class="container">
                    <h1 class="section-title">Match Tickets</h1>
                    ${isPremium ? '<div class="ticket-premium-notice">🎉 Premium Members Get 50% Discount on All Tickets!</div>' : ''}
                    
                    ${ticketsToShow.length === 0 ? `
                        <div style="text-align: center; padding: 60px 20px;">
                            <p style="font-size: 1.2rem; color: #666;">No upcoming matches with available tickets.</p>
                            <a href="#matches" class="btn btn-primary" style="margin-top: 20px;">View All Matches</a>
                        </div>
                    ` : `
                        <div class="ticket-grid">
                            ${ticketCards}
                        </div>
                    `}
                </div>
            </section>
        </div>
    `;
}

// Purchase ticket function
window.purchaseTicket = function(ticketId, price, matchTitle) {
    if (!authService.isAuthenticated()) {
        alert('Please login to purchase tickets');
        router.navigate('#login');
        return;
    }
    
    if (confirm(`Purchase ticket for ${matchTitle} at $${price.toFixed(2)}?`)) {
        alert('Ticket purchased successfully! (Demo)\n\nYou will receive a confirmation email shortly.');
    }
};
