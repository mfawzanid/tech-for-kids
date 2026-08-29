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
