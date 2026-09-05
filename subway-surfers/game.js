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
        this.powerupTimers = [];
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
        this.powerupTimers = [];
        this.policeCatching = false;
        
        player.reset();
        world.reset();
        policeOfficer.reset();
        policeOfficer.startChase();
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
        world.update(this.distance);

        // Check collisions
        this.checkCollisions();

        // Update police officer
        policeOfficer.update(player.mesh.position.x, player.mesh.position.z, this.policeCatching);

        // Update camera
        renderer.updateCamera(player.mesh.position.x);

        // Update UI
        ui.updateScore(this.score);

        // Render
        renderer.render();

        // Check if police caught player
        if (this.policeCatching && policeOfficer.catchProgress >= 1) {
            this.gameOver();
            return;
        }

        // Only continue loop if still playing
        if (this.state === 'playing') {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
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
                        // Strong pull that overcomes world movement
                        const pullStrength = Math.max(0.6, this.speed + 0.3);
                        coin.position.add(dir.multiplyScalar(pullStrength));
                        
                        // Collect immediately when very close
                        if (dist < 1.2) {
                            coin.userData.active = false;
                            this.coins += coin.userData.value;
                            ui.updateCoins(this.coins);
                            audioManager.playCoin();
                        }
                    }
                }
            });
        }

        const results = world.checkCollisions(playerPos, playerBox);

        // Collect coins (non-magnet or missed by magnet)
        results.coins.forEach(coin => {
            if (coin.userData.active) {
                coin.userData.active = false;
                this.coins += coin.userData.value;
                ui.updateCoins(this.coins);
                audioManager.playCoin();
            }
        });

        // Collect powerups
        if (results.powerup) {
            this.activatePowerup(results.powerup.userData.powerupType);
            results.powerup.userData.active = false;
            audioManager.playPowerup();
        }

        // Check obstacle collision
        if (results.obstacle && !this.policeCatching) {
            if (this.shieldActive) {
                this.shieldActive = false;
                ui.clearPowerup();
                // Visual feedback - reset player opacity after shield hit
                player.mesh.traverse(child => {
                    if (child.material) child.material.opacity = 1;
                });
            } else {
                // Police officer catches the player!
                this.policeCatching = true;
                audioManager.playCrash();
                // Slow down the game for dramatic effect
                this.speed = this.speed * 0.3;
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
                const magnetTimer = setTimeout(() => {
                    this.magnetActive = false;
                    ui.clearPowerup();
                }, POWERUP_TYPES.MAGNET.duration);
                this.powerupTimers.push(magnetTimer);
                break;
            case 'speed':
                this.speedBoostActive = true;
                ui.showPowerup('speed');
                const speedTimer = setTimeout(() => {
                    this.speedBoostActive = false;
                    ui.clearPowerup();
                }, POWERUP_TYPES.SPEED.duration);
                this.powerupTimers.push(speedTimer);
                break;
        }
    }

    gameOver() {
        this.state = 'gameover';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        policeOfficer.stopChase();
        this.policeCatching = false;
        
        ui.showGameOver(this.score, this.coins);
    }

    pause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            this.powerupTimers.forEach(id => clearTimeout(id));
            this.powerupTimers = [];
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
    if (e.code === 'Escape' && (game.state === 'playing' || game.policeCatching)) {
        if (game.animationId) {
            cancelAnimationFrame(game.animationId);
            game.animationId = null;
        }
        game.powerupTimers.forEach(id => clearTimeout(id));
        game.powerupTimers = [];
        policeOfficer.stopChase();
        game.policeCatching = false;
        ui.addCoins(game.coins);
        game.state = 'menu';
        ui.showMenu();
    }
});
