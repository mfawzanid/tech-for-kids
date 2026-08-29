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
