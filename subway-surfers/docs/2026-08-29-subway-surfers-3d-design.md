# Subway Surfers 3D - Game Design Spec

## Overview

A 3D endless runner game inspired by Subway Surfers, built with HTML5 + Three.js. Desktop-first with keyboard controls. Target audience: kids.

## Requirements Summary

- 3D perspective using Three.js
- Full features: skins, daily missions, leaderboard
- Desktop-first with keyboard controls
- Modular file architecture

## Architecture

### Game State Flow

```
Menu → Playing → Game Over → Menu
           ↓
      (collecting coins, dodging obstacles, using powerups)
```

### Core Loop

1. Player berlari otomatis ke depan (z-axis)
2. Player bisa berpindah jalur (kiri/tengah/kanan) dengan ← →
3. Player bisa loncat dengan Space
4. Obstacles muncul, player harus hindari
5. Koin & power-ups bisa dikumpulkan
6. Skor = jarak + koin
7. Game over saat tabrakan obstacle

### File Structure

```
subway-surfers/
├── index.html          # Main page, game container
├── game.js             # Game loop, state management, initialization
├── renderer.js         # Three.js scene, camera, lighting, rendering
├── player.js           # Player character model, animations, controls
├── world.js            # Track generation, obstacles, coins, powerups
├── ui.js               # HUD, menus, skin selection, missions, leaderboard
├── audio.js            # Sound effects (jump, coin, crash)
├── data.js             # Skin definitions, mission templates, leaderboard data
├── style.css           # Styling for UI overlays
└── docs/               # Design doc & tutorial
```

## Core Gameplay Mechanics

### Controls

- `←` `→` — Pindah jalur (3 jalur: -1, 0, +1)
- `Space` — Loncat
- `P` — Pause
- `Esc` — Menu

### Player Character

- Simple 3D box/mannequin using Three.js primitive geometry
- Animasi: berlari (bouncing), loncat, crash
- 5 skins berbeda warna/bentuk

### Track

- Infinite scrolling track dengan 3 jalur
- Track di-generate secara procedural (chunk system)
- Background: buildings, trees sebagai dekorasi

### Obstacles

- Kereta (gerbong) — harus dihindari dengan berpindah jalur
- Barrier — harus dilompati
- Traffic cone — harus dihindari

### Collectibles

- Koin emas (+10 poin per koin)
- Power-ups:
  - 🛡️ Shield — kebal 1x tabrakan
  - 🧲 Magnet — tarik semua koin terdekat
  - ⚡ Speed Boost — kecepatan 2x selama 5 detik

## UI/UX Design

### HUD (saat bermain)

```
[Score: 1250] [Coins: 23] [❤️❤️❤️]
```

### Menu Screen

- Title "Subway Surfers 3D"
- Tombol: Play, Skins, Missions, Leaderboard

### Skin Selection

- Grid 5 karakter dengan warna berbeda
- Koin yang terkumpul bisa unlock skins
- Default: Blue, Unlockable: Red (50), Green (100), Gold (200), Rainbow (500)

### Daily Missions (3 misi per hari)

- "Collect 50 coins"
- "Run 1000 meters"
- "Use 3 power-ups"
- Progress disimpan di localStorage

### Leaderboard

- Top 10 high scores
- Disimpan di localStorage

## Technical Details

### Three.js Setup

- PerspectiveCamera angle 60 derajat
- Follow camera di belakang player
- DirectionalLight + AmbientLight
- Simple shadows (optional untuk performa)

### Performance

- Object pooling untuk obstacles/coins (recycle objects)
- Distance-based cleanup (hapus object jauh)
- Target: 60fps di desktop

### Data Persistence

- `localStorage` untuk: high scores, unlocked skins, daily missions, coins
