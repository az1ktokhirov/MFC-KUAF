// Home Page - Barcelona-Inspired Redesign
import { dataService } from '../data.js';

export async function renderHome() {
    const news = await dataService.getNews();
    const matches = await dataService.getMatches();
    
    const latestNews = news.slice(0, 3);
    const upcomingMatches = matches.filter(m => m.status === 'upcoming').slice(0, 3);
    const recentResults = matches.filter(m => m.status === 'completed').slice(0, 3);
    const nextMatch = upcomingMatches[0];

    return `
        <div class="page active home-page fade-in">
            <!-- Hero Section -->
            <section class="home-hero">
                <div class="home-hero__background">
                    <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920" alt="FC KUAF Stadium" onerror="this.style.display='none'">
                    <div class="home-hero__overlay"></div>
                </div>
                <div class="home-hero__content fade-slide-up">
                    <div class="home-hero__logo">
                        <img src="/assets/images/Logo.png" alt="FC KUAF Logo" onerror="this.src='https://via.placeholder.com/300'">
                    </div>
                    <h1 class="home-hero__title">Welcome to FC KUAF</h1>
                    <p class="home-hero__subtitle">Official Website of FC KUAF Football Club</p>
                </div>
            </section>

            <!-- Next Match Card -->
            ${nextMatch ? `
            <section class="next-match-section">
                <div class="container">
                    <div class="next-match-card card-hover scale-in">
                        <div class="next-match-card__header">
                            <span class="next-match-card__label">Next Match</span>
                            <span class="next-match-card__date">${nextMatch.date} - ${nextMatch.time}</span>
                        </div>
                        <div class="next-match-card__teams">
                            <div class="next-match-card__team next-match-card__team--home">
                                <div class="next-match-card__team-name">${nextMatch.homeTeam}</div>
                            </div>
                            <div class="next-match-card__vs">VS</div>
                            <div class="next-match-card__team">
                                <div class="next-match-card__team-name">${nextMatch.awayTeam}</div>
                            </div>
                        </div>
                        <div class="next-match-card__venue">
                            <span>📍</span> ${nextMatch.venue}
                        </div>
                        <a href="#tickets?match=${nextMatch.id}" class="btn btn-primary next-match-card__button">Buy Tickets</a>
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Latest News Carousel -->
            <section class="home-news-section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Latest News</h2>
                        <a href="#news" class="section-link">View All →</a>
                    </div>
                    <div class="news-carousel">
                        ${latestNews.map((item, index) => `
                            <article class="news-card card-hover fade-slide-up" style="animation-delay: ${index * 0.1}s">
                                <div class="news-card__image">
                                    <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x250'">
                                </div>
                                <div class="news-card__content">
                                    <span class="news-card__category">${item.category}</span>
                                    <h3 class="news-card__title">${item.title}</h3>
                                    <p class="news-card__excerpt">${item.excerpt}</p>
                                    <span class="news-card__date">${item.date}</span>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Recent Results -->
            ${recentResults.length > 0 ? `
            <section class="home-results-section">
                <div class="container">
                    <h2 class="section-title">Recent Results</h2>
                    <div class="results-grid">
                        ${recentResults.map(match => `
                            <div class="result-card card-hover fade-slide-up">
                                <div class="result-card__header">
                                    <span class="result-card__date">${match.date}</span>
                                    <span class="result-card__competition">${match.competition}</span>
                                </div>
                                <div class="result-card__score">
                                    <div class="result-card__team">${match.homeTeam}</div>
                                    <div class="result-card__numbers">${match.homeScore} - ${match.awayScore}</div>
                                    <div class="result-card__team">${match.awayTeam}</div>
                                </div>
                                <div class="result-card__venue">📍 ${match.venue}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Quick Links -->
            <section class="home-quick-links">
                <div class="container">
                    <div class="quick-links-grid">
                        <a href="#squad" class="quick-link-card card-hover glow-hover">
                            <div class="quick-link-card__icon">👥</div>
                            <h3 class="quick-link-card__title">Squad</h3>
                            <p class="quick-link-card__desc">Meet our players</p>
                        </a>
                        <a href="#store" class="quick-link-card card-hover glow-hover">
                            <div class="quick-link-card__icon">🛍️</div>
                            <h3 class="quick-link-card__title">Store</h3>
                            <p class="quick-link-card__desc">Official merchandise</p>
                        </a>
                        <a href="#kuaf-tv" class="quick-link-card card-hover glow-hover">
                            <div class="quick-link-card__icon">📺</div>
                            <h3 class="quick-link-card__title">KUAF TV</h3>
                            <p class="quick-link-card__desc">Exclusive content</p>
                        </a>
                        <a href="#donate" class="quick-link-card card-hover glow-hover">
                            <div class="quick-link-card__icon">❤️</div>
                            <h3 class="quick-link-card__title">Donate</h3>
                            <p class="quick-link-card__desc">Support the club</p>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Newsletter -->
            <section class="home-newsletter">
                <div class="container">
                    <div class="newsletter-card scale-in">
                        <h2 class="newsletter-card__title">Stay Updated</h2>
                        <p class="newsletter-card__desc">Subscribe to our newsletter for the latest FC KUAF news</p>
                        <form id="newsletter-form" class="newsletter-form">
                            <input type="email" placeholder="Enter your email" required class="newsletter-form__input">
                            <button type="submit" class="btn btn-primary newsletter-form__button">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    `;
}
