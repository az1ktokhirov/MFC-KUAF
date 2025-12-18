// Leaderboard Page
import { dataService } from '../data.js';
import { authService } from '../auth.js';

export async function renderLeaderboard() {
    const leaderboard = await dataService.getLeaderboard();
    const users = await dataService.getUsers();
    const currentUser = authService.getCurrentUser();

    // Merge leaderboard with user data
    const leaderboardData = leaderboard
        .map(entry => {
            const user = users.find(u => u.id === entry.userId);
            return {
                ...entry,
                username: entry.username,
                supportScore: entry.supportScore,
                isCurrentUser: currentUser && currentUser.id === entry.userId
            };
        })
        .sort((a, b) => b.supportScore - a.supportScore)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return `
        <div class="page active">
            <section class="section">
                <div class="container">
                    <h1 class="section-title">Monthly Leaderboard</h1>
                    <p style="text-align: center; margin-bottom: 30px; color: #666;">
                        Ranking for ${currentMonth} • Resets monthly
                    </p>

                    <div style="background: linear-gradient(135deg, #800020 0%, #000080 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 40px; text-align: center;">
                        <h2 style="color: white; margin-bottom: 15px;">Leaderboard Rewards</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
                            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                                <div style="font-size: 2rem; margin-bottom: 10px;">🥇</div>
                                <div style="font-weight: bold;">Top 3</div>
                                <div style="font-size: 0.875rem; margin-top: 5px;">KUAF Jersey</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                                <div style="font-size: 2rem; margin-bottom: 10px;">🏆</div>
                                <div style="font-weight: bold;">Top 4-10</div>
                                <div style="font-size: 0.875rem; margin-top: 5px;">Coins Reward</div>
                            </div>
                        </div>
                    </div>

                    <table class="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Support Score</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${leaderboardData.map(entry => {
                                const rankBadge = entry.rank === 1 ? 'rank-badge gold' :
                                                entry.rank === 2 ? 'rank-badge silver' :
                                                entry.rank === 3 ? 'rank-badge bronze' : '';
                                
                                return `
                                    <tr ${entry.isCurrentUser ? 'style="background: #fff3cd;"' : ''}>
                                        <td>
                                            ${entry.rank <= 3 ? `<span class="${rankBadge}">${entry.rank}</span>` : entry.rank}
                                        </td>
                                        <td>
                                            ${entry.username}
                                            ${entry.isCurrentUser ? '<span style="color: #800020; font-weight: bold;">(You)</span>' : ''}
                                        </td>
                                        <td><strong>${entry.supportScore.toLocaleString()}</strong></td>
                                        <td>
                                            ${entry.rank <= 3 ? '<span style="color: #800020; font-weight: bold;">🏆 Prize Winner</span>' : 
                                              entry.rank <= 10 ? '<span style="color: #000080;">💰 Coins Reward</span>' : 
                                              '<span style="color: #666;">-</span>'}
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>

                    ${currentUser ? `
                        <div style="margin-top: 40px; padding: 20px; background: #f5f5f5; border-radius: 10px;">
                            <h3 style="margin-bottom: 15px; color: #800020;">Your Current Stats</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                                <div>
                                    <div style="font-size: 1.5rem; color: #800020; font-weight: bold;">${currentUser.supportScore || 0}</div>
                                    <div style="color: #666;">Your Support Score</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.5rem; color: #800020; font-weight: bold;">
                                        #${leaderboardData.findIndex(e => e.userId === currentUser.id) + 1 || 'N/A'}
                                    </div>
                                    <div style="color: #666;">Your Rank</div>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <div style="text-align: center; margin-top: 40px;">
                            <a href="#login" class="btn btn-primary">Login to See Your Rank</a>
                        </div>
                    `}
                </div>
            </section>
        </div>
    `;
}

