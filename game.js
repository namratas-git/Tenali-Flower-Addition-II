/**
 * Tenali Flower Addition II Game Engine
 * Visual Addition for Foundational Numeracy (Ages 4-5)
 * [Group 1 of flowers] + [Group 2 of flowers] = [Combined group of flowers]
 * Features Web Audio synthesizer, Indian Preschool Teacher Speech Synthesis,
 * dynamic SVG flowers, tactile visual counting, and positive reinforcement.
 */

(function () {
  'use strict';

  // --- Flower Color Themes (Rotates with each new question) ---
  const FLOWER_PALETTES = [
    { name: 'Classic Purple', petal: '#ab47bc', petalDark: '#8e24aa', petalLight: '#ba68c8' }, // Authentic Tenali Blossom
    { name: 'Sky Cyan', petal: '#0ea5e9', petalDark: '#0284c7', petalLight: '#38bdf8' },
    { name: 'Rose Blossom', petal: '#f43f5e', petalDark: '#e11d48', petalLight: '#fb7185' },
    { name: 'Sunny Tangerine', petal: '#f97316', petalDark: '#ea580c', petalLight: '#fb923c' },
    { name: 'Garden Emerald', petal: '#10b981', petalDark: '#059669', petalLight: '#34d399' },
    { name: 'Royal Violet', petal: '#8b5cf6', petalDark: '#7c3aed', petalLight: '#a78bfa' },
    { name: 'Sweet Magenta', petal: '#d946ef', petalDark: '#c026d3', petalLight: '#f0abfc' },
    { name: 'Lagoon Teal', petal: '#14b8a6', petalDark: '#0d9488', petalLight: '#2dd4bf' }
  ];

  // --- Game State ---
  const state = {
    level: 1, // 1: totals up to 4, 2: totals up to 6, 3: totals up to 9
    currentQuestion: null,
    selectedAnswer: null,
    isAnswered: false,
    starsEarned: 0,
    maxStars: 10,
    currentStreak: 0,
    soundEnabled: true,
    voiceEnabled: true,
    isCountingHintActive: false,
    paletteIndex: 0,
    hasUserInteracted: false,
    hasWelcomed: false
  };

  // =========================================================================
  // SOUND ENGINE (Zero-Dependency Web Audio API Synthesizer)
  // 100% offline, standalone & reliable across all devices
  // =========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Gentle musical bubble pop when tapping a flower (pitch scales with count index 1..9)
    playPop(index = 1) {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const baseFreq = 320 + (index * 45);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    }

    // Cheerful arpeggio fanfare for correct answer (C5, E5, G5, C6)
    playSuccessFanfare() {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.38);
      });
    }

    // Warm, gentle sine pitch ramp for incorrect try (no harsh buzzers)
    playGentleTryAgain() {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    }

    // Sparkle chime when a gold quest star is earned
    playStarEarned() {
      if (!state.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [880, 1174.66, 1396.91, 1760];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.06);
        osc.stop(this.ctx.currentTime + i * 0.06 + 0.32);
      });
    }
  }

  const audio = new SoundEngine();

  // =========================================================================
  // TEACHER VOICE ENGINE (Warm Indian Preschool Teacher Speech Synthesis)
  // Gentle, patient, caring Indian English female teacher voice ('en-IN')
  // =========================================================================
  class TeacherVoiceEngine {
    constructor() {
      this.selectedVoice = null;
      this.isVoiceReady = false;
      this.initVoiceList();
    }

    initVoiceList() {
      if (!('speechSynthesis' in window)) return;

      const load = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          this.selectBestIndianVoice(voices);
          this.isVoiceReady = true;
        }
      };

      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }

    selectBestIndianVoice(voices) {
      const indianFemaleKeywords = ['neerja', 'heera', 'swara', 'veena', 'lekha', 'isha', 'ananya', 'priya'];

      // Priority 1: Indian English Female voice (e.g. Neerja Online Natural, Heera, Google en-IN, Veena)
      let best = voices.find(v => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        const isIndian = lang.startsWith('en-in') || lang === 'en_in' || name.includes('india');
        const isFemale = indianFemaleKeywords.some(k => name.includes(k)) || name.includes('female');
        return isIndian && isFemale;
      });

      // Priority 2: Any en-IN voice
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          return lang.startsWith('en-in') || lang === 'en_in';
        });
      }

      // Priority 3: Hindi bilingual voice speaking English (hi-IN)
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          return lang.startsWith('hi-in') || lang === 'hi_in';
        });
      }

      // Priority 4: Warm, gentle female English fallback (e.g. Samantha, Victoria, Hazel, Susan, Zira)
      if (!best) {
        const gentleFemale = ['samantha', 'victoria', 'hazel', 'susan', 'zira', 'karen', 'jenny', 'natural'];
        best = voices.find(v => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase();
          return lang.startsWith('en') && gentleFemale.some(k => name.includes(k));
        });
      }

      // Final fallback
      if (!best) {
        best = voices.find(v => (v.lang || '').toLowerCase().startsWith('en')) || voices[0];
      }

      this.selectedVoice = best;
    }

    getWord(n) {
      const words = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
      return words[n] || n.toString();
    }

    speak(text, onEnd) {
      if (!state.voiceEnabled || !('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
      }

      try {
        window.speechSynthesis.cancel(); // Stop any pending utterance to prevent overlapping speech

        const utterance = new SpeechSynthesisUtterance(text);
        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
        }

        const isIndian = this.selectedVoice && (
          (this.selectedVoice.lang || '').toLowerCase().includes('in') ||
          (this.selectedVoice.name || '').toLowerCase().includes('india')
        );

        utterance.lang = isIndian ? 'en-IN' : (this.selectedVoice ? this.selectedVoice.lang : 'en-US');
        utterance.rate = 0.83; // Slightly slow, patient, caring preschool pace
        utterance.pitch = 1.08; // Warm, friendly, gentle teacher pitch
        utterance.volume = 1.0;

        if (onEnd) {
          utterance.onend = () => { onEnd(); };
          utterance.onerror = () => { onEnd(); };
        }

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Teacher voice synthesis error:', e);
        if (onEnd) onEnd();
      }
    }

    // Welcome greeting
    welcome(onEnd) {
      this.speak("Hello, little gardener! Look at how the flowers combine, and let's find the total!", onEnd);
    }

    // Read question when tapping speaker icon
    readQuestion(q, onEnd) {
      if (!q) return;
      const w1 = this.getWord(q.num1);
      const w2 = this.getWord(q.num2);
      const cap1 = w1.charAt(0).toUpperCase() + w1.slice(1);
      const text = `${cap1} plus ${w2}.`;
      this.speak(text, onEnd);
    }

    // Single flower tap counting
    countFlower(n) {
      const word = this.getWord(n);
      const cap = word.charAt(0).toUpperCase() + word.slice(1);
      this.speak(cap + "!");
    }

    // Guide equation when kid counts flowers or hint finishes
    guideEquation(num1, num2, answer) {
      const w1 = this.getWord(num1);
      const w2 = this.getWord(num2);
      const wAns = this.getWord(answer);
      const cap1 = w1.charAt(0).toUpperCase() + w1.slice(1);
      const noun = answer === 1 ? 'flower' : 'flowers';
      const text = `${cap1} flowers plus ${w2} flowers make ${wAns} ${noun} in total.`;
      this.speak(text);
    }

    // Correct answer celebration
    celebrateCorrect(num1, num2, answer) {
      if (answer === undefined && state.currentQuestion) {
        answer = num1;
        num1 = state.currentQuestion.num1;
        num2 = state.currentQuestion.num2;
      }
      const w1 = this.getWord(num1);
      const cap1 = w1.charAt(0).toUpperCase() + w1.slice(1);
      const w2 = this.getWord(num2);
      const wAns = this.getWord(answer);
      const text = `Excellent! ${cap1} plus ${w2} is ${wAns}. Good job!`;
      this.speak(text);
    }

    // Encouraging retry (Zero shame)
    encourageTryAgain() {
      this.speak("That's okay, little one! Look at the combined flowers, and let's count together.");
    }

    // Level & Quest milestone completions
    completion(level = 1) {
      if (level === 1) {
        this.speak("Wonderful! You can now add numbers to make four. Ready to learn to make six?");
      } else if (level === 2) {
        this.speak("Wonderful! You can now add numbers to make six. Ready to learn to make nine?");
      } else {
        this.speak("Wonderful! You can now add numbers to make nine. You're an addition star!");
      }
    }
  }

  const teacherVoice = new TeacherVoiceEngine();

  // =========================================================================
  // SVG FLOWER COMPONENT BUILDER
  // Exactly matching Activity I: scalloped petals, sunny yellow center,
  // and number inside the yellow center!
  // =========================================================================
  function createFlowerSVG({ 
    number = null, 
    size = 72, 
    petalColor = '#ab47bc', 
    centerColor = '#ffd54f', 
    centerBorder = '#f59e0b', 
    id = '',
    hideNumber = false
  }) {
    const numPetals = 10;
    const orbitR = 25.0;
    const petalR = 15.0;
    const cx = 50.0;
    const cy = 50.0;

    let petalsHTML = '';
    for (let i = 0; i < numPetals; i++) {
      const angle = i * (2 * Math.PI / numPetals);
      const px = (cx + orbitR * Math.cos(angle)).toFixed(1);
      const py = (cy + orbitR * Math.sin(angle)).toFixed(1);
      petalsHTML += `<circle cx="${px}" cy="${py}" r="${petalR}" class="flower-petal-lobe" fill="${petalColor}" />\n`;
    }

    const digitClass = hideNumber ? 'flower-digit-text hidden-digit' : 'flower-digit-text revealed';

    const numberHTML = number !== null ? `
      <text x="50" y="51" 
            text-anchor="middle" 
            dominant-baseline="central" 
            class="${digitClass}" 
            fill="#261c14">${number}</text>
    ` : '';

    return `
      <svg class="flower-svg" viewBox="0 0 100 100" width="${size}" height="${size}" aria-label="Flower with number ${number}">
        <g class="flower-graphic" id="${id}">
          <g class="petals-group">
            ${petalsHTML}
            <circle cx="50" cy="50" r="26" class="flower-petal-lobe" fill="${petalColor}" />
          </g>
          <circle cx="50" cy="50" r="19" class="flower-center-circle" fill="${centerColor}" stroke="${centerBorder}" stroke-width="1.5" />
          ${numberHTML}
        </g>
      </svg>
    `;
  }

  // =========================================================================
  // SPACED REPETITION QUESTION SCHEDULER
  // Introduces addition pairs in dynamic triplets, repeating each fact after
  // two different intervening questions to reinforce durable retention.
  // =========================================================================
  class QuestionScheduler {
    constructor() {
      this.currentLevel = 1;
      this.queue = [];
      this.usedTripletIndices = [];
      this.initQueue(1);
    }

    initQueue(level) {
      this.currentLevel = level;
      this.queue = [];
      this.usedTripletIndices = [];
      this.fillQueue(level);
    }

    onLevelChange(newLevel) {
      this.initQueue(newLevel);
    }

    getLevelTriplets(level) {
      if (level === 1) {
        // Level 1: Totals up to 4
        return [
          [[1, 1], [2, 2], [1, 2]],
          [[1, 3], [2, 1], [3, 1]]
        ];
      } else if (level === 2) {
        // Level 2: Totals up to 6
        return [
          [[2, 3], [3, 3], [1, 4]],
          [[3, 2], [2, 4], [4, 1]],
          [[4, 2], [1, 5], [5, 1]]
        ];
      } else {
        // Level 3: Totals up to 9
        return [
          [[3, 4], [4, 4], [2, 5]],
          [[4, 5], [4, 3], [3, 5]],
          [[5, 2], [5, 3], [5, 4]],
          [[2, 6], [3, 6], [2, 7]]
        ];
      }
    }

    fillQueue(level) {
      const allTriplets = this.getLevelTriplets(level);

      let availableIndices = allTriplets.map((_, i) => i).filter(i => !this.usedTripletIndices.includes(i));
      if (availableIndices.length === 0) {
        this.usedTripletIndices = [];
        availableIndices = allTriplets.map((_, i) => i);
      }

      const chosenIndex = availableIndices[0];
      this.usedTripletIndices.push(chosenIndex);
      const triplet = allTriplets[chosenIndex];

      const A = triplet[0];
      const B = triplet[1];
      const C = triplet[2];

      // Schedule: A, B, C, then repeat A, repeat B, repeat C
      this.queue.push(
        { pair: [A[0], A[1]], isRepeat: false },
        { pair: [B[0], B[1]], isRepeat: false },
        { pair: [C[0], C[1]], isRepeat: false },
        { pair: [A[0], A[1]], isRepeat: true },
        { pair: [B[0], B[1]], isRepeat: true },
        { pair: [C[0], C[1]], isRepeat: true }
      );
    }

    getNextPair(level) {
      if (this.currentLevel !== level) {
        this.initQueue(level);
      }

      if (this.queue.length === 0) {
        this.fillQueue(level);
      }

      const item = this.queue.shift();
      return item.pair;
    }
  }

  const questionScheduler = new QuestionScheduler();

  function generateQuestion(level = state.level) {
    const [num1, num2] = questionScheduler.getNextPair(level);
    const answer = num1 + num2;

    // Generate 2 sensible preschool distractors
    const distractors = new Set();
    const candidatePool = [];

    if (answer - 1 > 0) candidatePool.push(answer - 1);
    if (answer + 1 <= 9) candidatePool.push(answer + 1);
    if (num1 > 0 && num1 !== answer) candidatePool.push(num1);
    if (num2 > 0 && num2 !== answer) candidatePool.push(num2);
    if (answer - 2 > 0) candidatePool.push(answer - 2);
    if (answer + 2 <= 9) candidatePool.push(answer + 2);

    candidatePool.sort(() => Math.random() - 0.5);

    for (const val of candidatePool) {
      if (val !== answer && val > 0 && val <= 9) {
        distractors.add(val);
        if (distractors.size === 2) break;
      }
    }

    let fallback = 1;
    while (distractors.size < 2) {
      if (fallback !== answer && fallback <= 9) {
        distractors.add(fallback);
      }
      fallback++;
    }

    const options = [answer, ...Array.from(distractors)];
    options.sort(() => Math.random() - 0.5);

    return {
      num1,
      num2,
      answer,
      options
    };
  }

  // =========================================================================
  // CONFETTI CELEBRATION ENGINE
  // =========================================================================
  class ConfettiEffect {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(x = window.innerWidth / 2, y = window.innerHeight / 2) {
      const colors = ['#f97316', '#ffd54f', '#ab47bc', '#7cb342', '#38bdf8', '#fb7185'];
      for (let i = 0; i < 48; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 8;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          opacity: 1,
          decay: 0.015 + Math.random() * 0.015
        });
      }

      if (!this.animationId) {
        this.animate();
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(() => this.animate());
      } else {
        this.animationId = null;
      }
    }
  }

  let confetti;

  // =========================================================================
  // RENDER QUESTION & VISUAL ADDITION EQUATION
  // [Group 1 of flowers] + [Group 2 of flowers] = [Combined group of flowers]
  // =========================================================================
  function renderQuestion() {
    state.isAnswered = false;
    state.selectedAnswer = null;
    state.isCountingHintActive = false;

    const q = state.currentQuestion;
    const currentPalette = FLOWER_PALETTES[state.paletteIndex];

    // Dynamically update CSS custom properties for ambient theme accents
    document.documentElement.style.setProperty('--flower-purple-petal', currentPalette.petal);
    document.documentElement.style.setProperty('--flower-purple-petal-dark', currentPalette.petalDark);
    document.documentElement.style.setProperty('--flower-purple-petal-light', currentPalette.petalLight);

    // 1. Math Question Banner: "num1 + num2 = ?"
    const qNum1 = document.getElementById('q-num1');
    const qNum2 = document.getElementById('q-num2');
    const qTarget = document.getElementById('q-target');

    if (qNum1) qNum1.textContent = q.num1;
    if (qNum2) qNum2.textContent = q.num2;
    if (qTarget) {
      qTarget.textContent = '?';
      qTarget.classList.remove('solved');
    }

    // Determine flower size class based on answer total to keep layout neat
    let flowerSizeClass = '';
    let flowerPixelSize = 72;
    if (q.answer <= 4) {
      flowerSizeClass = 'size-lg';
      flowerPixelSize = 80;
    } else if (q.answer >= 7) {
      flowerSizeClass = 'size-sm';
      flowerPixelSize = 58;
    }

    // 2. Render Group 1 Box (q.num1 flowers)
    const group1Box = document.getElementById('flower-group-1');
    if (group1Box) {
      group1Box.innerHTML = '';
      for (let i = 1; i <= q.num1; i++) {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = `flower-token ${flowerSizeClass} uncounted`;
        flowerDiv.dataset.group = '1';
        flowerDiv.dataset.countIndex = i;
        flowerDiv.dataset.counted = 'false';
        flowerDiv.innerHTML = createFlowerSVG({
          number: i,
          size: flowerPixelSize,
          petalColor: currentPalette.petal,
          centerColor: '#ffd54f',
          hideNumber: true // Hidden initially, reveals on tap!
        });

        flowerDiv.addEventListener('click', () => {
          handleFlowerTap(flowerDiv, i);
        });

        group1Box.appendChild(flowerDiv);
      }
    }

    // 3. Render Group 2 Box (q.num2 flowers)
    const group2Box = document.getElementById('flower-group-2');
    if (group2Box) {
      group2Box.innerHTML = '';
      for (let i = 1; i <= q.num2; i++) {
        const countNumber = i;
        const flowerDiv = document.createElement('div');
        flowerDiv.className = `flower-token ${flowerSizeClass} uncounted`;
        flowerDiv.dataset.group = '2';
        flowerDiv.dataset.countIndex = countNumber;
        flowerDiv.dataset.counted = 'false';
        flowerDiv.innerHTML = createFlowerSVG({
          number: countNumber,
          size: flowerPixelSize,
          petalColor: currentPalette.petal,
          centerColor: '#ffd54f',
          hideNumber: true
        });

        flowerDiv.addEventListener('click', () => {
          handleFlowerTap(flowerDiv, countNumber);
        });

        group2Box.appendChild(flowerDiv);
      }
    }

    // 4. Render Combined Result Group Box:
    // ALWAYS CONTAINS EXACTLY THE SUM OF THE FIRST TWO GROUPS!
    // e.g. 2 flowers + 2 flowers = 4 flowers
    const groupResultBox = document.getElementById('flower-group-result');
    if (groupResultBox) {
      groupResultBox.innerHTML = '';
      for (let i = 1; i <= q.answer; i++) {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = `flower-token ${flowerSizeClass} uncounted`;
        flowerDiv.dataset.group = 'result';
        flowerDiv.dataset.countIndex = i;
        flowerDiv.dataset.counted = 'false';
        flowerDiv.innerHTML = createFlowerSVG({
          number: i,
          size: flowerPixelSize,
          petalColor: currentPalette.petal,
          centerColor: '#ffd54f',
          hideNumber: true // Child can tap each flower in the combined set to count 1..answer!
        });

        flowerDiv.addEventListener('click', () => {
          handleFlowerTap(flowerDiv, i);
        });

        groupResultBox.appendChild(flowerDiv);
      }
    }

    // 5. Render Three Flower-Shaped Answer Buttons
    // Answer numbers appear directly inside yellow centres!
    const answerContainer = document.getElementById('flower-answer-buttons');
    if (answerContainer) {
      answerContainer.innerHTML = '';

      q.options.forEach((val) => {
        const btn = document.createElement('button');
        btn.className = 'flower-btn';
        btn.dataset.value = val;
        btn.setAttribute('aria-label', `Flower option ${val}`);

        btn.innerHTML = createFlowerSVG({
          number: val,
          size: 105,
          petalColor: currentPalette.petal,
          centerColor: '#ffd54f',
          hideNumber: false // Visible numbers inside sunny yellow centres
        });

        btn.addEventListener('click', (e) => {
          handleAnswerSelect(val, btn, e);
        });

        answerContainer.appendChild(btn);
      });
    }

    // 6. Reset Feedback Ribbon
    const feedbackRibbon = document.getElementById('feedback-ribbon');
    if (feedbackRibbon) {
      feedbackRibbon.innerHTML = '';
    }

    // 7. Update Level Indicator Text
    updateLevelBadge();
  }

  // --- Flower Tap Handler (Tactile Counting on Equation Blossoms) ---
  function handleFlowerTap(flowerEl, number) {
    audio.playPop(number);
    teacherVoice.countFlower(number);

    // Reveal number in flower's yellow center on tap!
    const textElem = flowerEl.querySelector('.flower-digit-text');
    if (textElem && textElem.classList.contains('hidden-digit')) {
      textElem.classList.remove('hidden-digit');
      textElem.classList.add('revealed');
    }

    flowerEl.dataset.counted = 'true';
    flowerEl.classList.remove('uncounted');
    flowerEl.classList.add('counted');

    flowerEl.classList.remove('tapped');
    void flowerEl.offsetWidth; // Trigger reflow for bounce
    flowerEl.classList.add('tapped');

    // If all flowers in the combined group have been tapped, speak gentle guidance
    checkCombinedFlowersCounted();
  }

  function checkCombinedFlowersCounted() {
    const uncountedResult = document.querySelectorAll('#flower-group-result .flower-token[data-counted="false"]');
    if (uncountedResult.length === 0 && !state.isAnswered) {
      const q = state.currentQuestion;
      setTimeout(() => {
        teacherVoice.guideEquation(q.num1, q.num2, q.answer);
      }, 450);
    }
  }

  // Reveal all question flowers upon hint or correct answer
  function revealAllQuestionFlowers() {
    const allFlowers = document.querySelectorAll('.flower-equation-wrapper .flower-token');
    allFlowers.forEach((flowerEl, idx) => {
      const textElem = flowerEl.querySelector('.flower-digit-text');
      if (textElem && textElem.classList.contains('hidden-digit')) {
        setTimeout(() => {
          textElem.classList.remove('hidden-digit');
          textElem.classList.add('revealed');
          flowerEl.dataset.counted = 'true';
          flowerEl.classList.remove('uncounted');
          flowerEl.classList.add('counted');
        }, idx * 60);
      }
    });
  }

  // =========================================================================
  // ANSWER SELECTION & VERIFICATION
  // =========================================================================
  function handleAnswerSelect(selectedVal, btnElement, event) {
    if (state.isAnswered) return;

    audio.init();

    if (selectedVal === state.currentQuestion.answer) {
      // --- CORRECT ANSWER ---
      state.isAnswered = true;
      state.selectedAnswer = selectedVal;
      state.starsEarned++;
      state.currentStreak++;

      // Update question equation display: ? -> answer with solved highlight
      const qTarget = document.getElementById('q-target');
      if (qTarget) {
        qTarget.textContent = selectedVal;
        qTarget.classList.add('solved');
      }

      // Button celebration animation
      btnElement.classList.add('correct');

      // Reveal all flowers across the equation so child sees the full solution
      revealAllQuestionFlowers();

      // Trigger Confetti originating from the clicked flower
      if (confetti) {
        const rect = btnElement.getBoundingClientRect();
        confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      // Audio & Speech
      audio.playSuccessFanfare();
      teacherVoice.celebrateCorrect(state.currentQuestion.num1, state.currentQuestion.num2, selectedVal);

      // Feedback banner
      const feedbackRibbon = document.getElementById('feedback-ribbon');
      if (feedbackRibbon) {
        const isRound10 = state.starsEarned >= state.maxStars;
        let actionBtnText = 'Play Next Round';
        if (isRound10) {
          actionBtnText = state.level < 3 ? 'Start Next Level' : 'Play Again';
        }

        feedbackRibbon.innerHTML = `
          <div class="feedback-msg success">
            🎉 Excellent! &nbsp;${state.currentQuestion.num1} + ${state.currentQuestion.num2} = ${selectedVal}&nbsp; Good job!
          </div>
          <button id="next-btn" class="next-question-btn">
            ${actionBtnText}
          </button>
        `;

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
          nextBtn.focus();
          nextBtn.addEventListener('click', () => {
            if (isRound10) {
              showLevelCompleteModal();
            } else {
              onNextQuestion();
            }
          });
        }
      }

      // Star meter update
      updateProgressStars();

      // Check for round 10 completion
      if (state.starsEarned >= state.maxStars) {
        setTimeout(() => {
          showLevelCompleteModal();
        }, 1200);
      }

    } else {
      // --- INCORRECT ANSWER (Encouraging, Non-penalizing) ---
      btnElement.classList.remove('incorrect');
      void btnElement.offsetWidth;
      btnElement.classList.add('incorrect');

      audio.playGentleTryAgain();
      teacherVoice.encourageTryAgain();

      const feedbackRibbon = document.getElementById('feedback-ribbon');
      if (feedbackRibbon) {
        feedbackRibbon.innerHTML = `
          <div class="feedback-msg try-again">
            🌱 That's okay, little one! Look at the combined flowers and try again.
          </div>
        `;
      }

      // Gently pulse the hint button to guide the child
      const hintBtn = document.getElementById('btn-count-hint');
      if (hintBtn) {
        hintBtn.classList.add('hint-pulse');
        setTimeout(() => hintBtn.classList.remove('hint-pulse'), 3000);
      }
    }
  }

  // =========================================================================
  // VISUAL EQUATION COUNTING HINT ("Count with Me")
  // Walks sequentially through Group 1, Group 2, and the Combined Result
  // =========================================================================
  function triggerCountingHint() {
    if (state.isCountingHintActive || state.isAnswered) return;
    state.isCountingHintActive = true;

    audio.init();

    const g1Flowers = Array.from(document.querySelectorAll('#flower-group-1 .flower-token'));
    const g2Flowers = Array.from(document.querySelectorAll('#flower-group-2 .flower-token'));
    const resFlowers = Array.from(document.querySelectorAll('#flower-group-result .flower-token'));

    // Sequence of elements to highlight:
    // Group 1 flowers -> Plus sign -> Group 2 flowers -> Equals sign -> Combined flowers
    const sequence = [];
    g1Flowers.forEach((f, i) => sequence.push({ elem: f, type: 'flower', count: i + 1, label: 'g1' }));
    
    const plusElem = document.querySelector('.math-plus-symbol');
    if (plusElem) sequence.push({ elem: plusElem, type: 'operator', text: 'plus' });

    g2Flowers.forEach((f, i) => sequence.push({ elem: f, type: 'flower', count: i + 1, label: 'g2' }));

    const equalsElem = document.querySelector('.math-equals-symbol');
    if (equalsElem) sequence.push({ elem: equalsElem, type: 'operator', text: 'equals' });

    resFlowers.forEach((f, i) => sequence.push({ elem: f, type: 'flower', count: i + 1, label: 'res' }));

    let stepIndex = 0;
    const interval = setInterval(() => {
      // Clear previous highlights
      document.querySelectorAll('.flower-token.highlighted, .math-operator-symbol.highlighted').forEach(el => {
        el.classList.remove('highlighted');
      });

      if (stepIndex < sequence.length) {
        const item = sequence[stepIndex];
        item.elem.classList.add('highlighted');

        if (item.type === 'flower') {
          // Reveal digit
          const textElem = item.elem.querySelector('.flower-digit-text');
          if (textElem && textElem.classList.contains('hidden-digit')) {
            textElem.classList.remove('hidden-digit');
            textElem.classList.add('revealed');
          }
          item.elem.dataset.counted = 'true';
          item.elem.classList.remove('uncounted');
          item.elem.classList.add('counted');

          audio.playPop(item.count);
          teacherVoice.countFlower(item.count);
        }

        stepIndex++;
      } else {
        clearInterval(interval);
        document.querySelectorAll('.flower-token.highlighted, .math-operator-symbol.highlighted').forEach(el => {
          el.classList.remove('highlighted');
        });
        state.isCountingHintActive = false;

        const total = state.currentQuestion.answer;
        teacherVoice.guideEquation(state.currentQuestion.num1, state.currentQuestion.num2, total);

        // Highlight matching answer button gently
        const answerBtns = document.querySelectorAll('.flower-answer-buttons .flower-btn');
        answerBtns.forEach(btn => {
          if (parseInt(btn.dataset.value, 10) === total) {
            btn.style.filter = 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.95))';
            setTimeout(() => {
              btn.style.filter = '';
            }, 3500);
          }
        });
      }
    }, 720);
  }

  // --- Next Question Action ---
  function onNextQuestion() {
    state.paletteIndex = (state.paletteIndex + 1) % FLOWER_PALETTES.length;
    state.currentQuestion = generateQuestion();
    renderQuestion();
  }

  // --- Progress & Stars Update ---
  function updateProgressStars() {
    const starSlots = document.querySelectorAll('.stars-meter-row .star-slot');
    starSlots.forEach((slot, idx) => {
      if (idx < state.starsEarned) {
        if (!slot.classList.contains('earned')) {
          slot.classList.add('earned');
          audio.playStarEarned();
        }
      } else {
        slot.classList.remove('earned');
      }
    });

    const streakEl = document.getElementById('stat-streak-val');
    if (streakEl) {
      streakEl.textContent = state.currentStreak;
    }
  }

  // --- Update Level Badge Indicator ---
  function updateLevelBadge() {
    const badge = document.getElementById('level-badge-text');
    if (badge) {
      if (state.level === 1) {
        badge.textContent = 'Level 1: Totals up to 4';
      } else if (state.level === 2) {
        badge.textContent = 'Level 2: Totals up to 6';
      } else {
        badge.textContent = 'Level 3: Totals up to 9';
      }
    }

    // Update level switcher buttons
    const levelBtns = document.querySelectorAll('.level-toggle-btn');
    levelBtns.forEach(btn => {
      const lvl = parseInt(btn.dataset.level, 10);
      if (lvl === state.level) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // CELEBRATION / QUEST COMPLETE MODAL
  // =========================================================================
  function showLevelCompleteModal() {
    audio.playSuccessFanfare();
    if (confetti) {
      confetti.burst(window.innerWidth / 2, window.innerHeight / 3);
      setTimeout(() => confetti.burst(window.innerWidth / 3, window.innerHeight / 2), 300);
      setTimeout(() => confetti.burst((window.innerWidth * 2) / 3, window.innerHeight / 2), 600);
    }

    teacherVoice.completion(state.level);

    const titleElem = document.getElementById('modal-complete-title');
    const starsText = document.getElementById('modal-complete-stars-text');
    const descText = document.getElementById('modal-complete-desc-text');
    const playBtn = document.getElementById('btn-play-again');

    if (starsText && descText && playBtn) {
      starsText.textContent = `You earned 10 ⭐ in Level ${state.level}!`;

      if (state.level === 1) {
        if (titleElem) titleElem.textContent = 'Level 1 Completed!';
        descText.textContent = 'Wonderful! 🌸 You can now add numbers to make 4. Ready to learn to make 6?';
        playBtn.textContent = 'Start Next Level';
      } else if (state.level === 2) {
        if (titleElem) titleElem.textContent = 'Level 2 Completed!';
        descText.textContent = 'Wonderful! 🌸 You can now add numbers to make 6. Ready to learn to make 9?';
        playBtn.textContent = 'Start Next Level';
      } else {
        if (titleElem) titleElem.textContent = 'Quest Completed!';
        descText.textContent = 'Wonderful! 🌸 You can now add numbers to make 9. You’re an addition star!';
        playBtn.textContent = 'Play Again';
      }
    }

    const modal = document.getElementById('quest-complete-modal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // =========================================================================
  // INITIALIZE APP
  // =========================================================================
  function init() {
    // Canvas Confetti
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      confetti = new ConfettiEffect(canvas);
    }

    // Audio Speaker button in math banner
    const audioSpeakBtn = document.getElementById('audio-speak-btn');
    if (audioSpeakBtn) {
      audioSpeakBtn.addEventListener('click', () => {
        audio.init();
        audioSpeakBtn.classList.add('speaking');
        teacherVoice.readQuestion(state.currentQuestion, () => {
          audioSpeakBtn.classList.remove('speaking');
        });
      });
    }

    // Visual Counting Hint Button
    const countHintBtn = document.getElementById('btn-count-hint');
    if (countHintBtn) {
      countHintBtn.addEventListener('click', triggerCountingHint);
    }

    // Teacher Voice & Sound Toggles
    function updateVoiceTogglesUI() {
      const soundToggleBtn = document.getElementById('btn-sound-toggle');
      const teacherVoiceBtn = document.getElementById('teacher-voice-toggle-btn');
      const teacherVoiceStatus = document.getElementById('teacher-voice-status');

      if (soundToggleBtn) {
        soundToggleBtn.textContent = state.voiceEnabled ? '🔊' : '🔇';
        soundToggleBtn.title = state.voiceEnabled ? 'Mute Teacher Voice' : 'Unmute Teacher Voice';
      }

      if (teacherVoiceBtn && teacherVoiceStatus) {
        teacherVoiceStatus.textContent = state.voiceEnabled ? 'ON' : 'OFF';
        if (state.voiceEnabled) {
          teacherVoiceBtn.classList.remove('muted');
          teacherVoiceBtn.title = 'Teacher Voice: ON (Click to Mute)';
        } else {
          teacherVoiceBtn.classList.add('muted');
          teacherVoiceBtn.title = 'Teacher Voice: OFF (Click to Unmute)';
        }
      }
    }

    function toggleTeacherVoice() {
      state.voiceEnabled = !state.voiceEnabled;
      state.soundEnabled = state.voiceEnabled;
      updateVoiceTogglesUI();

      if (!state.voiceEnabled) {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      }
    }

    const soundToggleBtn = document.getElementById('btn-sound-toggle');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', toggleTeacherVoice);
    }

    const teacherVoiceBtn = document.getElementById('teacher-voice-toggle-btn');
    if (teacherVoiceBtn) {
      teacherVoiceBtn.addEventListener('click', toggleTeacherVoice);
    }

    // Guide Modal Triggers
    const guideBtn = document.getElementById('guide-pill-btn');
    const guideModal = document.getElementById('guide-modal');
    if (guideBtn && guideModal) {
      guideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        guideModal.classList.add('active');
      });
    }

    // Level Switcher Buttons
    const levelBtns = document.querySelectorAll('.level-toggle-btn');
    levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLvl = parseInt(btn.dataset.level, 10);
        if (state.level !== selectedLvl) {
          state.level = selectedLvl;
          state.starsEarned = 0;
          state.currentStreak = 0;
          updateProgressStars();
          questionScheduler.onLevelChange(selectedLvl);
          updateLevelBadge();
          onNextQuestion();
        }
      });
    });

    // Modal Close Buttons
    const closeButtons = document.querySelectorAll('.modal-close-trigger');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('active');
      });
    });

    // Play Again button inside completion modal
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        hideModal('quest-complete-modal');
        state.starsEarned = 0;
        state.currentStreak = 0;
        updateProgressStars();
        if (state.level < 3) {
          state.level++;
        } else {
          state.level = 1;
        }
        questionScheduler.onLevelChange(state.level);
        updateLevelBadge();
        onNextQuestion();
      });
    }

    // Autoplay compliance & Voice Engine warm up on first gesture
    function handleFirstUserGesture() {
      if (!state.hasUserInteracted) {
        state.hasUserInteracted = true;
        audio.init();
        teacherVoice.initVoiceList();
      }
    }

    window.addEventListener('pointerdown', handleFirstUserGesture, { once: true });

    // Generate First Question & Start
    state.currentQuestion = generateQuestion();
    renderQuestion();
    updateVoiceTogglesUI();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();