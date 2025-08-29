
// Palabras ampliadas para juego 4 (25+ palabras)
const palabrasJuego4 = [
    // 1 sílaba
    { palabra: "SOL", emoji: "☀️", silabas: 1 },
    { palabra: "PAN", emoji: "🍞", silabas: 1 },
    { palabra: "MAR", emoji: "🌊", silabas: 1 },
    { palabra: "VOZ", emoji: "🗣️", silabas: 1 },
    { palabra: "LUZ", emoji: "💡", silabas: 1 },
    { palabra: "PEZ", emoji: "🐟", silabas: 1 },
    // 2 sílabas
    { palabra: "CASA", emoji: "🏠", silabas: 2 },
    { palabra: "GATO", emoji: "🐱", silabas: 2 },
    { palabra: "LUNA", emoji: "🌙", silabas: 2 },
    { palabra: "MESA", emoji: "🪑", silabas: 2 },
    { palabra: "ROSA", emoji: "🌹", silabas: 2 },
    { palabra: "PATO", emoji: "🦆", silabas: 2 },
    { palabra: "VACA", emoji: "🐄", silabas: 2 },
    { palabra: "NUBE", emoji: "☁️", silabas: 2 },
    // 3 sílabas
    { palabra: "PELOTA", emoji: "⚽", silabas: 3 },
    { palabra: "BANANA", emoji: "🍌", silabas: 3 },
    { palabra: "CAMISA", emoji: "👕", silabas: 3 },
    { palabra: "ZAPATO", emoji: "👟", silabas: 3 },
    { palabra: "CONEJO", emoji: "🐰", silabas: 3 },
    { palabra: "TOMATE", emoji: "🍅", silabas: 3 },
    { palabra: "CEBOLLA", emoji: "🧅", silabas: 3 },
    { palabra: "PATATA", emoji: "🥔", silabas: 3 },
    { palabra: "PIJAMA", emoji: "👕", silabas: 3 },
    // 4 sílabas
    { palabra: "MARIPOSA", emoji: "🦋", silabas: 4 },
    { palabra: "ELEFANTE", emoji: "🐘", silabas: 4 },
    { palabra: "CHOCOLATE", emoji: "🍫", silabas: 4 },
    { palabra: "CARAMELO", emoji: "🍬", silabas: 4 },
    { palabra: "MEDICINA", emoji: "💊", silabas: 4 },
    { palabra: "BICICLETA", emoji: "🚲", silabas: 4 },
    { palabra: "TELÉFONO", emoji: "📞", silabas: 4 }
];

// VARIABLES GLOBALES
let currentGame = 1;
let currentLevel = 1;
let currentWordIndex = 0;
let currentWord = null;
let selectedSlot = null;
let levelWords = [];
let correctWords = 0;
let slots = [];
let shuffledSyllables = [];
let usedSyllables = [];
let separators = [];

// Variables específicas por juego
let game2Words = [];
let game2Index = 0;
let game2Correct = 0;

let game3Words = [];
let game3Index = 0;
let game3Correct = 0;
let game3Type = 'inicio';

let game4Words = [];
let game4Index = 0;
let game4Correct = 0;

// FUNCIONES PARA MOSTRAR PÁGINAS DE INTRODUCCIÓN
function showGameIntro(gameNumber) {
    document.getElementById('welcomePage').style.display = 'none';
    
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`game${i}Intro`).style.display = 'none';
        document.getElementById(`game${i}Page`).style.display = 'none';
    }
    
    document.getElementById(`game${gameNumber}Intro`).style.display = 'block';
}

function goToWelcome() {
    document.getElementById('welcomePage').style.display = 'block';
    
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`game${i}Intro`).style.display = 'none';
        document.getElementById(`game${i}Page`).style.display = 'none';
    }
    
    // Reset variables
    resetAllGameVariables();
}

function resetAllGameVariables() {
    currentLevel = 1;
    currentWordIndex = 0;
    correctWords = 0;
    game2Index = 0;
    game2Correct = 0;
    game3Index = 0;
    game3Correct = 0;
    game4Index = 0;
    game4Correct = 0;
    separators = [];
}

// FUNCIONES GENERALES
function startGame(gameNumber) {
    currentGame = gameNumber;
    
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`game${i}Intro`).style.display = 'none';
        document.getElementById(`game${i}Page`).style.display = 'none';
    }
    
    document.getElementById(`game${gameNumber}Page`).style.display = 'block';
    
    switch(gameNumber) {
        case 1:
            initGame1();
            break;
        case 2:
            initGame2();
            break;
        case 3:
            initGame3();
            break;
        case 4:
            initGame4();
            break;
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createConfetti() {
    const colors = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFEAA7', '#6C5CE7', '#00B894', '#FF7675', '#A29BFE', '#FD79A8', '#FDCB6E'];
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = '0s';
            confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
            confetti.style.width = Math.random() * 10 + 10 + 'px';
            confetti.style.height = confetti.style.width;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }, i * 30);
    }
}

// =================================
// JUEGO 1: FORMA LA PALABRA
// =================================
function initGame1() {
    loadLevel(currentLevel);
}

function loadLevel(level) {
    currentWordIndex = 0;
    correctWords = 0;
    levelWords = shuffleArray([...palabrasData[level]]).slice(0, 3);
    loadWord();
}

function loadWord() {
    if (currentWordIndex >= levelWords.length) {
        completeLevel();
        return;
    }

    currentWord = levelWords[currentWordIndex];
    createWordSlots();
    createSyllables();
    resetUI();
    updateUI();
}

function updateUI() {
    const levelNames = {
        1: 'Juego 1 - Nivel 1 (2 Sílabas)',
        2: 'Juego 1 - Nivel 2 (3 Sílabas)', 
        3: 'Juego 1 - Nivel 3 (4 Sílabas)',
        4: 'Juego 1 - Nivel 4 (5 Sílabas)'
    };
    
    document.getElementById('levelInfo').textContent = levelNames[currentLevel];
    document.getElementById('progressBar').style.width = (correctWords / 3) * 100 + '%';
    document.getElementById('wordCounter').textContent = `Palabra ${currentWordIndex + 1} de 3`;
    document.getElementById('wordImage').textContent = currentWord?.emoji || '🎯';
}

function createWordSlots() {
    const slotsContainer = document.getElementById('wordSlots');
    slotsContainer.innerHTML = '';
    slots = [];

    currentWord.silabas.forEach((silaba, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'slot';
        slotDiv.onclick = () => selectSlot(index);
        slotsContainer.appendChild(slotDiv);
        
        slots.push({
            content: '',
            filled: false,
            syllable: '',
            element: slotDiv
        });
    });
}

function createSyllables() {
    shuffledSyllables = shuffleArray([...currentWord.silabas]);
    usedSyllables = [];
    
    const syllablesContainer = document.getElementById('syllables');
    syllablesContainer.innerHTML = '';
    
    shuffledSyllables.forEach((silaba, index) => {
        const syllableDiv = document.createElement('div');
        syllableDiv.className = 'syllable';
        syllableDiv.textContent = silaba;
        syllableDiv.onclick = () => selectSyllable(silaba, index);
        syllablesContainer.appendChild(syllableDiv);
    });
}

function resetUI() {
    document.getElementById('btnNext').classList.add('hidden');
    document.getElementById('btnCheck').classList.remove('hidden');
    selectedSlot = null;
    document.getElementById('btnCheck').disabled = false;
}

function selectSlot(index) {
    if (slots[index].filled) return;
    
    slots.forEach(slot => slot.element.classList.remove('selected'));
    
    if (selectedSlot === index) {
        selectedSlot = null;
    } else {
        selectedSlot = index;
        slots[index].element.classList.add('selected');
    }
}

function selectSyllable(syllable, index) {
    if (usedSyllables.includes(index)) return;
    if (selectedSlot === null) {
        showModal('Primero selecciona una casilla', "👉");
        return;
    }

    slots[selectedSlot].content = syllable;
    slots[selectedSlot].filled = true;
    slots[selectedSlot].syllable = syllable;
    slots[selectedSlot].element.textContent = syllable;
    slots[selectedSlot].element.classList.add('filled');
    slots[selectedSlot].element.classList.remove('selected');
    
    usedSyllables.push(index);
    document.getElementById('syllables').children[index].classList.add('used');
    
    selectedSlot = null;
    
    const allFilled = slots.every(slot => slot.filled);
    document.getElementById('btnCheck').disabled = !allFilled;
}

function checkWord() {
    const allFilled = slots.every(slot => slot.filled);
    
    if (!allFilled) {
        showModal('Completa todas las casillas', "📝");
        return;
    }
    
    const userWord = slots.map(slot => slot.syllable);
    const isCorrect = JSON.stringify(userWord) === JSON.stringify(currentWord.silabas);
    
    if (isCorrect) {
        showModal('¡Excelente! Has formado la palabra correctamente', "🎉", () => {
            showSuccess();
            correctWords++;
        });
    } else {
        showModal('¡Inténtalo de nuevo! Tú puedes', "💪", () => {
            resetWord();
        });
    }
}

function showSuccess() {
    document.getElementById('btnCheck').classList.add('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    createConfetti();
}

function nextWord() {
    currentWordIndex++;
    loadWord();
}

function resetWord() {
    slots.forEach(slot => {
        slot.content = '';
        slot.filled = false;
        slot.syllable = '';
        slot.element.textContent = '';
        slot.element.classList.remove('filled', 'selected');
    });
    
    const syllablesElements = document.getElementById('syllables').children;
    for (let i = 0; i < syllablesElements.length; i++) {
        syllablesElements[i].classList.remove('used');
    }
    
    usedSyllables = [];
    selectedSlot = null;
    document.getElementById('btnCheck').disabled = false;
}

function completeLevel() {
    if (currentLevel < 4) {
        setTimeout(() => {
            showModal(`¡Nivel ${currentLevel} completado! Pasando al siguiente nivel...`, "🌟", () => {
                currentLevel++;
                loadLevel(currentLevel);
            });
        }, 1000);
    } else {
        showModal('¡Felicitaciones! Has completado todos los niveles', "🏆", () => {
            goToWelcome();
        });
    }
}

// =================================
// JUEGO 2: SEPARA EN SÍLABAS
// =================================
function initGame2() {
    game2Words = shuffleArray([...palabrasJuego2]).slice(0, 10);
    game2Index = 0;
    game2Correct = 0;
    separators = [];
    loadWord2();
}

function loadWord2() {
    if (game2Index >= game2Words.length) {
        showModal('¡Felicitaciones! Has completado el juego de separación', "🐛🎉", () => {
            goToWelcome();
        });
        return;
    }

    const word = game2Words[game2Index];
    document.getElementById('wordToSeparate').textContent = word.palabra;
    document.getElementById('separationArea').innerHTML = '';
    document.getElementById('wormSegments').innerHTML = '';
    
    resetUI2();
    updateUI2();
    createWordWithButtons();
    separators = [];
}

function resetUI2() {
    document.getElementById('btnNext2').classList.add('hidden');
    document.getElementById('btnCheck2').classList.remove('hidden');
}

function updateUI2() {
    document.getElementById('progressBar2').style.width = (game2Correct / game2Words.length) * 100 + '%';
    document.getElementById('wordCounter2').textContent = `Palabra ${game2Index + 1} de ${game2Words.length}`;
}

function createWordWithButtons() {
    const word = game2Words[game2Index];
    const wordContainer = document.getElementById('wordToSeparate');
    wordContainer.innerHTML = '';
    wordContainer.style.display = 'flex';
    wordContainer.style.alignItems = 'center';
    wordContainer.style.justifyContent = 'center';
    wordContainer.style.gap = '8px';
    wordContainer.style.flexWrap = 'wrap';
    
    for (let i = 0; i < word.palabra.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = word.palabra[i];
        letter.className = 'word-letter';
        letter.style.fontSize = '48px';
        letter.style.fontWeight = 'bold';
        letter.style.color = '#333';
        letter.style.background = 'rgba(255, 255, 255, 0.9)';
        letter.style.padding = '10px 15px';
        letter.style.borderRadius = '15px';
        letter.style.border = '3px solid #ffeaa7';
        wordContainer.appendChild(letter);
        
        if (i < word.palabra.length - 1) {
            const separator = document.createElement('button');
            separator.textContent = '✂️';
            separator.className = 'separator-btn';
            separator.style.fontSize = '32px';
            separator.style.background = '#ff6b6b';
            separator.style.border = 'none';
            separator.style.borderRadius = '50%';
            separator.style.width = '60px';
            separator.style.height = '60px';
            separator.style.cursor = 'pointer';
            separator.style.transition = 'all 0.3s ease';
            separator.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
            separator.dataset.position = i;
            
            separator.addEventListener('click', () => toggleSeparator(i, separator));
            separator.addEventListener('mouseover', () => {
                separator.style.transform = 'scale(1.2)';
                separator.style.background = '#e55656';
            });
            separator.addEventListener('mouseout', () => {
                if (!separators.includes(i)) {
                    separator.style.transform = 'scale(1)';
                    separator.style.background = '#ff6b6b';
                }
            });
            
            wordContainer.appendChild(separator);
        }
    }
}

function toggleSeparator(position, buttonElement) {
    if (separators.includes(position)) {
        separators = separators.filter(p => p !== position);
        buttonElement.textContent = '✂️';
        buttonElement.style.background = '#ff6b6b';
        buttonElement.style.transform = 'scale(1)';
    } else {
        separators.push(position);
        buttonElement.textContent = '✅';
        buttonElement.style.background = '#00b894';
        buttonElement.style.transform = 'scale(1.1)';
    }
    
    separators.sort((a, b) => a - b);
    updateWordDisplay();
}

function updateWordDisplay() {
    const word = game2Words[game2Index];
    const separationArea = document.getElementById('separationArea');
    separationArea.innerHTML = '';
    
    let currentSyllable = '';
    let syllableCount = 0;
    
    document.getElementById('wormSegments').innerHTML = '';
    
    for (let i = 0; i < word.palabra.length; i++) {
        currentSyllable += word.palabra[i];
        
        if (separators.includes(i) || i === word.palabra.length - 1) {
            const syllableDiv = document.createElement('div');
            syllableDiv.className = 'syllable-part';
            syllableDiv.textContent = currentSyllable;
            syllableDiv.style.background = '#ffeaa7';
            syllableDiv.style.color = '#333';
            syllableDiv.style.padding = '15px 25px';
            syllableDiv.style.borderRadius = '20px';
            syllableDiv.style.fontSize = '28px';
            syllableDiv.style.fontWeight = 'bold';
            syllableDiv.style.border = '3px solid #fdcb6e';
            syllableDiv.style.margin = '10px';
            syllableDiv.style.boxShadow = '0 4px 15px rgba(253, 203, 110, 0.3)';
            syllableDiv.style.animation = 'pop 0.5s ease';
            separationArea.appendChild(syllableDiv);
            
            const wormSegment = document.createElement('div');
            wormSegment.className = 'worm-segment';
            wormSegment.textContent = '🟢';
            wormSegment.style.fontSize = '40px';
            wormSegment.style.animation = `segmentBounce 1.5s ease-in-out infinite ${syllableCount * 0.2}s`;
            document.getElementById('wormSegments').appendChild(wormSegment);
            
            currentSyllable = '';
            syllableCount++;
        }
    }
}

function resetSeparation() {
    separators = [];
    document.getElementById('btnCheck2').classList.remove('hidden');
    document.getElementById('btnNext2').classList.add('hidden');
    createWordWithButtons();
    document.getElementById('separationArea').innerHTML = '';
    document.getElementById('wormSegments').innerHTML = '';
}

function checkSeparation() {
    const word = game2Words[game2Index];
    const userSyllables = getSyllablesFromSeparators();
    const correctSyllables = word.silabas;
    
    const isCorrect = JSON.stringify(userSyllables) === JSON.stringify(correctSyllables);
    
    if (isCorrect) {
        showModal('¡Perfecto! El gusanito está feliz', "🐛✨", () => {
            showSuccess2();
            game2Correct++;
        });
    } else {
        showModal('¡Inténtalo de nuevo! El gusanito necesita tu ayuda', "🐛💪", () => {
            resetSeparation();
        });
    }
}

function getSyllablesFromSeparators() {
    const word = game2Words[game2Index];
    const syllables = [];
    let currentSyllable = '';
    
    for (let i = 0; i < word.palabra.length; i++) {
        currentSyllable += word.palabra[i];
        
        if (separators.includes(i) || i === word.palabra.length - 1) {
            syllables.push(currentSyllable);
            currentSyllable = '';
        }
    }
    
    return syllables;
}

function showSuccess2() {
    document.getElementById('btnCheck2').classList.add('hidden');
    document.getElementById('btnNext2').classList.remove('hidden');
    createConfetti();
}

function nextWord2() {
    game2Index++;
    separators = [];
    loadWord2();
}

// =================================
// JUEGO 3: ¿CON QUÉ EMPIEZA?
// =================================
function initGame3() {
    game3Words = shuffleArray([...palabrasJuego3]);
    game3Index = 0;
    game3Correct = 0;
    game3Type = 'inicio';
    loadQuestion();
}

function loadQuestion() {
    if (game3Index >= game3Words.length * 2) {
        showModal('¡Detective excelente! Has completado todas las investigaciones', "🔍🏆", () => {
            goToWelcome();
        });
        return;
    }

    const wordIndex = Math.floor(game3Index / 2);
    const word = game3Words[wordIndex];
    
    game3Type = (game3Index % 2 === 0) ? 'inicio' : 'final';
    
    document.getElementById('wordImage3').textContent = word.emoji;
    document.getElementById('wordName3').textContent = word.palabra;
    
    const questionText = game3Type === 'inicio' ? 
        '¿Con qué empieza esta palabra?' : 
        '¿Con qué termina esta palabra?';
    
    document.getElementById('questionText').textContent = questionText;
    
    createSyllableOptions(word);
    
    document.getElementById('btnNext3').classList.add('hidden');
    updateUI3();
}

function updateUI3() {
    document.getElementById('progressBar3').style.width = (game3Correct / (game3Words.length * 2)) * 100 + '%';
    document.getElementById('wordCounter3').textContent = `Pregunta ${game3Index + 1} de ${game3Words.length * 2}`;
}

function createSyllableOptions(word) {
    const container = document.getElementById('syllableOptions3');
    container.innerHTML = '';
    
    const correctAnswer = game3Type === 'inicio' ? word.inicio : word.final;
    
    // Crear 8 opciones para mayor desafío
    const allSyllables = [];
    game3Words.forEach(w => {
        allSyllables.push(w.inicio, w.final);
    });
    
    const incorrectOptions = shuffleArray(allSyllables.filter(s => s !== correctAnswer)).slice(0, 7);
    const options = shuffleArray([correctAnswer, ...incorrectOptions]);
    
    options.forEach((syllable, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'syllable-bubble';
        bubble.textContent = syllable;
        bubble.style.background = `hsl(${index * 45}, 70%, 65%)`;
        bubble.style.color = 'white';
        bubble.style.fontSize = '22px';
        bubble.style.fontWeight = 'bold';
        bubble.style.padding = '18px 22px';
        bubble.style.borderRadius = '50px';
        bubble.style.cursor = 'pointer';
        bubble.style.transition = 'all 0.3s ease';
        bubble.style.border = '4px solid rgba(255, 255, 255, 0.3)';
        bubble.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.3)';
        bubble.style.position = 'relative';
        bubble.style.overflow = 'hidden';
        bubble.style.animation = `bubbleFloat 3s ease-in-out infinite ${index * 0.3}s`;
        bubble.style.margin = '8px';
        
        const shine = document.createElement('div');
        shine.style.position = 'absolute';
        shine.style.top = '10%';
        shine.style.left = '20%';
        shine.style.width = '30px';
        shine.style.height = '30px';
        shine.style.background = 'rgba(255, 255, 255, 0.4)';
        shine.style.borderRadius = '50%';
        shine.style.filter = 'blur(10px)';
        bubble.appendChild(shine);
        
        bubble.addEventListener('mouseover', () => {
            bubble.style.transform = 'scale(1.15) translateY(-5px)';
            bubble.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        bubble.addEventListener('mouseout', () => {
            bubble.style.transform = 'scale(1) translateY(0px)';
        });
        
        bubble.onclick = () => selectSyllableOption(syllable, correctAnswer, bubble);
        container.appendChild(bubble);
    });
}

function selectSyllableOption(selected, correct, element) {
    const options = document.querySelectorAll('.syllable-bubble');
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    if (selected === correct) {
        createBubbleExplosion(element, true);
        showModal('¡Detective excelente!', "🕵️✨", () => {
            game3Correct++;
            setTimeout(() => {
                nextQuestion();
            }, 500);
        });
    } else {
        createBubbleExplosion(element, false);
        options.forEach(opt => {
            if (opt.textContent === correct) {
                setTimeout(() => {
                    createBubbleExplosion(opt, true);
                }, 500);
            }
        });
        showModal('¡Sigue investigando!', "🔍💪", () => {
            setTimeout(() => {
                nextQuestion();
            }, 500);
        });
    }
}

function createBubbleExplosion(element, isCorrect) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    element.style.background = isCorrect ? '#00b894' : '#e17055';
    element.style.transform = 'scale(1.3)';
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = isCorrect ? '#00b894' : '#e17055';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (i / 15) * 2 * Math.PI;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `particleExplosion 1s ease-out forwards`;
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }
    
    if (isCorrect) {
        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.position = 'fixed';
            star.style.left = centerX + 'px';
            star.style.top = centerY + 'px';
            star.style.fontSize = '20px';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '9999';
            star.style.animation = `starBurst 1.5s ease-out forwards ${i * 0.1}s`;
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.remove();
                }
            }, 1500);
        }
    }
}

function nextQuestion() {
    game3Index++;
    loadQuestion();
}

// =================================
// JUEGO 4: LA PECERA SILÁBICA
// =================================
function initGame4() {
    game4Words = shuffleArray([...palabrasJuego4]);
    game4Index = 0;
    game4Correct = 0;
    loadFish();
    setupAquariums();
}

function setupAquariums() {
    const aquariums = document.querySelectorAll('.aquarium');
    aquariums.forEach(aquarium => {
        aquarium.onclick = () => placeFishInAquarium(parseInt(aquarium.dataset.syllables));
    });
}

function loadFish() {
    if (game4Index >= game4Words.length) {
        showModal('¡Todos los peces están felices en sus peceras!', "🐠🎉", () => {
            goToWelcome();
        });
        return;
    }

    const fish = game4Words[game4Index];
    document.getElementById('fishImage').textContent = fish.emoji;
    document.getElementById('fishWord').textContent = fish.palabra;
    
    const aquariums = document.querySelectorAll('.aquarium');
    aquariums.forEach(aquarium => {
        aquarium.classList.remove('correct', 'incorrect');
        aquarium.style.pointerEvents = 'auto';
    });
    
    document.getElementById('btnNext4').classList.add('hidden');
    updateUI4();
}

function updateUI4() {
    document.getElementById('progressBar4').style.width = (game4Correct / game4Words.length) * 100 + '%';
    document.getElementById('wordCounter4').textContent = `Pez ${game4Index + 1} de ${game4Words.length}`;
}

function placeFishInAquarium(selectedSyllables) {
    const fish = game4Words[game4Index];
    const correctSyllables = fish.silabas;
    
    const aquariums = document.querySelectorAll('.aquarium');
    aquariums.forEach(aquarium => aquarium.style.pointerEvents = 'none');
    
    if (selectedSyllables === correctSyllables) {
        const correctAquarium = document.querySelector(`[data-syllables="${selectedSyllables}"]`);
        correctAquarium.classList.add('correct');
        showModal('¡El pez está feliz en su pecera!', "🐠✨", () => {
            game4Correct++;
            setTimeout(() => {
                nextFish();
            }, 500);
        });
        createConfetti();
    } else {
        const selectedAquarium = document.querySelector(`[data-syllables="${selectedSyllables}"]`);
        const correctAquarium = document.querySelector(`[data-syllables="${correctSyllables}"]`);
        
        selectedAquarium.classList.add('incorrect');
        correctAquarium.classList.add('correct');
        showModal('¡Ese pez necesita otra pecera!', "🐟💪", () => {
            setTimeout(() => {
                nextFish();
            }, 500);
        });
    }
}

function nextFish() {
    game4Index++;
    loadFish();
}

// UTILIDADES ADICIONALES
function addSwimmingAnimation() {
    const swimmingFishes = document.querySelectorAll('.swimming-fish');
    swimmingFishes.forEach((fish, index) => {
        fish.style.animationDelay = `${index * 0.5}s`;
    });
}

function createSuccessAnimation(element) {
    element.style.animation = 'bounce 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

function createErrorAnimation(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Función para crear efectos de partículas mejorados
function createEnhancedConfetti() {
    const colors = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFEAA7', '#6C5CE7', '#00B894', '#FF7675', '#A29BFE', '#FD79A8', '#FDCB6E'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.style.background = color;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = '0s';
            confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
            confetti.style.width = Math.random() * 12 + 8 + 'px';
            confetti.style.height = confetti.style.width;
            
            switch(shape) {
                case 'circle':
                    confetti.style.borderRadius = '50%';
                    break;
                case 'square':
                    confetti.style.borderRadius = '0%';
                    break;
                case 'triangle':
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.borderLeft = '8px solid transparent';
                    confetti.style.borderRight = '8px solid transparent';
                    confetti.style.borderBottom = `16px solid ${color}`;
                    confetti.style.background = 'transparent';
                    break;
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }, i * 25);
    }
}

// Función para sonidos simulados con emojis
function playSuccessSound() {
    // Crear elemento visual para simular sonido
    const soundElement = document.createElement('div');
    soundElement.textContent = '🎵';
    soundElement.style.position = 'fixed';
    soundElement.style.top = '20px';
    soundElement.style.right = '20px';
    soundElement.style.fontSize = '30px';
    soundElement.style.zIndex = '10000';
    soundElement.style.animation = 'bounce 0.5s ease-in-out';
    document.body.appendChild(soundElement);
    
    setTimeout(() => {
        if (soundElement.parentNode) {
            soundElement.remove();
        }
    }, 500);
}

function playErrorSound() {
    const soundElement = document.createElement('div');
    soundElement.textContent = '🔊';
    soundElement.style.position = 'fixed';
    soundElement.style.top = '20px';
    soundElement.style.right = '20px';
    soundElement.style.fontSize = '30px';
    soundElement.style.zIndex = '10000';
    soundElement.style.animation = 'shake 0.5s ease-in-out';
    document.body.appendChild(soundElement);
    
    setTimeout(() => {
        if (soundElement.parentNode) {
            soundElement.remove();
        }
    }, 500);
}

// Función para guardar progreso (simulado)
function saveProgress() {
    const progress = {
        game1Level: currentLevel,
        game1Words: correctWords,
        game2Progress: game2Correct,
        game3Progress: game3Correct,
        game4Progress: game4Correct
    };
    
    // En un entorno real, esto se guardaría en localStorage
    console.log('Progreso guardado:', progress);
}

// Función para mostrar estadísticas
function showStats() {
    const totalQuestions = game3Words.length * 2;
    const game3Percentage = Math.round((game3Correct / totalQuestions) * 100) || 0;
    const game4Percentage = Math.round((game4Correct / game4Words.length) * 100) || 0;
    
    const statsMessage = `
        📊 Estadísticas:
        Juego 1: Nivel ${currentLevel}
        Juego 2: ${game2Correct} palabras separadas
        Juego 3: ${game3Percentage}% de acierto
        Juego 4: ${game4Percentage}% de peces ubicados
    `;
    
    showModal(statsMessage, "📈");
}

// Función de hints/pistas
function showHint(gameType) {
    const hints = {
        1: "💡 Pista: Escucha la palabra en tu mente y sepárala en pedacitos",
        2: "💡 Pista: Di la palabra despacio y marca donde haces pausas",
        3: "💡 Pista: Pronuncia la palabra y fíjate en el primer/último sonido",
        4: "💡 Pista: Cuenta golpeando la mesa por cada parte de la palabra"
    };
    
    showModal(hints[gameType] || "¡Tú puedes hacerlo!", "💡");
}

// Función para reiniciar juego específico
function restartGame(gameNumber) {
    switch(gameNumber) {
        case 1:
            currentLevel = 1;
            currentWordIndex = 0;
            correctWords = 0;
            break;
        case 2:
            game2Index = 0;
            game2Correct = 0;
            break;
        case 3:
            game3Index = 0;
            game3Correct = 0;
            break;
        case 4:
            game4Index = 0;
            game4Correct = 0;
            break;
    }
    
    startGame(gameNumber);
}

// Función para modo nocturno (opcional)
function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    const isNightMode = document.body.classList.contains('night-mode');
    showModal(isNightMode ? "Modo nocturno activado" : "Modo día activado", "🌙");
}

// Event listeners adicionales
document.addEventListener('keydown', function(event) {
    // Atajos de teclado opcionales
    if (event.key === 'Escape') {
        const modal = document.getElementById('customModal');
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    }
});

// Prevenir zoom accidental en dispositivos táctiles
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
});

document.addEventListener('gestureend', function (e) {
    e.preventDefault();
});

// INICIALIZACIÓN MEJORADA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Sílabas Al Rescate cargado correctamente');
    
    // Inicializar animaciones de los peces en las peceras
    setTimeout(() => {
        addSwimmingAnimation();
    }, 1000);
    
    // Mostrar mensaje de bienvenida después de cargar
    
});

// Función para optimizar el rendimiento
function optimizePerformance() {
    // Limpiar elementos no utilizados
    const unusedElements = document.querySelectorAll('.confetti');
    unusedElements.forEach(element => {
        if (element.parentNode) {
            element.remove();
        }
    });
}

// Limpiar elementos cada 30 segundos
setInterval(optimizePerformance, 30000);// =====================
// MODAL INFANTIL MEJORADO
// =====================
function showModal(message, emoji = "🎉", callback = null) {
  const modal = document.getElementById("customModal");
  const modalMessage = document.getElementById("modalMessage");
  const modalEmoji = document.getElementById("modalEmoji");
  const modalBtn = document.getElementById("modalBtn");

  modalMessage.textContent = message;
  modalEmoji.textContent = emoji;

  modal.classList.remove("hidden");
  createModalConfetti();

  modalBtn.onclick = () => {
    modal.classList.add("hidden");
    if (callback) callback();
  };
}

function createModalConfetti() {
  const colors = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFEAA7', '#6C5CE7', '#00B894', '#FF7675', '#A29BFE', '#FD79A8', '#FDCB6E'];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = '0s';
      confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
      confetti.style.borderRadius = Math.random() > 0.3 ? '50%' : '20%';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 4000);
    }, i * 50);
  }
}

// DATOS AMPLIADOS DE LOS JUEGOS
const palabrasData = {
    1: [ 
        { palabra: "casa", silabas: ["ca", "sa"], emoji: "🏠" },
        { palabra: "gato", silabas: ["ga", "to"], emoji: "🐱" },
        { palabra: "luna", silabas: ["lu", "na"], emoji: "🌙" },
        { palabra: "agua", silabas: ["a", "gua"], emoji: "💧" },
        { palabra: "mesa", silabas: ["me", "sa"], emoji: "🪑" },
        { palabra: "pato", silabas: ["pa", "to"], emoji: "🦆" },
        { palabra: "rosa", silabas: ["ro", "sa"], emoji: "🌹" },
        { palabra: "boca", silabas: ["bo", "ca"], emoji: "👄" },
        { palabra: "león", silabas: ["le", "ón"], emoji: "🦁" },
        { palabra: "pera", silabas: ["pe", "ra"], emoji: "🍐" },
        { palabra: "polo", silabas: ["po", "lo"], emoji: "🍭" },
        { palabra: "vaca", silabas: ["va", "ca"], emoji: "🐄" },
        { palabra: "dedo", silabas: ["de", "do"], emoji: "👉" },
        { palabra: "cama", silabas: ["ca", "ma"], emoji: "🛏️" },
        { palabra: "nube", silabas: ["nu", "be"], emoji: "☁️" }
    ],
    2: [ 
        { palabra: "pelota", silabas: ["pe", "lo", "ta"], emoji: "⚽" },
        { palabra: "banana", silabas: ["ba", "na", "na"], emoji: "🍌" },
        { palabra: "camisa", silabas: ["ca", "mi", "sa"], emoji: "👕" },
        { palabra: "ventana", silabas: ["ven", "ta", "na"], emoji: "🪟" },
        { palabra: "cabeza", silabas: ["ca", "be", "za"], emoji: "👤" },
        { palabra: "zapato", silabas: ["za", "pa", "to"], emoji: "👟" },
        { palabra: "paloma", silabas: ["pa", "lo", "ma"], emoji: "🕊️" },
        { palabra: "conejo", silabas: ["co", "ne", "jo"], emoji: "🐰" },
        { palabra: "tomate", silabas: ["to", "ma", "te"], emoji: "🍅" },
        { palabra: "naranja", silabas: ["na", "ran", "ja"], emoji: "🍊" },
        { palabra: "cebolla", silabas: ["ce", "bo", "lla"], emoji: "🧅" },
        { palabra: "patata", silabas: ["pa", "ta", "ta"], emoji: "🥔" },
        { palabra: "comida", silabas: ["co", "mi", "da"], emoji: "🍽️" },
        { palabra: "abrigo", silabas: ["a", "bri", "go"], emoji: "🧥" },
        { palabra: "ratón", silabas: ["ra", "tón"], emoji: "🐭" }
    ],
    3: [ 
        { palabra: "mariposa", silabas: ["ma", "ri", "po", "sa"], emoji: "🦋" },
        { palabra: "elefante", silabas: ["e", "le", "fan", "te"], emoji: "🐘" },
        { palabra: "dinosaurio", silabas: ["di", "no", "sau", "rio"], emoji: "🦕" },
        { palabra: "hamburguesa", silabas: ["ham", "bur", "gue", "sa"], emoji: "🍔" },
        { palabra: "medicina", silabas: ["me", "di", "ci", "na"], emoji: "💊" },
        { palabra: "bicicleta", silabas: ["bi", "ci", "cle", "ta"], emoji: "🚲" },
        { palabra: "americana", silabas: ["a", "me", "ri", "ca", "na"], emoji: "🇺🇸" },
        { palabra: "policía", silabas: ["po", "li", "cí", "a"], emoji: "👮" },
        { palabra: "teléfono", silabas: ["te", "lé", "fo", "no"], emoji: "📞" },
        { palabra: "chocolate", silabas: ["cho", "co", "la", "te"], emoji: "🍫" },
        { palabra: "hospital", silabas: ["hos", "pi", "tal"], emoji: "🏥" },
        { palabra: "caramelo", silabas: ["ca", "ra", "me", "lo"], emoji: "🍬" },
        { palabra: "pijama", silabas: ["pi", "ja", "ma"], emoji: "👕" },
        { palabra: "fantasma", silabas: ["fan", "tas", "ma"], emoji: "👻" }
    ],
    4: [ 
        { palabra: "refrigerador", silabas: ["re", "fri", "ge", "ra", "dor"], emoji: "❄️" },
        { palabra: "computadora", silabas: ["com", "pu", "ta", "do", "ra"], emoji: "💻" },
        { palabra: "biblioteca", silabas: ["bi", "blio", "te", "ca"], emoji: "📚" },
        { palabra: "televisión", silabas: ["te", "le", "vi", "sión"], emoji: "📺" },
        { palabra: "automóvil", silabas: ["au", "to", "mó", "vil"], emoji: "🚗" },
        { palabra: "universidad", silabas: ["u", "ni", "ver", "si", "dad"], emoji: "🎓" },
        { palabra: "electricidad", silabas: ["e", "lec", "tri", "ci", "dad"], emoji: "⚡" },
        { palabra: "helicoptero", silabas: ["he", "li", "cóp", "te", "ro"], emoji: "🚁" },
        { palabra: "supermercado", silabas: ["su", "per", "mer", "ca", "do"], emoji: "🛒" },
        { palabra: "escalera", silabas: ["es", "ca", "le", "ra"], emoji: "🪜" }
    ]
};

// Palabras ampliadas para juego 2
const palabrasJuego2 = [
    { palabra: "CASA", silabas: ["CA", "SA"] },
    { palabra: "GATO", silabas: ["GA", "TO"] },
    { palabra: "LUNA", silabas: ["LU", "NA"] },
    { palabra: "MESA", silabas: ["ME", "SA"] },
    { palabra: "ROSA", silabas: ["RO", "SA"] },
    { palabra: "PELOTA", silabas: ["PE", "LO", "TA"] },
    { palabra: "BANANA", silabas: ["BA", "NA", "NA"] },
    { palabra: "CAMISA", silabas: ["CA", "MI", "SA"] },
    { palabra: "ZAPATO", silabas: ["ZA", "PA", "TO"] },
    { palabra: "CONEJO", silabas: ["CO", "NE", "JO"] },
    { palabra: "MARIPOSA", silabas: ["MA", "RI", "PO", "SA"] },
    { palabra: "ELEFANTE", silabas: ["E", "LE", "FAN", "TE"] },
    { palabra: "CHOCOLATE", silabas: ["CHO", "CO", "LA", "TE"] },
    { palabra: "CARAMELO", silabas: ["CA", "RA", "ME", "LO"] },
    { palabra: "HOSPITAL", silabas: ["HOS", "PI", "TAL"] }
];

// Palabras ampliadas para juego 3 (20+ palabras)
const palabrasJuego3 = [
    { palabra: "CASA", silabas: ["ca", "sa"], emoji: "🏠", inicio: "ca", final: "sa" },
    { palabra: "GATO", silabas: ["ga", "to"], emoji: "🐱", inicio: "ga", final: "to" },
    { palabra: "LUNA", silabas: ["lu", "na"], emoji: "🌙", inicio: "lu", final: "na" },
    { palabra: "PATO", silabas: ["pa", "to"], emoji: "🦆", inicio: "pa", final: "to" },
    { palabra: "ROSA", silabas: ["ro", "sa"], emoji: "🌹", inicio: "ro", final: "sa" },
    { palabra: "MESA", silabas: ["me", "sa"], emoji: "🪑", inicio: "me", final: "sa" },
    { palabra: "VACA", silabas: ["va", "ca"], emoji: "🐄", inicio: "va", final: "ca" },
    { palabra: "DEDO", silabas: ["de", "do"], emoji: "👉", inicio: "de", final: "do" },
    { palabra: "NUBE", silabas: ["nu", "be"], emoji: "☁️", inicio: "nu", final: "be" },
    { palabra: "PELOTA", silabas: ["pe", "lo", "ta"], emoji: "⚽", inicio: "pe", final: "ta" },
    { palabra: "BANANA", silabas: ["ba", "na", "na"], emoji: "🍌", inicio: "ba", final: "na" },
    { palabra: "CAMISA", silabas: ["ca", "mi", "sa"], emoji: "👕", inicio: "ca", final: "sa" },
]
