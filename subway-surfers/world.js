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
