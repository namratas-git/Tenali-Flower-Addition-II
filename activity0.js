/**
 * ============================================================================
 * TENALI PUZZLES & GAMES - ACTIVITY 0: CORAL FLOWER ADDITION
 * ============================================================================
 * Primary Artwork: Coral-red flowers with heart-shaped petals, dark red outlines,
 * circular golden-yellow centres with amber border, on soft mint-green backgrounds.
 * 
 * Addition Learning Structure:
 * - 3 Progressive Levels: Totals up to 4, 6, and 9 (10 questions per level)
 * - [First Group] + [Second Group] = [Combined Total]
 * - Concrete-to-representational flower counting with interactive audio feedback
 * - "Count With Me" guided teacher narration with speech synchronisation
 * - "Count Again" single-tap recount preserving question & score
 * - Answer selection with positive reinforcement and zero penalties
 * ============================================================================
 */

(function () {
  'use strict';

  // --- Configuration Constants ---
  const ACTIVITY0_NUM_PETALS = 6; // 6 rounded, heart-shaped petals per requirement
  const STORAGE_KEY_ACT0_STATE = 'tenali_flower_math_act0_v1';
  const STORAGE_KEY_ACTIVITY = 'tenali_active_activity';

  // --- Coordinated Activity 0 Flower Themes (Attractive, Bright, High Contrast, Child-Friendly) ---
  // Rotates across 12 distinct, high-contrast, preschool-friendly floral themes.
  // Within any round: First Group, Second Group, Combined Total flowers, and Answer Option Buttons
  // all share the exact same coordinated color theme.
  // Each new round automatically receives a fresh, non-repeating color theme.
  const ACTIVITY0_THEMES = [
    {
      id: 'coral',
      name: 'Coral Red',
      petalStart: '#ff7575',
      petalMid: '#f85454',
      petalEnd: '#de3333',
      outline: '#a82323',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    },
    {
      id: 'pink',
      name: 'Rose Pink',
      petalStart: '#f9a8d4',
      petalMid: '#ec4899',
      petalEnd: '#be185d',
      outline: '#9d174d',
      centerStart: '#fff9c4',
      centerMid: '#fdd835',
      centerEnd: '#f59e0b',
      centerStroke: '#d97706',
      numberColor: '#261c14'
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      petalStart: '#d8b4fe',
      petalMid: '#a855f7',
      petalEnd: '#7e22ce',
      outline: '#581c87',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    },
    {
      id: 'skyblue',
      name: 'Sky Blue',
      petalStart: '#7dd3fc',
      petalMid: '#0ea5e9',
      petalEnd: '#0369a1',
      outline: '#075985',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    },
    {
      id: 'orange',
      name: 'Sunny Orange',
      petalStart: '#fdba74',
      petalMid: '#f97316',
      petalEnd: '#c2410c',
      outline: '#9a3412',
      centerStart: '#fffde7',
      centerMid: '#ffee58',
      centerEnd: '#fdd835',
      centerStroke: '#d97706',
      numberColor: '#261c14'
    },
    {
      id: 'turquoise',
      name: 'Turquoise Teal',
      petalStart: '#5eead4',
      petalMid: '#14b8a6',
      petalEnd: '#0f766e',
      outline: '#115e59',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    },
    {
      id: 'magenta',
      name: 'Bright Magenta',
      petalStart: '#fb7185',
      petalMid: '#f43f5e',
      petalEnd: '#be123c',
      outline: '#881337',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    },
    {
      id: 'lavender',
      name: 'Sweet Lavender',
      petalStart: '#c4b5fd',
      petalMid: '#8b5cf6',
      petalEnd: '#6d28d9',
      outline: '#4c1d95',
      centerStart: '#fff9c4',
      centerMid: '#fdd835',
      centerEnd: '#f59e0b',
      centerStroke: '#d97706',
      numberColor: '#261c14'
    },
    {
      id: 'emerald',
      name: 'Emerald Meadow',
      petalStart: '#6ee7b7',
      petalMid: '#10b981',
      petalEnd: '#047857',
      outline: '#064e3b',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    },
    {
      id: 'periwinkle',
      name: 'Periwinkle Blue',
      petalStart: '#a5b4fc',
      petalMid: '#6366f1',
      petalEnd: '#4338ca',
      outline: '#312e81',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    },
    {
      id: 'ruby',
      name: 'Ruby Red',
      petalStart: '#fca5a5',
      petalMid: '#ef4444',
      petalEnd: '#b91c1c',
      outline: '#7f1d1d',
      centerStart: '#fff9c4',
      centerMid: '#fdd835',
      centerEnd: '#f59e0b',
      centerStroke: '#d97706',
      numberColor: '#261c14'
    },
    {
      id: 'violet',
      name: 'Violet Plum',
      petalStart: '#e879f9',
      petalMid: '#c026d3',
      petalEnd: '#86198f',
      outline: '#701a75',
      centerStart: '#fff575',
      centerMid: '#fed634',
      centerEnd: '#f5b820',
      centerStroke: '#e67e22',
      numberColor: '#261c14'
    }
  ];

  function getCurrentTheme0() {
    const idx = (state0.themeIndex || 0) % ACTIVITY0_THEMES.length;
    return ACTIVITY0_THEMES[idx >= 0 ? idx : 0];
  }

  // --- Safe LocalStorage Helpers ---
  function safeGetItem(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      /* ignore */
    }
    return null;
  }

  function safeSetItem(key, val) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
      }
    } catch (e) {
      /* ignore */
    }
  }

  // =========================================================================
  // AUDIO SYNTHESIZER (Gentle wooden pops & celebration chimes)
  // =========================================================================
  class AudioSynth0 {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.initOnFirstInteraction();
    }

    initOnFirstInteraction() {
      const unlock = () => {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        ['click', 'touchstart', 'keydown'].forEach(evt => {
          document.removeEventListener(evt, unlock);
        });
      };
      ['click', 'touchstart', 'keydown'].forEach(evt => {
        document.addEventListener(evt, unlock, { once: true, passive: true });
      });
    }

    ensureContext() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    }

    playPop(count = 1) {
      if (this.isMuted || (typeof window !== 'undefined' && window.TenaliSoundMuted)) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const baseFreq = 330;
      const freqStep = 32;
      const freq = Math.min(baseFreq + (count - 1) * freqStep, 720);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, ctx.currentTime + 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.095);
    }

    playCelebrationChime() {
      if (this.isMuted || (typeof window !== 'undefined' && window.TenaliSoundMuted)) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + i * 0.075;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.36);
      });
    }

    playGentleTryAgain() {
      if (this.isMuted || (typeof window !== 'undefined' && window.TenaliSoundMuted)) return;
      const ctx = this.ensureContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }

    playGentleWobble() {
      this.playGentleTryAgain();
    }
  }

  // =========================================================================
  // TEACHER VOICE ENGINE (Matching Activities 1, 2, and 3)
  // Exact voice selection logic, browser compatibility, and speech profile:
  // - Chrome: Indian English Female (or Google UK English Female fallback)
  // - Cross-browser: Natural Indian English Female / UK English Female
  // - Speech Settings: rate = 0.83, pitch = 1.08, volume = 1.0
  // =========================================================================
  class TeacherVoice0 {
    constructor() {
      this.selectedVoice = null;
      this.isVoiceReady = false;
      this.activeUtterance = null;
      this.initVoiceList();
    }

    isGoogleChrome() {
      if (typeof navigator === 'undefined') return true;
      const ua = (navigator.userAgent || '').toLowerCase();
      const vendor = (navigator.vendor || '').toLowerCase();
      if (ua.includes('brave') || (navigator.brave && typeof navigator.brave.isBrave === 'function')) return false;
      if (ua.includes('edg/')) return false;
      if (ua.includes('opr/') || ua.includes('opera') || ua.includes('opt/')) return false;
      if (ua.includes('firefox') || ua.includes('fxios')) return false;
      if ((ua.includes('safari') || vendor.includes('apple')) && !ua.includes('chrome') && !ua.includes('chromium')) return false;
      if (ua.includes('vivaldi') || ua.includes('yabrowser')) return false;
      return ua.includes('chrome') || ua.includes('crios') || vendor.includes('google');
    }

    initVoiceList() {
      if (!('speechSynthesis' in window)) return;

      const load = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          this.selectVoice(voices);
          this.isVoiceReady = true;
        }
      };

      // 1. Attempt immediate load
      load();

      // 2. Event listener for asynchronous voice loading
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = load;
      }
      if (window.speechSynthesis.addEventListener) {
        window.speechSynthesis.addEventListener('voiceschanged', load);
      }

      // 3. Robust polling fallback for browsers with lazy-loaded voice lists (e.g. Chrome, Edge on Windows)
      let pollCount = 0;
      const pollTimer = setInterval(() => {
        pollCount++;
        const voices = window.speechSynthesis.getVoices();
        if ((voices && voices.length > 0 && this.selectedVoice) || pollCount > 12) {
          clearInterval(pollTimer);
        } else if (voices && voices.length > 0) {
          load();
        }
      }, 200);
    }

    ensureVoice() {
      if (!('speechSynthesis' in window)) return null;
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      return this.selectVoice(voices);
    }

    selectVoice(voices) {
      if (this.isGoogleChrome()) {
        this.selectedVoice = this.selectExistingChromeVoice(voices);
      } else {
        this.selectedVoice = this.selectCrossBrowserVoice(voices);
      }
      this.isVoiceReady = !!this.selectedVoice;
      return this.selectedVoice;
    }

    // Exact existing Chrome voice selection logic preserved strictly from Activities 1, 2, and 3
    selectExistingChromeVoice(voices) {
      if (!voices || voices.length === 0) return null;

      const isMale = (name) => {
        const n = name.toLowerCase();
        return n.includes('david') || n.includes('mark') || n.includes('george') ||
               n.includes('ravi') || n.includes('male') || n.includes('guy') || n.includes('james');
      };

      // 1. Indian English Female
      let best = voices.find(v => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        const isInd = lang.includes('en-in') || lang.includes('en_in') || name.includes('india');
        return isInd && !isMale(name);
      });

      // 2. Any Indian English
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          const name = (v.name || '').toLowerCase();
          return lang.includes('en-in') || lang.includes('en_in') || name.includes('india');
        });
      }

      // 3. Any English Female
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          const name = (v.name || '').toLowerCase();
          return lang.startsWith('en') && !isMale(name);
        });
      }

      // 4. Fallback
      if (!best) {
        best = voices.find(v => (v.lang || '').toLowerCase().startsWith('en')) || voices[0];
      }

      return best;
    }

    // Extended cross-browser selection for Brave, Edge, Firefox, Safari (exact logic from Activities 1, 2, and 3)
    selectCrossBrowserVoice(voices) {
      if (!voices || voices.length === 0) return null;

      const maleKeywords = [
        'ravi', 'prabhat', 'madhur', 'david', 'mark', 'george', 'richard',
        'james', 'alex', 'daniel', 'fred', 'male', 'guy', 'brian', 'tom',
        'steffan', 'oliver', 'rishi', 'sanjay', 'ryan', 'adam', 'paul', 'john', 'michael'
      ];
      const isMale = (name) => {
        const lower = (name || '').toLowerCase();
        if (lower.includes('female') || lower.includes('woman') || lower.includes('girl')) {
          return false;
        }
        return maleKeywords.some(m => lower.includes(m));
      };

      // 1. Prefer the same female teacher voice used in Chrome whenever that voice is available
      const chromePreferred = this.selectExistingChromeVoice(voices);
      if (chromePreferred && !isMale(chromePreferred.name) && (
        (chromePreferred.lang || '').toLowerCase().includes('in') ||
        (chromePreferred.name || '').toLowerCase().includes('female') ||
        (chromePreferred.name || '').toLowerCase().includes('natural')
      )) {
        return chromePreferred;
      }

      const indianFemaleKeywords = [
        'neerja', 'heera', 'swara', 'veena', 'lekha', 'isha', 'ananya', 'priya', 'kavya', 'shruti', 'aditi'
      ];

      // 2. Indian English Natural / Online Female voice (e.g. Edge Microsoft Neerja Online (Natural))
      let best = voices.find(v => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        const isIndian = lang.startsWith('en-in') || lang === 'en_in' || name.includes('india');
        const isNatural = name.includes('natural') || name.includes('online');
        const isFemale = indianFemaleKeywords.some(k => name.includes(k)) || name.includes('female');
        return isIndian && isFemale && isNatural && !isMale(name);
      });

      // 3. Standard Indian English Female voice (e.g. Microsoft Heera, Veena)
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          const name = (v.name || '').toLowerCase();
          const isIndian = lang.startsWith('en-in') || lang === 'en_in' || name.includes('india');
          const isFemale = indianFemaleKeywords.some(k => name.includes(k)) || name.includes('female');
          return isIndian && isFemale && !isMale(name);
        });
      }

      // 4. Any Indian English non-male voice
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          const name = (v.name || '').toLowerCase();
          const isIndian = lang.startsWith('en-in') || lang === 'en_in' || name.includes('india');
          return isIndian && !isMale(name);
        });
      }

      // 5. Hindi bilingual voice speaking English (hi-IN)
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          const name = (v.name || '').toLowerCase();
          return (lang.startsWith('hi-in') || lang === 'hi_in') && !isMale(name);
        });
      }

      // 6. Warm, gentle female English teacher fallback (e.g. Samantha, Zira, Jenny, Victoria, Hazel, Susan, Karen)
      if (!best) {
        const gentleFemale = [
          'samantha', 'zira', 'jenny', 'victoria', 'hazel', 'susan', 'karen', 'moira',
          'tessa', 'fiona', 'ava', 'allison', 'aria', 'cora', 'clara', 'natural', 'female'
        ];
        best = voices.find(v => {
          const name = (v.name || '').toLowerCase();
          const lang = (v.lang || '').toLowerCase();
          return lang.startsWith('en') && gentleFemale.some(k => name.includes(k)) && !isMale(name);
        });
      }

      // 7. Any non-male English voice
      if (!best) {
        best = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          const name = (v.name || '').toLowerCase();
          return lang.startsWith('en') && !isMale(name);
        });
      }

      // 8. Final fallback to any English voice or first available voice
      if (!best) {
        best = voices.find(v => (v.lang || '').toLowerCase().startsWith('en')) || voices[0];
      }

      return best;
    }

    isVoiceOn() {
      const voiceStatus = document.getElementById('teacher-voice-status');
      const text = voiceStatus && voiceStatus.textContent ? voiceStatus.textContent.trim().toUpperCase() : 'ON';
      return text !== 'OFF';
    }

    getWord(n) {
      const words = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
      return words[n] || String(n);
    }

    cancel() {
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {
          // ignore
        }
      }
      this.activeUtterance = null;
    }

    speak(text, onEnd = null) {
      if (!this.isVoiceOn() || !('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
      }

      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        this.ensureVoice();
        const UtteranceClass = window.SpeechSynthesisUtterance || SpeechSynthesisUtterance;
        const utterance = new UtteranceClass(text);
        this.activeUtterance = utterance; // Prevent Chrome garbage-collection bug

        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
        }

        const isIndian = this.selectedVoice && (
          (this.selectedVoice.lang || '').toLowerCase().includes('in') ||
          (this.selectedVoice.name || '').toLowerCase().includes('india')
        );

        // Language code set to voice's native lang or en-IN for Indian voices
        utterance.lang = isIndian ? (this.selectedVoice.lang || 'en-IN') : (this.selectedVoice ? this.selectedVoice.lang : 'en-IN');
        utterance.rate = 0.83; // Exact preschool cadence matching Activities 1, 2, and 3
        utterance.pitch = 1.08; // Gentle, warm pitch matching Activities 1, 2, and 3
        utterance.volume = 1.0;

        let called = false;
        const cleanup = () => {
          if (called) return;
          called = true;
          this.activeUtterance = null;
          if (onEnd) onEnd();
        };

        utterance.onend = cleanup;
        utterance.onerror = (e) => {
          cleanup();
        };

        // Safety fallback timer so speech callback always resolves even if speech engine stalls
        setTimeout(cleanup, 4500);

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Teacher voice synthesis error in Activity 0:', e);
        if (onEnd) onEnd();
      }
    }

    readQuestion(num1, num2, onEnd = null) {
      const w1 = this.getWord(num1);
      const cap1 = w1.charAt(0).toUpperCase() + w1.slice(1);
      const w2 = this.getWord(num2);
      this.speak(`${cap1} plus ${w2}.`, onEnd);
    }

    countFlower(number, onEnd = null) {
      const word = this.getWord(number);
      const cap = word.charAt(0).toUpperCase() + word.slice(1);
      this.speak(`${cap}!`, onEnd);
    }

    sayPlus(onEnd = null) {
      this.speak('Plus.', onEnd);
    }

    sayEquals(onEnd = null) {
      this.speak('Equals', onEnd);
    }

    announceTotal(total, onEnd = null) {
      const wAns = this.getWord(total);
      const noun = total === 1 ? 'flower' : 'flowers';
      const text = `We have ${wAns} ${noun} in total.`;
      this.speak(text, onEnd);
    }

    celebrateCorrect(num1, num2, total, onEnd = null) {
      if (total === undefined && state0.currentQuestion) {
        total = state0.currentQuestion.answer;
        num1 = state0.currentQuestion.num1;
        num2 = state0.currentQuestion.num2;
      }
      const w1 = this.getWord(num1);
      const cap1 = w1.charAt(0).toUpperCase() + w1.slice(1);
      const w2 = this.getWord(num2);
      const wAns = this.getWord(total);
      const text = `Excellent! ${cap1} plus ${w2} is ${wAns}. Good job!`;
      this.speak(text, onEnd);
    }

    encourageTryAgain(onEnd = null) {
      this.speak("That's okay, little one! Let's count and add the flowers together.", onEnd);
    }

    sayFeedback(isCorrect, onEnd = null) {
      if (isCorrect) {
        this.celebrateCorrect(undefined, undefined, undefined, onEnd);
      } else {
        this.encourageTryAgain(onEnd);
      }
    }
  }

  // =========================================================================
  // CORAL-RED FLOWER SVG GENERATOR
  // Reproduces reference image artwork:
  // - Six rounded, heart-shaped coral-red petals with soft cleft at the tip
  // - Large circular golden-yellow centre with amber border
  // - Dark red outlines around the petals
  // - Soft 3D cartoon appearance with subtle radial gradients and gentle shadows
  // =========================================================================
  function createCoralFlowerSVG({
    number = null,
    size = 72,
    numPetals = ACTIVITY0_NUM_PETALS,
    hideNumber = false,
    id = '',
    theme = null,
    isAnswerOption = false
  }) {
    const activeTheme = theme || getCurrentTheme0();
    const isAnswer = isAnswerOption || (size >= 95);
    const is6 = numPetals === 6;
    // Cubic bezier points for plump, rounded heart-shaped petal pointing straight up (along -Y)
    const w = is6 ? 16.5 : 19.5;
    const lobeX = is6 ? 8.2 : 9.5;
    const peakY = -45;
    const cleftY = -36.5;
    const flareY = -28;

    const petalD = `M -6,-14 C -11,-19 -${w},${flareY} -${w},-34 C -${w},-42 -${(lobeX + 3).toFixed(1)},${peakY} -${lobeX},${peakY} C -${(lobeX - 4).toFixed(1)},${peakY} -2,-41 0,${cleftY} C 2,-41 ${(lobeX - 4).toFixed(1)},${peakY} ${lobeX},${peakY} C ${(lobeX + 3).toFixed(1)},${peakY} ${w},-42 ${w},-34 C ${w},${flareY} 11,-19 6,-14 Z`;

    const gradPetalId = activeTheme.id === 'coral' ? 'act0-coral-petal-grad' : `act0-petal-grad-${activeTheme.id}`;
    const gradCenterId = activeTheme.id === 'coral' ? 'act0-coral-center-grad' : `act0-center-grad-${activeTheme.id}`;

    let petalsHTML = '';
    const angleStep = 360 / numPetals;
    for (let i = 0; i < numPetals; i++) {
      const angle = i * angleStep;
      petalsHTML += `<path d="${petalD}" transform="rotate(${angle})" fill="url(#${gradPetalId})" stroke="${activeTheme.outline}" stroke-width="2.2" stroke-linejoin="round" />\n`;
    }

    const digitClass = isAnswer
      ? 'answer-flower-digit-text act0-answer-digit'
      : (hideNumber ? 'flower-digit-text hidden-digit' : 'flower-digit-text revealed');
    const displayVal = (number !== null && number !== undefined) ? number : '';
    const fontSize = isAnswer ? 26 : (size > 65 ? 21 : 18);
    const textY = 1; // Precision vertical optical center (matching cy + 1 in Activities 1, 2, and 3)

    const numberHTML = displayVal ? `
      <text x="0" y="${textY}" 
            text-anchor="middle" 
            dominant-baseline="central" 
            class="${digitClass}" 
            font-family="'Fredoka', 'Quicksand', 'Nunito', sans-serif" 
            font-weight="900" 
            font-size="${fontSize}"
            fill="${activeTheme.numberColor}"
            style="pointer-events: none; user-select: none;">${displayVal}</text>
    ` : '';

    const label = displayVal ? `Flower with number ${displayVal}` : 'Flower - tap to count';
    const svgExtraClass = isAnswer ? ' answer-flower-svg act0-answer-flower-svg' : '';

    return `
      <svg class="flower-svg coral-flower-svg act0-theme-${activeTheme.id}${svgExtraClass}" viewBox="-55 -55 110 110" width="${size}" height="${size}" aria-label="${label}">
        <defs>
          <radialGradient id="${gradPetalId}" cx="0" cy="-28" r="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${activeTheme.petalStart}" />
            <stop offset="55%" stop-color="${activeTheme.petalMid}" />
            <stop offset="100%" stop-color="${activeTheme.petalEnd}" />
          </radialGradient>
          <radialGradient id="${gradCenterId}" cx="-2" cy="-2" r="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${activeTheme.centerStart}" />
            <stop offset="65%" stop-color="${activeTheme.centerMid}" />
            <stop offset="100%" stop-color="${activeTheme.centerEnd}" />
          </radialGradient>
        </defs>
        <g class="flower-graphic" id="${id}">
          <g class="coral-petals-group">
            ${petalsHTML}
          </g>
          <circle cx="0" cy="0" r="16.5" class="flower-center-circle" fill="url(#${gradCenterId})" stroke="${activeTheme.centerStroke}" stroke-width="1.8" />
          ${numberHTML}
        </g>
      </svg>
    `;
  }

  // =========================================================================
  // SPACED REPETITION QUESTION SCHEDULER
  // Level 1: Totals up to 4
  // Level 2: Totals up to 6
  // Level 3: Totals up to 9
  // =========================================================================
  class QuestionScheduler0 {
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

    getLevelTriplets(level) {
      if (level === 1) {
        // Totals up to 4
        return [
          [[1, 2], [1, 1], [2, 2]],
          [[1, 3], [2, 1], [3, 1]]
        ];
      } else if (level === 2) {
        // Totals up to 6
        return [
          [[2, 3], [3, 3], [1, 4]],
          [[3, 2], [2, 4], [4, 1]],
          [[4, 2], [1, 5], [5, 1]]
        ];
      } else {
        // Totals up to 9
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

      // Dynamic spaced expansion: [A, B, C, A, B, C]
      const expanded = [triplet[0], triplet[1], triplet[2], triplet[0], triplet[1], triplet[2]];
      this.queue.push(...expanded);
    }

    getNextPair() {
      if (this.queue.length === 0) {
        this.fillQueue(this.currentLevel);
      }
      return this.queue.shift();
    }
  }

  // =========================================================================
  // GAME STATE & TIMERS
  // =========================================================================
  const state0 = {
    level: 1,
    starsEarned: 0,
    currentStreak: 0,
    currentQuestion: null,
    currentStage: 'counting_g1', // 'counting_g1' | 'counting_g2' | 'counting_total' | 'total_announced' | 'answered'
    boxCounters: {
      'act0-flower-group-1': 0,
      'act0-flower-group-2': 0,
      'act0-flower-group-result': 0
    },
    isCountingHintActive: false,
    hasAnnouncedTotal: false,
    isAnswerSelected: false,
    isAnswerSelectionEnabled: false,
    themeIndex: 0
  };

  const audio0 = new AudioSynth0();
  const teacherVoice0 = new TeacherVoice0();
  const scheduler0 = new QuestionScheduler0();

  let hintTimers0 = [];
  function setHintTimeout0(fn, delay) {
    const id = setTimeout(fn, delay);
    hintTimers0.push(id);
    return id;
  }
  function clearHintTimers0() {
    hintTimers0.forEach(id => clearTimeout(id));
    hintTimers0 = [];
  }

  // =========================================================================
  // QUESTION GENERATION & UI BADGES
  // =========================================================================
  function generateQuestion0() {
    const pair = scheduler0.getNextPair();
    const num1 = pair[0];
    const num2 = pair[1];
    const answer = num1 + num2;

    // Generate 2 plausible distractors
    const distractors = [];
    const candidates = [answer - 1, answer + 1, answer - 2, answer + 2];
    for (const c of candidates) {
      if (c >= 2 && c <= 9 && c !== answer && !distractors.includes(c)) {
        distractors.push(c);
      }
      if (distractors.length === 2) break;
    }
    while (distractors.length < 2) {
      const fallback = Math.floor(Math.random() * 8) + 2;
      if (fallback !== answer && !distractors.includes(fallback)) {
        distractors.push(fallback);
      }
    }

    const options = [answer, distractors[0], distractors[1]];
    // Fisher-Yates shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return { num1, num2, answer, options };
  }

  function updateLevelBadge0() {
    const badge = document.getElementById('level-badge-text');
    if (!badge) return;
    if (state0.level === 1) {
      badge.textContent = 'Level 1: Totals up to 4';
    } else if (state0.level === 2) {
      badge.textContent = 'Level 2: Totals up to 6';
    } else {
      badge.textContent = 'Level 3: Totals up to 9';
    }

    // Sync level toggle buttons
    const btns = document.querySelectorAll('.level-toggle-btn');
    btns.forEach(btn => {
      const lvl = parseInt(btn.dataset.level, 10);
      if (lvl === state0.level) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function updateProgressStars0() {
    const starSlots = document.querySelectorAll('.quest-progress-strip .star-slot');
    starSlots.forEach((slot, idx) => {
      if (idx < state0.starsEarned) {
        slot.classList.add('earned');
      } else {
        slot.classList.remove('earned');
      }
    });

    const streakVal = document.getElementById('stat-streak-val');
    if (streakVal) {
      streakVal.textContent = state0.currentStreak;
    }
  }

  // =========================================================================
  // RENDER QUESTION
  // =========================================================================
  function renderQuestion0() {
    const q = state0.currentQuestion;
    if (!q) return;

    // Reset counters & stage
    state0.boxCounters['act0-flower-group-1'] = 0;
    state0.boxCounters['act0-flower-group-2'] = 0;
    state0.boxCounters['act0-flower-group-result'] = 0;
    state0.currentStage = 'counting_g1';
    state0.hasAnnouncedTotal = false;
    state0.isAnswerSelected = false;

    // Container visual classes
    const box1El = document.getElementById('act0-flower-group-1');
    const box2El = document.getElementById('act0-flower-group-2');
    const resBox = document.getElementById('act0-flower-group-result');

    if (box1El) {
      box1El.classList.remove('box-completed', 'counting-active', 'box-attention');
      box1El.classList.add('counting-active');
    }
    if (box2El) {
      box2El.classList.remove('box-completed', 'counting-active', 'box-attention');
    }
    if (resBox) {
      resBox.classList.remove('box-completed', 'counting-active', 'box-attention');
    }

    const plusEl = document.getElementById('act0-plus-symbol');
    const equalsEl = document.getElementById('act0-equals-symbol');
    if (plusEl) plusEl.classList.remove('symbol-glow', 'highlighted');
    if (equalsEl) equalsEl.classList.remove('symbol-glow', 'highlighted');

    // Sizing determination
    const totalFlowers = q.answer;
    let flowerSizeClass = 'size-md';
    let flowerPixelSize = 68;
    if (totalFlowers <= 4) {
      flowerSizeClass = 'size-lg';
      flowerPixelSize = 78;
    } else if (totalFlowers <= 6) {
      flowerSizeClass = 'size-md';
      flowerPixelSize = 66;
    } else {
      flowerSizeClass = 'size-sm';
      flowerPixelSize = 56;
    }

    // 1. Group 1 Box (q.num1 coral flowers)
    if (box1El) {
      box1El.innerHTML = '';
      for (let i = 1; i <= q.num1; i++) {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = `flower-token ${flowerSizeClass} uncounted`;
        flowerDiv.dataset.box = 'act0-flower-group-1';
        flowerDiv.dataset.counted = 'false';
        flowerDiv.innerHTML = createCoralFlowerSVG({
          number: '',
          size: flowerPixelSize,
          hideNumber: true
        });

        flowerDiv.addEventListener('click', () => {
          handleFlowerTap0(flowerDiv, 'act0-flower-group-1');
        });

        box1El.appendChild(flowerDiv);
      }
    }

    // 2. Group 2 Box (q.num2 coral flowers)
    if (box2El) {
      box2El.innerHTML = '';
      for (let i = 1; i <= q.num2; i++) {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = `flower-token ${flowerSizeClass} uncounted`;
        flowerDiv.dataset.box = 'act0-flower-group-2';
        flowerDiv.dataset.counted = 'false';
        flowerDiv.innerHTML = createCoralFlowerSVG({
          number: '',
          size: flowerPixelSize,
          hideNumber: true
        });

        flowerDiv.addEventListener('click', () => {
          handleFlowerTap0(flowerDiv, 'act0-flower-group-2');
        });

        box2El.appendChild(flowerDiv);
      }
    }

    // 3. Combined Total Box (Answer Box): Displays individual flowers from the beginning!
    if (resBox) {
      resBox.innerHTML = '';
      resBox.classList.remove('box-completed', 'counting-active', 'box-attention');
      for (let i = 1; i <= q.answer; i++) {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = `flower-token ${flowerSizeClass} uncounted`;
        flowerDiv.dataset.box = 'act0-flower-group-result';
        flowerDiv.dataset.counted = 'false';
        flowerDiv.innerHTML = createCoralFlowerSVG({
          number: '',
          size: flowerPixelSize,
          hideNumber: true
        });

        flowerDiv.addEventListener('click', () => {
          handleFlowerTap0(flowerDiv, 'act0-flower-group-result');
        });

        resBox.appendChild(flowerDiv);
      }
    }

    // 4. Answer Buttons (3 flower buttons, start disabled & half-hidden)
    const answerContainer = document.getElementById('act0-flower-answer-buttons');
    if (answerContainer) {
      answerContainer.style.display = 'flex';
      answerContainer.style.pointerEvents = 'none';
      answerContainer.innerHTML = '';
      state0.isAnswerSelectionEnabled = false;
      state0.isAnswerSelected = false;

      q.options.forEach(val => {
        const btn = document.createElement('button');
        btn.className = 'flower-btn disabled';
        btn.disabled = true;
        btn.dataset.value = val;
        btn.setAttribute('aria-label', `Flower option ${val}`);

        btn.innerHTML = createCoralFlowerSVG({
          number: val,
          size: 102,
          hideNumber: false,
          isAnswerOption: true
        });

        btn.addEventListener('click', (e) => {
          handleAnswerSelect0(val, btn, e);
        });

        answerContainer.appendChild(btn);
      });
    }

    // 5. Reset Feedback Ribbon
    const feedbackRibbon = document.getElementById('act0-feedback-ribbon');
    if (feedbackRibbon) {
      feedbackRibbon.innerHTML = '';
    }

    updateLevelBadge0();
  }

  // =========================================================================
  // FLOWER TAP HANDLER (Tactile, Order-Irrelevant Concrete Counting)
  // Sequence: Group 1 -> Group 2 -> Combined Total -> Answer Selection
  // =========================================================================
  function handleFlowerTap0(flowerEl, boxId) {
    if (state0.isCountingHintActive || state0.isAnswerSelected) return;

    const q = state0.currentQuestion;
    if (!q) return;

    // Check if tapping in the correct sequence stage
    if (boxId === 'act0-flower-group-2' && state0.currentStage === 'counting_g1') {
      const box1 = document.getElementById('act0-flower-group-1');
      if (box1) {
        box1.classList.remove('box-attention');
        void box1.offsetWidth;
        box1.classList.add('box-attention');
      }
      return;
    }

    if (boxId === 'act0-flower-group-result' && (state0.currentStage === 'counting_g1' || state0.currentStage === 'counting_g2')) {
      const activeBox = document.getElementById(state0.currentStage === 'counting_g1' ? 'act0-flower-group-1' : 'act0-flower-group-2');
      if (activeBox) {
        activeBox.classList.remove('box-attention');
        void activeBox.offsetWidth;
        activeBox.classList.add('box-attention');
      }
      return;
    }

    // Already counted flower
    if (flowerEl.dataset.counted === 'true') {
      const existingCount = parseInt(flowerEl.dataset.countOrder, 10);
      if (existingCount) {
        audio0.playPop(existingCount);
        teacherVoice0.countFlower(existingCount);
      }
      return;
    }

    // First time tapping this flower
    const boxEl = document.getElementById(boxId);
    if (!boxEl) return;

    const currentCount = state0.boxCounters[boxId] + 1;
    state0.boxCounters[boxId] = currentCount;

    flowerEl.dataset.counted = 'true';
    flowerEl.dataset.countOrder = currentCount;
    flowerEl.classList.remove('uncounted');
    flowerEl.classList.add('tapped', 'revealed');

    // In Activity 0, flower centres remain completely blank throughout (no numbers inside flowers)
    audio0.playPop(currentCount);
    teacherVoice0.countFlower(currentCount);

    // Check completion of stages
    if (boxId === 'act0-flower-group-1') {
      if (currentCount >= q.num1) {
        boxEl.classList.remove('counting-active');
        boxEl.classList.add('box-completed');
        state0.currentStage = 'counting_g2';

        const box2 = document.getElementById('act0-flower-group-2');
        if (box2) {
          box2.classList.add('counting-active');
        }
      }
    } else if (boxId === 'act0-flower-group-2') {
      if (currentCount >= q.num2) {
        boxEl.classList.remove('counting-active');
        boxEl.classList.add('box-completed');
        state0.currentStage = 'counting_total';

        const resBox = document.getElementById('act0-flower-group-result');
        if (resBox) {
          resBox.classList.add('counting-active');
        }
      }
    } else if (boxId === 'act0-flower-group-result') {
      if (currentCount >= q.answer) {
        boxEl.classList.remove('counting-active');
        boxEl.classList.add('box-completed');
        state0.currentStage = 'total_announced';
        state0.hasAnnouncedTotal = true;

        // Teacher announces total and answer buttons unlock fully
        setTimeout(() => {
          let unlocked = false;
          function finishAnnouncement() {
            if (unlocked) return;
            unlocked = true;
            setAnswerButtonsEnabled0(true);
            highlightCorrectAnswerButton0();
          }

          // Safety fallback timer matching Activities 1, 2, and 3
          const safetyTimer = setTimeout(finishAnnouncement, 4000);

          teacherVoice0.announceTotal(q.answer, () => {
            clearTimeout(safetyTimer);
            finishAnnouncement();
          });
        }, 350);
      }
    }
  }

  // --- Answer Buttons Disabled / Enabled Controller (Matching Activities 1, 2, and 3) ---
  function setAnswerButtonsEnabled0(enabled) {
    state0.isAnswerSelectionEnabled = enabled;
    const answerContainer = document.getElementById('act0-flower-answer-buttons');
    if (!answerContainer) return;

    answerContainer.style.display = 'flex';
    answerContainer.style.pointerEvents = (state0.isAnswerSelected || !enabled) ? 'none' : '';

    const btns = answerContainer.querySelectorAll('.flower-btn');
    btns.forEach(btn => {
      btn.disabled = !enabled && !state0.isAnswerSelected;
      if (enabled) {
        btn.classList.remove('disabled');
        btn.classList.add('unlocked');
        setTimeout(() => btn.classList.remove('unlocked'), 600);
      } else if (!state0.isAnswerSelected) {
        btn.classList.add('disabled');
        btn.classList.remove('unlocked');
      }
    });
  }

  function highlightCorrectAnswerButton0() {
    const q = state0.currentQuestion;
    if (!q) return;
    const answerBtns = document.querySelectorAll('#act0-flower-answer-buttons .flower-btn');
    answerBtns.forEach(btn => {
      if (parseInt(btn.dataset.value, 10) === q.answer) {
        btn.style.filter = 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.95))';
        setTimeout(() => {
          btn.style.filter = '';
        }, 3500);
      }
    });
  }

  function unlockAnswerButtons0() {
    setAnswerButtonsEnabled0(true);
    highlightCorrectAnswerButton0();
  }

  // =========================================================================
  // ANSWER SELECTION & FEEDBACK
  // =========================================================================
  function handleAnswerSelect0(selectedVal, btnEl, event) {
    if (state0.isAnswerSelected || state0.isCountingHintActive || !state0.isAnswerSelectionEnabled) return;

    const q = state0.currentQuestion;
    if (!q) return;

    if (selectedVal === q.answer) {
      // CORRECT ANSWER (Matching Reference Screenshot & Requirements)
      state0.isAnswerSelected = true;
      state0.isAnswerSelectionEnabled = false;
      const answerContainer = document.getElementById('act0-flower-answer-buttons');
      if (answerContainer) answerContainer.style.pointerEvents = 'none';

      btnEl.classList.remove('ready-pulse');
      btnEl.classList.add('answer-correct');

      // Disable remaining buttons and keep them faded/half-hidden
      const buttons = document.querySelectorAll('#act0-flower-answer-buttons .flower-btn');
      buttons.forEach(b => {
        if (b !== btnEl) {
          b.disabled = true;
          b.classList.remove('ready-pulse', 'unlocked', 'answer-incorrect');
          b.classList.add('disabled');
        }
      });

      audio0.playCelebrationChime();
      teacherVoice0.celebrateCorrect(q.num1, q.num2, q.answer);

      // Advance Streak & Stars
      state0.currentStreak++;
      state0.starsEarned = Math.min(state0.starsEarned + 1, 10);
      updateProgressStars0();

      // Show Feedback Ribbon matching reference screenshot:
      // Mint green pill container: 🌟 Excellent! [num1] + [num2] = [total] Good job!
      // and Play Next Round button immediately to the right.
      const ribbon = document.getElementById('act0-feedback-ribbon');
      if (ribbon) {
        ribbon.innerHTML = `
          <div class="feedback-msg success">
            <span class="feedback-icon" aria-hidden="true">🌟</span>
            <span class="feedback-text">Excellent! &nbsp;${q.num1} + ${q.num2} = ${q.answer}&nbsp; Good job!</span>
          </div>
          <button type="button" class="next-question-btn act0-next-round-btn" id="act0-btn-next-question">
            Play Next Round
          </button>
        `;

        const nextBtn = document.getElementById('act0-btn-next-question');
        if (nextBtn) {
          if (typeof nextBtn.focus === 'function') nextBtn.focus();
          nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (state0.starsEarned >= 10) {
              triggerLevelComplete0();
            } else {
              onNextQuestion0();
            }
          });
        }
      }

      // Advances ONLY when the child clicks Play Next Round (no automatic timer)
    } else {
      // INCORRECT ANSWER (Matching Activities 1, 2, and 3)
      btnEl.classList.remove('ready-pulse', 'answer-incorrect');
      void btnEl.offsetWidth; // re-trigger animation
      btnEl.classList.add('answer-incorrect');

      audio0.playGentleTryAgain();
      teacherVoice0.encourageTryAgain();

      // Display exact same incorrect-answer message as Activities 1, 2, and 3:
      const ribbon = document.getElementById('act0-feedback-ribbon');
      if (ribbon) {
        ribbon.innerHTML = `
          <div class="feedback-msg try-again">
            <span class="feedback-icon" aria-hidden="true">🌱</span>
            <span class="feedback-text">That's okay, little one! Let's count and add the flowers together.</span>
          </div>
        `;
      }

      // Do NOT reset question or score! Child can retry immediately.
      const hintBtn = document.getElementById('btn-act0-count-hint');
      if (hintBtn) {
        hintBtn.classList.add('hint-pulse');
        setTimeout(() => hintBtn.classList.remove('hint-pulse'), 3000);
      }

      setTimeout(() => {
        btnEl.classList.remove('answer-incorrect');
      }, 800);
    }
  }

  function onNextQuestion0() {
    clearHintTimers0();
    stopCountingHint0();
    state0.themeIndex = (state0.themeIndex + 1) % ACTIVITY0_THEMES.length;
    state0.currentQuestion = generateQuestion0();
    renderQuestion0();
  }

  function triggerLevelComplete0() {
    const modal = document.getElementById('quest-complete-modal');
    if (!modal) return;

    const titleEl = document.getElementById('modal-complete-title');
    const starsText = document.getElementById('modal-complete-stars-text');
    const descText = document.getElementById('modal-complete-desc-text');

    if (titleEl) titleEl.textContent = `Level ${state0.level} Completed!`;
    if (starsText) starsText.textContent = `You earned 10 ⭐ in Level ${state0.level}!`;
    if (descText) {
      if (state0.level < 3) {
        const nextLimit = state0.level === 1 ? '6' : '9';
        descText.textContent = `Wonderful! 🪷 You can now add numbers to make ${state0.level === 1 ? '4' : '6'}. Ready to learn to make ${nextLimit}?`;
      } else {
        descText.textContent = 'Spectacular! 🌟 You mastered all flower addition facts up to 9!';
      }
    }

    modal.classList.add('active');

    // Confetti canvas trigger if present
    if (typeof window.launchConfetti === 'function') {
      window.launchConfetti();
    }
  }

  // =========================================================================
  // COUNT AGAIN ACTION (Single-tap recount)
  // Preserves current question, level, stars & streak.
  // Resets counts, clears Answer Box/Combined Total, disables answer buttons.
  // =========================================================================
  function resetRoundCounting0(silent = false) {
    clearHintTimers0();
    stopCountingHint0();

    state0.boxCounters['act0-flower-group-1'] = 0;
    state0.boxCounters['act0-flower-group-2'] = 0;
    state0.boxCounters['act0-flower-group-result'] = 0;
    state0.currentStage = 'counting_g1';
    state0.hasAnnouncedTotal = false;
    state0.isAnswerSelected = false;

    // Reset Group 1 flowers
    const box1El = document.getElementById('act0-flower-group-1');
    if (box1El) {
      box1El.classList.remove('box-completed', 'box-attention');
      box1El.classList.add('counting-active');
      const flowers = box1El.querySelectorAll('.flower-token');
      flowers.forEach(f => {
        f.dataset.counted = 'false';
        f.dataset.countOrder = '';
        f.classList.remove('tapped', 'revealed', 'highlighted');
        f.classList.add('uncounted');
        const textElem = f.querySelector('.flower-digit-text');
        if (textElem) {
          textElem.textContent = '';
          textElem.classList.remove('revealed');
          textElem.classList.add('hidden-digit');
        }
      });
    }

    // Reset Group 2 flowers
    const box2El = document.getElementById('act0-flower-group-2');
    if (box2El) {
      box2El.classList.remove('box-completed', 'counting-active', 'box-attention');
      const flowers = box2El.querySelectorAll('.flower-token');
      flowers.forEach(f => {
        f.dataset.counted = 'false';
        f.dataset.countOrder = '';
        f.classList.remove('tapped', 'revealed', 'highlighted');
        f.classList.add('uncounted');
        const textElem = f.querySelector('.flower-digit-text');
        if (textElem) {
          textElem.textContent = '';
          textElem.classList.remove('revealed');
          textElem.classList.add('hidden-digit');
        }
      });
    }

    // Reset Combined Total Box (Answer Box): Keep flowers visible, reset to uncounted with blank centres
    const resBox = document.getElementById('act0-flower-group-result');
    if (resBox) {
      resBox.classList.remove('box-completed', 'counting-active', 'box-attention');
      const flowers = resBox.querySelectorAll('.flower-token');
      if (flowers.length === 0 && state0.currentQuestion) {
        const q = state0.currentQuestion;
        const totalFlowers = q.answer;
        const flowerSizeClass = totalFlowers <= 4 ? 'size-lg' : (totalFlowers <= 6 ? 'size-md' : 'size-sm');
        const flowerPixelSize = totalFlowers <= 4 ? 78 : (totalFlowers <= 6 ? 66 : 56);
        for (let i = 1; i <= q.answer; i++) {
          const flowerDiv = document.createElement('div');
          flowerDiv.className = `flower-token ${flowerSizeClass} uncounted`;
          flowerDiv.dataset.box = 'act0-flower-group-result';
          flowerDiv.dataset.counted = 'false';
          flowerDiv.innerHTML = createCoralFlowerSVG({
            number: '',
            size: flowerPixelSize,
            hideNumber: true
          });
          flowerDiv.addEventListener('click', () => {
            handleFlowerTap0(flowerDiv, 'act0-flower-group-result');
          });
          resBox.appendChild(flowerDiv);
        }
      } else {
        flowers.forEach(f => {
          f.dataset.counted = 'false';
          f.dataset.countOrder = '';
          f.classList.remove('tapped', 'revealed', 'highlighted');
          f.classList.add('uncounted');
        });
      }
    }

    // Reset answer buttons to half-hidden/faded and disabled (matching Activities 1, 2, and 3)
    setAnswerButtonsEnabled0(false);
    state0.isAnswerSelected = false;
    const buttons = document.querySelectorAll('#act0-flower-answer-buttons .flower-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.classList.remove('answer-correct', 'answer-incorrect', 'unlocked', 'ready-pulse');
      btn.classList.add('disabled');
      btn.style.filter = '';
    });

    // Reset feedback ribbon
    const ribbon = document.getElementById('act0-feedback-ribbon');
    if (ribbon) {
      ribbon.innerHTML = '';
    }

    const plusEl = document.getElementById('act0-plus-symbol');
    const equalsEl = document.getElementById('act0-equals-symbol');
    if (plusEl) plusEl.classList.remove('symbol-glow', 'highlighted');
    if (equalsEl) equalsEl.classList.remove('symbol-glow', 'highlighted');
  }

  // =========================================================================
  // COUNT WITH ME (Guided Teacher Narration & Speech Synchronisation)
  // Perfectly matches Activities 1, 2, and 3:
  // - Group 1: speaks count, waits for onend + 600ms pause
  // - Plus: glows, speaks "Plus!", waits for onend + 500ms pause
  // - Group 2: speaks count, waits for onend + 600ms pause
  // - Equals: glows, speaks "Equals", waits for onend + 500ms pause
  // - Total: reveals center digit, speaks count, waits for onend + 600ms pause
  // - Announcement: waits 700ms, speaks "We have [total] flowers in total.", unlocks answers
  // =========================================================================
  function stopCountingHint0() {
    clearHintTimers0();
    state0.isCountingHintActive = false;

    teacherVoice0.cancel();

    const hintBtn = document.getElementById('btn-act0-count-hint');
    if (hintBtn) {
      hintBtn.classList.remove('hint-active');
    }

    document.querySelectorAll('#activity-0-container .flower-token.highlighted').forEach(el => {
      el.classList.remove('highlighted');
    });

    const plusEl = document.getElementById('act0-plus-symbol');
    const equalsEl = document.getElementById('act0-equals-symbol');
    if (plusEl) plusEl.classList.remove('symbol-glow', 'highlighted');
    if (equalsEl) equalsEl.classList.remove('symbol-glow', 'highlighted');
  }

  function triggerCountingHint0() {
    const q = state0.currentQuestion;
    if (!q) return;

    if (state0.isCountingHintActive) {
      stopCountingHint0();
      return;
    }

    // Fresh reset for clean tutorial sequence
    resetRoundCounting0(true);

    state0.isCountingHintActive = true;
    const hintBtn = document.getElementById('btn-act0-count-hint');
    if (hintBtn) {
      hintBtn.classList.add('hint-active');
    }

    const box1El = document.getElementById('act0-flower-group-1');
    const box2El = document.getElementById('act0-flower-group-2');
    const resBox = document.getElementById('act0-flower-group-result');
    const plusEl = document.getElementById('act0-plus-symbol');
    const equalsEl = document.getElementById('act0-equals-symbol');

    const g1Flowers = box1El ? Array.from(box1El.querySelectorAll('.flower-token')) : [];
    const g2Flowers = box2El ? Array.from(box2El.querySelectorAll('.flower-token')) : [];

    let g1Idx = 0;
    let g2Idx = 0;
    let totalIdx = 0;

    const flowerSizeClass = q.answer <= 4 ? 'size-lg' : (q.answer <= 6 ? 'size-md' : 'size-sm');
    const flowerPixelSize = q.answer <= 4 ? 78 : (q.answer <= 6 ? 66 : 56);

    const checkActive = () => {
      return state0.isCountingHintActive && (!window.TenaliActiveActivity || window.TenaliActiveActivity === 'activity0');
    };

    // Phase 1: Count Group 1 Flowers one by one
    function countNextGroup1Flower() {
      if (!checkActive()) return;

      if (g1Idx < q.num1 && g1Idx < g1Flowers.length) {
        const flowerEl = g1Flowers[g1Idx];
        const count = g1Idx + 1;

        document.querySelectorAll('#activity-0-container .flower-token.highlighted').forEach(el => {
          el.classList.remove('highlighted');
        });

        flowerEl.classList.add('highlighted', 'tapped', 'revealed');
        flowerEl.dataset.counted = 'true';
        flowerEl.dataset.countOrder = count;
        flowerEl.classList.remove('uncounted');

        // In Activity 0, flower centres remain completely blank throughout
        state0.boxCounters['act0-flower-group-1'] = count;
        audio0.playPop(count);

        teacherVoice0.countFlower(count, () => {
          if (!checkActive()) return;
          g1Idx++;
          if (g1Idx < q.num1 && g1Idx < g1Flowers.length) {
            setHintTimeout0(countNextGroup1Flower, 600);
          } else {
            setHintTimeout0(stepGroup1Complete, 600);
          }
        });
      } else {
        stepGroup1Complete();
      }
    }

    function stepGroup1Complete() {
      if (!checkActive()) return;

      document.querySelectorAll('#activity-0-container .flower-token.highlighted').forEach(el => {
        el.classList.remove('highlighted');
      });

      if (box1El) {
        box1El.classList.remove('counting-active');
        box1El.classList.add('box-completed');
      }

      state0.currentStage = 'counting_g2';

      // Phase 2: Plus Sign Glow & Narration
      if (plusEl) {
        plusEl.classList.add('symbol-glow', 'highlighted');
      }
      audio0.playPop(1);

      teacherVoice0.sayPlus(() => {
        if (!checkActive()) return;
        setHintTimeout0(() => {
          if (!checkActive()) return;
          if (plusEl) plusEl.classList.remove('symbol-glow', 'highlighted');
          if (box2El) box2El.classList.add('counting-active');
          countNextGroup2Flower();
        }, 500);
      });
    }

    // Phase 3: Count Group 2 Flowers one by one
    function countNextGroup2Flower() {
      if (!checkActive()) return;

      if (g2Idx < q.num2 && g2Idx < g2Flowers.length) {
        const flowerEl = g2Flowers[g2Idx];
        const count = g2Idx + 1;

        document.querySelectorAll('#activity-0-container .flower-token.highlighted').forEach(el => {
          el.classList.remove('highlighted');
        });

        flowerEl.classList.add('highlighted', 'tapped', 'revealed');
        flowerEl.dataset.counted = 'true';
        flowerEl.dataset.countOrder = count;
        flowerEl.classList.remove('uncounted');

        // In Activity 0, flower centres remain completely blank throughout
        state0.boxCounters['act0-flower-group-2'] = count;
        audio0.playPop(count);

        teacherVoice0.countFlower(count, () => {
          if (!checkActive()) return;
          g2Idx++;
          if (g2Idx < q.num2 && g2Idx < g2Flowers.length) {
            setHintTimeout0(countNextGroup2Flower, 600);
          } else {
            setHintTimeout0(stepGroup2Complete, 600);
          }
        });
      } else {
        stepGroup2Complete();
      }
    }

    function stepGroup2Complete() {
      if (!checkActive()) return;

      document.querySelectorAll('#activity-0-container .flower-token.highlighted').forEach(el => {
        el.classList.remove('highlighted');
      });

      if (box2El) {
        box2El.classList.remove('counting-active');
        box2El.classList.add('box-completed');
      }

      state0.currentStage = 'counting_total';

      // Phase 4: Equals Sign Glow & Narration
      if (equalsEl) {
        equalsEl.classList.add('symbol-glow', 'highlighted');
      }
      audio0.playPop(1);

      teacherVoice0.sayEquals(() => {
        if (!checkActive()) return;
        setHintTimeout0(() => {
          if (!checkActive()) return;
          if (equalsEl) equalsEl.classList.remove('symbol-glow', 'highlighted');
          if (resBox) resBox.classList.add('counting-active');
          countNextTotalFlower();
        }, 500);
      });
    }

    // Phase 5: Count Combined Total Flowers in Answer Box
    function countNextTotalFlower() {
      if (!checkActive()) return;

      const resFlowers = resBox ? Array.from(resBox.querySelectorAll('.flower-token')) : [];
      if (totalIdx < q.answer && totalIdx < resFlowers.length) {
        const flowerEl = resFlowers[totalIdx];
        const count = totalIdx + 1;

        document.querySelectorAll('#activity-0-container .flower-token.highlighted').forEach(el => {
          el.classList.remove('highlighted');
        });

        flowerEl.classList.add('highlighted', 'tapped', 'revealed');
        flowerEl.dataset.counted = 'true';
        flowerEl.dataset.countOrder = count;
        flowerEl.classList.remove('uncounted');

        // In Activity 0, flower centres remain completely blank throughout
        state0.boxCounters['act0-flower-group-result'] = count;
        audio0.playPop(count);

        teacherVoice0.countFlower(count, () => {
          if (!checkActive()) return;
          totalIdx++;
          if (totalIdx < q.answer && totalIdx < resFlowers.length) {
            setHintTimeout0(countNextTotalFlower, 600);
          } else {
            setHintTimeout0(stepCompleteTotal, 700);
          }
        });
      } else {
        setHintTimeout0(stepCompleteTotal, 700);
      }
    }

    // Phase 6: Announce Total and Invite Answer Selection
    function stepCompleteTotal() {
      if (!checkActive()) return;

      document.querySelectorAll('#activity-0-container .flower-token.highlighted').forEach(el => {
        el.classList.remove('highlighted');
      });

      if (resBox) {
        resBox.classList.remove('counting-active');
        resBox.classList.add('box-completed');
      }

      state0.currentStage = 'total_announced';
      state0.hasAnnouncedTotal = true;

      let unlocked = false;
      function finishTutorialAnnouncement() {
        if (unlocked) return;
        unlocked = true;
        if (!checkActive()) return;
        setAnswerButtonsEnabled0(true);
        highlightCorrectAnswerButton0();
        state0.isCountingHintActive = false;
        if (hintBtn) {
          hintBtn.classList.remove('hint-active');
        }
      }

      // Safety fallback timer matching Activities 1, 2, and 3
      const safetyTimer = setTimeout(finishTutorialAnnouncement, 4000);

      teacherVoice0.announceTotal(q.answer, () => {
        clearTimeout(safetyTimer);
        finishTutorialAnnouncement();
      });
    }

    // Start with Group 1
    countNextGroup1Flower();
  }

  // =========================================================================
  // ACTIVITY SWITCHING INTERNAL HANDLER FOR ACTIVITY 0
  // =========================================================================
  function switchToActivity0Internal(shouldScroll = true) {
    window.TenaliActiveActivity = 'activity0';
    safeSetItem(STORAGE_KEY_ACTIVITY, 'activity0');
    clearHintTimers0();
    stopCountingHint0();

    if (!state0.currentQuestion) {
      state0.currentQuestion = generateQuestion0();
      renderQuestion0();
    } else {
      resetRoundCounting0(true);
    }

    updateLevelBadge0();
    updateProgressStars0();

    const card0 = document.getElementById('activity-0-container');
    if (shouldScroll && card0 && typeof card0.scrollIntoView === 'function') {
      card0.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // =========================================================================
  // INITIALIZATION & EVENT LISTENERS
  // =========================================================================
  function initActivity0() {
    // 1. Single "Count Again" Button in Activity 0
    const countAgainBtn = document.getElementById('btn-act0-count-again');
    if (countAgainBtn) {
      countAgainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        resetRoundCounting0(false);
      });
    }

    // 2. Count With Me in Activity 0
    const countHintBtn = document.getElementById('btn-act0-count-hint');
    if (countHintBtn) {
      countHintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerCountingHint0();
      });
    }

    // 4. Level buttons coordination for Activity 0
    const levelBtns = document.querySelectorAll('.level-toggle-btn');
    levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.TenaliActiveActivity === 'activity0') {
          const selectedLvl = parseInt(btn.dataset.level, 10);
          if (state0.level !== selectedLvl) {
            state0.level = selectedLvl;
            state0.starsEarned = 0;
            state0.currentStreak = 0;
            scheduler0.initQueue(selectedLvl);
            updateLevelBadge0();
            updateProgressStars0();
            onNextQuestion0();
          }
        }
      });
    });

    // 5. Play Again / Start Next Level button in modal for Activity 0
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        if (window.TenaliActiveActivity === 'activity0') {
          const modal = document.getElementById('quest-complete-modal');
          if (modal) modal.classList.remove('active');
          state0.starsEarned = 0;
          state0.currentStreak = 0;
          if (state0.level < 3) {
            state0.level++;
          } else {
            state0.level = 1;
          }
          scheduler0.initQueue(state0.level);
          updateLevelBadge0();
          updateProgressStars0();
          onNextQuestion0();
        }
      });
    }

    // 6. Global exports for clean cross-activity coordination
    window.TenaliSwitchToActivity0 = switchToActivity0Internal;
    window.TenaliResetActivity0RoundCounting = resetRoundCounting0;
    window.TenaliTriggerCountingHint0 = triggerCountingHint0;
    window.TenaliStopCountingHint0 = stopCountingHint0;
    window.TenaliTeacherVoice0 = teacherVoice0;
    window.TenaliState0 = state0;
    window.TenaliRenderQuestion0 = renderQuestion0;
    window.TenaliSetAnswerButtonsEnabled0 = setAnswerButtonsEnabled0;
    window.TenaliGetCurrentTheme0 = getCurrentTheme0;
    window.TenaliThemes0 = ACTIVITY0_THEMES;
    window.TenaliSetTheme0 = function (idx) {
      state0.themeIndex = idx;
      renderQuestion0();
    };
    window.TenaliSetCurrentQuestion0 = function (q) {
      state0.currentQuestion = q;
      renderQuestion0();
    };

    // Generate initial question
    state0.currentQuestion = generateQuestion0();
    renderQuestion0();

    // Check if Activity 0 was active on page load
    const savedAct = safeGetItem(STORAGE_KEY_ACTIVITY);
    if (savedAct === 'activity0') {
      if (typeof window.TenaliSwitchToActivity === 'function') {
        window.TenaliSwitchToActivity(0, false);
      } else {
        switchToActivity0Internal(false);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initActivity0);
  } else {
    initActivity0();
  }

})();
