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
    MAGNET: { id: 'magnet', name: 'Magnet', color: 0xf472b6, duration: 5000 },
    SPEED: { id: 'speed', name: 'Speed Boost', color: 0xfbbf24, duration: 5000 },
};

// Obstacle Types
const OBSTACLE_TYPES = {
    TRAIN: { id: 'train', width: 1.8, height: 2.5, depth: 4, color: 0x64748b },
    BARRIER: { id: 'barrier', width: 2, height: 1, depth: 0.5, color: 0xf97316 },
    CONE: { id: 'cone', width: 0.6, height: 1.2, depth: 0.6, color: 0xfb923c },
};

// LocalStorage Keys
const STORAGE_KEYS = {
    COINS: 'subway_coins',
    SKINS: 'subway_unlocked_skins',
    SELECTED_SKIN: 'subway_selected_skin',
    SCORES: 'subway_scores',
    MISSIONS: 'subway_missions',
    MISSION_DATE: 'subway_mission_date',
};