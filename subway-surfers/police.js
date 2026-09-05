class PoliceOfficer {
    constructor() {
        this.mesh = null;
        this.isChasing = false;
        this.catchProgress = 0;
        this.targetZ = 0;
        this.init();
    }

    init() {
        this.createMesh();
    }

    createMesh() {
        this.mesh = new THREE.Group();

        // Materials
        const uniformBlue = new THREE.MeshLambertMaterial({ color: 0x1e3a8a }); // police blue
        const skinMat = new THREE.MeshLambertMaterial({ color: 0xfcd9b6 });
        const hatBlue = new THREE.MeshLambertMaterial({ color: 0x1e3a8a });
        const badgeGold = new THREE.MeshLambertMaterial({ color: 0xfbbf24 });
        const beltBlack = new THREE.MeshLambertMaterial({ color: 0x111111 });
        const shoeBlack = new THREE.MeshLambertMaterial({ color: 0x111111 });

        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), skinMat);
        head.position.y = 1.85;
        head.castShadow = true;
        this.mesh.add(head);

        // Police hat
        const hatTop = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.15, 0.55), hatBlue);
        hatTop.position.y = 2.2;
        this.mesh.add(hatTop);

        const hatBrim = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.25), hatBlue);
        hatBrim.position.set(0, 2.1, -0.35);
        this.mesh.add(hatBrim);

        // Badge on hat
        const badge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.05), badgeGold);
        badge.position.set(0, 2.2, -0.3);
        this.mesh.add(badge);

        // Torso
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.8, 0.4), uniformBlue);
        torso.position.y = 1.2;
        torso.castShadow = true;
        this.mesh.add(torso);

        // Badge on chest
        const chestBadge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), badgeGold);
        chestBadge.position.set(-0.15, 1.3, 0.22);
        this.mesh.add(chestBadge);

        // Belt
        const belt = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.1, 0.42), beltBlack);
        belt.position.y = 0.75;
        this.mesh.add(belt);

        // Left arm
        this.leftArm = new THREE.Group();
        const leftArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.55, 0.2), uniformBlue);
        leftArmMesh.position.y = -0.28;
        this.leftArm.add(leftArmMesh);
        const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), skinMat);
        leftHand.position.y = -0.6;
        this.leftArm.add(leftHand);
        this.leftArm.position.set(-0.5, 1.4, 0);
        this.mesh.add(this.leftArm);

        // Right arm (reaching forward when catching)
        this.rightArm = new THREE.Group();
        const rightArmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.55, 0.2), uniformBlue);
        rightArmMesh.position.y = -0.28;
        this.rightArm.add(rightArmMesh);
        const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), skinMat);
        rightHand.position.y = -0.6;
        this.rightArm.add(rightHand);
        this.rightArm.position.set(0.5, 1.4, 0);
        this.mesh.add(this.rightArm);

        // Left leg
        this.leftLeg = new THREE.Group();
        const leftLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.55, 0.22), uniformBlue);
        leftLegMesh.position.y = -0.28;
        this.leftLeg.add(leftLegMesh);
        const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.32), shoeBlack);
        leftShoe.position.set(0, -0.58, 0.05);
        this.leftLeg.add(leftShoe);
        this.leftLeg.position.set(-0.15, 0.8, 0);
        this.mesh.add(this.leftLeg);

        // Right leg
        this.rightLeg = new THREE.Group();
        const rightLegMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.55, 0.22), uniformBlue);
        rightLegMesh.position.y = -0.28;
        this.rightLeg.add(rightLegMesh);
        const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.32), shoeBlack);
        rightShoe.position.set(0, -0.58, 0.05);
        this.rightLeg.add(rightShoe);
        this.rightLeg.position.set(0.15, 0.8, 0);
        this.mesh.add(this.rightLeg);

        // Position behind player
        this.mesh.position.set(0, 0, 3);
        this.mesh.visible = false;

        renderer.scene.add(this.mesh);
    }

    startChase() {
        this.isChasing = true;
        this.catchProgress = 0;
        this.mesh.visible = true;
        this.mesh.position.z = 3;
    }

    stopChase() {
        this.isChasing = false;
        this.mesh.visible = false;
        this.catchProgress = 0;
    }

    tempHide() {
        if (this.mesh) this.mesh.visible = false;
    }

    tempShow() {
        if (this.mesh && this.isChasing) this.mesh.visible = true;
    }

    update(playerX, playerZ, isGameOver) {
        if (!this.mesh.visible) return;

        // Follow player's x position (lane)
        const lerpFactor = 0.1;
        this.mesh.position.x += (playerX - this.mesh.position.x) * lerpFactor;

        if (isGameOver) {
            // Move forward to catch player
            this.catchProgress += 0.03;
            this.mesh.position.z = 3 - this.catchProgress * 3;
            
            // Reach out arm
            this.rightArm.rotation.x = -this.catchProgress * 1.5;
            
            // Running animation
            const time = Date.now() * 0.015;
            const swing = Math.sin(time) * 0.6;
            this.leftArm.rotation.x = swing;
            this.leftLeg.rotation.x = -swing;
            this.rightLeg.rotation.x = swing;
        } else {
            // Idle following animation
            const time = Date.now() * 0.008;
            const swing = Math.sin(time) * 0.3;
            this.leftArm.rotation.x = swing;
            this.rightArm.rotation.x = -swing;
            this.leftLeg.rotation.x = -swing * 0.5;
            this.rightLeg.rotation.x = swing * 0.5;
        }
    }

    reset() {
        this.stopChase();
        this.mesh.position.x = 0;
    }
}

const policeOfficer = new PoliceOfficer();