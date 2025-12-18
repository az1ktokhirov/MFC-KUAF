// KUAF TV Page
import { dataService } from '../data.js';
import { premiumService } from '../premium.js';

export async function renderKUAFTV() {
    const videos = await dataService.getKUAFTV();
    const isPremium = premiumService.isPremium();

    return `
        <div class="page active">
            <section class="section">
                <div class="container">
                    <h1 class="section-title">KUAF TV</h1>
                    ${!isPremium ? `
                        <div style="background: linear-gradient(135deg, #800020 0%, #000080 100%); color: white; padding: 40px; border-radius: 10px; text-align: center; margin: 30px 0;">
                            <h2 style="color: white; margin-bottom: 20px;">🔒 Premium Content</h2>
                            <p style="margin-bottom: 30px;">KUAF TV is exclusive to Premium members. Upgrade now to access all content!</p>
                            <a href="#premium" class="btn" style="background: #ffd700; color: #000; padding: 15px 30px;">Upgrade to Premium</a>
                        </div>
                    ` : ''}
                    
                    <div class="tv-grid">
                        ${videos.map((video, index) => `
                            <div class="tv-card card-hover ${!isPremium ? 'premium-lock' : ''}" 
                                 onclick="${isPremium ? `openVideoOverlay(${video.id}, ${index})` : 'showPremiumLock()'}">
                                <div class="tv-thumbnail-container image-hover">
                                    <img src="${video.thumbnail}" alt="${video.title}" class="tv-thumbnail" 
                                         onerror="this.src='https://via.placeholder.com/400x200/800020/FFFFFF?text=KUAF+TV'">
                                    ${!isPremium ? `
                                        <div class="tv-premium-overlay">
                                            <div class="tv-lock-icon">🔒</div>
                                            <p>Premium Only</p>
                                        </div>
                                    ` : `
                                        <div class="tv-play-overlay">
                                            <div class="tv-play-icon">▶</div>
                                        </div>
                                    `}
                                </div>
                                <div class="tv-content">
                                    <h3 class="card-title">${video.title}</h3>
                                    <p class="card-text">${video.description}</p>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                                        <span style="color: #666; font-size: 0.875rem;">${video.duration} | ${video.date}</span>
                                        ${isPremium ? `
                                            <button class="btn btn-primary" onclick="event.stopPropagation(); openVideoOverlay(${video.id}, ${index})">Watch</button>
                                        ` : `
                                            <span class="btn btn-outline" style="opacity: 0.5;">Premium Only</span>
                                        `}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        </div>
        <div id="video-overlay" class="video-overlay">
            <div class="video-overlay-backdrop"></div>
            <div class="video-overlay-container">
                <button class="video-overlay-close" onclick="closeVideoOverlay()">✕</button>
                <div class="video-overlay-content">
                    <div id="video-overlay-player" class="video-overlay-player"></div>
                    <div class="video-overlay-info">
                        <h2 id="video-overlay-title"></h2>
                        <p id="video-overlay-description"></p>
                    </div>
                    <div class="video-overlay-controls">
                        <button class="video-control-btn" id="video-prev" onclick="navigateVideo(-1)">◀ Prev</button>
                        <button class="video-control-btn" id="video-next" onclick="navigateVideo(1)">Next ▶</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Store videos globally for navigation
window.kuafTVVideos = [];
window.currentVideoIndex = 0;

window.openVideoOverlay = async function(videoId, index) {
    const videos = await dataService.getKUAFTV();
    window.kuafTVVideos = videos;
    window.currentVideoIndex = index !== undefined ? index : videos.findIndex(v => v.id === parseInt(videoId));
    
    const video = videos[window.currentVideoIndex];
    if (!video) return;
    
    const overlay = document.getElementById('video-overlay');
    const player = document.getElementById('video-overlay-player');
    const title = document.getElementById('video-overlay-title');
    const description = document.getElementById('video-overlay-description');
    
    if (overlay && player && title && description) {
        title.textContent = video.title;
        description.textContent = video.description;
        
        // Create iframe
        player.innerHTML = `
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000; border-radius: 8px;">
                <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                        src="${video.videoUrl}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            </div>
        `;
        
        // Update navigation buttons
        const prevBtn = document.getElementById('video-prev');
        const nextBtn = document.getElementById('video-next');
        if (prevBtn) prevBtn.style.display = window.currentVideoIndex > 0 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = window.currentVideoIndex < videos.length - 1 ? 'block' : 'none';
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeVideoOverlay = function() {
    const overlay = document.getElementById('video-overlay');
    const player = document.getElementById('video-overlay-player');
    
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop video
        if (player) {
            const iframe = player.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
            }
        }
    }
};

window.navigateVideo = async function(direction) {
    const newIndex = window.currentVideoIndex + direction;
    if (newIndex >= 0 && newIndex < window.kuafTVVideos.length) {
        window.currentVideoIndex = newIndex;
        const video = window.kuafTVVideos[newIndex];
        await window.openVideoOverlay(video.id, newIndex);
    }
};

window.showPremiumLock = function() {
    alert('This content is exclusive to Premium members. Upgrade to access KUAF TV!');
};

// Video player page (redirects to overlay)
export async function renderVideoPlayer(videoId) {
    const videos = await dataService.getKUAFTV();
    const video = videos.find(v => v.id === parseInt(videoId));
    const isPremium = premiumService.isPremium();

    if (!video) {
        return `<div class="page active"><h1>Video not found</h1></div>`;
    }

    if (!isPremium) {
        return `
            <div class="page active">
                <div class="container">
                    <a href="#kuaf-tv" class="btn btn-outline" style="margin-bottom: 30px;">← Back to KUAF TV</a>
                    <div style="text-align: center; padding: 60px 20px;">
                        <h1>Premium Content Required</h1>
                        <p>This video is exclusive to Premium members.</p>
                        <a href="#premium" class="btn btn-primary" style="margin-top: 20px;">Upgrade to Premium</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Render KUAF TV page and open overlay
    const kuafTVHTML = await renderKUAFTV();
    setTimeout(() => {
        const index = videos.findIndex(v => v.id === parseInt(videoId));
        if (window.openVideoOverlay) {
            window.openVideoOverlay(videoId, index);
        }
    }, 100);
    
    return kuafTVHTML;
}

