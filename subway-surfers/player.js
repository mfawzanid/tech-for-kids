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
        this.mesh = new THREE.Group();

        // Materials
        const skinMat = new THREE.MeshLambertMaterial({ color: 0xfcd9b6 });
        const shirtMat = new THREE.MeshLambertMaterial({ color: skin.color });
        const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1e3a5f });
        const shoeMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const eyeWhiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const eyeBlackMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const mouthMat = new THREE.MeshLambertMaterial({ color: 0xcc6666 });
        const hairMat = new THREE.MeshLambertMaterial({ color: 0x3d2314 });

        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), skinMat);
        head.position.y = 1.85;
        head.castShadow = true;
        this.mesh.add(head);

        // Hair
        const hair = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.15, 0.55), hairMat);
        hair.position.y = 2.15;
        this.mesh.add(hair);

        // Eye whites
        const eyeWhiteGeo = new THREE.BoxGeometry(0.12, 0.1, 0.05);
        const leftEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
        leftEyeWhite.position.set(-0.12, 1.88, 0.25);
        this.mesh.add(leftEyeWhite);

        const rightEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
        rightEyeWhite.position.set(0.12, 1.88, 0.25);
        this.mesh.add(rightEyeWhite);

        // Pupils
        const pupilGeo = new THREE.BoxGeometry(0.06, 0.06, 0.03);
        const leftPupil = new THREE.Mesh(pupilGeo, eyeBlackMat);
        leftPupil.position.set(-0.12, 1.88, 0.28);
        this.mesh.add(leftPupil);

        const rightPupil = new THREE.Mesh(pupilGeo, eyeBlackMat);
        rightPupil.position.set(0.12, 1.88, 0.28);
        this.mesh.add(rightPupil);

        // Nose
        const nose = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.1), skinMat);
        nose.position.set(0, 1.82, 0.28);
        this.mesh.add(nose);

        // Mouth (smile)
        const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.05), mouthMat);
        mouth.position.set(0, 1.72, 0.25);
        this.mesh.add(mouth);

        // Neck
        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.15), skinMat);
        neck.position.y = 1.55;
        this.mesh.add(neck);

        // Torso (body)
        this.body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.35), shirtMat);
        this.body.position.y = 1.15;
        this.body.castShadow = true;
        this.mesh.add(this.body);

        // Left arm
        this.leftArm = new THREE.Group();
        const leftArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), shirtMat);
        leftArmMesh.position.y = -0.25;
        this.leftArm.add(leftArmMesh);
        const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), skinMat);
        leftHand.position.y = -0.55;
        this.leftArm.add(leftHand);
        this.leftArm.position.set(-0.45, 1.35, 0);
        this.mesh.add(this.leftArm);

        // Right arm
        this.rightArm = new THREE.Group();
        const rightArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), shirtMat);
        rightArmMesh.position.y = -0.25;
        this.rightArm.add(rightArmMesh);
        const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), skinMat);
        rightHand.position.y = -0.55;
        this.rightArm.add(rightHand);
        this.rightArm.position.set(0.45, 1.35, 0);
        this.mesh.add(this.rightArm);

        // Left leg
        this.leftLeg = new THREE.Group();
        const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.2), pantsMat);
        leftLegMesh.position.y = -0.25;
        this.leftLeg.add(leftLegMesh);
        const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.3), shoeMat);
        leftShoe.position.set(0, -0.55, 0.05);
        this.leftLeg.add(leftShoe);
        this.leftLeg.position.set(-0.15, 0.8, 0);
        this.mesh.add(this.leftLeg);

        // Right leg
        this.rightLeg = new THREE.Group();
        const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.2), pantsMat);
        rightLegMesh.position.y = -0.25;
        this.rightLeg.add(rightLegMesh);
        const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.15, 0.3), shoeMat);
        rightShoe.position.set(0, -0.55, 0.05);
        this.rightLeg.add(rightShoe);
        this.rightLeg.position.set(0.15, 0.8, 0);
        this.mesh.add(this.rightLeg);

        this.mesh.position.set(0, 0, 0);
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

        // Running animation
        if (this.isGrounded && !this.isJumping) {
            const time = Date.now() * 0.008;
            const swing = Math.sin(time) * 0.5;
            const bobAmount = Math.abs(Math.sin(time)) * 0.05;

            // Bobbing body
            this.body.position.y = 1.15 + bobAmount;

            // Swing arms opposite to legs
            this.leftArm.rotation.x = swing;
            this.rightArm.rotation.x = -swing;

            // Swing legs
            this.leftLeg.rotation.x = -swing;
            this.rightLeg.rotation.x = swing;
        } else if (this.isJumping) {
            // Tuck legs when jumping
            this.leftLeg.rotation.x = -0.5;
            this.rightLeg.rotation.x = -0.5;
            this.leftArm.rotation.x = -0.3;
            this.rightArm.rotation.x = -0.3;
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
            // Also update arm shirt color
            this.leftArm.children[0].material.color.setHex(skin.color);
            this.rightArm.children[0].material.color.setHex(skin.color);
        }
    }

    getBoundingBox() {
        return {
            x: this.mesh.position.x,
            y: this.mesh.position.y,
            z: this.mesh.position.z,
            width: 0.8,
            height: 2,
            depth: 0.6
        };
    }
}

const player = new Player();
