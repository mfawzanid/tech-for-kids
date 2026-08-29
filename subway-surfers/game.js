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
