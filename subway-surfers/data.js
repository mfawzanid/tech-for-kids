// Game Constants
const GAME_CONFIG = {
    LANE_WIDTH: 2,
    LANES: [-2, 0, 2],
    INITIAL_SPEED: 0.3,
    MAX_SPEED: 0.8,
    SPEED_INCREMENT: 0.0001,
    JUMP_FORCE: 0.30,
    GRAVITY: 0.012,
    TRACK_LENGTH: 200,
    SPAWN_DISTANCE: 100,
    DESPAWN_DISTANCE: 20,
};

// Skin Definitions
const SKINS = [
    { id: 'jake', name: 'Jake', color: 0xcccccc, cost: 0, character: 'jake' },
    { id: 'tricky', name: 'Tricky', color: 0xffffff, cost: 150, character: 'tricky' },
    { id: 'fresh', name: 'Fresh', color: 0x10b981, cost: 300, character: 'fresh' },
    { id: 'spike', name: 'Spike', color: 0x111111, cost: 200, character: 'spike' },
    { id: 'yutani', name: 'Yutani', color: 0x4ade80, cost: 250, character: 'yutani' },
];

// Mission Templates
const MISSION_TEMPLATES = [
    { type: 'coins', target: 50, text: 'Collect 50 coins' },
    { type: 'distance', target: 1000, text: 'Run 1000 meters' },
    { type: 'powerups', target: 3, text: 'Use 3 power-ups' },
    { type: 'coins', target: 100, text: 'Collect 100 coins' },
    { type: 'distance', target: 2000, text: 'Run 2000 meters' },
    { type: 'games', target: 5, text: 'Play 5 games' },
];

// Power-up Types
const POWERUP_TYPES = {
    SHIELD: { id: 'shield', name: 'Shield', color: 0x60a5fa, duration: 0 },
    MAGNET: { id: 'magnet', name: 'Magnet', color: 0xf472b6, duration: 15000 },
    SPEED: { id: 'speed', name: 'Speed Boost', color: 0xfbbf24, duration: 5000 },
};

// Obstacle Types
const OBSTACLE_TYPES = {
    TRAIN: { id: 'train', width: 1.8, height: 2.5, depth: 4, color: 0x64748b },
    BARRIER: { id: 'barrier', width: 2, height: 1, depth: 0.5, color: 0xf97316 },
    CONE: { id: 'cone', width: 0.6, height: 1.2, depth: 0.6, color: 0xfb923c },
};

// Skateboard Definitions
const SKATEBOARDS = [
    { id: 'default', name: 'Default', deckColor: 0xe74c3c, wheelColor: 0x3498db, gripColor: 0x2c2c2c, glowColor: 0x60a5fa, cost: 0 },
    { id: 'classic', name: 'Classic Wood', deckColor: 0x8B4513, wheelColor: 0xffffff, gripColor: 0x1a1a1a, glowColor: 0xcccccc, cost: 100 },
    { id: 'pro', name: 'Pro Black', deckColor: 0x111111, wheelColor: 0xfbbf24, gripColor: 0x333333, glowColor: 0xfbbf24, cost: 250 },
    { id: 'neon', name: 'Neon Cyber', deckColor: 0x00ffff, wheelColor: 0xff00ff, gripColor: 0x001122, glowColor: 0x00ffff, cost: 400 },
    { id: 'fire', name: 'Fire Burst', deckColor: 0xff4500, wheelColor: 0xffd700, gripColor: 0x330000, glowColor: 0xff4500, cost: 600 },
];

// LocalStorage Keys
const STORAGE_KEYS = {
    COINS: 'subway_coins',
    SKINS: 'subway_unlocked_skins',
    SELECTED_SKIN: 'subway_selected_skin',
    SKATEBOARDS: 'subway_unlocked_skateboards',
    SELECTED_SKATEBOARD: 'subway_selected_skateboard',
    SCORES: 'subway_scores',
    MISSIONS: 'subway_missions',
    MISSION_DATE: 'subway_mission_date',
};