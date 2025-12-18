# FC KUAF - Football Club Website

A professional football club website built with vanilla JavaScript, HTML, and CSS. This is a complete demo project featuring premium subscriptions, donations, leaderboards, and a store system.

## 🎨 Design & Branding

- **Colors:** Burgundy (#800020) & Navy Blue (#000080)
- **Design Inspiration:** FC Barcelona layout
- **Branding:** FC KUAF
- **Logo:** Provided in `/assets/images/Logo.png`

## 🚀 Features

### Pages
- **Home** - Hero slider, latest news, upcoming matches, recent results
- **Squad** - Full team roster with 22 players
- **Player Detail** - Individual player profiles with stats and bio
- **Matches** - Match schedule and results
- **Tickets** - Ticket purchasing with Premium discounts (50% off)
- **KUAF TV** - Premium-only video content platform
- **Store** - Merchandise with Premium discounts (10% off)
- **Donate** - Support the club and earn coins, badges, and support score
- **Leaderboard** - Monthly ranking based on support score
- **Profile** - User profile with stats, badges, and donation history
- **Login/Register** - Authentication system

### User Roles

#### Free User
- Basic site access
- Can donate and earn coins
- No KUAF TV access (preview only)
- No discounts

#### Premium User ($4.99/month or $50/year)
- Full KUAF TV access
- 10% discount in store
- 50% discount on tickets
- Premium badge
- Priority content access

### Systems

#### Premium Subscription
- Monthly: $4.99
- Yearly: $50 (saves 2 months)
- **Note:** Donations do NOT provide Premium discounts

#### Donation System
- $1 → 100 coins + 10 score
- $5 → 600 coins + 80 score  
- $10 → 1,300 coins + 200 score
- $20 → 3,000 coins + 500 score
- Rewards: Coins, Support Score, Badges (Bronze → Diamond)

#### Coins System
- Virtual currency earned through donations
- Can be used for select store items
- Displayed in header when logged in

#### Leaderboard
- Monthly reset
- Based on Support Score (from donations + site activity)
- **Top 3:** KUAF Jersey
- **Top 4-10:** Coins reward

## 📁 Project Structure

```
MFC KUAF/
├── assets/
│   └── images/
│       ├── Logo.png
│       ├── Player.jpg
│       └── store/
│           └── [product images]
├── data/
│   └── [JSON data files]
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── auth.js
│   ├── data.js
│   ├── premium.js
│   └── pages/
│       └── [page components]
├── index.html
└── README.md
```

## 🔑 Demo Accounts

### Premium User
- **Username:** `premium_user`
- **Password:** `premium123`

### Free User
- **Username:** `free_user`
- **Password:** `free123`

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, Vanilla ES6 JavaScript (No frameworks)
- **Data Storage:** Local JSON files + LocalStorage (for sessions)
- **Routing:** Hash-based client-side routing
- **Design:** Responsive, mobile-first approach

## 📦 JSON Data Files

All data is stored in `/data/` directory:
- `players.json` - 22 players (all identical except position)
- `matches.json` - Match schedule and results
- `tickets.json` - Available tickets
- `news.json` - News articles
- `store.json` - Store products
- `users.json` - User accounts
- `donate_packages.json` - Donation packages
- `leaderboard.json` - Leaderboard rankings
- `kuaf_tv.json` - KUAF TV video content

## 🎮 How to Run

1. Clone or download the project
2. Open `index.html` in a modern web browser
3. For full functionality, serve via a local web server (due to ES6 modules):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```
4. Navigate to `http://localhost:8000` in your browser

## 📝 Notes

- All images in `/assets/images/store/` are automatically detected and used as store products
- Player images all use the same base image (`Player.jpg`)
- Premium features require login with a premium account
- Donations update user stats and leaderboard in real-time
- All data persists in LocalStorage for the session

## 🎯 Key Features Implementation

- **Hash-based routing** - Clean URLs with `#page` navigation
- **Module architecture** - ES6 modules for organized code
- **Premium system** - Discounts applied dynamically based on user status
- **Donation system** - Updates coins, score, and badges automatically
- **Leaderboard** - Monthly rankings with rewards
- **Responsive design** - Works on all device sizes

## 🔒 Premium Access

KUAF TV content is locked for free users. Premium users see full content, while free users see previews with upgrade prompts.

## 🛒 Store System

Store products are loaded from `store.json` and images from `/assets/images/store/`. Premium users automatically see 10% discounted prices.

---

**Built with ❤️ for FC KUAF**

