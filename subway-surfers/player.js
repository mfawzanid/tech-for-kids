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
        this.mesh = new THREE.Group();

        // Jake materials
        const skinMat = new THREE.MeshLambertMaterial({ color: 0xd4a574 }); // tan skin
        const hoodieMat = new THREE.MeshLambertMaterial({ color: 0xcccccc }); // grey hoodie
        const vestMat = new THREE.MeshLambertMaterial({ color: 0x4a7fb5 }); // denim blue vest
        const shirtMat = new THREE.MeshLambertMaterial({ color: 0xffffff }); // white shirt
        const redMat = new THREE.MeshLambertMaterial({ color: 0xe63946 }); // red undershirt
        const jeansMat = new THREE.MeshLambertMaterial({ color: 0x2b4f81 }); // blue jeans
        const shoeGreenMat = new THREE.MeshLambertMaterial({ color: 0x2ecc71 }); // green sneakers
        const shoeRedMat = new THREE.MeshLambertMaterial({ color: 0xe74c3c }); // red sneaker accents
        const eyeWhiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const eyeBlackMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const mouthMat = new THREE.MeshLambertMaterial({ color: 0xcc6666 });
        const hairMat = new THREE.MeshLambertMaterial({ color: 0x3d2314 }); // dark brown hair
        const capMat = new THREE.MeshLambertMaterial({ color: 0xf1c40f }); // yellow cap
        const capBrimMat = new THREE.MeshLambertMaterial({ color: 0x27ae60 }); // green cap brim

        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), skinMat);
        head.position.y = 1.85;
        head.castShadow = true;
        this.mesh.add(head);

        // Hair (under cap)
        const hair = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.52), hairMat);
        hair.position.y = 2.12;
        this.mesh.add(hair);

        // Cap top
        const capTop = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.12, 0.55), capMat);
        capTop.position.y = 2.18;
        this.mesh.add(capTop);

        // Cap brim (facing forward -z)
        const capBrim = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.2), capBrimMat);
        capBrim.position.set(0, 2.12, -0.32);
        this.mesh.add(capBrim);

        // Hood (back of head)
        const hood = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.15), hoodieMat);
        hood.position.set(0, 1.85, 0.32);
        this.mesh.add(hood);

        // Eye whites
        const eyeWhiteGeo = new THREE.BoxGeometry(0.12, 0.1, 0.05);
        const leftEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
        leftEyeWhite.position.set(-0.12, 1.9, 0.25);
        this.mesh.add(leftEyeWhite);

        const rightEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
        rightEyeWhite.position.set(0.12, 1.9, 0.25);
        this.mesh.add(rightEyeWhite);

        // Pupils
        const pupilGeo = new THREE.BoxGeometry(0.06, 0.06, 0.03);
        const leftPupil = new THREE.Mesh(pupilGeo, eyeBlackMat);
        leftPupil.position.set(-0.12, 1.9, 0.28);
        this.mesh.add(leftPupil);

        const rightPupil = new THREE.Mesh(pupilGeo, eyeBlackMat);
        rightPupil.position.set(0.12, 1.9, 0.28);
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

        // Red undershirt (visible at collar)
        const undershirt = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.15, 0.05), redMat);
        undershirt.position.set(0, 1.58, 0.18);
        this.mesh.add(undershirt);

        // Torso - white hoodie base
        this.body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.35), hoodieMat);
        this.body.position.y = 1.15;
        this.body.castShadow = true;
        this.mesh.add(this.body);

        // Denim vest (front panel)
        const vest = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.05), vestMat);
        vest.position.set(0, 1.15, 0.18);
        this.mesh.add(vest);

        // Denim vest (back panel)
        const vestBack = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.05), vestMat);
        vestBack.position.set(0, 1.15, -0.18);
        this.mesh.add(vestBack);

        // Left arm
        this.leftArm = new THREE.Group();
        // Hoodie sleeve
        const leftArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), hoodieMat);
        leftArmMesh.position.y = -0.25;
        this.leftArm.add(leftArmMesh);
        // Hand
        const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), skinMat);
        leftHand.position.y = -0.55;
        this.leftArm.add(leftHand);
        this.leftArm.position.set(-0.45, 1.35, 0);
        this.mesh.add(this.leftArm);

        // Right arm
        this.rightArm = new THREE.Group();
        // Hoodie sleeve
        const rightArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), hoodieMat);
        rightArmMesh.position.y = -0.25;
        this.rightArm.add(rightArmMesh);
        // Hand
        const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), skinMat);
        rightHand.position.y = -0.55;
        this.rightArm.add(rightHand);
        // Spray can in right hand
        const sprayCan = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.1), new THREE.MeshLambertMaterial({ color: 0x9b59b6 }));
        sprayCan.position.set(0, -0.65, 0.1);
        this.rightArm.add(sprayCan);
        this.rightArm.position.set(0.45, 1.35, 0);
        this.mesh.add(this.rightArm);

        // Left leg
        this.leftLeg = new THREE.Group();
        const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.2), jeansMat);
        leftLegMesh.position.y = -0.25;
        this.leftLeg.add(leftLegMesh);
        // Green sneaker
        const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.3), shoeGreenMat);
        leftShoe.position.set(0, -0.55, 0.05);
        this.leftLeg.add(leftShoe);
        // Red accent on shoe
        const leftShoeRed = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.05, 0.1), shoeRedMat);
        leftShoeRed.position.set(0, -0.52, -0.08);
        this.leftLeg.add(leftShoeRed);
        this.leftLeg.position.set(-0.15, 0.8, 0);
        this.mesh.add(this.leftLeg);

        // Right leg
        this.rightLeg = new THREE.Group();
        const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.2), jeansMat);
        rightLegMesh.position.y = -0.25;
        this.rightLeg.add(rightLegMesh);
        // Green sneaker
        const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.3), shoeGreenMat);
        rightShoe.position.set(0, -0.55, 0.05);
        this.rightLeg.add(rightShoe);
        // Red accent on shoe
        const rightShoeRed = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.05, 0.1), shoeRedMat);
        rightShoeRed.position.set(0, -0.52, -0.08);
        this.rightLeg.add(rightShoeRed);
        this.rightLeg.position.set(0.15, 0.8, 0);
        this.mesh.add(this.rightLeg);

        this.mesh.position.set(0, 0, 0);
        
        // Add player to scene
        renderer.scene.add(this.mesh);
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
            // Change hoodie color (main body + sleeves)
            this.body.material.color.setHex(skin.color);
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
