// Matches Page
import { dataService } from '../data.js';

export async function renderMatches() {
    const matches = await dataService.getMatches();
    const upcomingMatches = matches.filter(m => m.status === 'upcoming');
    const pastMatches = matches.filter(m => m.status === 'completed');

    return `
        <div class="page active">
            <section class="section">
                <div class="container">
                    <h1 class="section-title">Matches</h1>
                    
                    <div style="margin: 40px 0;">
                        <h2 class="section-subtitle">Upcoming Matches</h2>
                        ${upcomingMatches.length > 0 ? upcomingMatches.map(match => `
                            <div class="match-card">
                                <div class="match-header">
                                    <span class="match-date">${match.date} - ${match.time}</span>
                                    <span class="match-status upcoming">${match.status}</span>
                                </div>
                                <div class="match-teams">
                                    <div class="team home">${match.homeTeam}</div>
                                    <div class="match-score">vs</div>
                                    <div class="team">${match.awayTeam}</div>
                                </div>
                                <div class="match-venue">📍 ${match.venue} | ${match.competition}</div>
                                <div style="margin-top: 15px;">
                                    <a href="#tickets?match=${match.id}" class="btn btn-primary">Buy Tickets</a>
                                </div>
                            </div>
                        `).join('') : '<p>No upcoming matches scheduled.</p>'}
                    </div>

                    <div style="margin: 60px 0;">
                        <h2 class="section-subtitle">Past Matches</h2>
                        ${pastMatches.map(match => `
                            <div class="match-card">
                                <div class="match-header">
                                    <span class="match-date">${match.date}</span>
                                    <span class="match-status completed">${match.status}</span>
                                </div>
                                <div class="match-teams">
                                    <div class="team home">${match.homeTeam}</div>
                                    <div class="match-score">${match.homeScore} - ${match.awayScore}</div>
                                    <div class="team">${match.awayTeam}</div>
                                </div>
                                <div class="match-venue">📍 ${match.venue} | ${match.competition} | Attendance: ${match.attendance?.toLocaleString() || 'N/A'}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        </div>
    `;
}

