# Subway Surfers 3D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3D endless runner game inspired by Subway Surfers using HTML5 + Three.js

**Architecture:** Modular file architecture with separate files for rendering, player, world generation, UI, audio, and data. Uses Three.js for 3D rendering, procedural track generation with object pooling, and localStorage for persistence.

**Tech Stack:** HTML5, JavaScript (ES6), Three.js, CSS3

---

## File Structure

| File | Responsibility |
|------|----------------|
| `index.html` | Main page, game container, loads all scripts |
| `style.css` | UI overlay styling |
| `data.js` | Skin definitions, mission templates, constants |
| `audio.js` | Sound effects manager |
| `renderer.js` | Three.js scene, camera, lighting, rendering loop |
| `player.js` | Player character model, animations, controls |
| `world.js` | Track generation, obstacles, coins, powerups |
| `ui.js` | HUD, menus, skin selection, missions, leaderboard |
| `game.js` | Game loop, state management, initialization |

---

## Task 1: Project Setup & Data Constants

**Files:**
- Create: `subway-surfers/index.html`
- Create: `subway-surfers/style.css`
- Create: `subway-surfers/data.js`

- [ ] **Step 1: Create index.html with Three.js CDN**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subway Surfers 3D</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="game-container">
        <canvas id="game-canvas"></canvas>
        <div id="ui-overlay"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="data.js"></script>
    <script src="audio.js"></script>
    <script src="renderer.js"></script>
    <script src="player.js"></script>
    <script src="world.js"></script>
    <script src="ui.js"></script>
    <script src="game.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create style.css**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Fredoka', 'Comic Sans MS', cursive, sans-serif;
    overflow: hidden;
    background: #1a1a2e;
}

#game-container {
    position: relative;
    width: 100vw;
    height: 100vh;
}

#game-canvas {
    display: block;
    width: 100%;
    height: 100%;
}

#ui-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

#ui-overlay > * {
    pointer-events: auto;
}

/* HUD */
#hud {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hud-item {
    background: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 25px;
}

/* Menu Screen */
.menu-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.menu-title {
    font-size: 4rem;
    font-weight: 700;
    color: white;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
    margin-bottom: 40px;
}

.menu-btn {
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 15px 40px;
    margin: 10px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    min-width: 250px;
}

.menu-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.menu-btn:active {
    transform: translateY(0);
}

.btn-play {
    background: #4ade80;
    color: #052e16;
}

.btn-skins {
    background: #60a5fa;
    color: #1e3a5f;
}

.btn-missions {
    background: #fbbf24;
    color: #78350f;
}

.btn-leaderboard {
    background: #f472b6;
    color: #831843;
}

/* Game Over Screen */
.gameover-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.8);
}

.gameover-title {
    font-size: 3rem;
    font-weight: 700;
    color: #ef4444;
    margin-bottom: 20px;
}

.gameover-score {
    font-size: 2rem;
    color: white;
    margin-bottom: 30px;
}

/* Skin Selection */
.skin-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.skin-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 30px 0;
}

.skin-card {
    background: white;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;
    border: 4px solid transparent;
}

.skin-card:hover {
    transform: scale(1.05);
}

.skin-card.selected {
    border-color: #4ade80;
}

.skin-card.locked {
    opacity: 0.6;
    cursor: not-allowed;
}

.skin-preview {
    width: 60px;
    height: 60px;
    margin: 0 auto 10px;
    border-radius: 10px;
}

.skin-name {
    font-weight: 600;
    color: #333;
}

.skin-cost {
    font-size: 0.9rem;
    color: #666;
}

/* Missions */
.missions-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.mission-list {
    background: white;
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    min-width: 300px;
}

.mission-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.mission-item:last-child {
    border-bottom: none;
}

.mission-text {
    font-weight: 500;
    color: #333;
}

.mission-progress {
    font-size: 0.9rem;
    color: #666;
}

.mission-complete {
    color: #22c55e;
    font-weight: 600;
}

/* Leaderboard */
.leaderboard-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.leaderboard-list {
    background: white;
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    min-width: 300px;
}

.leaderboard-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
}

.leaderboard-item:last-child {
    border-bottom: none;
}

.rank {
    font-weight: 700;
    color: #6366f1;
    min-width: 40px;
}

.score-value {
    font-weight: 600;
    color: #333;
}

/* Back Button */
.back-btn {
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 12px 30px;
    margin-top: 20px;
    border: none;
    border-radius: 25px;
    background: rgba(255,255,255,0.2);
    color: white;
    cursor: pointer;
    transition: background 0.2s;
}

.back-btn:hover {
    background: rgba(255,255,255,0.3);
}

/* Coin Display */
.coin-display {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.5);
    color: #fbbf24;
    padding: 10px 25px;
    border-radius: 25px;
    font-size: 1.3rem;
    font-weight: 600;
}
```

- [ ] **Step 3: Create data.js with constants and configurations**

```javascript
// Game Constants
const GAME_CONFIG = {
    LANE_WIDTH: 2,
    LANES: [-2, 0, 2],
    INITIAL_SPEED: 0.3,
    MAX_SPEED: 0.8,
    SPEED_INCREMENT: 0.0001,
    JUMP_FORCE: 0.25,
    GRAVITY: 0.012,
    TRACK_LENGTH: 200,
    SPAWN_DISTANCE: 100,
    DESPAWN_DISTANCE: -20,
};

// Skin Definitions
const SKINS = [
    { id: 'blue', name: 'Blue Runner', color: 0x3b82f6, cost: 0, unlocked: true },
    { id: 'red', name: 'Red Blaze', color: 0xef4444, cost: 50, unlocked: false },
    { id: 'green', name: 'Green Turbo', color: 0x22c55e, cost: 100, unlocked: false },
    { id: 'gold', name: 'Gold Master', color: 0xfbbf24, cost: 200, unlocked: false },
    { id: 'rainbow', name: 'Rainbow Dash', color: 0xffffff, cost: 500, unlocked: false },
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
```

- [ ] **Step 4: Verify files are created**

Run: `ls -la subway-surfers/`
Expected: index.html, style.css, data.js exist

---

## Task 2: Audio Manager

**Files:**
- Create: `subway-surfers/audio.js`

- [ ] **Step 1: Create audio.js with sound manager**

```javascript
class AudioManager {
    constructor() {
        this.context = null;
        this.sounds = {};
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    createOscillator(frequency, type, duration) {
        if (!this.enabled || !this.context) return;
        
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
        
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    playJump() {
        this.createOscillator(400, 'sine', 0.1);
        setTimeout(() => this.createOscillator(600, 'sine', 0.1), 50);
    }

    playCoin() {
        this.createOscillator(800, 'sine', 0.1);
        setTimeout(() => this.createOscillator(1200, 'sine', 0.1), 50);
    }

    playPowerup() {
        this.createOscillator(400, 'sine', 0.15);
        setTimeout(() => this.createOscillator(600, 'sine', 0.15), 100);
        setTimeout(() => this.createOscillator(800, 'sine', 0.15), 200);
    }

    playCrash() {
        this.createOscillator(200, 'sawtooth', 0.3);
        this.createOscillator(100, 'square', 0.3);
    }

    playClick() {
        this.createOscillator(600, 'sine', 0.05);
    }

    resume() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
}

const audioManager = new AudioManager();
```

- [ ] **Step 2: Verify audio.js syntax**

Run: `node -c subway-surfers/audio.js`
Expected: No output (syntax OK)

---

## Task 3: Three.js Renderer

**Files:**
- Create: `subway-surfers/renderer.js`

- [ ] **Step 1: Create renderer.js with scene setup**

```javascript
class Renderer {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);
        this.scene.fog = new THREE.Fog(0x87ceeb, 30, 100);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 8);
        this.camera.lookAt(0, 0, -10);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Lighting
        this.setupLighting();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());
    }

    setupLighting() {
        // Ambient light
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambient);

        // Directional light (sun)
        const directional = new THREE.DirectionalLight(0xffffff, 0.8);
        directional.position.set(10, 20, 10);
        directional.castShadow = true;
        directional.shadow.mapSize.width = 2048;
        directional.shadow.mapSize.height = 2048;
        directional.shadow.camera.near = 0.5;
        directional.shadow.camera.far = 50;
        directional.shadow.camera.left = -15;
        directional.shadow.camera.right = 15;
        directional.shadow.camera.top = 15;
        directional.shadow.camera.bottom = -15;
        this.scene.add(directional);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateCamera(playerZ) {
        this.camera.position.z = playerZ + 8;
        this.camera.lookAt(0, 0, playerZ - 10);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    clear() {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.setupLighting();
    }
}

const renderer = new Renderer();
```

- [ ] **Step 2: Verify renderer.js syntax**

Run: `node -c subway-surfers/renderer.js`
Expected: No output (syntax OK)

---

## Task 4: Player Character

**Files:**
- Create: `subway-surfers/player.js`

- [ ] **Step 1: Create player.js with character model and controls**

```javascript
class Player {
    constructor() {
        this.mesh = null;
        this.lane = 1; // 0=left, 1=center, 2=right
        this.targetX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.isGrounded = true;
        this.controls = { left: false, right: false, jump: false };
        this.init();
    }

    init() {
        this.createMesh();
        this.setupControls();
    }

    createMesh() {
        const skin = this.getCurrentSkin();
        
        // Body
        const bodyGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.6);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: skin.color });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.8;
        body.castShadow = true;

        // Head
        const headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xfcd9b6 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.7;
        head.castShadow = true;

        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.06, 8, 8);
        const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.12, 1.75, 0.3);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.12, 1.75, 0.3);

        // Group
        this.mesh = new THREE.Group();
        this.mesh.add(body);
        this.mesh.add(head);
        this.mesh.add(leftEye);
        this.mesh.add(rightEye);

        this.mesh.position.set(0, 0, 0);
        this.body = body;
    }

    getCurrentSkin() {
        const savedSkin = localStorage.getItem(STORAGE_KEYS.SELECTED_SKIN);
        return SKINS.find(s => s.id === savedSkin) || SKINS[0];
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft();
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight();
                    break;
                case 'Space':
                case 'ArrowUp':
                case 'KeyW':
                    this.jump();
                    break;
            }
        });
    }

    moveLeft() {
        if (this.lane > 0) {
            this.lane--;
            this.targetX = GAME_CONFIG.LANES[this.lane];
            audioManager.playClick();
        }
    }

    moveRight() {
        if (this.lane < 2) {
            this.lane++;
            this.targetX = GAME_CONFIG.LANES[this.lane];
            audioManager.playClick();
        }
    }

    jump() {
        if (this.isGrounded && !this.isJumping) {
            this.velocityY = GAME_CONFIG.JUMP_FORCE;
            this.isJumping = true;
            this.isGrounded = false;
            audioManager.playJump();
        }
    }

    update() {
        // Smooth lane transition
        const lerpFactor = 0.15;
        this.mesh.position.x += (this.targetX - this.mesh.position.x) * lerpFactor;

        // Jump physics
        if (this.isJumping) {
            this.mesh.position.y += this.velocityY;
            this.velocityY -= GAME_CONFIG.GRAVITY;

            if (this.mesh.position.y <= 0) {
                this.mesh.position.y = 0;
                this.velocityY = 0;
                this.isJumping = false;
                this.isGrounded = true;
            }
        }

        // Running animation (bobbing)
        if (this.isGrounded && !this.isJumping) {
            const bobAmount = Math.sin(Date.now() * 0.01) * 0.05;
            this.body.position.y = 0.8 + bobAmount;
        }
    }

    reset() {
        this.lane = 1;
        this.targetX = 0;
        this.mesh.position.set(0, 0, 0);
        this.velocityY = 0;
        this.isJumping = false;
        this.isGrounded = true;
    }

    changeSkin(skinId) {
        const skin = SKINS.find(s => s.id === skinId);
        if (skin && this.body) {
            this.body.material.color.setHex(skin.color);
        }
    }

    getBoundingBox() {
        return {
            x: this.mesh.position.x,
            y: this.mesh.position.y,
            width: 0.8,
            height: 2,
            depth: 0.6
        };
    }
}

const player = new Player();
```

- [ ] **Step 2: Verify player.js syntax**

Run: `node -c subway-surfers/player.js`
Expected: No output (syntax OK)

---

## Task 5: World Generation

**Files:**
- Create: `subway-surfers/world.js`

- [ ] **Step 1: Create world.js with track, obstacles, and collectibles**

```javascript
class World {
    constructor() {
        this.track = null;
        this.obstacles = [];
        this.coins = [];
        this.powerups = [];
        this.decorations = [];
        this.lastSpawnZ = 0;
        this.init();
    }

    init() {
        this.createTrack();
        this.spawnInitialObjects();
    }

    createTrack() {
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(10, 500);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x4a5568 });
        this.track = new THREE.Mesh(groundGeometry, groundMaterial);
        this.track.rotation.x = -Math.PI / 2;
        this.track.position.z = -200;
        this.track.receiveShadow = true;
        renderer.scene.add(this.track);

        // Lane markers
        for (let i = 0; i < 3; i++) {
            const lineGeometry = new THREE.PlaneGeometry(0.1, 500);
            const lineMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.rotation.x = -Math.PI / 2;
            line.position.set(GAME_CONFIG.LANES[i] + 1, 0.01, -200);
            renderer.scene.add(line);
        }

        // Side rails
        this.createRails();
    }

    createRails() {
        const railGeometry = new THREE.BoxGeometry(0.2, 1, 500);
        const railMaterial = new THREE.MeshLambertMaterial({ color: 0x718096 });
        
        const leftRail = new THREE.Mesh(railGeometry, railMaterial);
        leftRail.position.set(-4, 0.5, -200);
        renderer.scene.add(leftRail);

        const rightRail = new THREE.Mesh(railGeometry, railMaterial);
        rightRail.position.set(4, 0.5, -200);
        renderer.scene.add(rightRail);
    }

    spawnInitialObjects() {
        for (let z = -10; z > -100; z -= 15) {
            this.spawnObstacle(z);
            this.spawnCoins(z);
        }
        this.lastSpawnZ = -100;
    }

    spawnObstacle(z) {
        const types = Object.values(OBSTACLE_TYPES);
        const type = types[Math.floor(Math.random() * types.length)];
        const lane = Math.floor(Math.random() * 3);
        
        const geometry = new THREE.BoxGeometry(type.width, type.height, type.depth);
        const material = new THREE.MeshLambertMaterial({ color: type.color });
        const obstacle = new THREE.Mesh(geometry, material);
        
        obstacle.position.set(
            GAME_CONFIG.LANES[lane],
            type.height / 2,
            z
        );
        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        
        obstacle.userData = {
            type: type.id,
            lane: lane,
            active: true
        };
        
        renderer.scene.add(obstacle);
        this.obstacles.push(obstacle);
    }

    spawnCoins(z) {
        const lane = Math.floor(Math.random() * 3);
        const count = Math.floor(Math.random() * 5) + 3;
        
        for (let i = 0; i < count; i++) {
            const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
            const material = new THREE.MeshLambertMaterial({ color: 0xfbbf24 });
            const coin = new THREE.Mesh(geometry, material);
            
            coin.position.set(
                GAME_CONFIG.LANES[lane],
                1 + Math.sin(i * 0.5) * 0.3,
                z - i * 1.5
            );
            coin.rotation.x = Math.PI / 2;
            coin.castShadow = true;
            
            coin.userData = {
                type: 'coin',
                value: 10,
                active: true
            };
            
            renderer.scene.add(coin);
            this.coins.push(coin);
        }
    }

    spawnPowerup(z) {
        const types = Object.values(POWERUP_TYPES);
        const type = types[Math.floor(Math.random() * types.length)];
        const lane = Math.floor(Math.random() * 3);
        
        const geometry = new THREE.OctahedronGeometry(0.5);
        const material = new THREE.MeshLambertMaterial({ 
            color: type.color,
            emissive: type.color,
            emissiveIntensity: 0.3
        });
        const powerup = new THREE.Mesh(geometry, material);
        
        powerup.position.set(
            GAME_CONFIG.LANES[lane],
            1.5,
            z
        );
        powerup.castShadow = true;
        
        powerup.userData = {
            type: 'powerup',
            powerupType: type.id,
            active: true
        };
        
        renderer.scene.add(powerup);
        this.powerups.push(powerup);
    }

    spawnDecoration(z) {
        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (6 + Math.random() * 5);
        
        // Building
        const height = 5 + Math.random() * 15;
        const geometry = new THREE.BoxGeometry(3, height, 3);
        const material = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(Math.random(), 0.3, 0.4)
        });
        const building = new THREE.Mesh(geometry, material);
        building.position.set(x, height / 2, z);
        building.castShadow = true;
        renderer.scene.add(building);
        this.decorations.push(building);
    }

    update(playerZ) {
        // Spawn new objects ahead
        if (playerZ - 50 < this.lastSpawnZ - 20) {
            this.lastSpawnZ -= 20;
            this.spawnObstacle(this.lastSpawnZ);
            this.spawnCoins(this.lastSpawnZ);
            
            if (Math.random() < 0.2) {
                this.spawnPowerup(this.lastSpawnZ - 5);
            }
            
            if (Math.random() < 0.3) {
                this.spawnDecoration(this.lastSpawnZ - 10);
            }
        }

        // Cleanup objects behind player
        this.cleanup(playerZ);
        
        // Rotate coins
        this.coins.forEach(coin => {
            if (coin.userData.active) {
                coin.rotation.z += 0.05;
            }
        });
        
        // Rotate powerups
        this.powerups.forEach(powerup => {
            if (powerup.userData.active) {
                powerup.rotation.y += 0.05;
                powerup.rotation.x += 0.02;
            }
        });
    }

    cleanup(playerZ) {
        const despawnZ = playerZ + GAME_CONFIG.DESPAWN_DISTANCE;
        
        // Cleanup obstacles
        this.obstacles = this.obstacles.filter(obj => {
            if (obj.position.z > despawnZ) {
                renderer.scene.remove(obj);
                return false;
            }
            return true;
        });

        // Cleanup coins
        this.coins = this.coins.filter(obj => {
            if (obj.position.z > despawnZ || !obj.userData.active) {
                renderer.scene.remove(obj);
                return false;
            }
            return true;
        });

        // Cleanup powerups
        this.powerups = this.powerups.filter(obj => {
            if (obj.position.z > despawnZ || !obj.userData.active) {
                renderer.scene.remove(obj);
                return false;
            }
            return true;
        });

        // Cleanup decorations
        this.decorations = this.decorations.filter(obj => {
            if (obj.position.z > despawnZ) {
                renderer.scene.remove(obj);
                return false;
            }
            return true;
        });
    }

    checkCollisions(playerPos, playerBox) {
        const results = {
            obstacle: false,
            coins: [],
            powerup: null
        };

        // Check obstacles
        for (const obstacle of this.obstacles) {
            if (!obstacle.userData.active) continue;
            
            if (this.checkBoxCollision(playerBox, obstacle)) {
                results.obstacle = true;
                break;
            }
        }

        // Check coins
        for (const coin of this.coins) {
            if (!coin.userData.active) continue;
            
            const dist = playerPos.distanceTo(coin.position);
            if (dist < 1.5) {
                results.coins.push(coin);
            }
        }

        // Check powerups
        for (const powerup of this.powerups) {
            if (!powerup.userData.active) continue;
            
            const dist = playerPos.distanceTo(powerup.position);
            if (dist < 1.5) {
                results.powerup = powerup;
                break;
            }
        }

        return results;
    }

    checkBoxCollision(box1, mesh2) {
        const box2 = {
            x: mesh2.position.x,
            y: mesh2.position.y,
            width: mesh2.geometry.parameters.width,
            height: mesh2.geometry.parameters.height,
            depth: mesh2.geometry.parameters.depth
        };

        return Math.abs(box1.x - box2.x) < (box1.width + box2.width) / 2 &&
               Math.abs(box1.y - box2.y) < (box1.height + box2.height) / 2 &&
               Math.abs(box1.depth || 0.6) < (box2.depth + 0.6) / 2 + 1;
    }

    reset() {
        // Remove all objects
        this.obstacles.forEach(obj => renderer.scene.remove(obj));
        this.coins.forEach(obj => renderer.scene.remove(obj));
        this.powerups.forEach(obj => renderer.scene.remove(obj));
        this.decorations.forEach(obj => renderer.scene.remove(obj));
        
        this.obstacles = [];
        this.coins = [];
        this.powerups = [];
        this.decorations = [];
        this.lastSpawnZ = 0;
        
        // Respawn initial objects
        this.spawnInitialObjects();
    }
}

const world = new World();
```

- [ ] **Step 2: Verify world.js syntax**

Run: `node -c subway-surfers/world.js`
Expected: No output (syntax OK)

---

## Task 6: UI Manager

**Files:**
- Create: `subway-surfers/ui.js`

- [ ] **Step 1: Create ui.js with all UI screens**

```javascript
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
                <button class="menu-btn btn-skins" id="btn-skins">🎨 Skins (${totalCoins} coins)</button>
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
            const icons = { shield: '🛡️', magnet: '🧲', speed: '⚡' };
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
        this.updateMissions(score, coins);
        
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
        const selectedSkin = localStorage.getItem(STORAGE_KEYS.SELECTED_SKIN) || 'blue';
        
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

        // Skin selection handlers
        document.querySelectorAll('.skin-card').forEach(card => {
            card.addEventListener('click', () => {
                const skinId = card.dataset.skin;
                const cost = parseInt(card.dataset.cost);
                const isUnlocked = unlockedSkins.includes(skinId);
                
                if (isUnlocked) {
                    localStorage.setItem(STORAGE_KEYS.SELECTED_SKIN, skinId);
                    player.changeSkin(skinId);
                    audioManager.playClick();
                    this.showSkins();
                } else if (canAfford) {
                    this.unlockSkin(skinId, cost);
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
        return saved ? JSON.parse(saved) : ['blue'];
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
            // Generate new missions for today
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

    updateMissions(score, coins) {
        const missions = this.getTodayMissions();
        missions.forEach(mission => {
            if (mission.type === 'distance') {
                mission.progress = (mission.progress || 0) + score;
            } else if (mission.type === 'coins') {
                mission.progress = (mission.progress || 0) + coins;
            } else if (mission.type === 'games') {
                mission.progress = (mission.progress || 0) + 1;
            }
        });
        localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
    }
}

const ui = new UI();
```

- [ ] **Step 2: Verify ui.js syntax**

Run: `node -c subway-surfers/ui.js`
Expected: No output (syntax OK)

---

## Task 7: Game Loop & State Management

**Files:**
- Create: `subway-surfers/game.js`

- [ ] **Step 1: Create game.js with main game loop**

```javascript
class Game {
    constructor() {
        this.state = 'menu'; // menu, playing, paused, gameover
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.speed = GAME_CONFIG.INITIAL_SPEED;
        this.shieldActive = false;
        this.magnetActive = false;
        this.speedBoostActive = false;
        this.animationId = null;
    }

    start() {
        this.state = 'playing';
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.speed = GAME_CONFIG.INITIAL_SPEED;
        this.shieldActive = false;
        this.magnetActive = false;
        this.speedBoostActive = false;
        
        player.reset();
        world.reset();
        ui.showHUD();
        
        audioManager.resume();
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.gameLoop();
    }

    gameLoop() {
        if (this.state !== 'playing') return;

        // Update speed
        if (this.speedBoostActive) {
            this.speed = Math.min(GAME_CONFIG.MAX_SPEED * 2, this.speed + GAME_CONFIG.SPEED_INCREMENT * 3);
        } else {
            this.speed = Math.min(GAME_CONFIG.MAX_SPEED, this.speed + GAME_CONFIG.SPEED_INCREMENT);
        }

        // Update distance and score
        this.distance += this.speed;
        this.score = Math.floor(this.distance * 10);

        // Move everything
        this.moveWorld();

        // Update player
        player.update();

        // Update world
        world.update(-this.distance);

        // Check collisions
        this.checkCollisions();

        // Update camera
        renderer.updateCamera(-this.distance);

        // Update UI
        ui.updateScore(this.score);

        // Render
        renderer.render();

        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    moveWorld() {
        const moveAmount = this.speed;
        
        // Move obstacles
        world.obstacles.forEach(obstacle => {
            obstacle.position.z += moveAmount;
        });

        // Move coins
        world.coins.forEach(coin => {
            coin.position.z += moveAmount;
        });

        // Move powerups
        world.powerups.forEach(powerup => {
            powerup.position.z += moveAmount;
        });

        // Move decorations
        world.decorations.forEach(deco => {
            deco.position.z += moveAmount;
        });
    }

    checkCollisions() {
        const playerPos = player.mesh.position.clone();
        const playerBox = player.getBoundingBox();

        // Check magnet effect
        if (this.magnetActive) {
            world.coins.forEach(coin => {
                if (coin.userData.active) {
                    const dist = playerPos.distanceTo(coin.position);
                    if (dist < 8) {
                        const dir = playerPos.clone().sub(coin.position).normalize();
                        coin.position.add(dir.multiplyScalar(0.3));
                    }
                }
            });
        }

        const results = world.checkCollisions(playerPos, playerBox);

        // Collect coins
        results.coins.forEach(coin => {
            coin.userData.active = false;
            this.coins += coin.userData.value;
            ui.updateCoins(this.coins);
            audioManager.playCoin();
        });

        // Collect powerups
        if (results.powerup) {
            this.activatePowerup(results.powerup.userData.powerupType);
            results.powerup.userData.active = false;
            audioManager.playPowerup();
        }

        // Check obstacle collision
        if (results.obstacle) {
            if (this.shieldActive) {
                this.shieldActive = false;
                ui.clearPowerup();
                // Visual feedback
                player.mesh.material && (player.mesh.material.opacity = 1);
            } else {
                this.gameOver();
            }
        }
    }

    activatePowerup(type) {
        switch (type) {
            case 'shield':
                this.shieldActive = true;
                ui.showPowerup('shield');
                break;
            case 'magnet':
                this.magnetActive = true;
                ui.showPowerup('magnet');
                setTimeout(() => {
                    this.magnetActive = false;
                    ui.clearPowerup();
                }, POWERUP_TYPES.MAGNET.duration);
                break;
            case 'speed':
                this.speedBoostActive = true;
                ui.showPowerup('speed');
                setTimeout(() => {
                    this.speedBoostActive = false;
                    ui.clearPowerup();
                }, POWERUP_TYPES.SPEED.duration);
                break;
        }
    }

    gameOver() {
        this.state = 'gameover';
        audioManager.playCrash();
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        ui.showGameOver(this.score, this.coins);
    }

    pause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        }
    }

    resume() {
        if (this.state === 'paused') {
            this.state = 'playing';
            this.gameLoop();
        }
    }

    togglePause() {
        if (this.state === 'playing') {
            this.pause();
        } else if (this.state === 'paused') {
            this.resume();
        }
    }
}

// Initialize game
const game = new Game();

// Show menu on load
ui.showMenu();

// Pause/Resume controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') {
        game.togglePause();
    }
    if (e.code === 'Escape' && game.state === 'playing') {
        game.pause();
        ui.showMenu();
    }
});
```

- [ ] **Step 2: Verify game.js syntax**

Run: `node -c subway-surfers/game.js`
Expected: No output (syntax OK)

---

## Task 8: Integration Testing

**Files:**
- Modify: `subway-surfers/index.html` (verify script order)

- [ ] **Step 1: Open game in browser and test basic functionality**

Open `subway-surfers/index.html` in a web browser. Verify:
- Menu screen appears with all buttons
- Play button starts the game
- Player character renders and moves
- Track and obstacles render
- Controls work (← → for lane change, Space for jump)
- Score and coins update in HUD
- Game over triggers on obstacle collision
- Leaderboard saves high scores
- Skin selection works

- [ ] **Step 2: Fix any issues found**

If there are issues, fix them in the respective files.

---

## Task 9: Final Polish & Documentation

**Files:**
- Create: `subway-surfers/tutorial.html`

- [ ] **Step 1: Create tutorial.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subway Surfers 3D - Tutorial</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Fredoka', 'Comic Sans MS', cursive, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        h1 { text-align: center; font-size: 2.5rem; margin-bottom: 30px; }
        h2 { color: #fbbf24; margin-top: 30px; }
        .card {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 20px;
            margin: 15px 0;
        }
        .control {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .key {
            background: white;
            color: #333;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            margin-right: 15px;
            min-width: 80px;
            text-align: center;
        }
        a { color: #fbbf24; }
        .back-link {
            display: block;
            text-align: center;
            margin-top: 40px;
            font-size: 1.2rem;
        }
    </style>
</head>
<body>
    <h1>🏃 How to Play</h1>
    
    <div class="card">
        <h2>Controls</h2>
        <div class="control">
            <span class="key">← →</span>
            <span>Move left/right between lanes</span>
        </div>
        <div class="control">
            <span class="key">Space</span>
            <span>Jump over barriers</span>
        </div>
        <div class="control">
            <span class="key">P</span>
            <span>Pause game</span>
        </div>
        <div class="control">
            <span class="key">Esc</span>
            <span>Return to menu</span>
        </div>
    </div>

    <div class="card">
        <h2>Collectibles</h2>
        <p>🪙 <strong>Gold Coins</strong> - Worth 10 points each</p>
        <p>🛡️ <strong>Shield</strong> - Protects from one collision</p>
        <p>🧲 <strong>Magnet</strong> - Attracts nearby coins</p>
        <p>⚡ <strong>Speed Boost</strong> - Temporary speed increase</p>
    </div>

    <div class="card">
        <h2>Tips</h2>
        <ul>
            <li>Switch lanes to avoid trains</li>
            <li>Jump over barriers</li>
            <li>Collect coins to unlock new skins</li>
            <li>Complete daily missions for bonus challenges</li>
        </ul>
    </div>

    <a href="index.html" class="back-link">← Back to Game</a>
</body>
</html>
```

- [ ] **Step 2: Final verification**

Run: `ls -la subway-surfers/`
Expected: All files present (index.html, style.css, data.js, audio.js, renderer.js, player.js, world.js, ui.js, game.js, tutorial.html)

---

## Task 10: Git Commit

- [ ] **Step 1: Stage all files**

```bash
cd /Users/mfauzan/Documents/work/project/tech-for-kids
git add subway-surfers/
```

- [ ] **Step 2: Commit with descriptive message**

```bash
git commit -m "feat: add Subway Surfers 3D game

- 3D endless runner using Three.js
- 3-lane track with obstacles, coins, powerups
- 5 unlockable character skins
- Daily missions system
- Local leaderboard
- Desktop-first keyboard controls"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Project setup & data constants | index.html, style.css, data.js |
| 2 | Audio manager | audio.js |
| 3 | Three.js renderer | renderer.js |
| 4 | Player character | player.js |
| 5 | World generation | world.js |
| 6 | UI manager | ui.js |
| 7 | Game loop | game.js |
| 8 | Integration testing | All files |
| 9 | Documentation | tutorial.html |
| 10 | Git commit | - |
