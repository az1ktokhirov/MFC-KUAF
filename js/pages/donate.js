// Donate Page
import { dataService } from '../data.js';
import { authService } from '../auth.js';

export async function renderDonate() {
    const packages = await dataService.getDonatePackages();
    const user = authService.getCurrentUser();

    return `
        <div class="page active">
            <section class="section">
                <div class="container">
                    <h1 class="section-title">Support FC KUAF</h1>
                    <p style="text-align: center; max-width: 800px; margin: 0 auto 40px; font-size: 1.1rem; color: #666;">
                        Your donations help support the club and earn you coins, support score, and exclusive badges!
                    </p>
                    
                    <div class="donate-packages">
                        ${packages.map(pkg => {
                            const badgeEmoji = pkg.badge === 'Bronze' ? '🥉' : 
                                             pkg.badge === 'Silver' ? '🥈' : 
                                             pkg.badge === 'Gold' ? '🥇' : '💎';
                            
                            return `
                                <div class="donate-package">
                                    <div class="donate-badge-icon">${badgeEmoji}</div>
                                    <div class="donate-amount">$${pkg.amount}</div>
                                    <h3 style="margin-bottom: 20px; color: #800020;">${pkg.badge} Package</h3>
                                    <ul class="donate-rewards">
                                        <li>✓ ${pkg.coins.toLocaleString()} Coins</li>
                                        <li>✓ ${pkg.score} Support Score</li>
                                        <li>✓ ${pkg.badge} Badge</li>
                                    </ul>
                                    ${user ? `
                                        <button class="btn btn-primary" onclick="processDonation(${pkg.id}, ${pkg.amount}, ${pkg.coins}, ${pkg.score}, '${pkg.badge}')" style="margin-top: 20px; width: 100%;">
                                            Donate $${pkg.amount}
                                        </button>
                                    ` : `
                                        <a href="#login" class="btn btn-primary" style="margin-top: 20px; width: 100%; display: block; text-align: center;">
                                            Login to Donate
                                        </a>
                                    `}
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div style="background: #f5f5f5; padding: 30px; border-radius: 10px; margin-top: 40px; max-width: 800px; margin-left: auto; margin-right: auto;">
                        <h3 style="margin-bottom: 15px; color: #800020;">Donation Rewards Explained</h3>
                        <ul style="line-height: 2;">
                            <li><strong>Coins:</strong> Virtual currency to purchase items in the store</li>
                            <li><strong>Support Score:</strong> Points that count towards the monthly leaderboard</li>
                            <li><strong>Badges:</strong> Show your support level with exclusive badges</li>
                        </ul>
                        <p style="margin-top: 20px; color: #666; font-style: italic;">
                            Note: Donations do not provide discounts on Premium subscriptions. Premium must be purchased separately.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

window.processDonation = async function(packageId, amount, coins, score, badge) {
    if (!authService.isAuthenticated()) {
        alert('Please login to donate');
        router.navigate('#login');
        return;
    }

    if (confirm(`Donate $${amount} and receive ${coins} coins, ${score} support score, and ${badge} badge?`)) {
        const user = authService.getCurrentUser();
        
        // Add coins
        authService.addCoins(coins);
        
        // Add support score
        authService.updateSupportScore(score);
        
        // Add badge if threshold met
        const totalScore = (user.supportScore || 0) + score;
        if (totalScore >= 500) {
            authService.addBadge('Diamond');
        } else if (totalScore >= 200) {
            authService.addBadge('Gold');
        } else if (totalScore >= 80) {
            authService.addBadge('Silver');
        } else if (totalScore >= 10) {
            authService.addBadge('Bronze');
        }
        
        // Add to donation history
        authService.addDonation({
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            coinsReceived: coins,
            scoreReceived: score
        });
        
        alert(`Thank you for your donation! You received ${coins} coins and ${score} support score!`);
        
        // Update leaderboard
        await updateLeaderboard();
    }
};

async function updateLeaderboard() {
    // In a real app, this would update the server-side leaderboard
    // For demo, we just refresh the leaderboard page if user is on it
    if (window.location.hash.includes('leaderboard')) {
        router.navigate('#leaderboard');
    }
}

