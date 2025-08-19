
const palabrasData = {
    1: [ 
        { palabra: "casa", silabas: ["ca", "sa"], emoji: "🏠" },
        { palabra: "gato", silabas: ["ga", "to"], emoji: "🐱" },
        { palabra: "luna", silabas: ["lu", "na"], emoji: "🌙" },
        { palabra: "agua", silabas: ["a", "gua"], emoji: "💧" },
        { palabra: "mesa", silabas: ["si", "lla"], emoji: "🪑" },
        { palabra: "pato", silabas: ["pa", "to"], emoji: "🦆" },
        { palabra: "rosa", silabas: ["ro", "sa"], emoji: "🌹" },
        { palabra: "boca", silabas: ["bo", "ca"], emoji: "👄" },
        { palabra: "león", silabas: ["le", "ón"], emoji: "🦁" },
        { palabra: "pera", silabas: ["pe", "ra"], emoji: "🍐" }
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
        { palabra: "naranja", silabas: ["na", "ran", "ja"], emoji: "🍊" }
    ],
    3: [ 
        { palabra: "mariposa", silabas: ["ma", "ri", "po", "sa"], emoji: "🦋" },
        { palabra: "elefante", silabas: ["e", "le", "fan", "te"], emoji: "🐘" },
        { palabra: "dinosaurio", silabas: ["di", "no", "sau", "rio"], emoji: "🦕" },
        { palabra: "hamburguesa", silabas: ["ham", "bur", "gue", "sa"], emoji: "🍔" },
        { palabra: "medicina", silabas: ["me", "di", "ci", "na"], emoji: "💊" },
        { palabra: "bicicleta", silabas: ["bi", "ci", "cle", "ta"], emoji: "🚲" },
        { palabra: "americana", silabas: ["a", "me", "ri", "ca", "na"], emoji: "🇺🇸" },//aqui
        { palabra: "policía", silabas: ["po", "li", "cí", "a"], emoji: "👮" },
        { palabra: "teléfono", silabas: ["te", "lé", "fo", "no"], emoji: "📞" }
    ],
    4: [ 
        { palabra: "refrigerador", silabas: ["re", "fri", "ge", "ra", "dor"], emoji: "❄️" },
        { palabra: "computadora", silabas: ["com", "pu", "ta", "do", "ra"], emoji: "💻" },
        { palabra: "biblioteca", silabas: ["bi", "blio", "te", "ca"], emoji: "📚" },
        { palabra: "televisión", silabas: ["te", "le", "vi", "sión"], emoji: "📺" },
        { palabra: "automóvil", silabas: ["au", "to", "mó", "vil"], emoji: "🚗" },
        { palabra: "universidad", silabas: ["u", "ni", "ver", "si", "dad"], emoji: "🎓" },
        { palabra: "electricidad", silabas: ["e", "lec", "tri", "ci", "dad"], emoji: "⚡" }
    ]
};


let currentLevel = 1;
let currentWordIndex = 0;
let currentWord = null;
let selectedSlot = null;
let levelWords = [];
let correctWords = 0;
let slots = [];
let shuffledSyllables = [];
let usedSyllables = [];
let showNext = false;


function startGame() {
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
    initGame();
}

function goToWelcome() {
    document.getElementById('welcomePage').style.display = 'block';
    document.getElementById('gamePage').style.display = 'none';
  
    currentLevel = 1;
    currentWordIndex = 0;
    correctWords = 0;
}

function initGame() {
    loadLevel(currentLevel);
}

function loadLevel(level) {
    currentWordIndex = 0;
    correctWords = 0;
    levelWords = shuffleArray([...palabrasData[level]]).slice(0, 3);
    loadWord();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
        1: 'Nivel 1 - 2 Sílabas',
        2: 'Nivel 2 - 3 Sílabas', 
        3: 'Nivel 3 - 4 Sílabas',
        4: 'Nivel 4 - 5 Sílabas'
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
    showNext = false;
    document.getElementById('btnNext').classList.add('hidden');
    document.getElementById('btnCheck').classList.remove('hidden');
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    document.getElementById('gameComplete').classList.add('hidden');
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
        alert('Primero selecciona una casilla');
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
        alert('Completa todas las casillas');
        return;
    }
    
    const userWord = slots.map(slot => slot.syllable);
    const isCorrect = JSON.stringify(userWord) === JSON.stringify(currentWord.silabas);
    
    if (isCorrect) {
        showSuccess();
        correctWords++;
    } else {
        showError();
    }
}

function showError() {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.classList.remove('hidden');
    errorMsg.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        errorMsg.classList.add('hidden');
        errorMsg.style.animation = '';
        resetWord();
    }, 2000);
}

function showSuccess() {
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.remove('hidden');
    document.getElementById('btnCheck').classList.add('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
    createConfetti();
}

function createConfetti() {
    const colors = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#FFEAA7', '#6C5CE7', '#00B894', '#FF7675'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 6000);
    }
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
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    document.getElementById('btnCheck').disabled = false;
}

function completeLevel() {
    if (currentLevel < 4) {
        setTimeout(() => {
            alert(`¡Nivel ${currentLevel} completado! 🎉 Pasando al siguiente nivel...`);
            currentLevel++;
            loadLevel(currentLevel);
        }, 1000);
    } else {
        
        document.getElementById('gameComplete').classList.remove('hidden');
    }
}

function restartGame() {
    currentLevel = 1;
    currentWordIndex = 0;
    correctWords = 0;
    document.getElementById('gameComplete').classList.add('hidden');
    loadLevel(1);
}


document.addEventListener('DOMContentLoaded', function() {
  
    console.log('Juego de Sílabas cargado correctamente');
});