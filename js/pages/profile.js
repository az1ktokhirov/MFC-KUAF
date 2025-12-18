// Profile Page
import { authService } from '../auth.js';
import { premiumService } from '../premium.js';

export async function renderProfile() {
    const user = authService.getCurrentUser();

    if (!user) {
        router.navigate('#login');
        return '';
    }

    const isPremium = premiumService.isPremium();

    return `
        <div class="page active">
            <section class="profile-header">
                <div class="container">
                    <img src="${user.avatar || 'https://via.placeholder.com/150'}" alt="${user.username}" class="profile-avatar">
                    <h1 style="color: white; margin-bottom: 10px;">${user.username}</h1>
                    ${isPremium ? '<span class="premium-user-badge">⭐ Premium Member</span>' : ''}
                    <button onclick="authService.logout(); router.navigate('#home');" class="btn" style="background: white; color: #800020; margin-top: 20px;">Logout</button>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="profile-stats">
                        <div class="stat-card">
                            <div class="stat-value">${user.coins || 0}</div>
                            <div class="stat-label">Coins</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${user.supportScore || 0}</div>
                            <div class="stat-label">Support Score</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${isPremium ? 'Yes' : 'No'}</div>
                            <div class="stat-label">Premium Status</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${user.badges?.length || 0}</div>
                            <div class="stat-label">Badges</div>
                        </div>
                    </div>

                    <div style="margin: 40px 0;">
                        <h2 class="section-subtitle">Your Badges</h2>
                        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                            ${user.badges && user.badges.length > 0 ? user.badges.map(badge => {
                                const badgeEmoji = badge === 'Bronze' ? '🥉' : 
                                                 badge === 'Silver' ? '🥈' : 
                                                 badge === 'Gold' ? '🥇' : 
                                                 badge === 'Diamond' ? '💎' : 
                                                 badge === 'Premium' ? '⭐' : '🏅';
                                return `
                                    <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; text-align: center; min-width: 120px;">
                                        <div style="font-size: 3rem; margin-bottom: 10px;">${badgeEmoji}</div>
                                        <div style="font-weight: bold; color: #800020;">${badge}</div>
                                    </div>
                                `;
                            }).join('') : '<p style="color: #666;">No badges yet. Donate to earn badges!</p>'}
                        </div>
                    </div>

                    ${user.donationHistory && user.donationHistory.length > 0 ? `
                        <div style="margin: 40px 0;">
                            <h2 class="section-subtitle">Donation History</h2>
                            <table class="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Coins Received</th>
                                        <th>Score Received</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${user.donationHistory.map(donation => `
                                        <tr>
                                            <td>${donation.date}</td>
                                            <td>$${donation.amount}</td>
                                            <td>${donation.coinsReceived.toLocaleString()}</td>
                                            <td>${donation.scoreReceived}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : ''}

                    ${!isPremium ? `
                        <div style="background: linear-gradient(135deg, #800020 0%, #000080 100%); color: white; padding: 40px; border-radius: 10px; text-align: center; margin: 40px 0;">
                            <h2 style="color: white; margin-bottom: 20px;">Upgrade to Premium</h2>
                            <p style="margin-bottom: 30px;">Get access to KUAF TV, exclusive discounts, and more!</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px;">
                                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                                    <div style="font-size: 2rem; font-weight: bold; margin-bottom: 10px;">$4.99</div>
                                    <div>Per Month</div>
                                </div>
                                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                                    <div style="font-size: 2rem; font-weight: bold; margin-bottom: 10px;">$50</div>
                                    <div>Per Year (Save 2 months!)</div>
                                </div>
                            </div>
                            <button class="btn" style="background: #ffd700; color: #000; margin-top: 30px; padding: 15px 30px;" onclick="alert('Premium upgrade coming soon!')">
                                Upgrade Now
                            </button>
                        </div>
                    ` : ''}
                </div>
            </section>
        </div>
    `;
}

