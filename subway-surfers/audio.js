class AudioManager {
    constructor() {
        this.context = null;
        this.sounds = {};
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    createOscillator(frequency, type, duration) {
        if (!this.enabled || !this.context) return;
        
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
        
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    playJump() {
        this.createOscillator(400, 'sine', 0.1);
        setTimeout(() => this.createOscillator(600, 'sine', 0.1), 50);
    }

    playCoin() {
        this.createOscillator(800, 'sine', 0.1);
        setTimeout(() => this.createOscillator(1200, 'sine', 0.1), 50);
    }

    playPowerup() {
        this.createOscillator(400, 'sine', 0.15);
        setTimeout(() => this.createOscillator(600, 'sine', 0.15), 100);
        setTimeout(() => this.createOscillator(800, 'sine', 0.15), 200);
    }

    playCrash() {
        this.createOscillator(200, 'sawtooth', 0.3);
        this.createOscillator(100, 'square', 0.3);
    }

    playClick() {
        this.createOscillator(600, 'sine', 0.05);
    }

    resume() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
}

const audioManager = new AudioManager();
