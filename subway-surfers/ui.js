class UI {
    constructor() {
        this.overlay = document.getElementById('ui-overlay');
        this.currentScreen = null;
        this.hud = null;
        this.scoreEl = null;
        this.coinsEl = null;
        this.powerupEl = null;
    }

    clearScreen() {
        this.overlay.innerHTML = '';
        this.currentScreen = null;
    }

    showMenu() {
        this.clearScreen();
        this.currentScreen = 'menu';
        
        const totalCoins = this.getTotalCoins();
        
        this.overlay.innerHTML = `
            <div class="menu-screen">
                <h1 class="menu-title">🏃 Subway Surfers 3D</h1>
                <button class="menu-btn btn-play" id="btn-play">▶ Play</button>
                <button class="menu-btn btn-skins" id="btn-skins">🎨 Characters (${totalCoins} coins)</button>
                <button class="menu-btn btn-skate" id="btn-skate">🛹 Skateboards (${totalCoins} coins)</button>
                <button class="menu-btn btn-missions" id="btn-missions">📋 Missions</button>
                <button class="menu-btn btn-leaderboard" id="btn-leaderboard">🏆 Leaderboard</button>
            </div>
        `;

        document.getElementById('btn-play').addEventListener('click', () => {
            audioManager.playClick();
            game.start();
        });

        document.getElementById('btn-skins').addEventListener('click', () => {
            audioManager.playClick();
            this.showSkins();
        });

        document.getElementById('btn-skate').addEventListener('click', () => {
            audioManager.playClick();
            this.showSkateboards();
        });

        document.getElementById('btn-missions').addEventListener('click', () => {
            audioManager.playClick();
            this.showMissions();
        });

        document.getElementById('btn-leaderboard').addEventListener('click', () => {
            audioManager.playClick();
            this.showLeaderboard();
        });
    }

    showHUD() {
        this.clearScreen();
        this.currentScreen = 'hud';
        
        this.overlay.innerHTML = `
            <div id="hud">
                <div class="hud-item" id="score-display">Score: 0</div>
                <div class="hud-item" id="coins-display">🪙 0</div>
                <div class="hud-item" id="powerup-display"></div>
            </div>
        `;
        
        this.scoreEl = document.getElementById('score-display');
        this.coinsEl = document.getElementById('coins-display');
        this.powerupEl = document.getElementById('powerup-display');
    }

    updateScore(score) {
        if (this.scoreEl) {
            this.scoreEl.textContent = `Score: ${score}`;
        }
    }

    updateCoins(coins) {
        if (this.coinsEl) {
            this.coinsEl.textContent = `🪙 ${coins}`;
        }
    }

    showPowerup(type) {
        if (this.powerupEl) {
            const icons = { shield: '🛡️', magnet: '🧲', speed: '⚡', hoverboard: '🛹' };
            this.powerupEl.textContent = icons[type] || '';
        }
    }

    clearPowerup() {
        if (this.powerupEl) {
            this.powerupEl.textContent = '';
        }
    }

    showGameOver(score, coins) {
        this.clearScreen();
        this.currentScreen = 'gameover';
        
        this.saveScore(score);
        this.addCoins(coins);
        this.updateMissions(score, coins, 0);
        
        this.overlay.innerHTML = `
            <div class="gameover-screen">
                <h1 class="gameover-title">Game Over!</h1>
                <p class="gameover-score">Score: ${score} | Coins: ${coins}</p>
                <button class="menu-btn btn-play" id="btn-retry">🔄 Retry</button>
                <button class="menu-btn btn-skins" id="btn-menu">🏠 Menu</button>
            </div>
        `;

        document.getElementById('btn-retry').addEventListener('click', () => {
            audioManager.playClick();
            game.start();
        });

        document.getElementById('btn-menu').addEventListener('click', () => {
            audioManager.playClick();
            this.showMenu();
        });
    }

    showSkins() {
        this.clearScreen();
        this.currentScreen = 'skins';
        
        const totalCoins = this.getTotalCoins();
        const unlockedSkins = this.getUnlockedSkins();
        const savedSkin = localStorage.getItem(STORAGE_KEYS.SELECTED_SKIN);
        const selectedSkin = SKINS.find(s => s.id === savedSkin) ? savedSkin : 'jake';
        
        let skinsHTML = '';
        SKINS.forEach(skin => {
            const isUnlocked = unlockedSkins.includes(skin.id);
            const isSelected = skin.id === selectedSkin;
            const canAfford = totalCoins >= skin.cost;
            
            skinsHTML += `
                <div class="skin-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}" 
                     data-skin="${skin.id}" data-cost="${skin.cost}">
                    <div class="skin-preview" style="background-color: #${skin.color.toString(16).padStart(6, '0')}"></div>
                    <div class="skin-name">${skin.name}</div>
                    <div class="skin-cost">${skin.cost === 0 ? 'Free' : (isUnlocked ? '✓ Owned' : `🪙 ${skin.cost}`)}</div>
                </div>
            `;
        });
        
        this.overlay.innerHTML = `
            <div class="skin-screen">
                <h1 class="menu-title" style="font-size: 2.5rem">🎨 Choose Skin</h1>
                <div class="coin-display">🪙 ${totalCoins} coins</div>
                <div class="skin-grid">${skinsHTML}</div>
                <button class="back-btn" id="btn-back">← Back</button>
            </div>
        `;

        document.querySelectorAll('.skin-card').forEach(card => {
            card.addEventListener('click', () => {
                const skinId = card.dataset.skin;
                const cost = parseInt(card.dataset.cost);
                const isUnlocked = unlockedSkins.includes(skinId);
                const canAfford = totalCoins >= cost;
                
                if (isUnlocked) {
                    localStorage.setItem(STORAGE_KEYS.SELECTED_SKIN, skinId);
                    player.changeSkin(skinId);
                    audioManager.playClick();
                    this.showSkins();
                } else if (canAfford) {
                    this.unlockSkin(skinId, cost);
                    localStorage.setItem(STORAGE_KEYS.SELECTED_SKIN, skinId);
                    player.changeSkin(skinId);
                    audioManager.playPowerup();
                    this.showSkins();
                }
            });
        });

        document.getElementById('btn-back').addEventListener('click', () => {
            audioManager.playClick();
            this.showMenu();
        });
    }

    showSkateboards() {
        this.clearScreen();
        this.currentScreen = 'skateboards';

        const totalCoins = this.getTotalCoins();
        const unlockedBoards = this.getUnlockedSkateboards();
        const savedBoard = localStorage.getItem(STORAGE_KEYS.SELECTED_SKATEBOARD);
        const selectedBoard = SKATEBOARDS.find(s => s.id === savedBoard) ? savedBoard : 'default';

        let boardsHTML = '';
        SKATEBOARDS.forEach(board => {
            const isUnlocked = unlockedBoards.includes(board.id);
            const isSelected = board.id === selectedBoard;
            const canAfford = totalCoins >= board.cost;

            boardsHTML += `
                <div class="skin-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}"
                     data-board="${board.id}" data-cost="${board.cost}">
                    <div class="skin-preview" style="background-color: #${board.deckColor.toString(16).padStart(6, '0')}"></div>
                    <div class="skin-name">${board.name}</div>
                    <div class="skin-cost">${board.cost === 0 ? 'Free' : (isUnlocked ? '✓ Owned' : `🪙 ${board.cost}`)}</div>
                </div>
            `;
        });

        this.overlay.innerHTML = `
            <div class="skin-screen">
                <h1 class="menu-title" style="font-size: 2.5rem">🛹 Skateboard Shop</h1>
                <div class="coin-display">🪙 ${totalCoins} coins</div>
                <div class="skin-grid">${boardsHTML}</div>
                <button class="back-btn" id="btn-back">← Back</button>
            </div>
        `;

        document.querySelectorAll('.skin-card').forEach(card => {
            card.addEventListener('click', () => {
                const boardId = card.dataset.board;
                const cost = parseInt(card.dataset.cost);
                const isUnlocked = unlockedBoards.includes(boardId);
                const canAfford = totalCoins >= cost;

                if (isUnlocked) {
                    localStorage.setItem(STORAGE_KEYS.SELECTED_SKATEBOARD, boardId);
                    audioManager.playClick();
                    this.showSkateboards();
                } else if (canAfford) {
                    this.unlockSkateboard(boardId, cost);
                    localStorage.setItem(STORAGE_KEYS.SELECTED_SKATEBOARD, boardId);
                    audioManager.playPowerup();
                    this.showSkateboards();
                }
            });
        });

        document.getElementById('btn-back').addEventListener('click', () => {
            audioManager.playClick();
            this.showMenu();
        });
    }

    showMissions() {
        this.clearScreen();
        this.currentScreen = 'missions';
        
        const missions = this.getTodayMissions();
        
        let missionsHTML = '';
        missions.forEach(mission => {
            const progress = mission.progress || 0;
            const isComplete = progress >= mission.target;
            missionsHTML += `
                <div class="mission-item">
                    <span class="mission-text">${mission.text}</span>
                    <span class="mission-progress ${isComplete ? 'mission-complete' : ''}">
                        ${isComplete ? '✓ Complete' : `${Math.min(progress, mission.target)}/${mission.target}`}
                    </span>
                </div>
            `;
        });
        
        this.overlay.innerHTML = `
            <div class="missions-screen">
                <h1 class="menu-title" style="font-size: 2.5rem">📋 Daily Missions</h1>
                <div class="mission-list">${missionsHTML}</div>
                <button class="back-btn" id="btn-back">← Back</button>
            </div>
        `;

        document.getElementById('btn-back').addEventListener('click', () => {
            audioManager.playClick();
            this.showMenu();
        });
    }

    showLeaderboard() {
        this.clearScreen();
        this.currentScreen = 'leaderboard';
        
        const scores = this.getScores();
        
        let scoresHTML = '';
        if (scores.length === 0) {
            scoresHTML = '<div class="leaderboard-item"><span>No scores yet</span></div>';
        } else {
            scores.forEach((score, index) => {
                scoresHTML += `
                    <div class="leaderboard-item">
                        <span class="rank">#${index + 1}</span>
                        <span class="score-value">${score}</span>
                    </div>
                `;
            });
        }
        
        this.overlay.innerHTML = `
            <div class="leaderboard-screen">
                <h1 class="menu-title" style="font-size: 2.5rem">🏆 Leaderboard</h1>
                <div class="leaderboard-list">${scoresHTML}</div>
                <button class="back-btn" id="btn-back">← Back</button>
            </div>
        `;

        document.getElementById('btn-back').addEventListener('click', () => {
            audioManager.playClick();
            this.showMenu();
        });
    }

    // LocalStorage helpers
    getTotalCoins() {
        return parseInt(localStorage.getItem(STORAGE_KEYS.COINS)) || 0;
    }

    addCoins(amount) {
        const total = this.getTotalCoins() + amount;
        localStorage.setItem(STORAGE_KEYS.COINS, total.toString());
    }

    getUnlockedSkins() {
        const saved = localStorage.getItem(STORAGE_KEYS.SKINS);
        const unlocked = saved ? JSON.parse(saved) : ['jake'];
        // Filter out removed skin IDs that no longer exist
        return unlocked.filter(id => SKINS.some(s => s.id === id));
    }

    unlockSkin(skinId, cost) {
        const coins = this.getTotalCoins();
        if (coins >= cost) {
            localStorage.setItem(STORAGE_KEYS.COINS, (coins - cost).toString());
            const unlocked = this.getUnlockedSkins();
            unlocked.push(skinId);
            localStorage.setItem(STORAGE_KEYS.SKINS, JSON.stringify(unlocked));
        }
    }

    getUnlockedSkateboards() {
        const saved = localStorage.getItem(STORAGE_KEYS.SKATEBOARDS);
        const unlocked = saved ? JSON.parse(saved) : ['default'];
        return unlocked.filter(id => SKATEBOARDS.some(s => s.id === id));
    }

    unlockSkateboard(boardId, cost) {
        const coins = this.getTotalCoins();
        if (coins >= cost) {
            localStorage.setItem(STORAGE_KEYS.COINS, (coins - cost).toString());
            const unlocked = this.getUnlockedSkateboards();
            unlocked.push(boardId);
            localStorage.setItem(STORAGE_KEYS.SKATEBOARDS, JSON.stringify(unlocked));
        }
    }

    getScores() {
        const saved = localStorage.getItem(STORAGE_KEYS.SCORES);
        return saved ? JSON.parse(saved) : [];
    }

    saveScore(score) {
        const scores = this.getScores();
        scores.push(score);
        scores.sort((a, b) => b - a);
        localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores.slice(0, 10)));
    }

    getTodayMissions() {
        const today = new Date().toDateString();
        const savedDate = localStorage.getItem(STORAGE_KEYS.MISSION_DATE);
        
        if (savedDate !== today) {
            const missions = [];
            const templates = [...MISSION_TEMPLATES];
            for (let i = 0; i < 3; i++) {
                const idx = Math.floor(Math.random() * templates.length);
                missions.push({ ...templates[idx], progress: 0 });
                templates.splice(idx, 1);
            }
            localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
            localStorage.setItem(STORAGE_KEYS.MISSION_DATE, today);
            return missions;
        }
        
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.MISSIONS)) || [];
    }

    updateMissions(score, coins, powerupsUsed = 0) {
        const missions = this.getTodayMissions();
        missions.forEach(mission => {
            if (mission.type === 'distance') {
                mission.progress = (mission.progress || 0) + score;
            } else if (mission.type === 'coins') {
                mission.progress = (mission.progress || 0) + coins;
            } else if (mission.type === 'games') {
                mission.progress = (mission.progress || 0) + 1;
            } else if (mission.type === 'powerups') {
                mission.progress = (mission.progress || 0) + powerupsUsed;
            }
        });
        localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
    }
}

const ui = new UI();
