// Global State Management
const gameState = {
    coins: 0,
    level: 1,
    stars: 42,
    achievements: 8,
    lessonsCompleted: 15,
    streakDays: 7,
    highScores: {
        rhythm: 0,
        noteCatcher: 0,
        quiz: 0
    },
    songsCreated: 0,
    moduleProgress: {
        rhythm: 30,
        pitch: 15,
        notes: 45,
        instruments: 60
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateUI();
    initSmoothScroll();
    loadProgress();
});

// Update UI with current state
function updateUI() {
    document.getElementById('coinCount').textContent = gameState.coins;
    document.getElementById('userLevel').textContent = gameState.level;
    document.getElementById('totalStars').textContent = gameState.stars;
    document.getElementById('achievementsCount').textContent = gameState.achievements;
    document.getElementById('lessonsCompleted').textContent = gameState.lessonsCompleted;
    document.getElementById('streakDays').textContent = gameState.streakDays;
    document.getElementById('rhythmHighScore').textContent = gameState.highScores.rhythm;
    document.getElementById('noteHighScore').textContent = gameState.highScores.noteCatcher;
    document.getElementById('quizHighScore').textContent = gameState.highScores.quiz;
    document.getElementById('songsCreated').textContent = gameState.songsCreated;
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
    
    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const navLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (navLink) navLink.classList.add('active');
}

// Module Functions
function openModule(moduleName) {
    const modal = document.getElementById('moduleModal');
    const content = document.getElementById('moduleContent');
    
    let moduleHTML = '';
    
    switch(moduleName) {
        case 'rhythm':
            moduleHTML = getRhythmModule();
            break;
        case 'pitch':
            moduleHTML = getPitchModule();
            break;
        case 'notes':
            moduleHTML = getNotesModule();
            break;
        case 'instruments':
            moduleHTML = getInstrumentsModule();
            break;
    }
    
    content.innerHTML = moduleHTML;
    modal.style.display = 'block';
    
    // Add coin reward animation
    awardCoins(10);
}

function getRhythmModule() {
    return `
        <div class="lesson-content">
            <div class="lesson-header">
                <h2>🥁 Rhythm Master</h2>
                <p>Learn to keep the beat and understand rhythm patterns!</p>
            </div>
            
            <div class="lesson-section">
                <h3>What is Rhythm?</h3>
                <p>Rhythm is the pattern of sounds and silences in music. It's like the heartbeat of a song! 💓</p>
                <div class="interactive-element">
                    <p>🎵 Listen to different rhythms:</p>
                    <button class="practice-button" onclick="playRhythm('slow')">Slow Beat 🐢</button>
                    <button class="practice-button" onclick="playRhythm('medium')">Medium Beat 🚶</button>
                    <button class="practice-button" onclick="playRhythm('fast')">Fast Beat 🏃</button>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Practice Time! 🎯</h3>
                <p>Tap along with the rhythm. Try to match the beat!</p>
                <div class="interactive-element" id="rhythmPractice">
                    <div style="font-size: 3rem; margin: 2rem 0;">
                        <span id="beatIndicator">🔵</span>
                    </div>
                    <button class="practice-button" onclick="startRhythmPractice()">Start Practice</button>
                    <button class="practice-button" onclick="tapBeat()">Tap Here! 👆</button>
                    <p id="rhythmFeedback" style="margin-top: 1rem; font-weight: 600; font-size: 1.2rem;"></p>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Quiz Time! 📝</h3>
                <p>How many beats did you hear?</p>
                <div class="interactive-element">
                    <button class="practice-button" onclick="playQuizPattern()">Play Pattern</button>
                    <div style="margin-top: 1rem;">
                        <button class="practice-button" onclick="checkAnswer(3)">3 Beats</button>
                        <button class="practice-button" onclick="checkAnswer(4)">4 Beats</button>
                        <button class="practice-button" onclick="checkAnswer(5)">5 Beats</button>
                    </div>
                    <p id="quizFeedback" style="margin-top: 1rem; font-weight: 600; font-size: 1.2rem;"></p>
                </div>
            </div>
        </div>
    `;
}

function getPitchModule() {
    return `
        <div class="lesson-content">
            <div class="lesson-header">
                <h2>🎤 Pitch Perfect</h2>
                <p>Discover high and low sounds and train your ears!</p>
            </div>
            
            <div class="lesson-section">
                <h3>Understanding Pitch 🎵</h3>
                <p>Pitch is how high or low a sound is. Like a bird chirping high 🐦 or a lion roaring low 🦁!</p>
                <div class="interactive-element">
                    <p>Listen to different pitches:</p>
                    <button class="practice-button" onclick="playPitch('low')">Low Pitch 🦁</button>
                    <button class="practice-button" onclick="playPitch('middle')">Middle Pitch 🐕</button>
                    <button class="practice-button" onclick="playPitch('high')">High Pitch 🐦</button>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Pitch Matching Game 🎯</h3>
                <p>Listen carefully and match the pitch!</p>
                <div class="interactive-element">
                    <button class="practice-button" onclick="playTargetPitch()">Play Target Pitch</button>
                    <p style="margin: 1rem 0;">Now select the matching pitch:</p>
                    <button class="practice-button" onclick="checkPitch('A')">Pitch A</button>
                    <button class="practice-button" onclick="checkPitch('B')">Pitch B</button>
                    <button class="practice-button" onclick="checkPitch('C')">Pitch C</button>
                    <p id="pitchFeedback" style="margin-top: 1rem; font-weight: 600; font-size: 1.2rem;"></p>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Fun Fact! 🌟</h3>
                <p>Did you know? Dogs can hear pitches much higher than humans! 🐕👂</p>
            </div>
        </div>
    `;
}

function getNotesModule() {
    return `
        <div class="lesson-content">
            <div class="lesson-header">
                <h2>🎼 Note Navigator</h2>
                <p>Learn musical notes and how to read sheet music!</p>
            </div>
            
            <div class="lesson-section">
                <h3>The Musical Alphabet 🔤</h3>
                <p>Music uses only 7 letters: A, B, C, D, E, F, G - then it repeats! 🎵</p>
                <div class="interactive-element">
                    <div style="display: flex; justify-content: center; gap: 1rem; margin: 1.5rem 0;">
                        <button class="practice-button" onclick="playNote('C')" style="background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);">C</button>
                        <button class="practice-button" onclick="playNote('D')" style="background: linear-gradient(135deg, #FFA07A 0%, #FF6B9D 100%);">D</button>
                        <button class="practice-button" onclick="playNote('E')" style="background: linear-gradient(135deg, #FFD700 0%, #FFA07A 100%);">E</button>
                        <button class="practice-button" onclick="playNote('F')" style="background: linear-gradient(135deg, #00D2D3 0%, #3498DB 100%);">F</button>
                        <button class="practice-button" onclick="playNote('G')" style="background: linear-gradient(135deg, #3498DB 0%, #9B59B6 100%);">G</button>
                        <button class="practice-button" onclick="playNote('A')" style="background: linear-gradient(135deg, #9B59B6 0%, #C44569 100%);">A</button>
                        <button class="practice-button" onclick="playNote('B')" style="background: linear-gradient(135deg, #C44569 0%, #FF6B9D 100%);">B</button>
                    </div>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Note Symbols 📝</h3>
                <p>Different note shapes tell us how long to play them!</p>
                <div class="interactive-element">
                    <div style="font-size: 3rem; display: flex; justify-content: space-around; margin: 2rem 0;">
                        <div style="text-align: center;">
                            <div>𝅝</div>
                            <p style="font-size: 1rem; margin-top: 0.5rem;">Whole Note<br>(4 beats)</p>
                        </div>
                        <div style="text-align: center;">
                            <div>𝅗𝅥</div>
                            <p style="font-size: 1rem; margin-top: 0.5rem;">Half Note<br>(2 beats)</p>
                        </div>
                        <div style="text-align: center;">
                            <div>♩</div>
                            <p style="font-size: 1rem; margin-top: 0.5rem;">Quarter Note<br>(1 beat)</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Practice Reading Notes! 🎯</h3>
                <p>What note is this?</p>
                <div class="interactive-element">
                    <div style="font-size: 4rem; margin: 1rem 0;" id="noteDisplay">♩</div>
                    <button class="practice-button" onclick="generateRandomNote()">Show New Note</button>
                    <p id="noteName" style="margin-top: 1rem; font-size: 1.3rem; font-weight: 600;"></p>
                </div>
            </div>
        </div>
    `;
}

function getInstrumentsModule() {
    return `
        <div class="lesson-content">
            <div class="lesson-header">
                <h2>🎸 Instrument Explorer</h2>
                <p>Discover different instruments and their amazing sounds!</p>
            </div>
            
            <div class="lesson-section">
                <h3>String Instruments 🎻</h3>
                <p>These instruments make sound by vibrating strings!</p>
                <div class="interactive-element">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🎸</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Guitar</p>
                            <button class="practice-button" onclick="playInstrumentSound('guitar')">Play</button>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🎻</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Violin</p>
                            <button class="practice-button" onclick="playInstrumentSound('violin')">Play</button>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🪕</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Banjo</p>
                            <button class="practice-button" onclick="playInstrumentSound('banjo')">Play</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Wind Instruments 🎺</h3>
                <p>You blow air into these to make beautiful sounds!</p>
                <div class="interactive-element">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🎺</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Trumpet</p>
                            <button class="practice-button" onclick="playInstrumentSound('trumpet')">Play</button>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🎷</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Saxophone</p>
                            <button class="practice-button" onclick="playInstrumentSound('saxophone')">Play</button>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🪈</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Flute</p>
                            <button class="practice-button" onclick="playInstrumentSound('flute')">Play</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Percussion Instruments 🥁</h3>
                <p>Hit, shake, or scratch these to make rhythm!</p>
                <div class="interactive-element">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🥁</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Drums</p>
                            <button class="practice-button" onclick="playInstrumentSound('drums')">Play</button>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🎹</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Piano</p>
                            <button class="practice-button" onclick="playInstrumentSound('piano')">Play</button>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem;">🔔</div>
                            <p style="font-weight: 600; margin: 0.5rem 0;">Bells</p>
                            <button class="practice-button" onclick="playInstrumentSound('bells')">Play</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="lesson-section">
                <h3>Quiz: Name That Instrument! 🎯</h3>
                <div class="interactive-element">
                    <button class="practice-button" onclick="startInstrumentQuiz()">Start Quiz</button>
                    <div id="instrumentQuizArea" style="margin-top: 1rem;"></div>
                </div>
            </div>
        </div>
    `;
}

// Game Functions
function openGame(gameName) {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('gameContent');
    
    let gameHTML = '';
    
    switch(gameName) {
        case 'rhythm-clicker':
            gameHTML = getRhythmClickerGame();
            break;
        case 'note-catcher':
            gameHTML = getNoteCatcherGame();
            break;
        case 'instrument-quiz':
            gameHTML = getInstrumentQuizGame();
            break;
        case 'melody-maker':
            gameHTML = getMelodyMakerGame();
            break;
    }
    
    content.innerHTML = gameHTML;
    modal.style.display = 'block';
}

function getRhythmClickerGame() {
    return `
        <div class="game-container">
            <div class="game-header">
                <h2>🥁 Rhythm Clicker</h2>
                <p>Click the buttons in time with the beat!</p>
                <div class="score-display">Score: <span id="rhythmScore">0</span> 🎯</div>
            </div>
            <div class="game-area">
                <div style="font-size: 5rem; margin: 2rem 0;" id="beatCircle">⭕</div>
                <p id="gameInstructions">Click "Start" to begin!</p>
                <button class="game-button" id="clickButton" onclick="clickBeat()" disabled>Click the Beat!</button>
                <button class="game-button" onclick="startRhythmGame()">Start Game</button>
                <button class="game-button" onclick="resetRhythmGame()">Reset</button>
            </div>
        </div>
    `;
}

function getNoteCatcherGame() {
    return `
        <div class="game-container">
            <div class="game-header">
                <h2>🎵 Note Catcher</h2>
                <p>Catch the falling notes before they hit the ground!</p>
                <div class="score-display">Score: <span id="catcherScore">0</span> 🎯</div>
            </div>
            <div class="game-area" id="catcherGameArea">
                <canvas id="catcherCanvas" width="800" height="400" style="background: linear-gradient(180deg, #E8F4F8 0%, #FFF5F7 100%); border-radius: 15px;"></canvas>
                <div style="margin-top: 1rem;">
                    <button class="game-button" onclick="startCatcherGame()">Start Game</button>
                    <p style="margin-top: 1rem;">Use ← and → arrow keys to move!</p>
                </div>
            </div>
        </div>
    `;
}

function getInstrumentQuizGame() {
    return `
        <div class="game-container">
            <div class="game-header">
                <h2>🎸 Instrument Quiz</h2>
                <p>Listen and guess the instrument!</p>
                <div class="score-display">Score: <span id="quizScore">0</span> / <span id="quizTotal">5</span></div>
            </div>
            <div class="game-area">
                <div style="font-size: 6rem; margin: 2rem 0;">🎵</div>
                <button class="game-button" onclick="playQuizSound()">Play Sound</button>
                <div id="quizOptions" style="margin-top: 2rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 500px;">
                    <!-- Options will be populated here -->
                </div>
                <p id="quizResult" style="margin-top: 1rem; font-size: 1.3rem; font-weight: 600;"></p>
            </div>
        </div>
    `;
}

function getMelodyMakerGame() {
    return `
        <div class="game-container">
            <div class="game-header">
                <h2>🎹 Melody Maker</h2>
                <p>Create your own beautiful music!</p>
            </div>
            <div class="game-area">
                <div class="piano-keyboard" id="pianoKeyboard">
                    <div class="piano-key" data-note="C" onclick="playPianoNote('C')"></div>
                    <div class="piano-key black" data-note="C#" onclick="playPianoNote('C#')" style="left: 42px;"></div>
                    <div class="piano-key" data-note="D" onclick="playPianoNote('D')"></div>
                    <div class="piano-key black" data-note="D#" onclick="playPianoNote('D#')" style="left: 106px;"></div>
                    <div class="piano-key" data-note="E" onclick="playPianoNote('E')"></div>
                    <div class="piano-key" data-note="F" onclick="playPianoNote('F')"></div>
                    <div class="piano-key black" data-note="F#" onclick="playPianoNote('F#')" style="left: 234px;"></div>
                    <div class="piano-key" data-note="G" onclick="playPianoNote('G')"></div>
                    <div class="piano-key black" data-note="G#" onclick="playPianoNote('G#')" style="left: 298px;"></div>
                    <div class="piano-key" data-note="A" onclick="playPianoNote('A')"></div>
                    <div class="piano-key black" data-note="A#" onclick="playPianoNote('A#')" style="left: 362px;"></div>
                    <div class="piano-key" data-note="B" onclick="playPianoNote('B')"></div>
                </div>
                <div style="margin-top: 2rem;">
                    <p>Your melody: <span id="melodySequence" style="font-weight: 600; color: var(--primary-color);"></span></p>
                    <button class="game-button" onclick="playMelody()">▶ Play My Melody</button>
                    <button class="game-button" onclick="saveMelody()">💾 Save Melody</button>
                    <button class="game-button" onclick="clearMelody()">🗑 Clear</button>
                </div>
            </div>
        </div>
    `;
}

// Audio Context for sound generation
let audioContext;
let currentMelody = [];

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Sound Functions
function playSound(frequency, duration = 0.3) {
    initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playRhythm(speed) {
    const speeds = { slow: 1000, medium: 500, fast: 250 };
    const interval = speeds[speed];
    let count = 0;
    
    const rhythmInterval = setInterval(() => {
        playSound(440, 0.2);
        count++;
        if (count >= 4) clearInterval(rhythmInterval);
    }, interval);
    
    showFeedback('rhythmFeedback', `Playing ${speed} rhythm! 🎵`, 'success');
}

let practiceInterval;
let beatCount = 0;

function startRhythmPractice() {
    clearInterval(practiceInterval);
    beatCount = 0;
    const indicator = document.getElementById('beatIndicator');
    
    practiceInterval = setInterval(() => {
        playSound(440, 0.2);
        indicator.textContent = '🔴';
        setTimeout(() => indicator.textContent = '🔵', 200);
        beatCount++;
        
        if (beatCount >= 8) {
            clearInterval(practiceInterval);
            showFeedback('rhythmFeedback', 'Great practice! 🌟', 'success');
        }
    }, 600);
}

function tapBeat() {
    playSound(523, 0.2);
    showFeedback('rhythmFeedback', 'Good tap! Keep going! 👏', 'success');
    awardCoins(1);
}

let quizAnswer = 4;

function playQuizPattern() {
    quizAnswer = Math.floor(Math.random() * 3) + 3;
    let count = 0;
    
    const quizInterval = setInterval(() => {
        playSound(440, 0.2);
        count++;
        if (count >= quizAnswer) clearInterval(quizInterval);
    }, 500);
}

function checkAnswer(answer) {
    if (answer === quizAnswer) {
        showFeedback('quizFeedback', '🎉 Correct! You got it!', 'success');
        awardCoins(5);
        gameState.stars += 3;
        updateUI();
    } else {
        showFeedback('quizFeedback', '❌ Try again! Listen carefully.', 'error');
    }
}

function playPitch(level) {
    const frequencies = { low: 220, middle: 440, high: 880 };
    playSound(frequencies[level], 0.5);
}

let targetPitch = 'B';

function playTargetPitch() {
    targetPitch = ['A', 'B', 'C'][Math.floor(Math.random() * 3)];
    const frequencies = { A: 330, B: 440, C: 550 };
    playSound(frequencies[targetPitch], 0.5);
}

function checkPitch(pitch) {
    if (pitch === targetPitch) {
        showFeedback('pitchFeedback', '🎉 Perfect match!', 'success');
        awardCoins(5);
    } else {
        showFeedback('pitchFeedback', '❌ Not quite! Try again.', 'error');
    }
}

function playNote(note) {
    const frequencies = {
        'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
        'G': 392.00, 'A': 440.00, 'B': 493.88
    };
    playSound(frequencies[note], 0.5);
}

function generateRandomNote() {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    const symbols = { C: '♩', D: '♪', E: '♫', F: '♬', G: '♭', A: '♮', B: '♯' };
    
    document.getElementById('noteDisplay').textContent = symbols[randomNote];
    setTimeout(() => {
        document.getElementById('noteName').textContent = `This is note ${randomNote}! 🎵`;
        playNote(randomNote);
    }, 500);
}

function playInstrumentSound(instrument) {
    // Simulating different instrument sounds with different frequencies and wave types
    initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const instruments = {
        guitar: { freq: 329.63, type: 'triangle', duration: 1.5 },
        violin: { freq: 440, type: 'sine', duration: 2 },
        banjo: { freq: 392, type: 'square', duration: 0.8 },
        trumpet: { freq: 523.25, type: 'sawtooth', duration: 1 },
        saxophone: { freq: 466.16, type: 'sine', duration: 1.5 },
        flute: { freq: 523.25, type: 'sine', duration: 2 },
        drums: { freq: 130.81, type: 'square', duration: 0.3 },
        piano: { freq: 261.63, type: 'triangle', duration: 1.2 },
        bells: { freq: 880, type: 'sine', duration: 2 }
    };
    
    const config = instruments[instrument];
    oscillator.frequency.value = config.freq;
    oscillator.type = config.type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + config.duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + config.duration);
}

function startInstrumentQuiz() {
    const instruments = ['guitar', 'piano', 'drums', 'trumpet', 'violin', 'flute'];
    const correctAnswer = instruments[Math.floor(Math.random() * instruments.length)];
    
    const quizArea = document.getElementById('instrumentQuizArea');
    quizArea.innerHTML = `
        <button class="practice-button" onclick="playInstrumentSound('${correctAnswer}')">🎵 Play Sound</button>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem;">
            ${instruments.map(inst => `
                <button class="practice-button" onclick="checkInstrumentAnswer('${inst}', '${correctAnswer}')">
                    ${inst.charAt(0).toUpperCase() + inst.slice(1)}
                </button>
            `).join('')}
        </div>
        <p id="instrumentQuizFeedback" style="margin-top: 1rem; font-weight: 600; font-size: 1.2rem;"></p>
    `;
}

function checkInstrumentAnswer(answer, correct) {
    const feedback = document.getElementById('instrumentQuizFeedback');
    if (answer === correct) {
        feedback.textContent = '🎉 Correct! Great ear!';
        feedback.style.color = 'var(--success-color)';
        awardCoins(10);
    } else {
        feedback.textContent = '❌ Try again! Listen carefully.';
        feedback.style.color = 'var(--warning-color)';
    }
}

// Rhythm Clicker Game
let rhythmGameActive = false;
let rhythmScore = 0;
let beatTiming = false;

function startRhythmGame() {
    rhythmGameActive = true;
    rhythmScore = 0;
    document.getElementById('rhythmScore').textContent = rhythmScore;
    document.getElementById('clickButton').disabled = false;
    document.getElementById('gameInstructions').textContent = 'Click when the circle turns RED!';
    
    startBeats();
}

function startBeats() {
    if (!rhythmGameActive) return;
    
    setInterval(() => {
        if (!rhythmGameActive) return;
        
        const circle = document.getElementById('beatCircle');
        circle.textContent = '🔴';
        beatTiming = true;
        playSound(440, 0.2);
        
        setTimeout(() => {
            circle.textContent = '⭕';
            beatTiming = false;
        }, 300);
    }, 1500);
}

function clickBeat() {
    if (beatTiming) {
        rhythmScore += 10;
        document.getElementById('rhythmScore').textContent = rhythmScore;
        document.getElementById('gameInstructions').textContent = '🎉 Perfect timing!';
        awardCoins(2);
        
        if (rhythmScore > gameState.highScores.rhythm) {
            gameState.highScores.rhythm = rhythmScore;
            updateUI();
        }
    } else {
        rhythmScore = Math.max(0, rhythmScore - 5);
        document.getElementById('rhythmScore').textContent = rhythmScore;
        document.getElementById('gameInstructions').textContent = '❌ Too early or too late!';
    }
}

function resetRhythmGame() {
    rhythmGameActive = false;
    rhythmScore = 0;
    document.getElementById('rhythmScore').textContent = rhythmScore;
    document.getElementById('clickButton').disabled = true;
    document.getElementById('gameInstructions').textContent = 'Click "Start" to begin!';
}

// Note Catcher Game
function startCatcherGame() {
    const canvas = document.getElementById('catcherCanvas');
    const ctx = canvas.getContext('2d');
    
    let playerX = canvas.width / 2;
    const playerWidth = 80;
    const playerHeight = 20;
    let score = 0;
    let notes = [];
    let gameRunning = true;
    
    // Player movement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && playerX > 0) playerX -= 20;
        if (e.key === 'ArrowRight' && playerX < canvas.width - playerWidth) playerX += 20;
    });
    
    // Spawn notes
    setInterval(() => {
        if (gameRunning && notes.length < 5) {
            notes.push({
                x: Math.random() * (canvas.width - 30),
                y: 0,
                symbol: ['♩', '♪', '♫', '♬'][Math.floor(Math.random() * 4)]
            });
        }
    }, 1000);
    
    // Game loop
    function gameLoop() {
        if (!gameRunning) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw player
        ctx.fillStyle = '#FF6B9D';
        ctx.fillRect(playerX, canvas.height - 30, playerWidth, playerHeight);
        
        // Update and draw notes
        notes.forEach((note, index) => {
            note.y += 2;
            
            ctx.font = '30px Arial';
            ctx.fillStyle = '#9B59B6';
            ctx.fillText(note.symbol, note.x, note.y);
            
            // Check collision
            if (note.y > canvas.height - 50 && note.y < canvas.height - 30 &&
                note.x > playerX && note.x < playerX + playerWidth) {
                notes.splice(index, 1);
                score += 10;
                document.getElementById('catcherScore').textContent = score;
                playSound(523, 0.1);
                awardCoins(1);
                
                if (score > gameState.highScores.noteCatcher) {
                    gameState.highScores.noteCatcher = score;
                    updateUI();
                }
            }
            
            // Remove if off screen
            if (note.y > canvas.height) {
                notes.splice(index, 1);
            }
        });
        
        requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
}

// Melody Maker
function playPianoNote(note) {
    const frequencies = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
        'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
        'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
    };
    
    playSound(frequencies[note], 0.3);
    currentMelody.push(note);
    document.getElementById('melodySequence').textContent = currentMelody.join(' - ');
    
    // Visual feedback
    const key = document.querySelector(`[data-note="${note}"]`);
    key.classList.add('active');
    setTimeout(() => key.classList.remove('active'), 200);
}

function playMelody() {
    if (currentMelody.length === 0) return;
    
    const frequencies = {
        'C': 261.63, 'C#': 277.18, 'D': 293.66, 'D#': 311.13,
        'E': 329.63, 'F': 349.23, 'F#': 369.99, 'G': 392.00,
        'G#': 415.30, 'A': 440.00, 'A#': 466.16, 'B': 493.88
    };
    
    currentMelody.forEach((note, index) => {
        setTimeout(() => {
            playSound(frequencies[note], 0.3);
        }, index * 400);
    });
}

function saveMelody() {
    if (currentMelody.length === 0) {
        alert('Create a melody first!');
        return;
    }
    
    gameState.songsCreated++;
    updateUI();
    awardCoins(20);
    alert(`🎉 Melody saved! You've created ${gameState.songsCreated} songs!`);
}

function clearMelody() {
    currentMelody = [];
    document.getElementById('melodySequence').textContent = '';
}

// Utility Functions
function showFeedback(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = type === 'success' ? 'var(--success-color)' : 'var(--warning-color)';
}

function awardCoins(amount) {
    gameState.coins += amount;
    updateUI();
    
    // Check for level up
    if (gameState.coins >= gameState.level * 100) {
        gameState.level++;
        showLevelUpAnimation();
    }
}

function showLevelUpAnimation() {
    const message = document.createElement('div');
    message.innerHTML = '🎉 LEVEL UP! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-family: 'Bubblegum Sans', cursive;
        color: var(--primary-color);
        background: white;
        padding: 2rem 4rem;
        border-radius: 30px;
        box-shadow: 0 20px 60px rgba(255, 107, 157, 0.5);
        z-index: 3000;
        animation: bounceIn 0.5s ease;
    `;
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

function closeModal() {
    document.getElementById('moduleModal').style.display = 'none';
}

function closeGameModal() {
    document.getElementById('gameModal').style.display = 'none';
    resetRhythmGame();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const moduleModal = document.getElementById('moduleModal');
    const gameModal = document.getElementById('gameModal');
    
    if (event.target === moduleModal) {
        closeModal();
    }
    if (event.target === gameModal) {
        closeGameModal();
    }
}

// Save and Load Progress
function loadProgress() {
    const saved = localStorage.getItem('melodyKidsProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        Object.assign(gameState, progress);
        updateUI();
    }
}

function saveProgress() {
    localStorage.setItem('melodyKidsProgress', JSON.stringify(gameState));
}

// Auto-save every 30 seconds
setInterval(saveProgress, 30000);

// Save on page unload
window.addEventListener('beforeunload', saveProgress);