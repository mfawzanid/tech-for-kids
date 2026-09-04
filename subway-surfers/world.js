class World {
    constructor() {
        this.track = null;
        this.obstacles = [];
        this.coins = [];
        this.powerups = [];
        this.decorations = [];
        this.lastSpawnZ = 0;
        this.nextSpawnAt = 0;
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
        const lane = Math.floor(Math.random() * 3);
        
        // Create a Subway Surfers style train
        const trainGroup = new THREE.Group();
        
        // Materials
        const bodyBlue = new THREE.MeshLambertMaterial({ color: 0x1e3a8a }); // dark blue
        const stripeYellow = new THREE.MeshLambertMaterial({ color: 0xfbbf24 }); // yellow
        const windowDark = new THREE.MeshLambertMaterial({ color: 0x1f2937 }); // dark grey
        const wheelBlack = new THREE.MeshLambertMaterial({ color: 0x111111 });
        
        // Main train body
        const bodyGeo = new THREE.BoxGeometry(2, 1.6, 4);
        const body = new THREE.Mesh(bodyGeo, bodyBlue);
        body.position.y = 1.3;
        body.castShadow = true;
        body.receiveShadow = true;
        trainGroup.add(body);
        
        // Yellow stripe along the side
        const stripeGeo = new THREE.BoxGeometry(2.05, 0.15, 4);
        const stripe = new THREE.Mesh(stripeGeo, stripeYellow);
        stripe.position.y = 0.9;
        trainGroup.add(stripe);
        
        // Windows (left side)
        const windowGeo = new THREE.BoxGeometry(0.05, 0.5, 0.9);
        for (let i = 0; i < 3; i++) {
            const win = new THREE.Mesh(windowGeo, windowDark);
            win.position.set(-1.03, 1.6, -1 + i * 1);
            trainGroup.add(win);
        }
        
        // Windows (right side)
        for (let i = 0; i < 3; i++) {
            const win = new THREE.Mesh(windowGeo, windowDark);
            win.position.set(1.03, 1.6, -1 + i * 1);
            trainGroup.add(win);
        }
        
        // Front window
        const frontWindowGeo = new THREE.BoxGeometry(1.4, 0.5, 0.05);
        const frontWindow = new THREE.Mesh(frontWindowGeo, windowDark);
        frontWindow.position.set(0, 1.6, -2.03);
        trainGroup.add(frontWindow);
        
        // Wheels
        const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 12);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelPositions = [
            [-0.8, 0.25, -1.2], [0.8, 0.25, -1.2],
            [-0.8, 0.25, 1.2], [0.8, 0.25, 1.2]
        ];
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeo, wheelBlack);
            wheel.position.set(...pos);
            trainGroup.add(wheel);
        });
        
        // Roof
        const roofGeo = new THREE.BoxGeometry(1.8, 0.1, 3.8);
        const roof = new THREE.Mesh(roofGeo, new THREE.MeshLambertMaterial({ color: 0x374151 }));
        roof.position.y = 2.15;
        trainGroup.add(roof);
        
        trainGroup.position.set(
            GAME_CONFIG.LANES[lane],
            0,
            z
        );
        
        trainGroup.userData = {
            type: 'train',
            lane: lane,
            active: true,
            width: 2,
            height: 2.2,
            depth: 4
        };
        
        renderer.scene.add(trainGroup);
        this.obstacles.push(trainGroup);
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

    update(distance) {
        // Spawn new objects ahead of the player at a fixed distance
        const spawnGap = 15;
        while (distance >= this.nextSpawnAt) {
            this.nextSpawnAt += spawnGap;
            const spawnZ = -GAME_CONFIG.SPAWN_DISTANCE;
            this.spawnObstacle(spawnZ);
            this.spawnCoins(spawnZ);
            
            if (Math.random() < 0.2) {
                this.spawnPowerup(spawnZ - 5);
            }
            
            if (Math.random() < 0.3) {
                this.spawnDecoration(spawnZ - 10);
            }
        }

        // Cleanup objects behind player
        this.cleanup();
        
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

    cleanup() {
        const despawnZ = GAME_CONFIG.DESPAWN_DISTANCE;
        
        // Helper to dispose mesh or group
        const disposeObject = (obj) => {
            renderer.scene.remove(obj);
            if (obj.geometry) {
                obj.geometry.dispose();
            }
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
            if (obj.children) {
                obj.children.forEach(child => disposeObject(child));
            }
        };

        // Cleanup obstacles
        this.obstacles = this.obstacles.filter(obj => {
            if (obj.position.z > despawnZ) {
                disposeObject(obj);
                return false;
            }
            return true;
        });

        // Cleanup coins
        this.coins = this.coins.filter(obj => {
            if (obj.position.z > despawnZ || !obj.userData.active) {
                disposeObject(obj);
                return false;
            }
            return true;
        });

        // Cleanup powerups
        this.powerups = this.powerups.filter(obj => {
            if (obj.position.z > despawnZ || !obj.userData.active) {
                disposeObject(obj);
                return false;
            }
            return true;
        });

        // Cleanup decorations
        this.decorations = this.decorations.filter(obj => {
            if (obj.position.z > despawnZ) {
                disposeObject(obj);
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
        const isGroup = mesh2.type === 'Group';
        const width = isGroup ? (mesh2.userData.width || 1) : mesh2.geometry.parameters.width;
        const height = isGroup ? (mesh2.userData.height || 1) : mesh2.geometry.parameters.height;
        const depth = isGroup ? (mesh2.userData.depth || 1) : mesh2.geometry.parameters.depth;
        
        const box2 = {
            x: mesh2.position.x,
            y: mesh2.position.y + height / 2,
            z: mesh2.position.z,
            width: width,
            height: height,
            depth: depth
        };

        return Math.abs(box1.x - box2.x) < (box1.width + box2.width) / 2 &&
               Math.abs(box1.y - box2.y) < (box1.height + box2.height) / 2 &&
               Math.abs(box1.z - box2.z) < (box1.depth + box2.depth) / 2;
    }

    reset() {
        // Helper to dispose mesh or group
        const disposeObject = (obj) => {
            renderer.scene.remove(obj);
            if (obj.geometry) {
                obj.geometry.dispose();
            }
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
            if (obj.children) {
                obj.children.forEach(child => disposeObject(child));
            }
        };

        // Remove all objects with disposal
        this.obstacles.forEach(disposeObject);
        this.coins.forEach(disposeObject);
        this.powerups.forEach(disposeObject);
        this.decorations.forEach(disposeObject);
        
        this.obstacles = [];
        this.coins = [];
        this.powerups = [];
        this.decorations = [];
        this.lastSpawnZ = 0;
        this.nextSpawnAt = 0;
        
        // Respawn initial objects
        this.spawnInitialObjects();
    }
}

const world = new World();
