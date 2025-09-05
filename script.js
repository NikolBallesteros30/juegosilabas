// =============================================
// SISTEMA DE JUEGOS CONECTADOS Y MEJORADOS
// =============================================

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
let game2Letters = [];
let game2UserSequence = [];

let game3Words = [];
let game3Index = 0;
let game3Correct = 0;
let game3Type = 'inicio';

let game4Words = [];
let game4Index = 0;
let game4Correct = 0;

// Variable para controlar el flujo de juegos
let gameFlow = false;

// DATOS DE LOS JUEGOS
const palabrasData = {
  1: [
    { palabra: "casa",    silabas: ["ca","sa"], emoji: "🏠" },
    { palabra: "gato",    silabas: ["ga","to"], emoji: "🐱" },
    { palabra: "luna",    silabas: ["lu","na"], emoji: "🌙" },
    { palabra: "agua",    silabas: ["a","gua"], emoji: "💧" },
    { palabra: "silla",   silabas: ["si","lla"], emoji: "🪑" },  
    { palabra: "pato",    silabas: ["pa","to"], emoji: "🦆" },
    { palabra: "rosa",    silabas: ["ro","sa"], emoji: "🌹" },
    { palabra: "boca",    silabas: ["bo","ca"], emoji: "👄" },
    { palabra: "león",    silabas: ["le","ón"], emoji: "🦁" },
    { palabra: "pera",    silabas: ["pe","ra"], emoji: "🍐" },
    { palabra: "vaca",    silabas: ["va","ca"], emoji: "🐄" },
    { palabra: "dedo",    silabas: ["de","do"], emoji: "👉" },
    { palabra: "cama",    silabas: ["ca","ma"], emoji: "🛏️" },
    { palabra: "nube",    silabas: ["nu","be"], emoji: "☁️" },
    { palabra: "perro",   silabas: ["pe","rro"], emoji: "🐕" },
    { palabra: "hoja",    silabas: ["ho","ja"], emoji: "🍃" },
    { palabra: "ratón",   silabas: ["ra","tón"], emoji: "🐭" },
    { palabra: "tierra",  silabas: ["tie","rra"], emoji: "🌍" },
    { palabra: "niño",    silabas: ["ni","ño"], emoji: "👦" },  
    { palabra: "llave",   silabas: ["lla","ve"], emoji: "🔑" },
    { palabra: "manos",   silabas: ["ma","no"], emoji: "✋" },
    { palabra: "barco",   silabas: ["bar","co"], emoji: "🚢" },
    { palabra: "nariz",   silabas: ["na","riz"], emoji: "👃" },
    { palabra: "lente",   silabas: ["len","te"], emoji: "🔍" },
    { palabra: "carro",   silabas: ["ca","rro"], emoji: "🚗" },
    { palabra: "sueño",   silabas: ["sue","ño"], emoji: "💤" },
    { palabra: "banco",   silabas: ["ban","co"], emoji: "🏦" },
    { palabra: "globo",   silabas: ["glo","bo"], emoji: "🎈" },
    { palabra: "dulce",   silabas: ["dul","ce"], emoji: "🍭" },
    { palabra: "parque",  silabas: ["par","que"], emoji: "🏞️" },
    { palabra: "plato",   silabas: ["pla","to"], emoji: "🍽️" },
    { palabra: "ratón",        silabas: ["ra","tón"],      emoji: "🐭" }
  ],
  2: [
    { palabra: "pelota",       silabas: ["pe","lo","ta"],   emoji: "⚽" },
    { palabra: "banana",       silabas: ["ba","na","na"],   emoji: "🍌" },
    { palabra: "camisa",       silabas: ["ca","mi","sa"],   emoji: "👕" },
    { palabra: "ventana",      silabas: ["ven","ta","na"],   emoji: "🪟" },
    { palabra: "cabeza",       silabas: ["ca","be","za"],   emoji: "👤" },
    { palabra: "zapato",       silabas: ["za","pa","to"],   emoji: "👟" },
    { palabra: "paloma",       silabas: ["pa","lo","ma"],   emoji: "🕊️" },
    { palabra: "conejo",       silabas: ["co","ne","jo"],   emoji: "🐰" },
    { palabra: "tomate",       silabas: ["to","ma","te"],   emoji: "🍅" },
    { palabra: "naranja",      silabas: ["na","ran","ja"],  emoji: "🍊" },
    { palabra: "cebolla",      silabas: ["ce","bo","lla"],  emoji: "🧅" },
    { palabra: "patata",       silabas: ["pa","ta","ta"],   emoji: "🥔" },
    { palabra: "comida",       silabas: ["co","mi","da"],   emoji: "🍽️" },
    { palabra: "abrigo",       silabas: ["a","bri","go"],   emoji: "🧥" },
   
  ],
  3: [
    { palabra: "mariposa",    silabas: ["ma","ri","po","sa"], emoji: "🦋" },
    { palabra: "elefante",    silabas: ["e","le","fan","te"], emoji: "🐘" },
    { palabra: "dinosaurio",  silabas: ["di","no","sau","rio"], emoji: "🦕" },
    { palabra: "hamburguesa", silabas: ["ham","bur","gue","sa"], avatar: "🍔" },
    { palabra: "medicina",    silabas: ["me","di","ci","na"], emoji: "💊" },
    { palabra: "bicicleta",   silabas: ["bi","ci","cle","ta"], emoji: "🚲" },
    { palabra: "policía",     silabas: ["po","li","cí","a"], emoji: "👮" },
    { palabra: "teléfono",    silabas: ["te","lé","fo","no"], emoji: "📞" },
    { palabra: "chocolate",   silabas: ["cho","co","la","te"], emoji: "🍫" },
    { palabra: "hospital",    silabas: ["hos","pi","tal"], emoji: "🏥" },
    { palabra: "caramelo",    silabas: ["ca","ra","me","lo"], emoji: "🍬" },
    { palabra: "pijama",      silabas: ["pi","ja","ma"], emoji: "👕" },
    { palabra: "fantasma",    silabas: ["fan","tas","ma"], emoji: "👻" }
  ],
  4: [
    { palabra: "refrigerador", silabas: ["re","fri","ge","ra","dor"], emoji: "❄️" },
    { palabra: "computadora",  silabas: ["com","pu","ta","do","ra"], emoji: "💻" },
    { palabra: "biblioteca",   silabas: ["bi","blio","te","ca"], emoji: "📚" },
    { palabra: "televisión",   silabas: ["te","le","vi","sión"], emoji: "📺" },
    { palabra: "automóvil",    silabas: ["au","to","mó","vil"], emoji: "🚗" },
    { palabra: "electricidad", silabas: ["e","lec","tri","ci","dad"], emoji: "⚡" },
    { palabra: "helicoptero",  silabas: ["he","li","cóp","te","ro"], emoji: "🚁" },
    { palabra: "escalera",     silabas: ["es","ca","le","ra"], emoji: "🪜" },
    { palabra: "calabaza",     silabas: ["ca","la","ba","za"], emoji: "🎃" },         
    { palabra: "carretera",    silabas: ["ca","rre","te","ra"], emoji: "🛣️" },
    { palabra: "instrumento",  silabas: ["ins","tru","men","to"], emoji: "🎸" }
  ]
};


const palabrasJuego2 = [
  
  { palabra: "CASA",    silabas: ["CA", "SA"] },
  { palabra: "GATO",    silabas: ["GA", "TO"] },
  { palabra: "LUNA",    silabas: ["LU", "NA"] },
  { palabra: "MESA",    silabas: ["ME", "SA"] },
  { palabra: "ROSA",    silabas: ["RO", "SA"] },
  { palabra: "AZUL",    silabas: ["A", "ZUL"] },
  { palabra: "BESO",    silabas: ["BE", "SO"] },
  { palabra: "COCHE",   silabas: ["CO", "CHE"] },
  { palabra: "FRESA",   silabas: ["FRE", "SA"] },
  { palabra: "HIJO",    silabas: ["HI", "JO"] },
  { palabra: "PUERTA",  silabas: ["PUER", "TA"] },
  { palabra: "SALSA",   silabas: ["SAL", "SA"] },
  { palabra: "NIÑO",   silabas: ["NI", "ÑO"] },
  { palabra: "JABÓN",   silabas: ["JA", "BÓN"] },
  { palabra: "PELOTA",     silabas: ["PE", "LO", "TA"] },
  { palabra: "BANANA",     silabas: ["BA", "NA", "NA"] },
  { palabra: "CAMISA",     silabas: ["CA", "MI", "SA"] },
  { palabra: "CONEJO",     silabas: ["CO", "NE", "JO"] },
  { palabra: "HOSPITAL",   silabas: ["HOS", "PI", "TAL"] },
  { palabra: "CAMINAR",    silabas: ["CA", "MI", "NAR"] },
  { palabra: "CHAQUETA",   silabas: ["CHA", "QUE", "TA"] },
  { palabra: "TOCINO",     silabas: ["TO", "CI", "NO"] },
  { palabra: "MIEDO",      silabas: ["MIE", "DO"] },
  { palabra: "AMOR",       silabas: ["A", "MOR"] },
  { palabra: "MARIPOSA",       silabas: ["MA", "RI", "PO", "SA"] },
  { palabra: "ELEFANTE",       silabas: ["E", "LE", "FAN", "TE"] },
  { palabra: "CHOCOLATE",      silabas: ["CHO", "CO", "LA", "TE"] },
  { palabra: "CARAMELO",       silabas: ["CA", "RA", "ME", "LO"] },
  { palabra: "ALEGRÍA",        silabas: ["A", "LE", "GRÍ", "A"] },
  { palabra: "CARRETERA",      silabas: ["CA", "RRE", "TE", "RA"] },
  { palabra: "BOLÍGRAFO",      silabas: ["BO", "LÍ", "GRA", "FO"] },
];


const palabrasJuego3 = [
  { palabra: "CASA",       silabas: ["ca","sa"],        emoji: "🏠", inicio: "ca", final: "sa" },
  { palabra: "GATO",       silabas: ["ga","to"],        emoji: "🐱", inicio: "ga", final: "to" },
  { palabra: "LUNA",       silabas: ["lu","na"],        emoji: "🌙", inicio: "lu", final: "na" },
  { palabra: "PATO",       silabas: ["pa","to"],        emoji: "🦆", inicio: "pa", final: "to" },
  { palabra: "ROSA",       silabas: ["ro","sa"],        emoji: "🌹", inicio: "ro", final: "sa" },
  { palabra: "VACA",       silabas: ["va","ca"],        emoji: "🐄", inicio: "va", final: "ca" },
  { palabra: "PELOTA",     silabas: ["pe","lo","ta"],   emoji: "⚽", inicio: "pe", final: "ta" },

  // Nuevas
  { palabra: "CAMINAR",    silabas: ["ca","mi","nar"],  emoji: "🚶", inicio: "ca", final: "nar" },
  { palabra: "CHAQUETA",   silabas: ["cha","que","ta"], emoji: "🧥", inicio: "cha", final: "ta" },
  { palabra: "TOCINO",     silabas: ["to","ci","no"],   emoji: "🥓", inicio: "to", final: "no" },
  { palabra: "BANANA",     silabas: ["ba","na","na"],   emoji: "🍌", inicio: "ba", final: "na" },
  { palabra: "CAMISA",     silabas: ["ca","mi","sa"],   emoji: "👕", inicio: "ca", final: "sa" },
  { palabra: "ZAPATO",     silabas: ["za","pa","to"],   emoji: "👟", inicio: "za", final: "to" },
  { palabra: "CONEJO",     silabas: ["co","ne","jo"],   emoji: "🐰", inicio: "co", final: "jo" },
  { palabra: "TOMATE",     silabas: ["to","ma","te"],   emoji: "🍅", inicio: "to", final: "te" },

  { palabra: "ALEGRÍA",      silabas: ["a","le","grí","a"],     emoji: "😊", inicio: "a", final: "a" },
  { palabra: "CARRETERA",    silabas: ["ca","rre","te","ra"],   emoji: "🛣️", inicio: "ca", final: "ra" },
  { palabra: "BOLÍGRAFO",    silabas: ["bo","lí","gra","fo"],   emoji: "🖊️", inicio: "bo", final: "fo" },

];


const palabrasJuego4 = [
  { palabra: "SOL", emoji: "☀️", silabas: 1 },
  { palabra: "PAN", emoji: "🍞", silabas: 1 },
  { palabra: "MAR", emoji: "🌊", silabas: 1 },
  { palabra: "VOZ", emoji: "🗣️", silabas: 1 },
  { palabra: "LUZ", emoji: "💡", silabas: 1 },
  { palabra: "PEZ", emoji: "🐟", silabas: 1 },
  { palabra: "CASA", emoji: "🏠", silabas: 2 },
  { palabra: "GATO", emoji: "🐱", silabas: 2 },
  { palabra: "LUNA", emoji: "🌙", silabas: 2 },
  { palabra: "ROSA", emoji: "🌹", silabas: 2 },
  { palabra: "PATO", emoji: "🦆", silabas: 2 },
  { palabra: "VACA", emoji: "🐄", silabas: 2 },
  { palabra: "NUBE", emoji: "☁️", silabas: 2 },
  { palabra: "PELOTA", emoji: "⚽", silabas: 3 },
  { palabra: "BANANA", emoji: "🍌", silabas: 3 },
  { palabra: "CAMISA", emoji: "👕", silabas: 3 },
  { palabra: "ZAPATO", emoji: "👟", silabas: 3 },
  { palabra: "CONEJO", emoji: "🐰", silabas: 3 },
  { palabra: "TOMATE", emoji: "🍅", silabas: 3 },
  { palabra: "CEBOLLA", emoji: "🧅", silabas: 3 },
  { palabra: "PATATA", emoji: "🥔", silabas: 3 },
  { palabra: "PIJAMA", emoji: "👕", silabas: 3 },
  { palabra: "MARIPOSA", emoji: "🦋", silabas: 4 },
  { palabra: "ELEFANTE", emoji: "🐘", silabas: 4 },
  { palabra: "CHOCOLATE", emoji: "🍫", silabas: 4 },
  { palabra: "CARAMELO", emoji: "🍬", silabas: 4 },
  { palabra: "MEDICINA", emoji: "💊", silabas: 4 },
  { palabra: "BICICLETA", emoji: "🚲", silabas: 4 },
  { palabra: "TELÉFONO", emoji: "📞", silabas: 4 }
];


// =============================================
// FUNCIONES PARA NAVEGACIÓN ENTRE JUEGOS
// =============================================
function showGameIntro(gameNumber) {
    document.getElementById('welcomePage').style.display = 'none';
    
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`game${i}Intro`).style.display = 'none';
        document.getElementById(`game${i}Page`).style.display = 'none';
    }
    
    document.getElementById(`game${gameNumber}Intro`).style.display = 'block';
    changeBackground(gameNumber);
}

function goToWelcome() {
    document.getElementById('welcomePage').style.display = 'block';
    
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`game${i}Intro`).style.display = 'none';
        document.getElementById(`game${i}Page`).style.display = 'none';
    }
    
    changeBackground('welcome');
    resetAllGameVariables();
    gameFlow = false;
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

function startGame(gameNumber) {
    currentGame = gameNumber;
    
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`game${i}Intro`).style.display = 'none';
        document.getElementById(`game${i}Page`).style.display = 'none';
    }
    
    document.getElementById(`game${gameNumber}Page`).style.display = 'block';
    changeBackground(gameNumber);
    
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

function startGameFlow() {
    gameFlow = true;
    currentGame = 1;
    startGame(1);
}

function showGameCompletionModal(gameNumber) {
    if (gameFlow && gameNumber < 4) {
        const nextGame = gameNumber + 1;
        const gameNames = {
            1: "Forma la Palabra",
            2: "Separa en Sílabas", 
            3: "¿Con Qué Empieza?",
            4: "La Pecera Silábica"
        };
        
        showSimpleNotification(
            `¡Felicidades! Completaste ${gameNames[gameNumber]}`, 
            "🎉", 
            () => {
                showNextGameTransition(nextGame, gameNames[nextGame]);
            }
        );
    } else if (gameFlow && gameNumber === 4) {
        showModal(
            '¡INCREÍBLE! Completaste todos los juegos. ¡Eres un experto en sílabas!', 
            "🏆👑", 
            () => {
                createEnhancedConfetti();
                setTimeout(() => {
                    goToWelcome();
                }, 3000);
            }
        );
    } else {
        showModal(
            '¡Felicitaciones! Has completado este juego', 
            "🎉", 
            () => {
                goToWelcome();
            }
        );
    }
}

function showNextGameTransition(nextGameNumber, nextGameName) {
    const transitionModal = document.createElement('div');
    transitionModal.id = 'transitionModal';
    transitionModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const transitionContent = document.createElement('div');
    transitionContent.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px;
        border-radius: 25px;
        text-align: center;
        color: white;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        max-width: 500px;
        animation: slideIn 0.5s ease-out;
    `;
    
    transitionContent.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px;">🎯</div>
        <h2 style="font-size: 28px; margin-bottom: 15px;">¡Siguiente Aventura!</h2>
        <p style="font-size: 20px; margin-bottom: 30px;">${nextGameName}</p>
        <button id="continueBtn" style="
            font-size: 18px;
            padding: 15px 30px;
            background: #00b894;
            color: white;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4);
        ">Continuar ➡️</button>
    `;
    
    transitionModal.appendChild(transitionContent);
    document.body.appendChild(transitionModal);
    
    document.getElementById('continueBtn').onclick = () => {
        document.body.removeChild(transitionModal);
        startGame(nextGameNumber);
    };
    
    const btn = document.getElementById('continueBtn');
    btn.onmouseover = () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.background = '#00a085';
    };
    btn.onmouseout = () => {
        btn.style.transform = 'scale(1)';
        btn.style.background = '#00b894';
    };
}

// =============================================
// FUNCIONES AUXILIARES
// =============================================
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

function createEnhancedConfetti() {
    const colors = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFEAA7', '#6C5CE7', '#00B894', '#FF7675', '#A29BFE', '#FD79A8', '#FDCB6E'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = '0s';
            confetti.style.animationDuration = Math.random() * 3 + 3 + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
            confetti.style.width = Math.random() * 15 + 10 + 'px';
            confetti.style.height = confetti.style.width;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 6000);
        }, i * 40);
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
       showErrorNotification('Primero selecciona una casilla', "👉");
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
        showErrorNotification('Completa todas las casillas', "📝");
        return;
    }
    
    const userWord = slots.map(slot => slot.syllable);
    const isCorrect = JSON.stringify(userWord) === JSON.stringify(currentWord.silabas);
    
   if (isCorrect) {
    showSimpleNotification('¡Excelente! Palabra correcta', "🎉");
    createConfetti();
    showSuccess();
    correctWords++;
} else {
     showErrorNotification('¡Inténtalo de nuevo! Tú puedes', "💪");
    resetWord();
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
        showGameCompletionModal(1);
    }
}

// =================================
// JUEGO 2: SEPARA EN SÍLABAS
// =================================
function initGame2() {
    game2Words = shuffleArray([...palabrasJuego2]).slice(0, 10);
    game2Index = 0;
    game2Correct = 0;
    game2Letters = [];
    game2UserSequence = [];
    loadWord2();
}

function loadWord2() {
    if (game2Index >= game2Words.length) {
        showGameCompletionModal(2);
        return;
    }

    const word = game2Words[game2Index];
    game2Letters = [];
    game2UserSequence = [];
    
    for (let i = 0; i < word.palabra.length; i++) {
        game2Letters.push({
            letter: word.palabra[i],
            used: false,
            index: i
        });
    }
    
    createLetterButtons();
    createBuildingArea();
    resetUI2();
    updateUI2();
}

function createLetterButtons() {
    const word = game2Words[game2Index];
    const lettersContainer = document.getElementById('wordToSeparate');
    lettersContainer.innerHTML = '';
    lettersContainer.style.display = 'flex';
    lettersContainer.style.alignItems = 'center';
    lettersContainer.style.justifyContent = 'center';
    lettersContainer.style.gap = '15px';
    lettersContainer.style.flexWrap = 'wrap';
    lettersContainer.style.marginBottom = '30px';
    
    game2Letters.forEach((letterObj, index) => {
        const letterBtn = document.createElement('button');
        letterBtn.textContent = letterObj.letter;
        letterBtn.className = 'letter-btn';
        letterBtn.dataset.index = index;
        letterBtn.style.fontSize = '36px';
        letterBtn.style.fontWeight = 'bold';
        letterBtn.style.color = '#333';
        letterBtn.style.background = 'linear-gradient(145deg, #ffeaa7, #fdcb6e)';
        letterBtn.style.padding = '15px 20px';
        letterBtn.style.borderRadius = '15px';
        letterBtn.style.border = '3px solid #fdcb6e';
        letterBtn.style.cursor = 'pointer';
        letterBtn.style.transition = 'all 0.3s ease';
        letterBtn.style.boxShadow = '0 6px 15px rgba(253, 203, 110, 0.4)';
        letterBtn.style.minWidth = '60px';
        letterBtn.style.minHeight = '60px';
        
        letterBtn.addEventListener('click', () => selectLetter(index));
        letterBtn.addEventListener('mouseover', () => {
            if (!letterObj.used) {
                letterBtn.style.transform = 'scale(1.15) translateY(-5px)';
                letterBtn.style.boxShadow = '0 10px 25px rgba(253, 203, 110, 0.6)';
            }
        });
        letterBtn.addEventListener('mouseout', () => {
            if (!letterObj.used) {
                letterBtn.style.transform = 'scale(1) translateY(0px)';
                letterBtn.style.boxShadow = '0 6px 15px rgba(253, 203, 110, 0.4)';
            }
        });
        
        lettersContainer.appendChild(letterBtn);
    });
    
    const separatorBtn = document.createElement('button');
    separatorBtn.textContent = '-';
    separatorBtn.className = 'separator-btn-new';
    separatorBtn.style.fontSize = '40px';
    separatorBtn.style.fontWeight = 'bold';
    separatorBtn.style.color = 'white';
    separatorBtn.style.background = 'linear-gradient(145deg, #ff6b6b, #e55656)';
    separatorBtn.style.padding = '15px 25px';
    separatorBtn.style.borderRadius = '15px';
    separatorBtn.style.border = '3px solid #e55656';
    separatorBtn.style.cursor = 'pointer';
    separatorBtn.style.transition = 'all 0.3s ease';
    separatorBtn.style.boxShadow = '0 6px 15px rgba(255, 107, 107, 0.4)';
    separatorBtn.style.minWidth = '70px';
    separatorBtn.style.minHeight = '60px';
    
    separatorBtn.addEventListener('click', () => addSeparator());
    separatorBtn.addEventListener('mouseover', () => {
        separatorBtn.style.transform = 'scale(1.15) translateY(-5px)';
        separatorBtn.style.boxShadow = '0 10px 25px rgba(255, 107, 107, 0.6)';
    });
    separatorBtn.addEventListener('mouseout', () => {
        separatorBtn.style.transform = 'scale(1) translateY(0px)';
        separatorBtn.style.boxShadow = '0 6px 15px rgba(255, 107, 107, 0.4)';
    });
    
    lettersContainer.appendChild(separatorBtn);
}

function createBuildingArea() {
    let buildingArea = document.getElementById('buildingArea');
    if (!buildingArea) {
        buildingArea = document.createElement('div');
        buildingArea.id = 'buildingArea';
        buildingArea.style.minHeight = '100px';
        buildingArea.style.background = 'rgba(255, 255, 255, 0.9)';
        buildingArea.style.borderRadius = '20px';
        buildingArea.style.border = '3px dashed #74b9ff';
        buildingArea.style.padding = '20px';
        buildingArea.style.margin = '20px 0';
        buildingArea.style.display = 'flex';
        buildingArea.style.alignItems = 'center';
        buildingArea.style.justifyContent = 'center';
        buildingArea.style.gap = '10px';
        buildingArea.style.flexWrap = 'wrap';
        
        const separationArea = document.getElementById('separationArea');
        separationArea.parentNode.insertBefore(buildingArea, separationArea);
    }
    
    updateBuildingArea();
}

function selectLetter(index) {
    const letterObj = game2Letters[index];
    const letterBtn = document.querySelector(`[data-index="${index}"]`);
    
    if (letterObj.used) return;
    
    letterObj.used = true;
    letterBtn.style.background = 'linear-gradient(145deg, #ddd, #bbb)';
    letterBtn.style.color = '#666';
    letterBtn.style.cursor = 'not-allowed';
    letterBtn.style.transform = 'scale(0.9)';
    letterBtn.style.opacity = '0.5';
    
    game2UserSequence.push({
        type: 'letter',
        value: letterObj.letter,
        originalIndex: index
    });
    
    updateBuildingArea();
    checkAllLettersUsed();
}

function addSeparator() {
    if (game2UserSequence.length === 0) {
        showSimpleNotification('Primero selecciona una letra', "📝");
        return;
    }
    
    const lastItem = game2UserSequence[game2UserSequence.length - 1];
    if (lastItem.type === 'separator') {
       showErrorNotification('No puedes poner dos separadores seguidos', "⚠️");
        return;
    }
    
    game2UserSequence.push({
        type: 'separator',
        value: '-'
    });
    
    updateBuildingArea();
}

function updateBuildingArea() {
    const buildingArea = document.getElementById('buildingArea');
    buildingArea.innerHTML = '';
    
    if (game2UserSequence.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.textContent = 'Selecciona las letras para formar la palabra...';
        placeholder.style.color = '#74b9ff';
        placeholder.style.fontSize = '18px';
        placeholder.style.fontStyle = 'italic';
        buildingArea.appendChild(placeholder);
        return;
    }
    
    game2UserSequence.forEach((item, index) => {
        const element = document.createElement('div');
        element.textContent = item.value;
        element.className = item.type === 'letter' ? 'built-letter' : 'built-separator';
        
        if (item.type === 'letter') {
            element.style.fontSize = '32px';
            element.style.fontWeight = 'bold';
            element.style.color = '#333';
            element.style.background = 'linear-gradient(145deg, #a8e6cf, #88d8a3)';
            element.style.padding = '12px 18px';
            element.style.borderRadius = '12px';
            element.style.border = '2px solid #88d8a3';
            element.style.boxShadow = '0 4px 10px rgba(136, 216, 163, 0.3)';
        } else {
            element.style.fontSize = '28px';
            element.style.fontWeight = 'bold';
            element.style.color = '#e55656';
            element.style.background = 'rgba(255, 107, 107, 0.1)';
            element.style.padding = '8px 12px';
            element.style.borderRadius = '8px';
        }
        
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.3s ease';
        
        element.addEventListener('click', () => removeFromSequence(index));
        element.addEventListener('mouseover', () => {
            element.style.transform = 'scale(1.1)';
            element.style.opacity = '0.8';
        });
        element.addEventListener('mouseout', () => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
        
        buildingArea.appendChild(element);
    });
}

function removeFromSequence(index) {
    const removedItem = game2UserSequence[index];
    
    if (removedItem.type === 'letter') {
        const letterObj = game2Letters[removedItem.originalIndex];
        letterObj.used = false;
        
        const letterBtn = document.querySelector(`[data-index="${removedItem.originalIndex}"]`);
        letterBtn.style.background = 'linear-gradient(145deg, #ffeaa7, #fdcb6e)';
        letterBtn.style.color = '#333';
        letterBtn.style.cursor = 'pointer';
        letterBtn.style.transform = 'scale(1)';
        letterBtn.style.opacity = '1';
    }
    
    game2UserSequence.splice(index, 1);
    updateBuildingArea();
    document.getElementById('btnCheck2').disabled = false;
}

function getUserSyllablesFromSequence() {
    const syllables = [];
    let currentSyllable = '';
    
    game2UserSequence.forEach(item => {
        if (item.type === 'letter') {
            currentSyllable += item.value;
        } else if (item.type === 'separator') {
            if (currentSyllable) {
                syllables.push(currentSyllable);
                currentSyllable = '';
            }
        }
    });
    
    if (currentSyllable) {
        syllables.push(currentSyllable);
    }
    
    return syllables;
}

function checkAllLettersUsed() {
    const allUsed = game2Letters.every(letter => letter.used);
    if (allUsed && game2UserSequence.length > 0) {
        document.getElementById('btnCheck2').disabled = false;
    }
}

function checkSeparation() {
    const word = game2Words[game2Index];
    
    const allLettersUsed = game2Letters.every(letter => letter.used);
    if (!allLettersUsed) {
        showErrorNotification('Debes usar todas las letras', "📝");
        return;
    }
    
    const userSyllables = getUserSyllablesFromSequence();
    const correctSyllables = word.silabas;
    
    const reconstructedWord = userSyllables.join('');
    if (reconstructedWord !== word.palabra) {
        showErrorNotification('La palabra no está completa o tiene letras incorrectas', "⚠️");
        return;
    }
    
    const isCorrect = JSON.stringify(userSyllables) === JSON.stringify(correctSyllables);
    
    if (isCorrect) {
    showSimpleNotification('¡Excelente trabajo! Has separado correctamente las sílabas', "✅✨");
    createConfetti();
    showSuccess2();
    game2Correct++;
} else {
    showErrorNotification('¡Inténtalo de nuevo! Revisa la separación de las sílabas', "📚🔍");
    resetSeparation();
}
}

function resetSeparation() {
    game2Letters.forEach((letterObj, index) => {
        letterObj.used = false;
        const letterBtn = document.querySelector(`[data-index="${index}"]`);
        if (letterBtn) {
            letterBtn.style.background = 'linear-gradient(145deg, #ffeaa7, #fdcb6e)';
            letterBtn.style.color = '#333';
            letterBtn.style.cursor = 'pointer';
            letterBtn.style.transform = 'scale(1)';
            letterBtn.style.opacity = '1';
        }
    });
    
    game2UserSequence = [];
    document.getElementById('btnCheck2').classList.remove('hidden');
    document.getElementById('btnNext2').classList.add('hidden');
    document.getElementById('btnCheck2').disabled = false;
    document.getElementById('separationArea').innerHTML = '';
    updateBuildingArea();
}

function showSuccess2() {
    document.getElementById('btnCheck2').classList.add('hidden');
    document.getElementById('btnNext2').classList.remove('hidden');
    createConfetti();
}

function nextWord2() {
    game2Index++;
    loadWord2();
}

function resetUI2() {
    document.getElementById('btnNext2').classList.add('hidden');
    document.getElementById('btnCheck2').classList.remove('hidden');
    document.getElementById('btnCheck2').disabled = true;
}

function updateUI2() {
    document.getElementById('progressBar2').style.width = (game2Correct / game2Words.length) * 100 + '%';
    document.getElementById('wordCounter2').textContent = `Palabra ${game2Index + 1} de ${game2Words.length}`;
}

// =================================
// JUEGO 3: ¿CON QUÉ EMPIEZA?
// =================================
function initGame3() {
    game3Words = shuffleArray([...palabrasJuego3]).slice(0, 5);
    game3Index = 0;
    game3Correct = 0;
    game3Type = 'inicio';
    loadQuestion();
}

function loadQuestion() {
    if (game3Index >= game3Words.length * 2) {
        showGameCompletionModal(3);
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
    showSimpleNotification('¡Detective excelente!', "🕵️✨");
    createConfetti();
    game3Correct++;
    setTimeout(() => {
        nextQuestion();
    }, 1000);
} else {
    createBubbleExplosion(element, false);
    showErrorNotification('¡Sigue investigando! Inténtalo de nuevo', "🔍💪");
    setTimeout(() => {
        options.forEach(opt => {
            opt.style.pointerEvents = 'auto';
            opt.style.background = opt.style.background;
            opt.style.transform = 'scale(1)';
        });
    }, 1500);
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
    game4Words = shuffleArray([...palabrasJuego4]).slice(0, 10);
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
        showGameCompletionModal(4);
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
    showSimpleNotification('¡El pez está feliz en su pecera!', "🐠✨");
    createConfetti();
    game4Correct++;
    setTimeout(() => {
        nextFish();
    }, 1000);
} else {
    const selectedAquarium = document.querySelector(`[data-syllables="${selectedSyllables}"]`);
    selectedAquarium.classList.add('incorrect');
    showErrorNotification('¡Ese pez necesita otra pecera! Inténtalo de nuevo', "🐟💪");
    setTimeout(() => {
        aquariums.forEach(aquarium => {
            aquarium.classList.remove('correct', 'incorrect');
            aquarium.style.pointerEvents = 'auto';
        });
    }, 1500);
}
}

function nextFish() {
    game4Index++;
    loadFish();
}

// =============================================
// MODAL Y FUNCIONES DE CAMBIO DE FONDO
// =============================================
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

function changeBackground(gameNumber) {
    const body = document.body;
    
    body.classList.remove('welcome-bg', 'game1-bg', 'game2-bg', 'game3-bg', 'game4-bg');
    
    if (gameNumber === 'welcome') {
        body.classList.add('welcome-bg');
    } else {
        body.classList.add(`game${gameNumber}-bg`);
    }
}

// =============================================
// BOTÓN PARA FLUJO COMPLETO DE JUEGOS
// =============================================
function addGameFlowButton() {
    const welcomePage = document.getElementById('welcomePage');
    
    
   
    
    flowButton.onclick = startGameFlow;
    flowButton.onmouseover = () => {
        flowButton.style.transform = 'scale(1.05) translateY(-3px)';
        flowButton.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.6)';
    };
    flowButton.onmouseout = () => {
        flowButton.style.transform = 'scale(1) translateY(0px)';
        flowButton.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
    };
    
    const title = welcomePage.querySelector('h1');
    title.parentNode.insertBefore(flowButton, title.nextSibling);
}

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    changeBackground('welcome');
    addGameFlowButton();
    console.log('Sistema de juegos conectados cargado correctamente');
});

// Limpiar elementos cada 30 segundos para optimizar rendimiento
function optimizePerformance() {
    const unusedElements = document.querySelectorAll('.confetti');
    unusedElements.forEach(element => {
        if (element.parentNode) {
            element.remove();
        }
    });
}

setInterval(optimizePerformance, 30000);

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



// FUNCIÓN PARA CAMBIAR FONDOS
function changeBackground(gameNumber) {
    const body = document.body;
    
    // Remover todas las clases de fondo
    body.classList.remove('welcome-bg', 'game1-bg', 'game2-bg', 'game3-bg', 'game4-bg');
    
    // Agregar la clase correspondiente
    if (gameNumber === 'welcome') {
        body.classList.add('welcome-bg');
    } else {
        body.classList.add(`game${gameNumber}-bg`);
    }
    
    console.log(`Fondo cambiado a: game${gameNumber}-bg`); // Para depurar
}

// Función para notificación simple - VERSIÓN ESTABLE SIN ANIMACIONES CONFLICTIVAS
function showSimpleNotification(message, emoji = "🎉") {
    // Remover notificación anterior si existe
    const existingNotification = document.querySelector('.game-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'game-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #00b894, #55efc4);
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0, 184, 148, 0.4);
        z-index: 9998;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    notification.innerHTML = `
        <span style="font-size: 24px;">${emoji}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar la notificación
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Empezar a desvanecer después de 9 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
    
    // Eliminar después de 10 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function showErrorNotification(message, emoji = "⚠️") {
    // Remover notificación anterior si existe
    const existingNotification = document.querySelector('.game-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'game-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #b33838ff, #b35656ff);
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(255, 0, 0, 0.75);
        z-index: 9998;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    notification.innerHTML = `
        <span style="font-size: 24px;">${emoji}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar la notificación
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Empezar a desvanecer después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
    
    // Eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}
